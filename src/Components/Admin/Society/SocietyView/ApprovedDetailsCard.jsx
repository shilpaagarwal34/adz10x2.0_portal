import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useState } from "react";
import UpdateComissionForm from "../../../Common/UpdateComissionForm.jsx";
import { adminHasPrivilege } from "../../../../helper/helper.js";

export default function ApprovedDetailsCard({ approvedDetails }) {
  const [showForm, setShowForm] = useState(false);

  const isSocietyUser =
    approvedDetails?.user_type === "Society_Admin" ||
    approvedDetails?.user_type === "Society_User";

  const getRawCommissionValue = (key) =>
    isSocietyUser
      ? approvedDetails?.[`society_${key}`]
      : approvedDetails?.[key];

  const commissionValues = {
    "Brand Promotion": getRawCommissionValue("brand_promotion"),
    "Lead Generation": getRawCommissionValue("lead_generation"),
    Survey: getRawCommissionValue("survey"),
  };

  return (
    <>
      <Card sx={{ marginTop: 2, padding: 2 }}>
        <CardContent>
          <div className="d-flex justify-content-between align-items-start">
            <Typography
              variant="h6"
              sx={{ marginBottom: "15px" }}
              fontWeight={600}
              gutterBottom
            >
              Approval Details
            </Typography>
            {adminHasPrivilege("societies_edit") && (
              <img
                src="/edit.svg"
                alt="Edit"
                style={{ cursor: "pointer" }}
                onClick={() => setShowForm(true)}
              />
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Typography variant="body2" fontWeight={600}>
                Status
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "#28a745" }}
              >
                {approvedDetails?.kyc_status.charAt(0).toUpperCase() +
                  approvedDetails?.kyc_status.slice(1).toLowerCase()}
              </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography>
                <strong>Approved By</strong>
              </Typography>
              <Typography variant="body1">
                {approvedDetails?.approved_by_name}
              </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography>
                <strong>Approved Date & Time</strong>
              </Typography>
              <Typography variant="body1">
                {approvedDetails?.approved_reject_date_time}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {showForm && (
        <UpdateComissionForm
          commissionValues={commissionValues}
          isSocietyUser={isSocietyUser}
          commisionUnit={approvedDetails?.society_commission || "INR"}
          companyId={approvedDetails?.company_id}
          societyId={approvedDetails?.society_id}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
}
