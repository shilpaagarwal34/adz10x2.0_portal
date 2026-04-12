import { useEffect, useState, useCallback, useMemo } from "react";
import SocietyDeatil from "../../../Components/Company/Campaign/SocietyDetail.jsx";
import Main from "../../../Components/Company/Campaign/AddCampaign/index.jsx";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCamapginAmount } from "../../../utils/getCamapginAmount.js";
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const AddCampaign = () => {
  const { campaignId } = useParams();
  const isEditMode = Boolean(campaignId);
  const navigate = useNavigate();

  const [societies, setSocieties] = useState([]);
  const [campaign, setCampaign] = useState({});
  const [loadingSocities, setLoadingSocities] = useState(false);
  const [selectedSocieties, setSelectedSocieties] = useState([]);
  const [campaignType, setCampaignType] = useState("");
  const [societyIds, setSocietyIds] = useState([]);
  const [campaignLogs, setCampaignLogs] = useState(null);
  const [missingSocietiesUploadErr, setMissingSocietiesUploadErr] = useState(
    []
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [formData, setFormData] = useState({
    campaignType: "brand_promotion", // fixed for platform-based campaigns
    creativeType: "image", // default; creative type selection removed from form
    leadUrl: "",
    surveyUrl: "",
    campaignName: "",
    campaignDate: "",
    campaign_ads_amount: "",
    campaign_amount: "",
    day: "",
    search_by_google_location: null,
    campaign_city_id: null,
    campaign_area_id: null,
    campaign_address: "",
    my_ads_location_latitude: null,
    my_ads_location_longitude: null,
    radius_km: "1",
    media_type: "",
    brand_promotions_creative: "",
    society_ids: [],
    upload_creative_image_path: null,
    upload_creative_video_path: null,
    societies_text: { common: "" },
  });

  useEffect(() => {
    if (
      Array.isArray(formData?.society_ids) &&
      formData.society_ids.length > 0
    ) {
      setSocietyIds(formData.society_ids);
    }
  }, [formData?.society_ids]);

  // for edit fetch initial Data if has id and isEditMode is true
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const typeResponse = await axiosInstance.get(
          api_routes.company.get_campaign_type
        );
        const freshCampaignType = typeResponse?.data?.data;
        setCampaignType(freshCampaignType); // this updates the state for later use

        if (isEditMode) {
          const campaignResponse = await axiosInstance.get(
            `${api_routes.company.get_campaign}/${campaignId}`
          );

          if (campaignResponse?.data?.data) {
            const { campaign, campaign_logs } = campaignResponse.data.data;
            setCampaignLogs(campaign_logs); // Set campaign logs here
            setCampaign(campaign);

            const societyIdsFromLogs =
              campaign_logs?.map((log) => Number(log?.society_id)) || [];

            setSocietyIds(societyIdsFromLogs); // ✅ MUST happen before SocietyDeatil renders

            const societiesTextObject = {};

            if (campaign?.brand_promotions_creative) {
              // Use common text for all societies
              const firstLog = campaign_logs?.[0];

              societiesTextObject["common"] = firstLog?.societies_text || "";
            } else {
              // Use individual society-specific text
              campaign_logs.forEach((log) => {
                societiesTextObject[log.society_id] = log.societies_text;
              });
            }

            const uploadSocietiesImagesPath = {};
            campaign_logs.forEach((log) => {
              if (log.upload_societies_images_path) {
                uploadSocietiesImagesPath[
                  `upload_societies_images_path[${log.society_id}]`
                ] = log.upload_societies_images_path;
              }
            });

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const endDate = new Date(campaign.campaign_date.split(" - ")[1]);
            endDate.setHours(0, 0, 0, 0);

            const isFutureOrToday = endDate >= today; // true if today or future, false if past
            const campaignDate = ((d) =>
              `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
                2,
                "0"
              )}-${String(d.getDate()).padStart(2, "0")}`)(
              isFutureOrToday ? endDate : today
            );

            setFormData((prev) => ({
              ...prev,
              id: campaign?.id,
              campaignType: campaign?.campaign_type,
              creativeType: campaign?.creative_type,
              leadUrl: campaign.lead_generation_url || "",
              surveyUrl: campaign.survey_url || "",
              campaignName: campaign.campaign_name,
              campaignDate: campaignDate,
              media_type: campaign.media_type || "",
              campaign_ads_amount: campaign.campaign_ads_amount,
              campaign_amount: campaign?.campaign_amount,
              search_by_google_location:
                campaign.search_by_google_location || null,
              campaign_city_id: campaign.campaign_city_id,
              campaign_area_id: campaign.campaign_area_id,
              campaign_address: campaign.campaign_address || null,
              my_ads_location_latitude:
                campaign.my_ads_location_latitude || null,
              my_ads_location_longitude:
                campaign.my_ads_location_longitude || null,
              radius_km: campaign.radius_km || null,
              brand_promotions_creative: campaign?.brand_promotions_creative,
              society_ids: isFutureOrToday ? societyIdsFromLogs : [],
              ...campaign.upload_societies_files,
              ...uploadSocietiesImagesPath,
              societies_text: societiesTextObject, //  correctly structured
            }));
          }
        }
      } catch (error) {
        toast.error("Failed to fetch initial data.");
        console.error("Initial data fetch error:", error);
      }
    };

    fetchInitialData();
  }, [isEditMode, campaignId]);

  // based on campaign Type fetch campaign ads amount
  useEffect(() => {
    const campaignAmount = getCamapginAmount(formData, campaignType);

    setFormData((prevData) => {
      const updated = {
        ...prevData,
        campaign_ads_amount: campaignAmount,
      };

      // Only preserve society_ids if already available
      if (prevData.society_ids && prevData.society_ids.length > 0) {
        updated.society_ids = prevData.society_ids;
      }

      return updated;
    });
  }, [formData?.media_type]);

  const buildFormData = (formData, status, paymentData) => {
    const fd = new FormData();

    // Helper function to append data if it exists
    const appendIfExists = (key, value) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    };

    if (
      formData?.brand_promotions_creative &&
      (formData?.creativeType === "video" || formData?.creativeType === "image")
    ) {
      const missingUploads = selectedSocieties.filter(({ society }) => {
        const id = society.id;

        // Global keys
        const globalImageKey = `upload_creative_image_path`;
        const globalVideoKey = `upload_creative_video_path`;

        // Per-society image key
        const societyImageKey = `upload_societies_images_path[${id}]`;

        const hasGlobalImage = Boolean(formData[globalImageKey]);
        const hasGlobalVideo = Boolean(formData[globalVideoKey]);
        const hasSocietyImage = Boolean(formData[societyImageKey]);

        // Check: must have either global image/video OR per-society image
        return !(hasGlobalImage || hasGlobalVideo || hasSocietyImage);
      });

      console.log("Missing Uploads:", missingUploads);

      if (missingUploads.length > 0) {
        const ids = missingUploads.map(({ society }) => society.id);
        setMissingSocietiesUploadErr(ids);
        // return;
        throw new Error(
          `Please upload at least one file (image or video) for the creative.`
        );
      }
    } else {
      // 1) Identify which societies are missing uploads: for imagwe and videos
      if (
        formData?.creativeType === "video" ||
        formData?.creativeType === "image"
      ) {
        const missingUploads = selectedSocieties.filter(({ society }) => {
          const id = society.id;
          const imageKey = `upload_societies_images_path[${id}]`;
          const videoKey = `upload_societies_videos_path[${id}]`;

          const hasImage = Boolean(formData[imageKey]);
          const hasVideo = Boolean(formData[videoKey]);

          // change this line if you want "must have both" vs "either/or"
          return !(hasImage || hasVideo);
        });

        // 2) Throw if any are missing:
        if (missingUploads.length > 0) {
          const ids = missingUploads.map(({ society }) => society.id);
          setMissingSocietiesUploadErr(ids);
          // return;
          throw new Error(
            `Please upload at least one file (image or video) for each selected society.`
          );
        }
      }
    }

    appendIfExists("campaign_name", formData?.campaignName);
    appendIfExists("campaign_type", formData?.campaignType);
    appendIfExists("media_type", formData?.media_type);
    appendIfExists("creative_type", formData?.creativeType);
    appendIfExists("campaign_date", formData?.campaignDate);
    appendIfExists("campaign_city_id", formData?.campaign_city_id);
    appendIfExists("campaign_area_id", formData?.campaign_area_id);
    appendIfExists("campaign_status", status);
    appendIfExists("campaign_amount", formData?.campaign_amount);
    appendIfExists("campaign_ads_amount", formData?.campaign_ads_amount);
    // appendIfExists("society_ind_ids", formData?.society_ids);

    formData?.society_ids?.forEach((id) => {
      fd.append("society_ind_ids[]", id);
    });

    // Default empty/null handling for optional fields
    appendIfExists(
      "brand_promotions_creative",
      formData?.brand_promotions_creative || false
    );

    appendIfExists(
      "search_by_google_location",
      formData?.search_by_google_location || null
    );
    appendIfExists("campaign_address", formData?.campaign_address || null);
    appendIfExists("id", formData?.id);

    // Type-specific fields
    if (formData?.campaignType === "lead_generation") {
      appendIfExists("lead_generation_url", formData?.leadUrl);
    } else if (formData?.campaignType === "survey") {
      appendIfExists("survey_url", formData?.surveyUrl);
    }

    // Location
    if (
      formData?.my_ads_location_latitude &&
      formData?.my_ads_location_longitude
    ) {
      appendIfExists(
        "my_ads_location_latitude",
        formData.my_ads_location_latitude
      );
      appendIfExists(
        "my_ads_location_longitude",
        formData.my_ads_location_longitude
      );
      appendIfExists("radius_km", formData?.radius_km || null); // Ensure fallback if radius is missing
    }

    // Creative handling
    if (formData?.brand_promotions_creative) {
      formData?.society_ids?.forEach((id) => {
        fd.append("society_ids[]", id);
      });

      if (formData?.creativeType === "image") {
        appendIfExists(
          "upload_creative_image_path",
          formData?.upload_creative_image_path
        );
      } else if (formData?.creativeType === "video") {
        appendIfExists(
          "upload_creative_video_path",
          formData?.upload_creative_video_path
        );
      } else if (formData?.creativeType === "text") {
        if (typeof formData.societies_text === "object") {
          setMissingSocietiesUploadErr([]);

          const societyIds = [];
          selectedSocieties.forEach((society) => {
            const id = society?.society?.id;
            if (id) {
              societyIds.push(id);
            }
          });

          setFormData((prev) => ({
            ...prev,
            society_ids: societyIds,
          }));

          const commonText = formData?.societies_text?.common;

          if (commonText?.trim()) {
            appendIfExists("societies_text[]", commonText);
            setMissingSocietiesUploadErr([]); // clear error
          } else {
            setMissingSocietiesUploadErr(["1"]); // mark all selected societies as missing
            throw new Error("Please Fill the required Fields.");
          }

          // appendIfExists("societies_text[]", formData.societies_text.common);
        }
      }
    } else {
      // Handle individual society images when brand_promotions_creative is false
      if (formData?.creativeType !== "text") {
        console.log(formData);
        Object.entries(formData).forEach(([key, value]) => {
          if (
            key.startsWith("upload_societies_images_path[") ||
            key.startsWith("upload_societies_videos_path[")
          ) {
            appendIfExists(key, value); // Only append non-null values for images/videos
          }
        });
      }

      if (
        typeof formData.societies_text === "object" &&
        formData?.creativeType === "text"
      ) {
        const missingSocieties = [];

        setMissingSocietiesUploadErr([]);

        delete formData?.societies_text?.common;

        Object.entries(formData.societies_text).forEach(([id, text]) => {
          // fd.append(`societies_text[${id}]`, text);
          if (text?.trim()) {
            fd.append(`societies_text[${id}]`, text);
          } else {
            missingSocieties.push(Number(id));
          }
        });
        if (missingSocieties.length > 0) {
          setMissingSocietiesUploadErr(missingSocieties);
          throw new Error("Please fill the required Fields");
        }
      }
    }

    if (paymentData) {
      appendIfExists("razorpay_payment_id", paymentData.razorpay_payment_id);
      appendIfExists("razorpay_order_id", paymentData.razorpay_order_id);
      appendIfExists("razorpay_signature", paymentData.razorpay_signature);
    }

    return fd;
  };

  const handleCreateCampaign = async (status, amount, setSubmit, paymentData = null) => {
    const token = localStorage.getItem("auth_token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");
    const isCompanyUser =
      userData?.user_type === "Company_Admin" ||
      userData?.user_type === "Company_User";

    if (!token || !isCompanyUser) {
      toast.info("Please sign in to start a campaign.");
      navigate("/login");
      setSubmit(false);
      return;
    }

    try {
      const payload = buildFormData(formData, status, paymentData);

      const res = await axiosInstance.post(
        api_routes.company.post_create_campaign,
        payload
      );

      if (status === "draft")
        toast.success("Campaign Saved to Draft Successfully.");
      else toast.success(res.data.message);

      navigate("/company/campaign");
    } catch (error) {
      // console.error(error.message);
      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Failed to create campaign."
      );
    } finally {
      setSubmit(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayAndCreateCampaign = async (setSubmit) => {
    const amount = Number(formData?.campaign_amount || 0);
    if (!amount || amount <= 0) {
      toast.error("Campaign amount must be greater than zero.");
      setSubmit(false);
      return;
    }

    if (!Array.isArray(formData?.society_ids) || formData.society_ids.length === 0) {
      toast.error("Please select at least one society.");
      setSubmit(false);
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Check your connection.");
        setSubmit(false);
        return;
      }

      const { data: orderData } = await axiosInstance.post("/create-order", {
        amount: Math.round(amount),
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

            await handleCreateCampaign("pending", amount, setSubmit, response);
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Payment verification failed."
            );
            setSubmit(false);
          }
        },
        modal: {
          ondismiss: () => setSubmit(false),
        },
        theme: {
          color: "#00b294",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to start payment.");
      setSubmit(false);
    }
  };

  return (
    <div className="pb-5">
      <div className="row g-0">
        <Main
          setSocieties={setSocieties}
          societyIds={societyIds}
          selectedSocieties={selectedSocieties}
          setSelectedSocieties={setSelectedSocieties}
          formData={formData}
          setFormData={setFormData}
          setSocietyIds={setSocietyIds}
          mode={isEditMode ? "edit" : "create"}
          campaignLogs={campaignLogs}
          missingSocietiesUploadErr={missingSocietiesUploadErr}
          setMissingSocietiesUploadErr={setMissingSocietiesUploadErr}
          setLoadingSocities={setLoadingSocities}
          submitAttempted={submitAttempted}
        />
        <SocietyDeatil
          societyIds={societyIds}
          setSocietyIds={setSocietyIds}
          societies={societies}
          handleCreateCampaign={handleCreateCampaign}
          selectedSocieties={selectedSocieties}
          setSelectedSocieties={setSelectedSocieties}
          formData={formData}
          campaignType={campaignType}
          mode={isEditMode ? "edit" : "create"}
          setFormData={setFormData}
          loadingSocities={loadingSocities}
          setSubmitAttempted={setSubmitAttempted}
          handlePayAndCreateCampaign={handlePayAndCreateCampaign}
        />
      </div>
    </div>
  );
};

export default AddCampaign;
