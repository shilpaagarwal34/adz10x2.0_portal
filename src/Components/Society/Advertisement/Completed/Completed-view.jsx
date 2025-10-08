import { useEffect, useState } from "react";

import { Row, Col, Card, Form, Button, Badge } from "react-bootstrap";

import Details from "../Adv-details.jsx";
import ApprovedDetail from "../Approved/ApprovedDetail.jsx";
import { fetchAdByID } from "../../../../store/Actions/Society/Campaign/CampaignActions.js";
import { useParams } from "react-router-dom";
import { base_url } from "../../../../config/api.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import ApprovedCardSkeleton from "../../../Skeletons/Campaign/ApprovedCardSkeleton.jsx";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton.jsx";

const imagePreviewCss = {
  width: "80%",
  height: "200px",
  cursor: "pointer",
  objectFit: "contain",
};

const CompletedView = () => {
  const { advertisementId } = useParams();
  const { openAdsModal, openSampleModal } = useAdsModal();
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
          <div className="card border-0">
            {loading ? (
              <LiveCardSkeleton />
            ) : (
              <>
                <Row className=" px-3 pt-3 pb-2">
                  <Col>
                    <h6 className="fw-bold">Advertisement Details</h6>
                  </Col>
                  <Col className="text-end">
                    <span className="fw-bold custom-label">
                      ID #{campaignData?.logs?.id_prifix_campaign_ads}
                    </span>{" "}
                    <Badge
                      bg="" // Removes Bootstrap's default background
                      className="ms-4 rounded-4"
                      style={{
                        backgroundColor: "#69C52B",
                        color: "white",
                        fontSize: "10px",
                        padding: "5px 12px",
                      }}
                    >
                      STATUS - COMPLETED
                    </Badge>
                  </Col>
                </Row>

                <hr className="m-0" style={{ color: "gray" }} />
                <Row className="p-3 ">
                  <Col md={6} className="p-0">
                    <Card className="px-2 py-1 border-0 position-relative">
                      <div className="position-relative">
                        <CreativeTypeRender
                          data={campaignData?.logs}
                          type={campaignData?.campaign?.creative_type}
                        />

                        {/* Preview Ads Button - Right Bottom */}
                        <Button
                          variant="dark"
                          className="position-absolute bottom-0 end-0 m-2"
                          style={{
                            zIndex: 2,
                            fontSize: "12px",
                            padding: "3px 13px",
                          }}
                          onClick={() =>
                            openAdsModal(
                              campaignData?.logs?.upload_societies_images_path,
                              campaignData?.campaign?.creative_type,
                              campaignData?.logs?.societies_text
                            )
                          }
                        >
                          <img src="/eye.svg" className="me-1" /> Preview Ads
                        </Button>
                      </div>
                    </Card>
                  </Col>

                  <Col md={6} className="p-0">
                    <Card className="py-1 px-3 border-0">
                      <h6 className="fw-bold">Advertisement Report Details</h6>

                      <p className="mt-4 fw-bold mb-1 custom-label">
                        Ads Screenshots
                      </p>
                      <img
                        src={`${base_url}/${campaignData?.advertisement?.upload_ads_src_path}`}
                        style={imagePreviewCss}
                        loading="lazy" // <-- lazy load
                        onClick={() =>
                          openSampleModal(
                            `${base_url}/${campaignData?.advertisement?.upload_ads_src_path}`
                          )
                        }
                      />

                      <Card className="border-0 mt-3">
                        <h6 className="fw-bold m-0 custom-label">Note:</h6>
                        <p style={{ fontSize: "12px" }}>
                          Please upload the first screenshot of the shared post
                          as proof of campaign execution.
                        </p>
                      </Card>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            {loading ? (
              <ApprovedCardSkeleton />
            ) : (
              <Row className="p-3">
                <h6 className="mb-3 fw-bold">Advertisement Report Details</h6>

                {/* Row for No. of Views & No. of Reactions */}
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold custom-label">
                        No. of View
                      </Form.Label>
                      <p
                        className="form-control-sm mb-0 fw-semibold p-0"
                        style={{ fontSize: "12px" }}
                      >
                        {campaignData?.advertisement?.no_view || 0}
                      </p>{" "}
                      {/* Replace with dynamic value */}
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold custom-label">
                        No. of Reactions
                      </Form.Label>
                      <p
                        className="form-control-sm mb-0 fw-semibold p-0"
                        style={{ fontSize: "12px" }}
                      >
                        {campaignData?.advertisement?.no_reactions || 0}
                      </p>{" "}
                      {/* Replace with dynamic value */}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row for Document Uploads */}
                <Row className="g-2">
                  <Col sm={12} md={6} lg={3}>
                    <Form.Group className="d-flex flex-column">
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        View Screenshot
                      </Form.Label>
                      <img
                        src={`${base_url}/${campaignData?.advertisement?.upload_view_src_path}`}
                        style={imagePreviewCss}
                        loading="lazy" // <-- lazy load
                        onClick={() =>
                          openSampleModal(
                            `${base_url}/${campaignData?.advertisement?.upload_view_src_path}`
                          )
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12} md={6} lg={3}>
                    <Form.Group className="d-flex flex-column">
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        Reaction Screenshot
                      </Form.Label>
                      <img
                        src={`${base_url}/${campaignData?.advertisement?.upload_reaction_src_path}`}
                        style={imagePreviewCss}
                        loading="lazy" // <-- lazy load
                        onClick={() =>
                          openSampleModal(
                            `${base_url}/${campaignData?.advertisement?.upload_reaction_src_path}`
                          )
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12} md={6} lg={3}>
                    <Form.Group className="d-flex flex-column">
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        After 24 hrs Ads Screenshot
                      </Form.Label>
                      <img
                        src={`${base_url}/${campaignData?.advertisement?.upload_after_24_ads_src_path}`}
                        style={imagePreviewCss}
                        loading="lazy" // <-- lazy load
                        onClick={() =>
                          openSampleModal(
                            `${base_url}/${campaignData?.advertisement?.upload_after_24_ads_src_path}`
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} lg={12}>
                    <Form.Group>
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        Performance Remark
                      </Form.Label>
                      <p style={{ fontSize: "12px" }}>
                        {campaignData?.advertisement?.performance_remark || "-"}
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            )}
          </div>
        </div>
        <div className="rounded col-lg-4 col-12 px-2 pb-4">
          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            <ManagerInfo relationship_manager={campaignData?.rel_managers} />
          )}

          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <Details
              campaignDetails={campaignData?.campaign}
              company={campaignData?.company}
              logDetails={campaignData?.logs}
            />
          )}

          {loading ? (
            <AdsApprovedRejectBySkeleton />
          ) : (
            <ApprovedDetail data={campaignData?.logs} />
          )}
        </div>
      </div>
    </>
  );
};

export default CompletedView;
