import React from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import { base_url } from "../../../../config/api";

export default function SocietyDetails({ society }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "10px",
        boxShadow: 2,
        maxWidth: 400,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography fontWeight="bold">Society Details</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          gap: 2,
          flexWrap: {
            xs: "wrap", // Below 576px
            sm: "nowrap", // 576px and above
          },
        }}
      >
        <img
          src={ society?.society_profile_img_path ? `${base_url}/${society?.society_profile_img_path}` : "/fallback_img.jpg"}
          alt=""
          className="rounded"
          style={{ width: "70px", height:"70px" }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {society?.society_name || "NA"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {society?.address}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
