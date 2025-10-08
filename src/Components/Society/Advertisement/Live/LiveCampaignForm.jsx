import { useState } from "react";
import { downloadFile } from "../../../../helper/helper.js";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import api_routes, { base_url } from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import DownloadImageBtn from "../../../Common/Campaign/DownloadImageBtn.jsx";

export default function LiveCampaignForm({
  campaignData,
  advertisementId,
  uploadedImage,
  setUploadedImage,
  disableButton,
}) {
  // console.log(disableButton);
  const [file, setFile] = useState(null);
  const { openAdsModal, openSampleModal } = useAdsModal();
  const creativeType = campaignData?.campaign?.creative_type;
  const [uploading, setUploading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    setUploading(true);

    const formData = new FormData();

    if (campaignData?.advertisement) {
      formData.append("id", campaignData?.advertisement?.id);
    }

    formData.append("upload_ads_src_path", file);
    formData.append("campaign_id", campaignData?.campaign?.id);
    formData.append("campaign_log_id", advertisementId);
    formData.append("society_id", campaignData?.society?.id);
    formData.append("live", "live");

    try {
      // Make the POST request to the API
      const response = await axiosInstance.post(
        `${api_routes.society.post_live_campaign_data}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success("Advertisement Report Updated Successfully!");
        // setFile(null); // Clear the file after successful upload
      }
    } catch (err) {
      // setError("An error occurred while uploading the file.");
      toast.error(err.response?.data?.message || err.response?.data?.error);
      console.log(err);
    } finally {
      setUploading(false); // Stop the loading spinner
    }
  };

  return (
    <Row className="p-3">
      <Col md={6} className="p-0">
        <Card className="px-2 py-1 border-0 position-relative">
          <div className="position-relative">
            <CreativeTypeRender data={campaignData?.logs} type={creativeType} />
            <Button
              variant="dark"
              className="position-absolute bottom-0 end-0 m-1 m-sm-2 border-0 preview-ads"
              onClick={() =>
                openAdsModal(
                  campaignData?.logs?.upload_societies_images_path,
                  creativeType,
                  campaignData?.logs?.societies_text
                )
              }
            >
              <img src="/eye.svg" className="me-0 me-sm-1" /> Preview Ads
            </Button>

            {campaignData?.campaign?.creative_type === "image" && (
              <DownloadImageBtn
                path={campaignData.logs?.upload_societies_images_path}
              />
            )}
          </div>
        </Card>
      </Col>

      <Col md={6} className="p-0">
        <Card className="py-1 px-3 border-0">
          <h6 className="fw-bold">Upload Advertisement Report Details</h6>
          <Form onSubmit={handleSubmit}>
            <p className="mt-2 fw-bold mb-1 custom-label">
              Upload Ads Screenshot
            </p>

            <Card
              {...getRootProps()}
              className="py-2 text-center border-dashed border-2 rounded col-12 mb-1"
              style={{
                fontSize: "10px",
                position: "relative",
                padding: "10px",
              }}
            >
              <input {...getInputProps()} />

              <div className="inner-border d-flex flex-column align-items-center  w-100 p-3">
                <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                <p className="mt-2 mb-1 fw-bold">
                  Drag your document here or Browse
                </p>
                <small className="text-muted">Support PDF / Image</small>
              </div>
            </Card>

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

            <div>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Advertisement"
                  style={{ cursor: "pointer", width: "100px" }}
                />
              )}

              {uploadedImage && (
                <img
                  src={uploadedImage} // Show the uploaded image URL
                  alt="Uploaded Advertisement"
                  style={{ cursor: "pointer", width: "100px" }}
                />
              )}
            </div>

            <Card className="border-0 mt-3">
              <h6 className="fw-bold m-0 custom-label">Note:</h6>
              <p style={{ fontSize: "12px" }}>
                Please upload the first screenshot of the shared post as proof
                of campaign execution.
              </p>
            </Card>
            <Button
              type="submit"
              disabled={!disableButton || uploading}
              style={{
                backgroundColor: uploading ? "#019F88" : "#019F88",
                color: "white",
                padding: "4px 8px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "120px",
                fontSize: "12px",
                display: "inline-block",
              }}
            >
              {uploading ? "Uploading..." : "SUBMIT"}
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
