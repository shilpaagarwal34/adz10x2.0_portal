import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StatusTabs = ({ tabData = [], activeTab = 0, onTabChange, role }) => {
  const hiddenTabsForRM = ["Pending", "Rejected"];

  // Filter tabs based on role
  const filteredTabs =
    role === "RELATIONSHIP MANAGER"
      ? tabData.filter((tab) => !hiddenTabsForRM.includes(tab.label))
      : tabData;

  // Track active tab safely
  const [safeActiveTab, setSafeActiveTab] = useState(activeTab);

  useEffect(() => {
    // Ensure activeTab is valid with filtered tabs
    if (safeActiveTab >= filteredTabs.length) {
      setSafeActiveTab(0);
      onTabChange?.(filteredTabs[0]?.status);
    }
  }, [filteredTabs, safeActiveTab, onTabChange]);

  const handleTabClick = (index, status) => {
    setSafeActiveTab(index);
    onTabChange?.(status);
  };

  return (
    <Grid container spacing={2}>
      {filteredTabs.map((tab, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <Box
            onClick={() => handleTabClick(index, tab.status)}
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor:
                safeActiveTab === index ? "#D8F1FF" : "transparent",
              color: safeActiveTab === index ? "#0D47A1" : "#333",
              border: "1px solid #ddd",
              "&:hover": { backgroundColor: "#F5F5F5" },
              width: "100%",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {tab.label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {tab.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatusTabs;
