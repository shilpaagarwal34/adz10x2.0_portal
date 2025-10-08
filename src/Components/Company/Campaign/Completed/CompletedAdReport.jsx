import { Row, Col, Form } from "react-bootstrap";
import { base_url } from "../../../../config/api";
import { useAdsModal } from "../../../../Context/AdsModalContext";
import { downloadFile } from "../../../../helper/helper";
import { Button } from "@mui/material";

const imagePreviewCss = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

export default function CompletedAdReport({ advertisementData }) {
  const { openSampleModal } = useAdsModal();

  return (
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
              {advertisementData?.no_view || 0}
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
              {advertisementData?.no_reactions || 0}
            </p>{" "}
            {/* Replace with dynamic value */}
          </Form.Group>
        </Col>
      </Row>

      {/* Row for Document Uploads */}
      <Row>
        <Col md={4} className="pe-1">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              View Screenshot
            </Form.Label>
            <div className="position-relative">
              <img
                src={`${base_url}/${advertisementData?.upload_view_src_path}`}
                style={imagePreviewCss}
                onClick={() =>
                  openSampleModal(
                    `${base_url}/${advertisementData?.upload_view_src_path}`
                  )
                }
              />
              <Button
                variant="dark"
                className="m-1 border-0 download-icon"
                onClick={() =>
                  downloadFile(advertisementData?.upload_view_src_path)
                }
              >
                <img src="/download-icon.svg" className="me-0" />{" "}
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col md={4} className="pe-1">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              Reaction Screenshot
            </Form.Label>
            <div className="position-relative">
              <img
                src={`${base_url}/${advertisementData?.upload_reaction_src_path}`}
                style={imagePreviewCss}
                onClick={() =>
                  openSampleModal(
                    `${base_url}/${advertisementData?.upload_reaction_src_path}`
                  )
                }
              />
              <Button
                variant="dark"
                className="m-1 border-0 download-icon"
                onClick={() =>
                  downloadFile(advertisementData?.upload_reaction_src_path)
                }
              >
                <img src="/download-icon.svg" className="me-0" />{" "}
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col md={4} className="pe-1">
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              After 24 hrs Ads Screenshot
            </Form.Label>
            <div className="position-relative">
              <img
                src={`${base_url}/${advertisementData?.upload_after_24_ads_src_path}`}
                style={imagePreviewCss}
                onClick={() =>
                  openSampleModal(
                    `${base_url}/${advertisementData?.upload_after_24_ads_src_path}`
                  )
                }
              />
              <Button
                variant="dark"
                className="m-1 border-0 download-icon"
                onClick={() =>
                  downloadFile(advertisementData?.upload_after_24_ads_src_path)
                }
              >
                <img src="/download-icon.svg" className="me-0" />{" "}
              </Button>
            </div>
          </Form.Group>
        </Col>

        {advertisementData?.performance_remark && advertisementData?.view_to_company && (
          <Col md={12} className="pe-1 mt-3">
            <Form.Label className="fw-bold custom-label">
              Performance Remark
            </Form.Label>
            <p
              className="form-control-sm mb-0 fw-semibold p-0"
              style={{ fontSize: "14px" }}
            >
              {advertisementData.performance_remark}
            </p>{" "}
          </Col>
        )}
      </Row>
    </Row>
  );
}
