
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";


const TabsCard = ({tabsData, selectedStatus, setSelectedStatus}) => {
  
    return (
        <Card sx={{ margin: 2, padding: 2 }}>
  <CardContent>
    <Grid container spacing={2} alignItems="center" justifyContent="stretch">
      {tabsData.map((data) => (
        <Grid item xs={12} sm={6} md={2} key={data.label}>
          <Box
            onClick={() => setSelectedStatus(data.label)}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "left",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: selectedStatus === data.label ? "#E3F2FD" : "transparent",
              color: selectedStatus === data.label ? "#0D47A1" : "#333",
              borderRight: "1px solid #ddd",
              "&:hover": { backgroundColor: "#F5F5F5" },
              height: "100%",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {data.label} <br /> Campaigns
            </Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: "bold" }}>
              {data.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>

    )

}

export default TabsCard;