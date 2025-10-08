import React from "react";
import { Typography, Grid } from "@mui/material";

const ContactInformation = ({ company }) => {
  // Destructure contact details from the company object
  const { name, mobile_number, email } = company;
  // console.log(company)

  return (
    <>
      {/* Contact Information Title */}
      <Typography variant="body2" mt={2} fontWeight={700} fontSize={18}>
        Contact Information
      </Typography>
      {/* Name */}
      <Typography variant="body2" style={{ marginTop: "1rem" }}>
        <strong>Name:</strong>
      </Typography>
      <Typography>{name || "N/A"}</Typography> {/* Fallback value */}
      {/* Mobile & Email */}
      <Grid container spacing={2} style={{ marginTop: "0rem" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Mobile No:</strong>
          </Typography>
          <Typography>{mobile_number || "N/A"}</Typography>{" "}
          {/* Fallback value */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Email Id:</strong>
          </Typography>
          <Typography>{email || "N/A"}</Typography> {/* Fallback value */}
        </Grid>
      </Grid>
    </>
  );
};

export default ContactInformation;
