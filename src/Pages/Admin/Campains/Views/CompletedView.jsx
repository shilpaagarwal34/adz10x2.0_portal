import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Grid,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Advertisement from "../../../../assets/Logo/Advertisement.svg";
import Screenshot from "../../../../assets/Logo/Screenshot.svg";
import AdsModal from "../AdsModal.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Row, Col, Form, Modal } from "react-bootstrap";
import ApprovedDetail from "../../../../Components/Society/Advertisement/Approved/ApprovedDetail.jsx";
import SocietyDetails from "../../../../Components/Admin/Campaigns/View/SocietyDetails.jsx";
import AdvertisementDetails from "../../../../Components/Admin/Campaigns/View/AdvertisementDetails.jsx";

const CompletedView = () => {
  const { id } = useParams(); // Get Campaign ID from URL

  const handleSampleShow = () => setShowSampleModal(true);
  const handleSampleClose = () => setShowSampleModal(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewShow = () => setShowPreview(true);
  const handlePreviewClose = () => setShowPreview(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, borderRadius: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => window.history.back()}
                  sx={{ minWidth: "auto", color: "black" }}
                />
                <Typography fontWeight="bold">Advertisement Details</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography fontWeight="bold" sx={{ color: "#2D2C2C" }}>
                  ID #{id}
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  Status - Completed
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 0, mb: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <div className="position-relative">
                  <img
                    src={Advertisement}
                    alt="Advertisement"
                    style={{
                      width: "100%",
                      height: "auto",
                      minHeight: "350px",
                      objectFit: "cover",
                      marginTop: "1rem",
                    }}
                  />
                  {/* Preview Ads Button - Right Bottom */}
                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 end-0 m-2"
                    style={{
                      zIndex: 2,
                      fontSize: "12px",
                      padding: "1px 13px",
                      backgroundColor: "#212529",
                      color: "white",
                      textTransform: "none",
                    }}
                    onClick={handlePreviewShow}
                  >
                    <img src="/eye.svg" className="me-1" /> Preview Ads
                  </Button>
                  {/* Include the modal */}
                  <AdsModal
                    show={showPreview}
                    handleClose={handlePreviewClose}
                  />

                  {/* Download Image Button - Left Bottom */}
                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 start-0 m-2 border-0"
                    style={{
                      zIndex: 2,
                      fontSize: "12px",
                      padding: "1px 10px",
                      backgroundColor: "#019F88",
                      color: "white",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/pendingimg.svg"; // Change this to your actual image source
                      link.download = "Advertisement.png";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <img src="/download-icon.svg" className="me-1" /> Download
                    image
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  Advertisement Report Details
                </Typography>

                <Typography
                  sx={{ mt: 2, fontWeight: "bold", fontSize: ".9rem" }}
                >
                  Upload Report Screenshots
                </Typography>

                {/* Image Display */}
                <Box sx={{ mt: 2 }}>
                  <img
                    src={Screenshot}
                    alt="Report Screenshot"
                    onClick={handleSampleShow}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
                <Modal
                  show={showSampleModal}
                  onHide={handleSampleClose}
                  style={{ zIndex: "9999999999" }}
                >
                  <Modal.Header className="border-0 bg-dark">
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleSampleClose}
                      style={{ filter: "invert(1)" }} // Changes close button to white
                    ></button>
                  </Modal.Header>
                  <Modal.Body className="text-center bg-dark p-5">
                    <img
                      src="/modalimg.svg"
                      alt="Sample"
                      className="img-fluid"
                      style={{ maxHeight: "400px" }} // Adjust as needed
                    />
                  </Modal.Body>
                </Modal>
              </Grid>
              <Row className="ps-4 py-3">
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
                        120
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
                        112
                      </p>{" "}
                      {/* Replace with dynamic value */}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row for Document Uploads */}
                <Row>
                  <Col md={3} className="pe-0">
                    <Form.Group>
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        View Screenshot
                      </Form.Label>
                      <img
                        src="/modalimg.svg"
                        style={{ width: "120px", cursor: "pointer" }}
                        onClick={handleSampleShow}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} className="px-0">
                    <Form.Group>
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        Reaction Screenshot
                      </Form.Label>
                      <img
                        src="/modalimg.svg"
                        style={{ width: "120px", cursor: "pointer" }}
                        onClick={handleSampleShow}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} className="px-0">
                    <Form.Group>
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        After 24 hrs Ads Screenshot
                      </Form.Label>
                      <img
                        src="/modalimg.svg"
                        style={{ width: "120px", cursor: "pointer" }}
                        onClick={handleSampleShow}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="px-0">
                    <Form.Group>
                      <Form.Label
                        className="fw-bold"
                        style={{ fontSize: "12px" }}
                      >
                        Performance Remark
                      </Form.Label>
                      <p style={{ fontSize: "12px" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dignissimos, quam?
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="px-3 mt-3 me-2 ">
                  <p className="fw-bold custom-label mb-1">
                    {" "}
                    Report Submitted by Adz10x Team
                  </p>
                  <p className="mb-0" style={{ fontSize: "12px" }}>
                    11 Feb 2025 11:10am
                  </p>
                </div>
              </Row>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          {loading ? (
            <SocietyDetailsSkeleton />
          ) : (
            <SocietyDetails id={id} society={campaignData?.society} />
          )}
          <AdvertisementDetails
            campaign={campaignData?.campaign}
            company={campaignData?.company}
            campaignAmount={campaignData?.campaign_logs?.campaign_ads_amount}
          />
          <ApprovedDetail />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompletedView;
