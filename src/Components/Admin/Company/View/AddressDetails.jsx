import React from "react";
import { Typography, Grid } from "@mui/material";

const AddressDetails = ({ company }) => {
  // Destructure address details from the company object
  const { address_line_1, address_line_2, city_name, area_name, pincode } =
    company;

  return (
    <>
      {/* Address Details Heading */}
      <Typography variant="body2" mt={2} fontWeight={700} fontSize={18}>
        Address Details
      </Typography>

      <Grid container spacing={2} style={{ marginTop: "0rem" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Area:</strong>
          </Typography>
          <Typography>{area_name || "-"}</Typography> {/* Fallback value */}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>City:</strong>
          </Typography>
          <Typography>{city_name || "-"}</Typography> {/* Fallback value */}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Pincode:</strong>
          </Typography>
          <Typography>{pincode || "-"}</Typography> {/* Fallback value */}
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="body2">
            <strong>Address Line 1:</strong>
          </Typography>
          <Typography>{address_line_1 || "-"}</Typography>{" "}
          {/* Fallback value */}
          {address_line_2 && (
            <>
              <Typography variant="body2" mt={1}>
                <strong>Address Line 2:</strong>
              </Typography>
              <Typography>{address_line_2 || "-"}</Typography>{" "}
            </>
          )}
          {/* Fallback value */}
        </Grid>
      </Grid>
    </>
  );
};

export default AddressDetails;
