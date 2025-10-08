import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  RadioGroup,
  Radio,
  InputAdornment,
} from "@mui/material";

export default function SocietyComission({
  formData,
  setFormData,
  handleInputChange,
  errors,
}) {
  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    // handleInputChange(e); // update parent state
    // if (name === "society_commission") {
    //   setCommissionType(value); // update local state for adornment
    // }

    setFormData((prev) => ({
      ...prev,
      society_commission: value, // make sure to update this also
      society_brand_promotion: 0,
      society_lead_generation: 0,
      society_survey: 0,
    }));
  };

  return (
    <Grid item={true}>
      <Typography gutterBottom sx={{ fontWeight: "bold" }}>
        Society Commission
      </Typography>
      <RadioGroup
        row
        name="society_commission" // Ensure the name matches with the state key
        value={formData?.society_commission} // Bind the radio group value to formData
        onChange={handleRadioChange} // Handle input change when radio button is clicked
      >
        <FormControlLabel value="INR" control={<Radio />} label="₹" />
        <FormControlLabel value="%" control={<Radio />} label="%" />
      </RadioGroup>
      <Grid container spacing={3} style={{ paddingTop: "24px" }}>
        {[
          "society_brand_promotion",
          "society_lead_generation",
          "society_survey",
        ].map((item) => (
          <Grid item={true} xs={12} md={4} key={item} className="pt-0">
            <Card
              sx={{ backgroundColor: "#fff", boxShadow: "none" }}
              elevation={0}
            >
              <CardContent sx={{ padding: "10px 0px !important" }}>
                <Typography variant="" gutterBottom sx={{ fontSize: "15px" }}>
                  {item === "society_brand_promotion"
                    ? "Brand Promotion"
                    : item === "society_lead_generation"
                    ? "Lead Generation"
                    : "Survey"}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  border="1px solid #ddd"
                  borderRadius={1}
                  p={0.6}
                >
                  <TextField
                    variant="standard"
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: 0,
                        border: "black !important",
                      },
                    }}
                    placeholder="Enter amount"
                    fullWidth
                    type="number"
                    name={item}
                    value={formData[item] || ""}
                    onChange={handleInputChange}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="start">
                          {formData?.society_commission === "INR" ? "₹" : "%"}
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "14px",
                        "&::placeholder": {
                          fontSize: "14px",
                          color: "#757575",
                        },
                      },
                    }}
                    size="small"
                    InputLabelProps={{
                      sx: { fontSize: "14px" },
                    }}
                  />
                </Box>

                {errors?.[item] && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors[item]}
                  </Typography>
                )}

                {item === "society_brand_promotion" && (
                  <Typography variant="body2" sx={{ mt: 1, color: "#757575" }}>
                    Fixed For Campaign
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
