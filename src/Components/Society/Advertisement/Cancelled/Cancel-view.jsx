import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import Details from "../Adv-details.jsx";
import { useParams } from "react-router-dom";
import { fetchAdByID } from "../../../../store/Actions/Society/Campaign/CampaignActions.js";
import { base_url } from "../../../../config/api.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import ApprovedDetail from "../Approved/ApprovedDetail.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton.jsx";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton.jsx";

const CancelView = () => {
  const { advertisementId } = useParams();

  const [loading, setLoading] = useState(false);

  const [campaignData, setCampaignData] = useState({
    society: null,
    campaign: null,
    logs: null,
    advertisement: null,
    society_profile: null,
    company: null,
    rel_managers: null,
  });

  const { openAdsModal } = useAdsModal();

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [advertisementId]);

  return (
    <>
      <div className="row g-0" style={{ backgroundColor: "#f7f7fe" }}>
        <div className="col-12 col-lg-8  p-3">
          {loading ? (
            <LiveCardSkeleton />
          ) : (
            <div className="card border-0">
              <Row className=" px-3 pt-3 pb-2">
                <Col>
                  <h6 className="fw-bold">Advertisement Details</h6>
                </Col>
                <Col className="text-end">
                  <span className="fw-bold custom-label">
                    ID #{campaignData?.logs?.id_prifix_campaign_ads}
                  </span>{" "}
                  <Badge
                    bg="danger"
                    className="ms-4 rounded-4"
                    style={{ fontSize: "10px", padding: "5px 12px" }}
                  >
                    STATUS - CANCELLED
                  </Badge>
                </Col>
              </Row>
              <hr className="m-0" style={{ color: "gray" }} />
              <Row className="p-3 ">
                <Col md={6} className="p-0">
                  <Card className="px-2 py-1 border-0 position-relative">
                    <div className="position-relative">
                      <CreativeTypeRender
                        type={campaignData?.campaign?.creative_type}
                        data={campaignData?.logs}
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
                            campaignData?.logs?.upload_societies_images_path,
                            campaignData?.campaign?.creative_type,
                            campaignData?.logs?.societies_text,
                            campaignData?.campaign?.media_type
                          )
                        }
                      >
                        <img src="/eye.svg" className="me-1" /> Preview Ads
                      </Button>
                    </div>
                  </Card>
                </Col>

                <Col md={6} className="p-0">
                  <Card className="py-1 px-3 border-0 ">
                    <h6 className="fw-bold mb-4">
                      Advertisement Report Details
                    </h6>
                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Cancelled by
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.logs?.modified_by_name}
                        </p>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Reason
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.logs?.admin_cancel_reason || "NA"}
                        </p>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Date & Time
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.logs?.updatedAtFormatted}
                        </p>
                      </Form.Group>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
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

export default CancelView;
