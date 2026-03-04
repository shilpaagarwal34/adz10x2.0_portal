import React from "react";
import { base_url } from "../../../../config/api";
import { Card, Typography, Divider, Box, CardContent } from "@mui/material";
import {
  formatCampaignType,
  formatNumberWithCommas,
} from "../../../../helper/helper.js";

export default function AdvertisementDetails({
  campaign,
  company,
  campaignAmount,
}) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "10px",
        mt: 2,
        boxShadow: 2,
        maxWidth: 400,
      }}
    >
      <Typography variant="" fontWeight="bold">
        Advertisement Details
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        <img
          src={
            company?.company_profile_photo_path
              ? `${base_url}/${company?.company_profile_photo_path}`
              : "/fallback_img.jpg"
          }
          alt=""
          className="rounded"
          style={{ width: "70px", height: "70px" }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {company?.company_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {company?.address_line_1} <br />
            {company?.address_line_2}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body2">
            <strong>Campaign Type:</strong> <br />{" "}
            {formatCampaignType(campaign ? campaign?.campaign_type : "")}
          </Typography>
          <Typography variant="body2">
            <strong>Media Platform:</strong> <br />{" "}
            {formatCampaignType(campaign?.media_type || "") || "NA"}
          </Typography>
        </Box>

        {campaign?.lead_generation_url && (
          <Typography variant="body2" sx={{ mb: 1, marginTop: "1rem" }}>
            <strong>Lead Generation URL:</strong> <br />{" "}
            <a
              href={campaign.lead_generation_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1976d2", textDecoration: "none" }} // OR use MUI theme color
            >
              {campaign.lead_generation_url}
            </a>
          </Typography>
        )}

        {campaign?.survey_url && (
          <Typography variant="body2" sx={{ mb: 1, marginTop: "1rem" }}>
            <strong>Survey URL:</strong> <br />
            <a
              href={campaign.survey_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              {campaign.survey_url}
            </a>
          </Typography>
        )}

        <Typography variant="body2" sx={{ mb: 1, marginTop: "1rem" }}>
          <strong>Campaign Name:</strong> <br />{" "}
          {formatToTitleCase(campaign?.campaign_name)}
        </Typography>

        <Typography variant="body2" marginTop={2}>
          <strong>Advertisement Date:</strong> <br /> {campaign?.campaign_date}
        </Typography>

        <Typography variant="body2" fontWeight="bold" marginTop={2}>
          <strong>Ads Amount:</strong>
          <br />
          <strong style={{ fontSize: "1.8rem" }}>
            {" "}
            ₹ {campaignAmount && formatNumberWithCommas(campaignAmount)}
          </strong>
        </Typography>
      </CardContent>
    </Card>
  );
}
