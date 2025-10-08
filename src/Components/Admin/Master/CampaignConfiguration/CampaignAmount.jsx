import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function CampaignAmount({
  formData,
  handleInputChange,
  errors,
}) {
  return (
    <Grid item={true}>
      <Typography variant="" gutterBottom sx={{ fontWeight: "bold" }}>
        Campaign Amount
      </Typography>
      <Grid container spacing={3} style={{ paddingTop: "24px" }}>
        {["brand_promotion", "lead_generation", "survey"].map((item) => (
          <Grid item={true} xs={12} md={6} lg={4} key={item} className="pt-0">
            <Card
              sx={{ backgroundColor: "#fff", boxShadow: "none" }}
              elevation={0}
            >
              <CardContent sx={{ padding: "10px 0px !important" }}>
                <Typography variant="" gutterBottom sx={{ fontSize: "15px" }}>
                  {item === "brand_promotion"
                    ? "Brand Promotion"
                    : item === "lead_generation"
                    ? "Lead Generation"
                    : "Survey"}
                  <span className="text-danger">*</span>
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  border="1px solid #ddd"
                  borderRadius={1}
                  width={"auto"}
                  p={0.6}
                >
                  <TextField
                    variant="standard"
                    placeholder="Enter amount"
                    fullWidth
                    type="number" // Using type number for numeric input
                    name={item} // Using the field name dynamically
                    value={formData[item]} // Value from the parent state
                    onChange={handleInputChange} // Handling input changes
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: 0, // Removes padding
                        border: "black !important", // Remove border completely
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontSize: "14px", // Reduce input text size
                        "&::placeholder": {
                          fontSize: "14px", // Reduce placeholder size
                          color: "#757575", // Optional: Adjust color
                        },
                      },
                    }}
                    size="small"
                  />
                  <Typography
                    sx={{ mr: 1, color: "#757575", fontSize: "14px" }}
                  >
                    ₹
                  </Typography>
                </Box>

                {errors?.[item] && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors[item]}
                  </Typography>
                )}

                {item === "brand_promotion" && (
                  <Typography variant="body2" sx={{ mt: 1, color: "#757575" }}>
                    As per society
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
