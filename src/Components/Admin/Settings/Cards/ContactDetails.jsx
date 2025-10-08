import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@mui/material";
import { adminHasPrivilege } from "../../../../helper/helper";

export default function ContactDetails({
  data,
  onChange,
  submitting,
  handleSubmit,
  handleCancel,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper className="settings-card" elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Contact Details
        </Typography>

        <TextField
          label="Email Address"
          name="email"
          value={data.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ sx: { fontSize: "14px" } }}
          sx={{ "& .MuiInputBase-input": { padding: "7px" } }}
        />

        <TextField
          label="Mobile No."
          name="mobile_no" // change from mobile to mobile_no
          value={data.mobile_no}
          onChange={handleChange}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ sx: { fontSize: "14px" } }}
          sx={{ "& .MuiInputBase-input": { padding: "7px" } }}
        />

        <TextField
          label="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ sx: { fontSize: "14px" } }}
          sx={{ "& .MuiInputBase-input": { padding: "7px" } }}
        />

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
