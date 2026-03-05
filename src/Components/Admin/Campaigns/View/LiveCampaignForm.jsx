import { Box, Card, Typography, Grid, Divider, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDropzone } from "react-dropzone";
import {
  adminHasPrivilege,
  downloadFile,
  formatToTitleCase,
  getCombinedStatus,
  getStatusStyle,
} from "../../../../helper/helper.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import DownloadImageBtn from "../../../Common/Campaign/DownloadImageBtn.jsx";

export default function LiveCampaignForm({
  handleSubmit,
  file,
  setFile,
  uploading,
  uploadedImage,
  setUploadedImage,
  campaignData,
  campaign,
}) {
  const { openAdsModal, openSampleModal } = useAdsModal();
  const onDrop = (acceptedFiles) => {
    // Reset uploaded image when a new file is selected
    setUploadedImage(null);

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile); // Set the selected file object
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  return (
    <Card sx={{ p: 2, borderRadius: "10px", height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: "#2D2C2C" }}>
            ID #{campaignData?.id_prifix_campaign_ads}
          </Typography>
          <Typography
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "14px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              // ...getStatusStyle(campaignData?.campaign_status),
              ...getStatusStyle(getCombinedStatus(campaignData)),
            }}
          >
            Status - {getCombinedStatus(campaignData)}
            {/* {campaignData?.campaign_status &&
              formatToTitleCase(campaignData?.campaign_status)} */}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 0, mb: 0 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <div className="position-relative">
            <CreativeTypeRender
              type={campaign?.creative_type}
              data={campaignData}
            />
            {/* Preview Ads Button - Right Bottom */}
            <Button
              variant="dark"
              className="position-absolute bottom-0 end-0 mx-0 my-2 m-sm-2 preview-ads"
              style={{
                zIndex: 2,
                fontSize: "12px",
                padding: "1px 13px",
                backgroundColor: "#212529",
                color: "white",
                textTransform: "none",
              }}
              onClick={() =>
                openAdsModal(
                  campaignData?.upload_societies_images_path,
                  campaign?.creative_type,
                  campaignData?.societies_text,
                  campaign?.media_type
                )
              }
            >
              <img src="/eye.svg" className="me-1" /> Preview Ads
            </Button>

            {campaignData?.societies_text === "image" && (
              <DownloadImageBtn
                path={campaignData?.upload_societies_images_path}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
            Advertisement Report Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <p className="mt-1 fw-bold mb-1 custom-label">
              Upload Ads Screenshot
            </p>

            <div
              {...getRootProps()}
              className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "10px",
                position: "relative",
                padding: "10px",
                border: "1px solid #D3D3D3",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />

              <div className="inner-border d-flex flex-column align-items-center  w-100 p-3">
                <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                <p className="mt-2 mb-1 fw-bold">Drag or Browse</p>
                <small className="text-muted">Support JPEG,JPG,PNG</small>
              </div>
            </div>
            {file && (
              <Box>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Advertisement"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            {uploadedImage && (
              <Box className="position-relative">
                <img
                  src={uploadedImage} // Show the uploaded image URL
                  alt="Uploaded Advertisement"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  variant="dark"
                  className="m-1 border-0 download-icon"
                  onClick={() => downloadFile(uploadedImage)}
                >
                  <img src="/download-icon.svg" className="me-0" />{" "}
                </Button>
              </Box>
            )}
            <div className="d-flex align-items-center mb-2 gap-2">
              <img
                src="/info1.svg"
                alt="Sample"
                style={{ cursor: "pointer" }} // Adjust width as needed
                onClick={() =>
                  openSampleModal("/sample_images/upload_screenshot.png")
                }
              />
              <h6 className="fw-bold mt-2 " style={{ fontSize: "12px" }}>
                Sample Screenshot
              </h6>
            </div>
            <h6 className="fw-bold m-0 custom-label">Note:</h6>
            <p className="mb-1" style={{ fontSize: "12px" }}>
              Ensure all guidelines are met, including content, format, and
              visual clarity. Approve the ad if everything is in place.
            </p>

            {adminHasPrivilege("campaigns_edit") && (
              <Button
                type="submit"
                style={{
                  backgroundColor: "#019F88",
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
            )}
          </form>
        </Grid>
      </Grid>
    </Card>
  );
}
