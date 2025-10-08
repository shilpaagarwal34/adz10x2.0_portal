import { Grid, Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Plus } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";


function Tabs({ tabData, selectedStatus, setSelectedStatus }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Grid container spacing={2}>
      {location.pathname.startsWith("/company/campaign") && (
        <Grid item xs={12} sm={4} lg={2}>
          <Button
            className="d-flex flex-column justify-content-center align-items-center new-campaign-btn"
            onClick={() => navigate("/company/campaign/newcampaign")}
          >
            <Plus size={20} className="mb-1" />
            NEW CAMPAIGN
          </Button>
        </Grid>
      )}

      {/* STATUS TABS */}
      {tabData?.map((campaign) => (
        <Grid item xs={12} sm={4} lg={2} key={campaign.label}>
          <Box
            onClick={() => setSelectedStatus(campaign.status)}
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor:
                selectedStatus === campaign.status ? "#D8F1FF" : "transparent",
              color: selectedStatus === campaign.status ? "#0D47A1" : "#333",
              border: "1px solid #ddd",
              "&:hover": { backgroundColor: "#F5F5F5" },
              width: "100%",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {campaign.label} <br /> Campaigns
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {campaign.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Tabs;
