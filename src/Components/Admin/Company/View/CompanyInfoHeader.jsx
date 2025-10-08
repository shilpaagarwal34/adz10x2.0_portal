import React from "react";
import { Grid, Avatar, Typography, Divider } from "@mui/material";
import { base_url } from "../../../../config/api.js";
export default function CompanyInfoHeader({ company, accountStatus }) {
  // Destructure the data from the company prop
  const { company_name, company_brand_name, company_profile_photo_path } =
    company;

  // Function to render status badge
  const renderStatusBadge = () => {
    switch (accountStatus) {
      case "pending":
        return (
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
            Status - Pending
          </Typography>
        );
      case "approved":
        return (
          <Typography
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              borderRadius: "14px",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            Status - Approved
          </Typography>
        );
      case "rejected":
        return (
          <Typography
            sx={{
              backgroundColor: "#D74141",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              borderRadius: "14px",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            Status - Rejected
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            className="rounded"
            sx={{ width: 60, height: 60 }}
            src={
              company_profile_photo_path
                ? `${base_url}/${company_profile_photo_path}`
                : "/fallback_img.jpg"
            }
          />
        </Grid>

        <Grid item xs className="d-flex justify-content-between">
          <div>
            <Typography variant="h6" fontWeight="bold">
              {company_name || "Company Name"} {/* Use fallback name */}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {company_brand_name || "Brand Name"}{" "}
              {/* Use fallback brand name */}
            </Typography>
          </div>
          <div>
            {/* Render the status badge dynamically */}
            {renderStatusBadge()}
          </div>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: ".6rem" }} />
    </div>
  );
}
