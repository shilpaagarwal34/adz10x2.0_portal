import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import ApprovedDetail from "../../../../Components/Society/Advertisement/Approved/ApprovedDetail.jsx";
import SocietyDetails from "../../../../Components/Admin/Campaigns/View/SocietyDetails.jsx";
import AdvertisementDetails from "../../../../Components/Admin/Campaigns/View/AdvertisementDetails.jsx";
import { fetchAdByID } from "../../../../store/Actions/Admin/Campaigns/CampaignActions.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes, { base_url } from "../../../../config/api.js";
import { toast } from "react-toastify";
import LiveCampaignForm from "../../../../Components/Admin/Campaigns/View/LiveCampaignForm.jsx";
import ApprovedCampaiignForm from "../../../../Components/Admin/Campaigns/View/ApprovedCampaiignForm.jsx";
import LiveCardSkeleton from "../../../../Components/Skeletons/Campaign/LiveCardSkeleton.jsx";
import ApprovedCardSkeleton from "../../../../Components/Skeletons/Campaign/ApprovedCardSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../../Components/Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import SocietyDetailsSkeleton from "../../../../Components/Skeletons/Campaign/SocietyDetailsSkeleton.jsx";
import AdsApprovedRejectBySkeleton from "../../../../Components/Skeletons/AdsApprovedRejectBySkeleton.jsx";

const LiveApprovedView = () => {
  const { id } = useParams(); // Get Campaign ID from URL
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState({
    society: null,
    company: null,
    campaign: null,
    logs: null,
    advertisement: null,
  });

  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image path
  const [errors, setErrors] = useState({});

  const [uploading, setUploading] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    campaign_log_id: null,
    society_id: null,
    company_id: null,
    campaign_id: null,
    no_view: "",
    no_reactions: "",
    viewScreenshot: null,
    reactionScreenshot: null,
    after24Screenshot: null,
    view_to_company: false,
    performance_remark: null,
  });

  useEffect(() => {
    const getCampaignData = async () => {
      setLoading(true);

      try {
        const res = await fetchAdByID({ campaignLogId: id });
        const {
          society,
          company,
          campaign_logs: logs,
          campaign,
          advertisement,
        } = res?.data;

        setCampaignData({
          society,
          company,
          campaign,
          logs,
          advertisement,
        });

        setFormData((prev) => ({
          ...prev,
          campaign_id: campaign?.id || "",
          campaign_log_id: id || "",
          society_id: society?.id || "",
          company_id: company?.id || "",
        }));
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error(error?.message || error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [id]);

  useEffect(() => {
    const advertisement = campaignData?.advertisement;

    if (advertisement && advertisement?.upload_ads_src_path) {
      const uploadedImagePath = `${base_url}/${advertisement.upload_ads_src_path}`;
      setUploadedImage(uploadedImagePath);

      setFormData((prev) => ({
        ...prev,
        id: advertisement?.id,
        viewPreviewUrl: advertisement?.upload_view_src_path
          ? `${base_url}/${advertisement.upload_view_src_path}`
          : "",
        reactionPreviewUrl: advertisement?.upload_reaction_src_path
          ? `${base_url}/${advertisement.upload_reaction_src_path}`
          : "",
        after24PreviewUrl: advertisement?.upload_after_24_ads_src_path
          ? `${base_url}/${advertisement.upload_after_24_ads_src_path}`
          : "",
        ...advertisement,
      }));
    }
  }, [campaignData?.advertisement]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    setUploading(true);

    const formData = new FormData();

    if (campaignData?.advertisement) {
      formData.append("id", campaignData?.advertisement?.id);
    }

    formData.append("upload_ads_src_path", file);
    formData.append("campaign_id", campaignData?.campaign?.id);
    formData.append("campaign_log_id", id);
    formData.append("society_id", campaignData?.society?.id);
    formData.append("company_id", campaignData?.company?.id);
    formData.append("live", "live");

    try {
      // Make the POST request to the API
      const response = await axiosInstance.post(
        `${api_routes.admin.post_live_campaign}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Report Submitted Successfully!");
        // setFile(null); // Clear the file after successful upload
      }
    } catch (err) {
      // setError("An error occurred while uploading the file.");
      console.log(err);
    } finally {
      setUploading(false); // Stop the loading spinner
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.no_view) {
      newErrors.no_view = "No. of View is required.";
    } else if (!/^\d+$/.test(formData.no_view)) {
      newErrors.no_view = "No. of View must be a valid number.";
    }

    if (!formData.no_reactions) {
      newErrors.no_reactions = "No. of Reaction is required.";
    } else if (!/^\d+$/.test(formData.no_reactions)) {
      newErrors.no_reactions = "No. of Reaction must be a valid number.";
    }

    // console.log(formData);

    if (!formData?.viewPreviewUrl)
      newErrors.viewScreenshot = "Screenshot required.";

    if (!formData?.reactionPreviewUrl)
      newErrors.reactionScreenshot = "Screenshot required.";

    if (!formData?.after24PreviewUrl)
      newErrors.after24Screenshot = "Screenshot required.";

    // console.log(formData);

    return newErrors;
  };

  const approveFormSubmit = async (e, shareToCompany = false) => {
    e.preventDefault();

    if (!shareToCompany) {
      setSaveLoader(true);
    }

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formToSend = new FormData();

    // Append each field
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formToSend.append(key, value); // file
      } else if (typeof value !== "undefined" && value !== null) {
        formToSend.append(key, value); // other values (string, number, boolean)
      }
    });

    setErrors({}); // Clear any previous errors

    // If campaignData has ad ID and formData doesn't have id
    if (campaignData?.advertisement && !formData?.id) {
      formToSend.append("id", campaignData.advertisement.id);
    }

    // Completion is now time-driven from live_end_date; do not force it via report submit.

    for (let [key, val] of formToSend.entries()) {
      console.log(`${key}:`, val instanceof File ? val.name : val);
    }

    if (shareToCompany) setUploading(true);

    try {
      // Make the POST request to the API
      const response = await axiosInstance.post(
        `${api_routes.admin.post_live_campaign}`,
        formToSend
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        // if (shareToCompany) {
        // navigate(-1);
        // }
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setUploading(false); // Stop the loading spinner
      setSaveLoader(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <>
              <LiveCardSkeleton />
              <ApprovedCardSkeleton />
            </>
          ) : (
            <>
              <LiveCampaignForm
                handleSubmit={handleSubmit}
                file={file}
                setFile={setFile}
                uploading={uploading}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                campaignData={campaignData?.logs}
                campaign={campaignData?.campaign}
              />
              <ApprovedCampaiignForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={approveFormSubmit}
                errors={errors}
                uploading={uploading}
                saveLoader={saveLoader}
                advertisement={campaignData?.advertisement}
              />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {loading ? (
            <SocietyDetailsSkeleton />
          ) : (
            <SocietyDetails id={id} society={campaignData?.society} />
          )}
          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <AdvertisementDetails
              campaign={campaignData?.campaign}
              company={campaignData?.company}
              campaignAmount={campaignData?.logs?.campaign_ads_amount}
            />
          )}
          {loading ? (
            <AdsApprovedRejectBySkeleton />
          ) : (
            <ApprovedDetail data={campaignData?.logs} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveApprovedView;
