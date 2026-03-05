import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import Details from "../Adv-details.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdByID } from "../../../../store/Actions/Society/Campaign/CampaignActions.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes from "../../../../config/api.js";
import { toast } from "react-toastify";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import ApprovedDetail from "../Approved/ApprovedDetail.jsx";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import DownloadImageBtn from "../../../Common/Campaign/DownloadImageBtn.jsx";

const PendingView = () => {
  const { advertisementId } = useParams();
  const [loading, setLoading] = useState(false);
  const [advertisementData, setAdvertisementData] = useState(null);
  const { openAdsModal } = useAdsModal();
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: advertisementId,
    society_approved_status: "",
    timeSlot: "",
    society_cancel_reason: "",
  });

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch advertisement data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await fetchAdByID({ id: advertisementId });
        setAdvertisementData(data);
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [advertisementId]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData?.society_approved_status) {
      toast.error("Please Select Status.");
      return;
    }

    const updatedFormData = {
      ...formData,
      slot_start_time: null,
      slot_end_time: null,
    };

    setSubmit(true);
    try {
      const response = await axiosInstance.post(
        `${api_routes.society.post_pending_ad_status}`,
        updatedFormData
      );

      toast.success(response?.data?.message);
      // console.log("Submitted", response);
      navigate(-1);
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      const apiError = error?.response?.data?.error;
      const fallback = error?.message || "Error submitting";
      toast.error(apiMessage ? `${apiMessage}${apiError ? `: ${apiError}` : ""}` : fallback);
      // console.error("Error submitting", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="row g-0" style={{ backgroundColor: "#f7f7fe" }}>
      <div className="col-12 col-lg-8 p-3">
        <div className="card border-0">
          <Row className="px-3 pt-3 pb-2">
            <Col>
              <h6 className="fw-bold">Advertisement Details</h6>
            </Col>
            <Col className="text-end">
              <span className="fw-bold custom-label">
                ID #{advertisementData?.campaign_logs?.id_prifix_campaign_ads}
              </span>{" "}
              <Badge
                bg="warning"
                className="ms-4 rounded-4"
                style={{ fontSize: "10px", padding: "5px 12px" }}
              >
                STATUS - PENDING
              </Badge>
            </Col>
          </Row>
          <hr className="m-0" style={{ color: "gray" }} />

          <Row className="p-3 ">
            <Col md={6} className="p-0">
              <Card className="px-2 py-1 border-0 position-relative">
                <div className="position-relative">
                  <CreativeTypeRender
                    data={advertisementData?.campaign_logs}
                    type={advertisementData?.campaign?.creative_type}
                  />

                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 end-0 m-2"
                    style={{
                      zIndex: 2,
                      fontSize: "12px",
                      padding: "2px 13px",
                    }}
                    onClick={() =>
                      openAdsModal(
                        advertisementData?.campaign_logs
                          ?.upload_societies_images_path,
                        advertisementData?.campaign?.creative_type,
                        advertisementData?.campaign_logs?.societies_text,
                        advertisementData?.campaign?.media_type
                      )
                    }
                  >
                    <img src="/eye.svg" className="me-1" /> Preview Ads
                  </Button>
                  {advertisementData?.campaign?.creative_type === "image" && (
                    <DownloadImageBtn
                      path={
                        advertisementData?.campaign_logs
                          ?.upload_societies_images_path
                      }
                    />
                  )}
                </div>
              </Card>
              <div className="px-2">
                {advertisementData?.campaign?.lead_generation_url && (
                  <div className="mb-3">
                    <p className="m-0 fw-bold">Lead Generation URL</p>
                    <a
                      target="_blank"
                      href={advertisementData?.campaign?.lead_generation_url}
                    >
                      {advertisementData?.campaign?.lead_generation_url}
                    </a>
                  </div>
                )}

                {advertisementData?.campaign?.survey_url && (
                  <div className="mb-3">
                    <p className="m-0 fw-bold">Survey URL</p>
                    <a
                      target="_blank"
                      href={advertisementData?.campaign?.survey_url}
                    >
                      {advertisementData?.campaign?.survey_url}
                    </a>
                  </div>
                )}
              </div>
            </Col>

            <Col md={6} className="p-0">
              <Card className="py-1 px-3 border-0">
                <h6 className="fw-bold">Advertisement Action</h6>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Label className="custom-label fw-bold mb-1">
                      Status
                    </Form.Label>
                    <Form.Select
                      name="society_approved_status"
                      value={formData.society_approved_status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="approved">Approved</option>
                      <option value="reject">Rejected</option>
                    </Form.Select>
                  </Form.Group>

                  {formData.society_approved_status === "reject" && (
                    <Form.Group className="mb-2">
                      <Form.Label>Cancel Reason</Form.Label>
                      <Form.Select
                        name="society_cancel_reason"
                        onChange={handleChange}
                        value={formData.society_cancel_reason}
                      >
                        <option>Select Reason</option>
                        {/* Your reasons here */}
                      </Form.Select>
                    </Form.Group>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      (!formData?.society_approved_status &&
                        !formData?.society_cancel_reason) ||
                      submit
                    }
                    style={{
                      backgroundColor: submit
                        ? "#rgba(183, 183, 183, 1)"
                        : "#019F88",
                      color: "white",
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "120px",
                      fontSize: "12px",
                      display: "inline-block",
                    }}
                  >
                    SUBMIT
                  </Button>
                </Form>

                <Card className="border-0 mt-3">
                  <h6 className="fw-bold m-0 custom-label">Note:</h6>
                  <p className="custom-label custom-label">
                    Ensure all guidelines are met, including content, format,
                    and visual clarity. Approve the ad if everything is in
                    place.
                  </p>
                </Card>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="rounded col-lg-4 col-12 p-3">
        {loading ? (
          <ManagerInfoSkeleton />
        ) : (
          <ManagerInfo relationship_manager={advertisementData?.rel_managers} />
        )}

        {loading ? (
          <CampaignDetailsSkeleton />
        ) : (
          <Details
            company={advertisementData?.company}
            campaignDetails={advertisementData?.campaign}
            logDetails={advertisementData?.campaign_logs}
          />
        )}

        {loading ? (
          <AdsApprovedRejectBySkeleton />
        ) : (
          <ApprovedDetail data={advertisementData?.campaign_logs} />
        )}
      </div>
    </div>
  );
};

export default PendingView;
