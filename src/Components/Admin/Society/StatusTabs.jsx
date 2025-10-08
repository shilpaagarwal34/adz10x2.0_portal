import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Box2 } from "react-bootstrap-icons";

export default function StatusTabs() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Box2
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            cursor: "pointer",
            backgroundColor: 1 === 1 ? "#D8F1FF" : "transparent",
            color: 1 === 1 ? "#0D47A1" : "#333",
            border: "1px solid #ddd",
            "&:hover": { backgroundColor: "#F5F5F5" },
            width: "100%",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Label
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            count
          </Typography>
        </Box2>
      </Grid>
    </Grid>
  );
}
