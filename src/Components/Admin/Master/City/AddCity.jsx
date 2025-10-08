import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createCity } from "../../../../store/Actions/Admin/Master/CityActions.js";
import { toast } from "react-toastify";
import {
  adminHasPrivilege,
  formatToTitleCase,
} from "../../../../helper/helper.js";

export default function AddCity({ selectedCity, setSelectedCity }) {
  const [cityName, setCityName] = useState(""); // State to hold the city name
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCity) {
      setCityName(selectedCity.city_name);
    } else {
      setCityName("");
    }
  }, [selectedCity]);

  const handleCancel = () => {
    setCityName("");
    setSelectedCity("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cityName) {
      toast.error("City Name is required!");
      return;
    }

    const formattedValue = formatToTitleCase(cityName);
    if (selectedCity) {
      // If editing an existing city

      dispatch(createCity({ id: selectedCity.id, city_name: formattedValue }));
    } else {
      // If adding a new city
      if (adminHasPrivilege("city_add"))
        dispatch(createCity({ city_name: formattedValue }));
      else toast.error("You Dont have Permission To Add City.");
    }

    setCityName("");
    setSelectedCity(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <>
      <Typography fontWeight="bold">
        {selectedCity ? "Edit City" : "Add City"}
      </Typography>
      <Card
        sx={{
          boxShadow: "none",
          border: "none",
          marginTop: 1,
          backgroundColor: "#fff",
          height: "75vh",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <CardContent>
          {/* Wrap the content inside a form */}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="City Name"
                variant="outlined"
                size="small"
                name="city_name"
                value={cityName} // Controlled input
                onChange={handleInputChange} // Handle input change
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "7px",
                    border: "black !important",
                  },
                  marginTop: "10px",
                }}
              />
            </FormControl>
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  type="submit" // Use type="submit" here to trigger form submission
                >
                  {selectedCity ? "Update" : "Submit"}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
