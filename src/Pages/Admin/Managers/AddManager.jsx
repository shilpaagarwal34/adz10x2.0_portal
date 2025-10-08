import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const AddManager = () => {
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    role: "",
    password: "",
    privileges: [],
  });

  const privilegesList = [
    "Dashboard",
    "Profile",
    "Campaign",
    "Wallet",
    "Payments",
    "Users",
    "Reports",
    "Settings",
  ];

  // Handle form change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const privileges = [
    "Dashboard",
    "Profile",
    "Campaign",
    "Wallet",
    "Payments",
    "Users",
    "Reports",
    "Settings",
  ];

  // Handle privilege selection
  const handlePrivilegeChange = (privilege) => {
    setUserData((prev) => ({
      ...prev,
      privileges: prev.privileges.includes(privilege)
        ? prev.privileges.filter((p) => p !== privilege)
        : [...prev.privileges, privilege],
    }));
  };

  return (
    <Card sx={{ margin: 3 }}>
      <CardHeader
        title="Add New Manager"
        sx={{
          backgroundColor: "#f8f9fa", // Bootstrap-like light gray background
          borderBottom: "1px solid rgba(0, 0, 0, 0.125)", // Light gray border
          paddingY: 2,
          paddingX: 3,
          "& .MuiCardHeader-title": {
            fontSize: "1.2rem", // Adjust font size (20px)
            fontWeight: "600",
          },
        }}
      />

      <CardContent sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* First Row - Name, Mobile No, Email */}
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Name" variant="outlined" size="small" 
            sx={{
                "& .MuiInputBase-input": {
                  padding: "7px", // Removes padding
                  border: "black !important", // Remove border completely
                },
              }}
              />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mobile No"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  padding: "7px", // Removes padding
                  border: "black !important", // Remove border completely
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email ID"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  padding: "7px", // Removes padding
                  border: "black !important", // Remove border completely
                },
              }}
            />
          </Grid>

          {/* Two-Column Layout (Fields on Left, Upload on Right) */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Address Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Upload Picture Section - Moves Below Form on Small Screens */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {/* Circular Profile Upload Button */}
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f4f4f4",
                }}
              >
                <Avatar
                  sx={{ width: "100%", height: "100%" }}
                  src="" // Add profile image URL here dynamically
                  alt="Profile Picture"
                />

                {/* Camera Icon (Overlay) */}
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                  }}
                >
                  <input type="file" hidden />
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Heading Below */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, textAlign: "center" }}
              >
                Upload Your Profile Picture
              </Typography>
            </Paper>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} display="flex" sx={{paddingTop: "0 !important" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                paddingX: 5,
                paddingY: 0.7,
                
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddManager;
