import { useEffect, useState } from "react";
import Main from "../../../Components/Company/Campaign/AddCampaign/index.jsx";
import SocietyDetail from "../../../Components/Company/Campaign/SocietyDetail.jsx";
import ReviewScreen from "../../../Components/Company/Campaign/ReviewScreen.jsx";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const AddCampaign = () => {
  const { campaignId } = useParams();
  const isEditMode = Boolean(campaignId);
  const navigate = useNavigate();

  // step: "form" | "review"
  const [step, setStep] = useState("form");
  const [societies, setSocieties] = useState([]);
  const [loadingSocities, setLoadingSocities] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // societyAssets: { [societyId]: { selectedAssets: [{key, label, permission_cost}], whatsappCreative: File|null } }
  const [societyAssets, setSocietyAssets] = useState({});

  const [formData, setFormData] = useState({
    campaignName: "",
    campaignDate: "",
    search_by_google_location: null,
    campaign_city_id: null,
    campaign_area_id: null,
    campaign_address: "",
    my_ads_location_latitude: null,
    my_ads_location_longitude: null,
    radius_km: "1",
  });

  // Unused but kept for compatibility with Form.jsx props
  const [selectedSocieties, setSelectedSocieties] = useState([]);
  const [societyIds, setSocietyIds] = useState([]);

  // Edit mode: load existing campaign
  useEffect(() => {
    if (!isEditMode) return;
    const fetchCampaign = async () => {
      try {
        const res = await axiosInstance.get(
          `${api_routes.company.get_campaign}/${campaignId}`
        );
        const { campaign, campaign_logs } = res.data?.data || {};
        if (!campaign) return;

        // If already paid/pending, show locked message
        if (campaign.campaign_status === "pending") {
          toast.info("This campaign is locked after payment and cannot be edited.");
          navigate("/company/campaign");
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date((campaign.campaign_date || "").split(" - ")[1] || campaign.campaign_date);
        endDate.setHours(0, 0, 0, 0);
        const isFutureOrToday = endDate >= today;
        const campaignDate = isFutureOrToday
          ? endDate.toISOString().split("T")[0]
          : today.toISOString().split("T")[0];

        setFormData({
          id: campaign.id,
          campaignName: campaign.campaign_name || "",
          campaignDate: campaignDate,
          search_by_google_location: campaign.search_by_google_location || null,
          campaign_city_id: campaign.campaign_city_id || null,
          campaign_area_id: campaign.campaign_area_id || null,
          campaign_address: campaign.campaign_address || "",
          my_ads_location_latitude: campaign.my_ads_location_latitude || null,
          my_ads_location_longitude: campaign.my_ads_location_longitude || null,
          radius_km: campaign.radius_km || "1",
        });

        // Restore per-society assets from logs
        if (Array.isArray(campaign_logs)) {
          const restoredAssets = {};
          campaign_logs.forEach((log) => {
            if (log.society_id) {
              restoredAssets[log.society_id] = {
                selectedAssets: Array.isArray(log.selected_assets) ? log.selected_assets : [],
                whatsappCreative: null,
              };
            }
          });
          setSocietyAssets(restoredAssets);
        }
      } catch (err) {
        toast.error("Failed to load campaign data.");
      }
    };
    fetchCampaign();
  }, [isEditMode, campaignId]);

  // Compute total campaign amount from societyAssets
  const totalCampaignAmount = Object.values(societyAssets).reduce(
    (sum, data) =>
      sum +
      (data?.selectedAssets || []).reduce(
        (s, a) => s + Number(a.permission_cost || 0),
        0
      ),
    0
  );

  // Build FormData for API submission
  const buildPayload = (status, paymentData = null) => {
    const fd = new FormData();

    const append = (k, v) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    };

    append("campaign_name", formData.campaignName);
    append("campaign_date", formData.campaignDate);
    append("campaign_status", status);
    append("campaign_amount", totalCampaignAmount);
    append("search_by_google_location", formData.search_by_google_location ?? false);
    append("campaign_city_id", formData.campaign_city_id);
    append("campaign_area_id", formData.campaign_area_id);
    append("campaign_address", formData.campaign_address);
    append("id", formData.id);

    if (formData.my_ads_location_latitude && formData.my_ads_location_longitude) {
      append("my_ads_location_latitude", formData.my_ads_location_latitude);
      append("my_ads_location_longitude", formData.my_ads_location_longitude);
      append("radius_km", formData.radius_km);
    }

    // Per-society asset selections — send as a single JSON blob to avoid
    // multipart bracket-key parsing issues with multer
    const assetsToSave = {};
    Object.entries(societyAssets).forEach(([societyId, data]) => {
      const assets = data?.selectedAssets || [];
      if (assets.length > 0) {
        assetsToSave[societyId] = assets;
        fd.append("society_ind_ids[]", societyId);

        // WhatsApp creative file upload
        if (data?.whatsappCreative instanceof File) {
          fd.append(`upload_societies_images_path[${societyId}]`, data.whatsappCreative);
        }
      }
    });
    if (Object.keys(assetsToSave).length > 0) {
      fd.append("society_assets_json", JSON.stringify(assetsToSave));
    }

    if (paymentData) {
      append("razorpay_payment_id", paymentData.razorpay_payment_id);
      append("razorpay_order_id", paymentData.razorpay_order_id);
      append("razorpay_signature", paymentData.razorpay_signature);
    }

    return fd;
  };

  const handleSaveDraft = async () => {
    setSubmitAttempted(true);
    if (!formData.campaignName || !formData.campaignDate) {
      toast.error("Please fill in Campaign Name and Date before saving.");
      return;
    }
    setSubmitLoading(true);
    try {
      await axiosInstance.post(api_routes.company.post_create_campaign, buildPayload("draft"));
      toast.success("Campaign saved as draft.");
      navigate("/company/campaign");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save draft.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async () => {
    if (totalCampaignAmount <= 0) {
      toast.error("Total campaign amount must be greater than zero.");
      return;
    }
    setSubmitLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay. Check your connection.");
        setSubmitLoading(false);
        return;
      }

      const { data: orderData } = await axiosInstance.post("/create-order", {
        amount: Math.round(totalCampaignAmount),
      });

      const userData = JSON.parse(localStorage.getItem("user_data") || "null");
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData?.amount,
        currency: orderData?.currency || "INR",
        name: "Adz10x",
        description: "Campaign payment",
        order_id: orderData?.id,
        prefill: {
          name: userData?.society_comany_name || userData?.name || "",
          email: userData?.email || "",
          contact: userData?.mobile_number || "",
        },
        handler: async (response) => {
          try {
            await axiosInstance.post("/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderData?.amount,
            });
            await axiosInstance.post(
              api_routes.company.post_create_campaign,
              buildPayload("pending", response)
            );
            toast.success("Campaign created and payment successful!");
            navigate("/company/campaign");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Payment verification failed.");
            setSubmitLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitLoading(false);
            toast.info("Payment cancelled. You can retry or save as draft.");
          },
        },
        theme: { color: "#00b294" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to start payment.");
      setSubmitLoading(false);
    }
  };

  if (step === "review") {
    return (
      <div className="pb-5">
        <div className="row g-0 justify-content-center">
          <ReviewScreen
            formData={formData}
            societyAssets={societyAssets}
            societies={societies}
            onGoBack={() => setStep("form")}
            onSaveDraft={handleSaveDraft}
            onPayNow={handlePayNow}
            submitLoading={submitLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5">
      <div className="row g-0">
        <Main
          setSocieties={setSocieties}
          societies={societies}
          societyAssets={societyAssets}
          setSocietyAssets={setSocietyAssets}
          formData={formData}
          setFormData={setFormData}
          setSocietyIds={setSocietyIds}
          setSelectedSocieties={setSelectedSocieties}
          mode={isEditMode ? "edit" : "create"}
          setLoadingSocities={setLoadingSocities}
          submitAttempted={submitAttempted}
        />
        <SocietyDetail
          societies={societies}
          societyAssets={societyAssets}
          setSocietyAssets={setSocietyAssets}
          loadingSocities={loadingSocities}
          onProceedToReview={() => {
            setSubmitAttempted(true);
            setStep("review");
          }}
        />
      </div>
    </div>
  );
};

export default AddCampaign;
