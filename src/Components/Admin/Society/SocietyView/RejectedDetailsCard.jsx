import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Button } from "react-bootstrap";
import { changeRejectToPending } from "../../../../store/Actions/Admin/Society/SocietyAction.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const RejectedDetailsCard = ({ approvedDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [submitLoading, setSubmitLoading] = useState(false);

  const handlePendingStatus = async () => {
    setSubmitLoading(true);
    try {
      let payload = location.pathname.startsWith("/admin/company")
        ? { id: approvedDetails?.company_id, userRole: "company" }
        : { id: approvedDetails?.society_id, userRole: "society" };

      const data = await changeRejectToPending(payload);

      if (data.status === 200) {
        if (payload?.userRole === "society") navigate("/admin/societies");
        else navigate("/admin/company");
        toast.success("Society Moved to pending successfully");
      }
    } catch (err) {
      toast.error(err?.message || err?.response?.data?.message);
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
          <Typography
            variant="h6"
            sx={{ marginBottom: "15px" }}
            fontWeight={600}
            gutterBottom
          >
            Rejected Details
          </Typography>
          <Button
            onClick={handlePendingStatus}
            disabled={submitLoading}
            style={{
              backgroundColor: "#FAB600",
              color: "#fff",
              padding: "0 !important",
              borderRadius: "5px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              border: "0",
            }}
            className="mb-3 mb-sm-0"
          >
            {submitLoading ? "Submitting" : "Move To Pending"}
          </Button>
        </div>

        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography variant="body2" fontWeight={600}>
              Status
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "#f44336" }}
            >
              {approvedDetails?.kyc_status.charAt(0).toUpperCase() +
                approvedDetails?.kyc_status.slice(1).toLowerCase()}
            </Typography>
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography>
              <strong>Rejected By</strong>
            </Typography>
            <Typography variant="body1">
              {approvedDetails?.rejected_by_name}
            </Typography>
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography>
              <strong>Rejected Date & Time</strong>
            </Typography>
            <Typography variant="body1">
              {approvedDetails?.approved_reject_date_time}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              <strong>Remark</strong>
            </Typography>
            <Typography variant="body1">{approvedDetails?.remark}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RejectedDetailsCard;
