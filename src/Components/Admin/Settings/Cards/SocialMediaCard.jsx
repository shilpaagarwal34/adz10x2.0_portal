import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { adminHasPrivilege } from "../../../../helper/helper";

export default function SocialMediaCard({
  data,
  onChange,
  submitting,
  handleSubmit,
  handleCancel,
}) {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper className="settings-card" elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Social Media Details
        </Typography>

        {[
          "facebook_url",
          "linkedin_url",
          "instagram_url",
          "twitter_url",
          "skype_url",
        ].map((field) => (
          <TextField
            key={field}
            label={
              field
                .replace("_url", "")
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()) + " URL"
            }
            name={field}
            value={data[field] || ""}
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              sx: { fontSize: "14px" },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: "7px",
                // Remove or customize border styles if needed
                border: "black !important",
              },
            }}
          />
        ))}

        {adminHasPrivilege("general_settings_edit") && (
          <div
            className="button-group"
            style={{ marginTop: 16, display: "flex", gap: 10 }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </Paper>
    </Grid>
  );
}
