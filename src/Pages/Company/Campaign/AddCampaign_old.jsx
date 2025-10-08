import { useEffect, useState } from "react";
import SocietyDeatil from "../../../Components/Company/Campaign/SocietyDetail.jsx";
import Main from "../../../Components/Company/Campaign/AddCampaign/index.jsx";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCamapginAmount } from "../../../utils/getCamapginAmount.js";

const AddCampaign = () => {
  const { campaignId } = useParams();
  const isEditMode = Boolean(campaignId);
  const navigate = useNavigate();

  const [societies, setSocieties] = useState([]);
  const [loadingSocities, setLoadingSocities] = useState(false);
  const [selectedSocieties, setSelectedSocieties] = useState([]);
  const [campaignType, setCampaignType] = useState("");
  const [societyIds, setSocietyIds] = useState([]);
  const [campaignLogs, setCampaignLogs] = useState(null);
  const [missingSocietiesUploadErr, setMissingSocietiesUploadErr] = useState(
    []
  );

  const [formData, setFormData] = useState({
    campaignType: "",
    creativeType: "",
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
    radius_km: "",
    brand_promotions_creative: "",
    society_ids: [], // for when isChecked = true
    upload_creative_image_path: null, // for common image
    upload_creative_video_path: null, // for common image
    societies_text: null, //for common text
  });

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

            const societyIdsFromLogs =
              campaign_logs?.map((log) => log?.society_id) || [];

            const societiesTextObject = {};

            if (campaign?.brand_promotions_creative) {
              // Use common text for all societies
              const firstLog = campaign_logs?.[0];
              if (firstLog?.societies_text) {
                societiesTextObject["common"] = firstLog.societies_text;
              }
            } else {
              // Use individual society-specific text
              campaign_logs.forEach((log) => {
                societiesTextObject[log.society_id] = log.societies_text;
              });
            }

            setFormData({
              id: campaign?.id,
              campaignType: campaign?.campaign_type,
              creativeType: campaign?.creative_type,
              leadUrl: campaign.lead_generation_url || "",
              surveyUrl: campaign.survey_url || "",
              campaignName: campaign.campaign_name,
              campaignDate: campaign.campaign_date,
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
              society_ids: societyIdsFromLogs,
              societies_text: societiesTextObject, //  correctly structured
              ...campaign.upload_societies_files,
            });

            setSocietyIds(societyIdsFromLogs);

            // Avoid using `societies` directly if it causes re-renders
            const preSelected = (
              Array.isArray(societies) ? societies : []
            ).filter((s) =>
              societyIdsFromLogs.includes(Number(s?.society?.id))
            );
            setSelectedSocieties(preSelected);
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
    // console.log(campaignAmount);
    setFormData((prevData) => ({
      ...prevData,
      campaign_ads_amount: campaignAmount,
    }));
  }, [formData?.campaignType]);

  const buildFormData = (formData, status) => {
    const fd = new FormData();

    // Helper function to append data if it exists
    const appendIfExists = (key, value) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    };

    if (!isEditMode) {
      if (formData?.brand_promotions_creative) {
        if (
          formData?.creativeType === "image" &&
          !formData?.upload_creative_image_path
        ) {
          throw new Error("Please upload an image for the creative.");
        } else if (
          formData?.creativeType === "video" &&
          !formData?.upload_creative_video_path
        ) {
          throw new Error("Please upload a video for the creative.");
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
            return;
            // throw new Error(
            //   `Please upload at least one file (image or video) for each selected society. Missing societies: ${ids.join(
            //     ", "
            //   )}`
            // );
          }
        }
      }
    }

    appendIfExists("campaign_name", formData?.campaignName);
    appendIfExists("campaign_type", formData?.campaignType);
    appendIfExists("creative_type", formData?.creativeType);
    appendIfExists("campaign_date", formData?.campaignDate);
    appendIfExists("campaign_city_id", formData?.campaign_city_id);
    appendIfExists("campaign_area_id", formData?.campaign_area_id);
    appendIfExists("campaign_status", status);
    appendIfExists("campaign_amount", formData?.campaign_amount);
    appendIfExists("campaign_ads_amount", formData?.campaign_ads_amount);

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
        if (
          typeof formData.societies_text === "object" &&
          formData.societies_text.common
        ) {
          const societyIds = [];
          selectedSocieties.forEach((society) => {
            const id = society?.society?.id;
            if (id) {
              societyIds.push(id);
            }
          });
          // console.log(societyIds);

          setFormData((prev) => ({
            ...prev,
            society_ids: societyIds,
          }));

          appendIfExists("societies_text[]", formData.societies_text.common);
        }
      }
    } else {
      // Handle individual society images when brand_promotions_creative is false
      if (formData?.creativeType !== "text") {
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
        alert("");
        Object.entries(formData.societies_text).forEach(([id, text]) => {
          fd.append(`societies_text[${id}]`, text);
        });
      }
    }

    return fd;
  };

  const handleCreateCampaign = async (status, amount) => {
    try {
      const payload = buildFormData(formData, status, amount);

      const res = await axiosInstance.post(
        api_routes.company.post_create_campaign,
        payload
      );

      if (status === "draft")
        toast.success("Campaign Saved to Draft Successfully.");
      else toast.success(res.data.message);

      navigate("/company/campaign");
    } catch (error) {
      console.error(error.message);
      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Failed to create campaign."
      );
    }
  };

  return (
    <div className="pb-5">
      <div className="row g-0">
        <Main
          setSocieties={setSocieties}
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
        />
      </div>
    </div>
  );
};

export default AddCampaign;
