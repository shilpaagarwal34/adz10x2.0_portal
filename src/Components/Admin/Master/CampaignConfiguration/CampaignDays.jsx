import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {
  Typography,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Stack,
  Checkbox,
} from "@mui/material";

const CampaignDays = ({ formData, handleInputChange }) => {
  const [selectedDays, setSelectedDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const [fromTime, setFromTime] = useState(dayjs("00:00", "HH:mm"));
  const [toTime, setToTime] = useState(dayjs("23:59", "HH:mm"));

  // Use useEffect to update the state when formData changes
  useEffect(() => {
    if (formData) {
      setSelectedDays({
        Mon: formData?.mon || false,
        Tue: formData?.tue || false,
        Wed: formData?.wed || false,
        Thu: formData?.thu || false,
        Fri: formData?.fri || false,
        Sat: formData?.sat || false,
        Sun: formData?.sun || false,
      });

      setFromTime(dayjs(formData?.from_time || "00:00", "HH:mm"));
      setToTime(dayjs(formData?.to_time || "23:59", "HH:mm"));
    }
  }, [formData]); // This will trigger when formData changes

  // Handle day selection and update formData state in the parent
  const handleDayChange = (day) => {
    const updatedDays = { ...selectedDays, [day]: !selectedDays[day] };
    setSelectedDays(updatedDays);
    handleInputChange({
      target: { name: day.toLowerCase(), value: updatedDays[day] }, // Ensure correct field names
    });
  };

  // Handle time changes and update formData state in the parent
  const handleTimeChange = (type, newValue) => {
    if (type === "from") {
      setFromTime(newValue);
      handleInputChange({
        target: { name: "from_time", value: newValue.format("HH:mm") }, // Correctly passing 'from_time'
      });
    } else {
      setToTime(newValue);
      handleInputChange({
        target: { name: "to_time", value: newValue.format("HH:mm") }, // Correctly passing 'to_time'
      });
    }
  };

  return (
    <Grid item>
      <Typography variant="" gutterBottom sx={{ fontWeight: "bold" }}>
        Campaign Days for Societies
      </Typography>
      <Card sx={{ backgroundColor: "#fff", boxShadow: "none" }} elevation={0}>
        <CardContent sx={{ padding: "10px 0px !important" }}>
          {/* Days Selection */}
          <Grid container spacing={1}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Grid item key={day}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays[day]} // Bind checkbox state to the selectedDays object
                      onChange={() => handleDayChange(day)} // Toggle the state for the specific day
                      sx={{
                        color: "#ddd", // Default color
                        "&.Mui-checked": {
                          color: "#002F4A", // Custom checked color
                        },
                      }}
                    />
                  }
                  label={day}
                />
              </Grid>
            ))}
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} my={2}>
              <TimePicker
                label="From"
                value={fromTime}
                onChange={(newValue) => handleTimeChange("from", newValue)} // Update 'From' time value
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "0px",
                    border: "black !important", // Remove border completely
                    width: "130px",
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "14px", // Reduce font size
                    padding: "4px 8px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px", // Smaller clock icon
                    margin: "0px 8px",
                  },
                }}
              />

              <TimePicker
                label="To"
                value={toTime}
                onChange={(newValue) => handleTimeChange("to", newValue)} // Update 'To' time value
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "0px",
                    border: "black !important", // Remove border completely
                    width: "130px",
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "14px", // Reduce font size
                    padding: "4px 8px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px", // Smaller clock icon
                    margin: "0px 8px",
                  },
                }}
              />
            </Stack>
          </LocalizationProvider>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CampaignDays;
