import { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useAdsModal } from "../../../../Context/AdsModalContext";

export default function ApprovedCampaignForm({
  formData,
  setFormData,
  handleSubmit,
  errors,
  uploading,
}) {
  const [currentField, setCurrentField] = useState(null);

  const { openSampleModal } = useAdsModal();

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);

        // Update formData based on current field
        switch (currentField) {
          case "view":
            setFormData((prevState) => ({
              ...prevState,
              upload_view_src_path: file,
              viewPreviewUrl: imageUrl,
            }));
            break;
          case "reaction":
            setFormData((prevState) => ({
              ...prevState,
              upload_reaction_src_path: file,
              reactionPreviewUrl: imageUrl,
            }));
            break;
          case "after24":
            setFormData((prevState) => ({
              ...prevState,
              upload_after_24_ads_src_path: file,
              after24PreviewUrl: imageUrl,
            }));
            break;
          default:
            break;
        }
      }
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    noClick: true,
    noKeyboard: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Row className="p-3">
      <h6 className="mb-3 fw-bold">Upload Advertisement Report Details</h6>

      {/* Row for No. of Views & No. of Reactions */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              No. of View
            </Form.Label>
            <Form.Control
              className="form-control-sm"
              type="text"
              name="no_view"
              value={formData.no_view ?? ""}
              onChange={handleInputChange}
            />
            {errors.no_view && (
              <div className="text-danger small mt-1">{errors.no_view}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold custom-label">
              No. of Reactions
            </Form.Label>
            <Form.Control
              className="form-control-sm"
              type="text"
              name="no_reactions"
              value={formData.no_reactions ?? ""}
              onChange={handleInputChange}
            />
            {errors.no_reactions && (
              <div className="text-danger small mt-1">
                {errors.no_reactions}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Row for Document Uploads */}
      <Row>
        <Col md={4} className="pe-0">
          <Form.Group>
            <Form.Label className="fw-bold " style={{ fontSize: "12px" }}>
              Upload View Screenshot
            </Form.Label>
            <Card
              {...getRootProps()}
              className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "10px",
                position: "relative",
                padding: "10px",
              }}
              onClick={() => {
                setCurrentField("view");
                open();
              }}
            >
              <input {...getInputProps()} />
              <div className="inner-border d-flex flex-column align-items-center w-100 p-3">
                <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                <p className="mt-2 mb-1 fw-bold">
                  Drag your document here or Browse
                </p>
                <small className="text-muted">Support PDF / Image</small>
              </div>
            </Card>
            {errors.viewScreenshot && (
              <div className="text-danger small mt-1">
                {errors.viewScreenshot}
              </div>
            )}
            <div className="d-flex align-items-center mb-2 gap-2">
              <img
                src="/info1.svg"
                alt="Sample"
                style={{ cursor: "pointer" }} // Adjust width as needed
                onClick={() =>
                  openSampleModal("/sample_images/view_screenshot.png")
                }
              />
              <h6 className="fw-bold mt-2 " style={{ fontSize: "12px" }}>
                Sample Screenshot
              </h6>
            </div>

            <div>
              {formData.viewPreviewUrl && (
                <img
                  src={formData.viewPreviewUrl}
                  alt="View Preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          </Form.Group>
        </Col>

        <Col md={4} className="pe-0">
          <Form.Group>
            <Form.Label className="fw-bold" style={{ fontSize: "12px" }}>
              Upload Reaction Screenshot
            </Form.Label>
            <Card
              {...getRootProps()}
              className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "10px",
                position: "relative",
                padding: "10px",
              }}
              onClick={() => {
                setCurrentField("reaction");
                open();
              }}
            >
              <input {...getInputProps()} />
              <div className="inner-border d-flex flex-column align-items-center w-100 p-3">
                <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                <p className="mt-2 mb-1 fw-bold">
                  Drag your document here or Browse
                </p>
                <small className="text-muted">Support PDF / Image</small>
              </div>
            </Card>
            {errors.reactionScreenshot && (
              <div className="text-danger small mt-1">
                {errors.reactionScreenshot}
              </div>
            )}
            <div className="d-flex align-items-center mb-2 gap-2">
              <img
                src="/info1.svg"
                alt="Sample"
                style={{ cursor: "pointer" }} // Adjust width as needed
                onClick={() => openSampleModal("/sample_images/reaction.png")}
              />
              <h6 className="fw-bold mt-2 " style={{ fontSize: "12px" }}>
                Sample Screenshot
              </h6>
            </div>
            <div>
              {formData.reactionPreviewUrl && (
                <img
                  src={formData.reactionPreviewUrl}
                  alt="View Preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          </Form.Group>
        </Col>

        <Col md={4} className="pe-0">
          <Form.Group>
            <Form.Label className="fw-bold" style={{ fontSize: "12px" }}>
              Upload After 24 hrs Ads Screenshot
            </Form.Label>
            <Card
              {...getRootProps()}
              className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "10px",
                position: "relative",
                padding: "10px",
              }}
              onClick={() => {
                setCurrentField("after24");
                open();
              }}
            >
              <input {...getInputProps()} />
              <div className="inner-border d-flex flex-column align-items-center w-100 p-3">
                <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                <p className="mt-2 mb-1 fw-bold">
                  Drag your document here or Browse
                </p>
                <small className="text-muted">Support PDF / Image</small>
              </div>
            </Card>
            {errors.after24Screenshot && (
              <div className="text-danger small mt-1">
                {errors.after24Screenshot}
              </div>
            )}
            <div className="d-flex align-items-center mb-2 gap-2">
              <img
                src="/info1.svg"
                alt="Sample"
                style={{ cursor: "pointer" }} // Adjust width as needed
                onClick={() =>
                  openSampleModal("/sample_images/after_24_hrs.png")
                }
              />
              <h6 className="fw-bold mt-2 " style={{ fontSize: "12px" }}>
                Sample Screenshot
              </h6>
            </div>
            <div>
              {formData.after24PreviewUrl && (
                <img
                  src={formData.after24PreviewUrl}
                  alt="View Preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Col md={12} className="mb-3">
        <Form.Group>
          <Form.Label className="fw-bold custom-label">
            Performance Remark
          </Form.Label>
          <Form.Control
            className="form-control-sm"
            as="textarea"
            rows={3}
            name="performance_remark"
            value={formData.performance_remark ?? ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>

      <Card className="border-0 mt-3">
        <h6 className="fw-bold m-0 custom-label">Note:</h6>
        <p style={{ fontSize: "12px" }} className="mb-0">
          Final Report Submission (After 24 Hours):
          <ul>
            <li>Confirm ad was visible for 24 hours in the group</li>
            <li>Share total view count from the group</li>
            <li>Share total reaction count (likes, replies, etc.)</li>
            <li>
              Campaign will be marked as completed only after report submission.
              Society becomes eligible for payout post this.
            </li>
            <li>
              {" "}
               Refer to sample screenshots for guidance or contact your
              Relationship Manager for help. Mention any ad-related notes under
              the Performance Remark tab.
            </li>
          </ul>
        </p>
        <p style={{ fontSize: "12px" }}>
          <ul></ul>
        </p>
        <Button
          onClick={(e) => handleSubmit(e)}
          style={{
            backgroundColor: uploading ? "rgba(183, 183, 183, 1)" : "#019F88",
            color: "white",
            padding: "4px 8px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "120px",
            fontSize: "12px",
            display: "inline-block",
          }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "SUBMIT"}
        </Button>
      </Card>
    </Row>
  );
}
