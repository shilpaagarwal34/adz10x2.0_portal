import { useState } from "react";
import { Box, Card, Grid, Button } from "@mui/material";

import { Row, Col, Form, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useAdsModal } from "../../../../Context/AdsModalContext";
import { adminHasPrivilege, downloadFile } from "../../../../helper/helper";

const ApprovedCampaiignForm = ({
  formData,
  setFormData,
  handleSubmit,
  errors,
  uploading,
  saveLoader,
  advertisement,
}) => {
  const { openSampleModal } = useAdsModal();

  const [currentField, setCurrentField] = useState(null);

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
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  // console.log(formData);
  return (
    <Card sx={{ p: 2, borderRadius: "10px", height: "auto" }}>
      <Grid container spacing={3}>
        <Row className="ps-4 pt-3">
          <h6 className="mb-3 fw-bold">Upload Advertisement Report Details (Optional)</h6>

          {/* Row for No. of Views & No. of Reactions */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold custom-label">
                  No. of View (Optional)
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
                  No. of Reactions (Optional)
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
                  Upload View Screenshot (Optional)
                </Form.Label>
                <div
                  {...getRootProps()}
                  className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
                  onClick={() => {
                    setCurrentField("view");
                    open();
                  }}
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    padding: "7px",
                    border: "1px solid #D3D3D3",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="inner-border d-flex flex-column align-items-center  w-100 p-3">
                    <img
                      src="/pdficon.svg"
                      alt="Upload"
                      width={40}
                      height={40}
                    />
                    <p className="mt-2 mb-1 fw-bold">Drag or Browse</p>
                    <small className="text-muted">Support JPEG,JPG,PNG</small>
                  </div>
                </div>
                <Box className="position-relative">
                  {formData.viewPreviewUrl && (
                    <>
                      <img
                        src={formData.viewPreviewUrl}
                        alt="View Preview"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        variant="dark"
                        className="m-1 border-0 download-icon"
                        onClick={() => downloadFile(formData?.viewPreviewUrl)}
                      >
                        <img src="/download-icon.svg" className="me-0" />{" "}
                      </Button>
                    </>
                  )}
                </Box>

                <div className="d-flex align-items-center mb-2 gap-2">
                  <img
                    src={"/info1.svg"}
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
                {errors.viewScreenshot && (
                  <div className="text-danger small mt-1">
                    {errors.viewScreenshot}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={4} className="pe-0">
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: "12px" }}>
                  Upload Reaction Screenshot (Optional)
                </Form.Label>
                <div
                  {...getRootProps()}
                  className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
                  onClick={() => {
                    setCurrentField("reaction");
                    open();
                  }}
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    padding: "7px",
                    border: "1px solid #D3D3D3",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="inner-border d-flex flex-column align-items-center  w-100 p-3">
                    <img
                      src="/pdficon.svg"
                      alt="Upload"
                      width={40}
                      height={40}
                    />
                    <p className="mt-2 mb-1 fw-bold">Drag or Browse</p>
                    <small className="text-muted">Support JPEG,JPG,PNG</small>
                  </div>
                </div>
                <Box className="position-relative">
                  <>
                    {formData.reactionPreviewUrl && (
                      <>
                        <img
                          src={formData.reactionPreviewUrl}
                          alt="View Preview"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <Button
                          variant="dark"
                          className="m-1 border-0 download-icon"
                          onClick={() =>
                            downloadFile(formData?.reactionPreviewUrl)
                          }
                        >
                          <img src="/download-icon.svg" className="me-0" />{" "}
                        </Button>
                      </>
                    )}
                  </>
                </Box>

                <div className="d-flex align-items-center mb-2 gap-2">
                  <img
                    src="/info1.svg"
                    alt="Sample"
                    style={{ cursor: "pointer" }} // Adjust width as needed
                    onClick={() =>
                      openSampleModal("/sample_images/reaction.png")
                    }
                  />
                  <h6 className="fw-bold mt-2 " style={{ fontSize: "12px" }}>
                    Sample Screenshot
                  </h6>
                </div>
                {errors.reactionScreenshot && (
                  <div className="text-danger small mt-1">
                    {errors.reactionScreenshot}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={4} className="pe-0">
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: "12px" }}>
                  Upload After 24 hrs Ads Screenshot (Optional)
                </Form.Label>
                <div
                  {...getRootProps()}
                  className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
                  onClick={() => {
                    setCurrentField("after24");
                    open();
                  }}
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    padding: "7px",
                    border: "1px solid #D3D3D3",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="inner-border d-flex flex-column align-items-center  w-100 p-3">
                    <img
                      src="/pdficon.svg"
                      alt="Upload"
                      width={40}
                      height={40}
                    />
                    <p className="mt-2 mb-1 fw-bold">Drag or Browse</p>
                    <small className="text-muted">Support JPEG,JPG,PNG</small>
                  </div>
                </div>
                <Box className="position-relative">
                  <>
                    {formData.after24PreviewUrl && (
                      <>
                        <img
                          src={formData.after24PreviewUrl}
                          alt="View Preview"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <Button
                          variant="dark"
                          className="m-1 border-0 download-icon"
                          onClick={() =>
                            downloadFile(formData?.after24PreviewUrl)
                          }
                        >
                          <img src="/download-icon.svg" className="me-0" />{" "}
                        </Button>
                      </>
                    )}
                  </>
                </Box>

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
                {errors.after24Screenshot && (
                  <div className="text-danger small mt-1">
                    {errors.after24Screenshot}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Grid>
            <Form.Check
              type="checkbox"
              label="(View to Company)"
              checked={formData?.view_to_company}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  view_to_company: e.target.checked, // Update view_to_conpany with the new value
                }))
              }
              className="d-flex align-items-center custom-label custom-checkbox  fw-medium"
            />
          </Grid>
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
          <div className="border-0 mt-2">
            <h6 className="fw-bold m-0 custom-label">Note:</h6>
            <p style={{ fontSize: "12px" }}>
              Report fields are optional. You can save/share without entering
              views, reactions, or screenshots.
              <ul>
                <li>
                  If provided, cross-check view & reaction counts with uploaded
                  screenshots.
                </li>
                <li>
                  Performance remarks are optional and can be updated later.
                </li>
                <li>
                  Settlement and completion are handled by the campaign life
                  cycle and admin transfer workflow.
                </li>
              </ul>
            </p>
            {adminHasPrivilege("campaigns_edit") && (
              <div>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  style={{
                    backgroundColor: "#00517F",
                    color: "white",
                    padding: "4px 8px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "120px",
                    fontSize: "12px",
                    display: "inline-block",
                    margin: "5px 5px 5px 0",
                  }}
                  disabled={saveLoader}
                >
                  {saveLoader ? "Saving" : "SAVE"}
                </Button>
                {advertisement?.share_status !== "yes" && (
                  <Button
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={uploading}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "180px",
                      fontSize: "12px",
                      display: "inline-block",
                      margin: "5px 5px 5px 0",
                    }}
                  >
                    {uploading ? "Uploading..." : "SHARE WITH COMPANY"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Row>
      </Grid>
    </Card>
  );
};

export default ApprovedCampaiignForm;
