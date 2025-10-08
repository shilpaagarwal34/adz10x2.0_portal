import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import AdvDetails from "../AdvDetail";
import { useParams } from "react-router-dom";
import { fetchAdvertisementForCompany } from "../../../../store/Actions/Company/Campaign/CampaignActions";
import { toast } from "react-toastify";
import { base_url } from "../../../../config/api";
import { useAdsModal } from "../../../../Context/AdsModalContext";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton";
import ManagerInfo from "../../../Common/Manager-info";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton";
import ApprovedDetail from "../../../Society/Advertisement/Approved/ApprovedDetail";

const CancelAdvView = () => {
  const { advertisementId } = useParams();

  const [loading, setLoading] = useState(false);

  const { openAdsModal } = useAdsModal();

  const [campaignData, setCampaignData] = useState({
    campaign_logs: null,
    campaign: null,
    society: null,
    company: null,
    advertisement: null,
    rel_managers: null,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetchAdvertisementForCompany(advertisementId);
        // console.log(res);
        setCampaignData(res);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [advertisementId]);

  return (
    <>
      <div className="row g-0 pb-5" style={{ backgroundColor: "#f7f7fe" }}>
        <div className="col-12 col-lg-8 p-2 p-lg-3">
          {loading ? (
            <LiveCardSkeleton />
          ) : (
            <div className="card border-0">
              <Row className=" px-3 pt-3 pb-2">
                <Col>
                  <h6 className="fw-bold">Advertisement Details</h6>
                </Col>
                <Col className="text-end">
                  <span className="fw-bold custom-label">ID #{campaignData?.campaign_logs?.id_prifix_campaign_ads}</span>{" "}
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
                        data={campaignData?.campaign_logs}
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
                            campaignData?.campaign_logs
                              ?.upload_societies_images_path,
                            campaignData?.campaign?.creative_type,
                            campaignData?.societies_text
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
                      Advertisement Cancellation Details
                    </h6>
                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Cancelled by
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.campaign_logs?.modified_by_name}
                        </p>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Reason
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.campaign_logs?.cancel_reason}
                        </p>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="custom-label fw-bold mb-1">
                          Date & Time
                        </Form.Label>
                        <p style={{ fontSize: "12px" }}>
                          {campaignData?.campaign_logs?.updatedAtFormatted}
                        </p>
                      </Form.Group>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>

        <div className="col-12 col-lg-4 px-1 px-lg-0">
          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            <ManagerInfo relationship_manager={campaignData?.rel_managers} />
          )}

          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <AdvDetails
              campaignData={campaignData?.campaign}
              campaignAdAmount={
                campaignData?.campaign_logs?.campaign_ads_amount
              }
              society={campaignData?.society}
            />
          )}

          {loading ? (
            <AdsApprovedRejectBySkeleton />
          ) : (
            <ApprovedDetail data={campaignData?.campaign_logs} />
          )}
        </div>
      </div>
    </>
  );
};

export default CancelAdvView;
