import { Box, Card, Grid, Button } from "@mui/material";
import { Row, Col, Form } from "react-bootstrap";
import { adminHasPrivilege, downloadFile } from "../../../../helper/helper";

const ApprovedCampaiignForm = ({
  formData,
  setFormData,
  handleSubmit,
  uploading,
  saveLoader,
  advertisement,
}) => {
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
          <h6 className="mb-3 fw-bold">Advertisement Review</h6>
          <Grid item xs={12} sx={{ mb: 2 }}>
            {(formData?.viewPreviewUrl || formData?.reactionPreviewUrl || formData?.after24PreviewUrl) && (
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {formData?.viewPreviewUrl && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => downloadFile(formData.viewPreviewUrl)}
                  >
                    Download View Screenshot
                  </Button>
                )}
                {formData?.reactionPreviewUrl && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => downloadFile(formData.reactionPreviewUrl)}
                  >
                    Download Reaction Screenshot
                  </Button>
                )}
                {formData?.after24PreviewUrl && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => downloadFile(formData.after24PreviewUrl)}
                  >
                    Download After 24 Hrs Screenshot
                  </Button>
                )}
              </Box>
            )}
          </Grid>
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
              Report upload fields are hidden for admin review.
              <ul>
                <li>
                  You can use SAVE or SHARE WITH COMPANY without filling report
                  metrics.
                </li>
                <li>
                  Existing screenshots, if available, can still be downloaded.
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
