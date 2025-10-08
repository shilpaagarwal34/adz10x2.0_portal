import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatToTitleCase,
  getCombinedStatus,
  getStatusStyle,
} from "../../../../helper/helper.js";
import { base_url } from "../../../../config/api.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import ApprovedDetail from "../../../Society/Advertisement/Approved/ApprovedDetail.jsx";

const PendingAdModal = ({ show, onHide, logData, campaignData }) => {
  const { openAdsModal } = useAdsModal();

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        style={{ zIndex: 1500, background: "#32322f29" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">
            Advertisement Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="px-3">
            <Col md={7} className="p-0">
              <Card className="border-0 position-relative">
                <div className="position-relative">
                  <CreativeTypeRender
                    data={logData}
                    type={logData?.creative_type}
                  />
                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 end-0 m-2"
                    style={{ zIndex: 2, fontSize: "12px", padding: "3px 13px" }}
                    onClick={() =>
                      openAdsModal(
                        logData?.upload_societies_images_path,
                        logData?.creative_type,
                        logData?.societies_text
                      )
                    }
                  >
                    <img src="/eye.svg" className="me-1" alt="" /> Preview Ads
                  </Button>
                </div>
              </Card>
            </Col>

            <Col md={5} className="ps-4">
              <div className="rounded">
                <div className="py-2 bg-white rounded-3 shadow-sm me-2">
                  <div className="d-flex align-items-center justify-content-between px-3 pb-2 m-0">
                    <p className="fw-bold custom-label m-0">
                      Campaign ID #{campaignData?.id_prifix_campaign}
                    </p>
                    <p
                      className="m-0"
                      style={{
                        fontSize: "12px",
                        borderRadius: "10px",
                        padding: "3px 10px",
                        color: "white",
                        ...getStatusStyle(getCombinedStatus(logData)),
                      }}
                    >
                      {getCombinedStatus(logData)}
                    </p>
                  </div>
                  <hr className="m-0" style={{ color: "gray" }} />
                  <div className="d-flex align-items-center p-3 ">
                    <img
                      src={
                        logData?.society?.society_profile_img_path
                          ? `${base_url}/${logData?.society?.society_profile_img_path}`
                          : "/fallback_img.jpg"
                      }
                      alt="Company Logo"
                      loading="lazy"
                      className="me-3 rounded"
                      style={{
                        width: "70px",
                        height: "70px",
                        // objectFit: "contain",
                      }}
                    />
                    <div>
                      <div className="d-flex justify-content-between m-0">
                        <h6 className="m-0 fw-bold">
                          {logData?.society?.society_name}
                        </h6>
                        <p
                          className="m-0 text-secondary"
                          style={{
                            fontSize: "10px",
                            padding: "3px 7px",
                            backgroundColor: "#F5F5F5",
                            borderRadius: "10px",
                          }}
                        >
                          {logData?.number_of_flat || 0} Flats
                        </p>
                      </div>
                      <p className="m-0 custom-label">
                        {logData?.society?.address}
                      </p>
                    </div>
                  </div>
                  <hr className="m-0" style={{ color: "gray" }} />
                  <div className="d-flex p-3">
                    <div className="col-8 custom-label">
                      <div className="mb-3">
                        <p className="m-0 fw-bold">Campaign Type</p>
                        <p className="m-0">
                          {campaignData?.campaign_type &&
                            formatCampaignType(campaignData?.campaign_type)}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="m-0 fw-bold">Campaign Name</p>
                        <p className="m-0">{campaignData?.campaign_name}</p>
                      </div>
                      <div className="mb-4">
                        <p className="m-0 fw-bold">Advertisement Date</p>
                        <p className="m-0">{campaignData?.campaign_date}</p>
                      </div>
                      <div>
                        <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                          Ads Amount
                        </p>
                        <h3 className="m-0">
                          ₹{" "}
                          <span className="fw-bold">
                            {formatNumberWithCommas(
                              logData?.campaign_ads_amount
                            )}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div className="col-4 custom-label d-flex justify-content-end">
                      <div className="mb-3">
                        <p className="m-0 fw-bold">Creative Type</p>
                        <p className="m-0">
                          {formatToTitleCase(logData?.creative_type)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {logData && <ApprovedDetail data={logData} />}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PendingAdModal;
