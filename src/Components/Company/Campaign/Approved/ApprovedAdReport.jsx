import { useState } from "react";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import { base_url } from "../../../../config/api";
import { downloadFile, formatToTitleCase } from "../../../../helper/helper.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";

export default function ApprovedAdReport({
  advertisementData,
  logData,
  campaign_status,
  creative_type,
  imagePreviewCss,
}) {
  const { openAdsModal, openSampleModal } = useAdsModal();

  return (
    <>
      <Row className=" px-3 pt-3 pb-2">
        <Col>
          <h6 className="fw-bold">Advertisement Details</h6>
        </Col>
        <Col className="text-end">
          <span className="fw-bold custom-label">
            ID #{logData?.id_prifix_campaign_ads}
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
            STATUS - {formatToTitleCase(campaign_status)}
          </Badge>
        </Col>
      </Row>
      <hr className="m-0" style={{ color: "gray" }} />
      <Row className="p-3 ">
        <Col md={6} className="p-0">
          <Card className="px-2 py-1 border-0 position-relative">
            <div className="position-relative">
              <CreativeTypeRender type={creative_type} data={logData} />

              {/* Preview Ads Button - Right Bottom */}
              <Button
                variant="dark"
                className="position-absolute bottom-0 end-0 m-2"
                style={{
                  zIndex: 2,
                  fontSize: "12px",
                  padding: "3px 13px",
                }}
                onClick={() => {
                  openAdsModal(
                    logData?.upload_societies_images_path,
                    creative_type,
                    logData?.societies_text
                  );
                }}
              >
                <img src="/eye.svg" className="me-1" /> Preview Ads
              </Button>
            </div>
          </Card>
        </Col>

        <Col md={6} className="p-0">
          <Card className="py-1 px-3 border-0">
            <h6 className="fw-bold">Advertisement Report Details</h6>

            <p className="mt-4 fw-bold mb-1 custom-label">Ads Screenshots</p>
            {advertisementData?.upload_ads_src_path && (
              <div className="position-relative">
                <img
                  src={`${base_url}/${advertisementData?.upload_ads_src_path}`}
                  style={imagePreviewCss}
                  onClick={() =>
                    openSampleModal(
                      `${base_url}/${advertisementData?.upload_ads_src_path}`
                    )
                  }
                />
                <Button
                  variant="dark"
                  className="m-1 border-0 download-icon"
                  onClick={() =>
                    downloadFile(advertisementData?.upload_ads_src_path)
                  }
                >
                  <img src="/download-icon.svg" className="me-0" />{" "}
                </Button>
              </div>
            )}

            <Card className="border-0 mt-3">
              <h6 className="fw-bold m-0 custom-label">Note:</h6>
              <p style={{ fontSize: "12px" }}>
                <ul>
                  <li>
                    This advertisement has been approved by both the Adz10x
                    Admin Team and the Society Admin.
                  </li>
                  <li>
                    The content is cleared for promotion as per the scheduled
                    date and time. Campaign reports will be available
                    post-execution.
                  </li>
                  <li>
                    For any queries, please contact your Relationship Manager.
                  </li>
                </ul>
              </p>
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  );
}
