import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  MenuItem,
  Select,
  Grid,
  InputLabel,
  FormControl,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
//
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  fetchAdByID,
  getTimeSlots,
  postChangeSocietyCampaignStatus,
} from "../../../store/Actions/Admin/Campaigns/CampaignActions.js";
import {
  getTimeSlotsForToday,
  formatTime,
  formatToTitleCase,
  convertTo24HourFormat,
  adminHasPrivilege,
} from "../../../helper/helper.js";

import { toast } from "react-toastify";
import SocietyDetails from "../../../Components/Admin/Campaigns/View/SocietyDetails.jsx";
import AdvertisementDetails from "../../../Components/Admin/Campaigns/View/AdvertisementDetails.jsx";

import { useAdsModal } from "../../../Context/AdsModalContext.jsx";
import LiveCardSkeleton from "../../../Components/Skeletons/Campaign/LiveCardSkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Components/Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import SocietyDetailsSkeleton from "../../../Components/Skeletons/Campaign/SocietyDetailsSkeleton.jsx";
import CreativeTypeRender from "../../../utils/CreativeTypeRender.jsx";
import DownloadImageBtn from "../../../Components/Common/Campaign/DownloadImageBtn.jsx";

const CampaignView = () => {
  const { logId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [hoursToShow, setHoursToShow] = useState([]);
  const [campaignData, setCampaignData] = useState({
    society: null,
    company: null,
    campaign: null,
    logs: [],
    timeSlots: [],
    hoursToShow: [],
  });

  const [isApprovedChecked, setIsApprovedChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [remark, setRemark] = useState("");
  const [adminCancelReason, setAdminCancelReason] = useState(""); // To hold the rejected reason

  const { openAdsModal } = useAdsModal();

  const [loading, setLoading] = useState(true); // 👈 Add loading state

  const isActive = location.pathname === "/dashboard/campaigns";

  useEffect(() => {
    const getCampaignData = async () => {
      setLoading(true);

      try {
        // 📦 1. Fetch campaign and logs
        const res = await fetchAdByID({ campaignLogId: logId });
        const { society, company, campaign_logs: logs, campaign } = res?.data;

        // console.log(res?.data);

        // 🕐 2. Fetch time slots for the related society
        const slotRes = await getTimeSlots({ society_id: society?.id });
        const timeSlots = slotRes?.data || [];

        const hoursToShow = getTimeSlotsForToday(
          timeSlots,
          campaign?.campaign_date
        );

        setHoursToShow(hoursToShow);

        setCampaignData({
          society,
          company,
          campaign,
          logs,
          timeSlots,
          hoursToShow,
        });
      } catch (error) {
        toast.error(error?.message);
        // console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [logId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    if (event.target.value === "reject") {
      setIsApprovedChecked(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsApprovedChecked(event.target.checked);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
    setAdminCancelReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!status) {
      toast.error("Please Select Status.");
      return;
    }

    if (!selectedTimeSlot && status === "approved" && isApprovedChecked) {
      toast.error("Please Select Timeslot.");
      return;
    }

    // Convert selected time to 24-hour format
    const [startTime, endTime] = selectedTimeSlot
      .split(" - ")
      .map(convertTo24HourFormat);

    let formData = {
      id: logId,
      admin_approved_status: status,
    };

    if (status === "approved") {
      formData = {
        ...formData,
        society_approved_status: isApprovedChecked ? "approved" : null,
        slot_start_time: startTime || null,
        slot_end_time: endTime || null,
      };
    } else {
      formData.admin_cancel_reason = adminCancelReason || null;
    }

    try {
      // Call API to submit the data
      const response = await postChangeSocietyCampaignStatus(formData);
      // Assuming 'response' contains status or message
      if (response.status === 200) {
        // console.log(response);
        toast.success(response.message);
        navigate(-1);
      } else {
        toast.error("Failed to update the campaign status. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        marginBottom: "0rem",
      }}
      className={isActive ? "active" : ""}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <LiveCardSkeleton />
          ) : (
            <Card sx={{ p: 2, borderRadius: "10px", height: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
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
                      backgroundColor: "#FAB600",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "14px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    Status -{" "}
                    {formatToTitleCase(
                      campaignData?.campaign?.campaign_status
                    ) || "NA"}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 0, mb: 0 }} />
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={7}>
                  <div className="position-relative">
                    <CreativeTypeRender
                      type={campaignData?.campaign?.creative_type}
                      data={campaignData.logs}
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
                          campaignData.logs?.upload_societies_images_path,
                          campaignData?.campaign?.creative_type,
                          campaignData?.logs?.societies_text
                        )
                      }
                    >
                      <img src="/eye.svg" className="me-1" /> Preview Ads
                    </Button>

                    {/* Download Image Button - Left Bottom */}
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
                    Advertisement Action
                  </Typography>

                  <FormControl fullWidth size="small" margin="dense">
                    <InputLabel>Select Status</InputLabel>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      label="Select Status"
                      required
                    >
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="reject">Rejected</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Show checkbox only if "Approved" is selected */}
                  {status === "approved" && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isApprovedChecked}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label="Approved with Society"
                    />
                  )}

                  <Box
                    sx={{
                      mt: 0,
                      transition: "all 0.3s ease-out",
                      // display: isApprovedChecked ? "block" : "none", // Only show when checkbox is checked
                    }}
                  >
                    <FormControl
                      fullWidth
                      size="small"
                      margin="dense"
                      className="mb-3"
                    >
                      {status === "approved" && isApprovedChecked && (
                        <>
                          <InputLabel>Select Time Slot</InputLabel>
                          <Select
                            label="Select Time Slot"
                            value={selectedTimeSlot}
                            onChange={handleTimeSlotChange}
                            fullWidth
                          >
                            {hoursToShow.map((hour) => {
                              const startTime = formatTime(hour);
                              const endTime = formatTime(hour + 1);
                              return (
                                <MenuItem
                                  key={hour}
                                  value={`${startTime} - ${endTime}`}
                                >
                                  {startTime} - {endTime}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </>
                      )}
                    </FormControl>
                  </Box>

                  {status === "reject" && (
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Remark"
                      value={adminCancelReason}
                      onChange={handleRemarkChange}
                    ></textarea>
                  )}
                  {adminHasPrivilege("campaigns_edit") && (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={handleSubmit}
                      type="submit" // Make sure the button is submitting the form
                      disabled={loading} // Disable button when loading
                    >
                      Submit
                    </Button>
                  )}

                  {/* Note Section */}
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", marginTop: "7rem" }}
                  >
                    <strong>Note:</strong> Ensure all guidelines are met,
                    including content, format, and visual clarity. Approve the
                    ad if everything is in place.
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
            <SocietyDetails society={campaignData?.society} />
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignView;
