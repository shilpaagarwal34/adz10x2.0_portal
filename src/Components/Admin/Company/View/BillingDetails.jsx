import React from "react";
import { Typography, Grid } from "@mui/material";

const BillingDetails = ({ company }) => {
  // Destructure billing details from the company object
  const {
    account_holder_name,
    party_name,
    gst_number,
    bank_name,
    account_no,
    branch_name,
    bank_ifsc_code,
    billing_address_line_1,
    billing_address_line_2,
  } = company;

  return (
    <Grid container spacing={2} mt={2}>
      {/* Billing Details Title */}
      <Grid item xs={12}>
        <Typography variant="body2" fontWeight={600} fontSize={17}>
          Billing Details
        </Typography>
      </Grid>

      {/* First Row */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="body2">
          <strong>Billing Company Name:</strong>
        </Typography>
        <Typography>{party_name || "N/A"}</Typography>{" "}
        {/* Fallback value */}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="body2">
          <strong>GST Number:</strong>
        </Typography>
        <Typography>{gst_number || "N/A"}</Typography> {/* Fallback value */}
      </Grid>

      {/* Second Row */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <Typography variant="body2">
          <strong>Account No.:</strong>
        </Typography>
        <Typography>{account_no || "N/A"}</Typography> 
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="body2">
          <strong>Branch Name:</strong>
        </Typography>
        <Typography>{branch_name || "N/A"}</Typography> 
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="body2">
          <strong>Bank IFSC Code:</strong>
        </Typography>
        <Typography>{bank_ifsc_code || "N/A"}</Typography>{" "}
      </Grid> */}

      {/* Address Row */}
      <Grid item xs={12} md={8}>
        <Typography variant="body2">
          <strong>Billing Address Line 1:</strong>
        </Typography>
        <Typography>{billing_address_line_1 || "N/A"}</Typography>{" "}
        {/* Fallback value */}
        <Typography variant="body2" mt={1}>
          <strong>Billing Address Line 2:</strong>
        </Typography>
        <Typography>{billing_address_line_2 || "N/A"}</Typography>{" "}
        {/* Fallback value */}
      </Grid>
    </Grid>
  );
};

export default BillingDetails;
