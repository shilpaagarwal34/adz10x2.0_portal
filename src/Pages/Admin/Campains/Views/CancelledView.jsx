import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, Typography, Button, Grid, Divider } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApprovedDetail from "../../../../Components/Society/Advertisement/Approved/ApprovedDetail.jsx";
import SocietyDetails from "../../../../Components/Admin/Campaigns/View/SocietyDetails.jsx";
import AdvertisementDetails from "../../../../Components/Admin/Campaigns/View/AdvertisementDetails.jsx";
import { fetchAdByID } from "../../../../store/Actions/Admin/Campaigns/CampaignActions.js";
import { base_url } from "../../../../config/api.js";
import { downloadFile } from "../../../../helper/helper.js";
import { useAdsModal } from "../../../../Context/AdsModalContext.jsx";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import SocietyDetailsSkeleton from "../../../../Components/Skeletons/Campaign/SocietyDetailsSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../../Components/Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import LiveCardSkeleton from "../../../../Components/Skeletons/Campaign/LiveCardSkeleton.jsx";
import DownloadImageBtn from "../../../../Components/Common/Campaign/DownloadImageBtn.jsx";

const CancelledView = () => {
  const { id } = useParams(); // Get Campaign ID from URL
  const [loading, setLoading] = useState(false);
  const { openAdsModal } = useAdsModal();

  const [campaignData, setCampaignData] = useState({
    society: null,
    company: null,
    campaign: null,
    logs: null,
    advertisement: null,
  });

  useEffect(() => {
    const getCampaignData = async () => {
      setLoading(true);

      try {
        const res = await fetchAdByID({ campaignLogId: id });
        const {
          society,
         company,
          campaign_logs: logs,
          campaign,
          advertisement,
        } = res?.data;

        setCampaignData({
          society,
          company,
          campaign,
          logs,
          advertisement,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <LiveCardSkeleton />
          ) : (
            <Card sx={{ p: 2, borderRadius: "10px" }}>
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
                  <Typography fontWeight="bold">
                    Advertisement Details
                  </Typography>
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
                    ID #{campaignData?.logs?.id_prifix_campaign_ads}
                  </Typography>
                  <Typography
                    sx={{
                      backgroundColor: "#D74141",
                      color: "#fff",
                      px: 2,
                      py: 0.5,
                      borderRadius: "14px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    Status - Cancelled
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 0, mb: 0 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <div className="position-relative">
                    <CreativeTypeRender
                      type={campaignData?.campaign?.creative_type}
                      data={campaignData?.logs}
                    />

                    {/* Preview Ads Button - Right Bottom */}
                    <Button
                      variant="dark"
                      className="position-absolute bottom-0 end-0 m-0 m-sm-2 preview-ads"
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
                          campaignData?.logs?.upload_societies_images_path,
                          campaignData?.campaign?.creative_type,
                          campaignData?.logs?.societies_text,
                          campaignData?.campaign?.media_type
                        )
                      }
                    >
                      <img src="/eye.svg" className="me-1" /> Preview Ads
                    </Button>

                    {/* Download Image Button - Left Bottom */}
                    {/* <Button
                      variant="dark"
                      className="position-absolute bottom-0 start-0 m-0 m-sm-2 download-img border-0"
                      style={{
                        zIndex: 2,
                        fontSize: "12px",
                        padding: "1px 10px",
                        backgroundColor: "#019F88",
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() =>
                        downloadFile(
                          `${base_url}/${campaignData?.logs?.upload_societies_images_path}`
                        )
                      }
                    >
                      <img src="/download-icon.svg" className="me-1" /> Download
                      image
                    </Button> */}

                       {campaignData?.campaign?.creative_type === "image" && (
                                            <DownloadImageBtn
                                              path={campaignData.logs?.upload_societies_images_path}
                                            />
                                          )}

                  </div>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    Advertisement Cancellation Details
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 2, fontSize: ".9rem" }}
                  >
                    Canceled By:
                  </Typography>
                  <Typography sx={{ fontSize: ".9rem" }}>
                    {campaignData?.logs?.modified_by_name || "NA"}
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 2, fontSize: ".9rem" }}
                  >
                    Remark:
                  </Typography>
                  <Typography sx={{ fontSize: ".9rem" }}>
                    {campaignData?.logs?.cancel_reason || "NA"}
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 2, fontSize: ".9rem" }}
                  >
                    Date & Time:
                  </Typography>
                  <Typography sx={{ fontSize: ".9rem" }}>
                    {campaignData?.logs?.updatedAtFormatted || "NA"}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 12,
                      color: "red",
                      fontWeight: "",
                      fontSize: ".8rem",
                    }}
                  >
                    Note: Your advertisement payment will be refunded to your
                    wallet due to the cancellation status.
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {loading ? (
            <SocietyDetailsSkeleton />
          ) : (
            <SocietyDetails id={id} society={campaignData?.society} />
          )}

          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <AdvertisementDetails
              campaign={campaignData?.campaign}
              company={campaignData?.company}
              campaignAmount={campaignData?.logs?.campaign_ads_amount}
            />
          )}
          <ApprovedDetail data={campaignData?.logs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CancelledView;
