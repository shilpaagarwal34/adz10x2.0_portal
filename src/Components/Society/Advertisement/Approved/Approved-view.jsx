import { Row, Col, Badge } from "react-bootstrap";
import Details from "../Adv-details.jsx";
import LiveCampaignForm from "../Live/LiveCampaignForm.jsx";
import ApprovedCampaignForm from "./ApprovedCampaignForm.jsx";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchAdByID } from "../../../../store/Actions/Society/Campaign/CampaignActions.js";
import api_routes, { base_url } from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton.jsx";
import ApprovedCardSkeleton from "../../../Skeletons/Campaign/ApprovedCardSkeleton.jsx";
import { formatToTitleCase } from "../../../../helper/helper.js";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import ApprovedDetail from "./ApprovedDetail.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton.jsx";

const ApprovedView = () => {
  const { advertisementId } = useParams();
  const location = useLocation();

  // Get the status from the query string
  const queryParams = new URLSearchParams(location.search);
  const campaignStatus = queryParams.get("status");
  const [showLiveForm, setShowLiveForm] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showApprovedForm, setShowApprovedForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image path

  const [campaignData, setCampaignData] = useState({
    society: null,
    campaign: null,
    logs: null,
    advertisement: null,
    society_profile: null,
    company: null,
    rel_managers: null,
  });

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
        const res = await fetchAdByID({ id: advertisementId });
        const {
          society,
          campaign_logs: logs,
          campaign,
          advertisement,
          society_profile,
          company,
          rel_managers,
        } = res?.data;

        setCampaignData({
          society,
          campaign,
          logs,
          advertisement,
          society_profile,
          company,
          rel_managers,
        });

        setFormData((prev) => ({
          ...prev,
          campaign_id: campaign?.id || "",
          campaign_log_id: advertisementId || "",
          society_id: society?.id || "",
          // company_id: company?.id || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [advertisementId]);

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

  const validateForm = () => {
    const newErrors = {};

    if (formData.no_view && !/^\d+$/.test(formData.no_view)) {
      newErrors.no_view = "No. of View must be a valid number.";
    }

    if (formData.no_reactions && !/^\d+$/.test(formData.no_reactions)) {
      newErrors.no_reactions = "No. of Reaction must be a valid number.";
    }

    return newErrors;
  };

  const approveFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear any previous errors
    setUploading(true);

    try {
      // Make the POST request to the API
      const response = await axiosInstance.post(
        `${api_routes.society.post_live_campaign_data}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Advertisement Report Updated Successfully!");
      }
    } catch (err) {
      // setError("An error occurred while uploading the file.");
      console.log(err);
      toast.error(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setUploading(false); // Stop the loading spinner
    }
  };

  useEffect(() => {
    const logs = campaignData?.logs;
    const now = new Date();
    // const now = new Date("2025-05-14T20:00:00+05:30");

    // Utility to construct a Date object from date string + time string
    function buildDateTime(dateStr, timeStr) {
      const [timeHours, timeMinutes, timeSeconds] = timeStr.split(":");
      const date = new Date(dateStr);
      date.setHours(
        Number(timeHours),
        Number(timeMinutes),
        Number(timeSeconds || 0),
        0
      );
      return date;
    }

    const liveStartDateTime =
      logs?.live_start_date && logs?.slot_start_time
        ? buildDateTime(logs.live_start_date, logs.slot_start_time)
        : null;

    // const liveEndDateTime =
    //   logs?.live_end_date && logs?.slot_end_time
    //     ? buildDateTime(logs.live_end_date, logs.slot_end_time)
    //     : null;

    const liveEndDateTime =
      logs?.live_end_date && logs?.slot_end_time
        ? new Date(
            buildDateTime(logs.live_end_date, logs.slot_end_time).getTime() -
              60 * 60 * 1000
          )
        : null;

    // const liveEndDateTime = new Date();

    // Show live form if now is between start and end time
    const liveFormStatus =
      liveStartDateTime && liveEndDateTime && now >= liveStartDateTime;

    // console.log(liveStartDateTime, liveEndDateTime);

    setShowLiveForm(liveFormStatus);

    // Show approved form if now is after the live end time
    const approvedFormStatus = liveEndDateTime && now >= liveEndDateTime;

    setShowApprovedForm(approvedFormStatus);

    // Check if after 24 hours, and disable button
    const isAfter24Hours = liveEndDateTime && now >= liveEndDateTime;
    setDisableButton(isAfter24Hours); // Set this state to disable the button

    // console.log(
    //   liveEndDateTime,
    //   liveFormStatus,
    //   approvedFormStatus,
    //   showApprovedForm
    // );
  }, [campaignData?.logs]);

  return (
    <>
      <div className="row g-0" style={{ backgroundColor: "#f7f7fe" }}>
        <div className="col-12 col-lg-8 p-3">
          <div className="card border-0">
            <Row className="px-3 pt-3 pb-2">
              <Col>
                <h6 className="fw-bold">Advertisement Details</h6>
              </Col>
              <Col className="text-end">
                <span className="fw-bold custom-label">
                  ID #{campaignData?.logs?.id_prifix_campaign_ads}
                </span>{" "}
                <Badge
                  bg="success"
                  className="ms-4 rounded-4"
                  style={{ fontSize: "10px", padding: "5px 12px" }}
                >
                  STATUS - {formatToTitleCase(campaignStatus || "")}
                </Badge>
              </Col>
            </Row>
            <hr className="m-0" style={{ color: "gray" }} />

            {/* {showLiveForm && ( */}
            {loading ? (
              <LiveCardSkeleton />
            ) : (
              <LiveCampaignForm
                campaignData={campaignData}
                advertisementId={advertisementId}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                disableButton={showLiveForm}
              />
            )}

            {loading ? (
              <ApprovedCardSkeleton />
            ) : (
              ["approved", "completed"].includes(campaignStatus) &&
              showApprovedForm && (
                <ApprovedCampaignForm
                  formData={formData}
                  uploading={uploading}
                  setFormData={setFormData}
                  handleSubmit={approveFormSubmit}
                  errors={errors}
                />
              )
            )}
          </div>
        </div>

        <div className="rounded col-lg-4 col-12 px-2 pb-4">
          {loading ? (
            <>
              <ManagerInfoSkeleton />
              <CampaignDetailsSkeleton />
              <AdsApprovedRejectBySkeleton />
            </>
          ) : (
            <>
              <ManagerInfo relationship_manager={campaignData?.rel_managers} />

              <Details
                company={campaignData?.company}
                campaignDetails={campaignData?.campaign}
                logDetails={campaignData?.logs}
              />

              <ApprovedDetail data={campaignData?.logs} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ApprovedView;
