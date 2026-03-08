import { Row, Col, Card, Button } from "react-bootstrap";
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
  const { openAdsModal } = useAdsModal();
  const creativeType = campaignData?.campaign?.creative_type;

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
                  campaignData?.logs?.societies_text,
                  campaignData?.campaign?.media_type
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
    </Row>
  );
}
