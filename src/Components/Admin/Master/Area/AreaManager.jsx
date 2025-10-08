import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { fetchDropdownCities } from "../../../../store/Actions/Admin/Master/CityActions.js";
import {
  createArea,
  fetchAreaData,
} from "../../../../store/Actions/Admin/Master/AreaActions.js";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  adminHasPrivilege,
  formatToTitleCase,
} from "../../../../helper/helper.js";

export default function AreaManager({ selectedArea, setSelectedArea }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [area, setArea] = useState("");
  const [cityData, setCityData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false); // NEW STATE
  const dispatch = useDispatch();

  const loadCities = async () => {
    setFetchLoading(true); // Start loading

    try {
      const cities = await fetchDropdownCities();
      setCityData(cities);
    } catch (err) {
      toast.error("Failed to load cities:", err);
    } finally {
      setFetchLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadCities(); // Call without async directly on useEffect
  }, []);

  useEffect(() => {
    if (selectedArea && cityData.length > 0) {
      setArea(selectedArea.area_name);
      setSelectedCity(selectedArea.city_id);
    } else if (!selectedArea) {
      setArea("");
      setSelectedCity("");
    }
  }, [selectedArea, cityData]); // ✅ include cityData in the dependency array

  const { submitLoading } = useSelector((state) => state.admin.area);

  useEffect(() => {
    dispatch(fetchAreaData({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  const handleCityCreate = (e) => {
    e.preventDefault();
    if (!area || !selectedCity) {
      toast.error("Please select a city and enter an area name.");
      return;
    }

    const newAreaData = {
      city_id: Number(selectedCity),
      area_name: formatToTitleCase(area),
    };

    if (selectedArea) {
      // If editing an existing city
      dispatch(
        createArea({
          id: selectedArea.id,
          area_name: area,
          city_id: selectedCity,
        })
      );
      setSelectedArea(null);
    } else {
      // If adding a new city
      if (adminHasPrivilege("area_add")) dispatch(createArea(newAreaData));
      else toast.error("You dont have permission to add Area.");
    }
    setSelectedCity(""); // Reset the city selector
    setArea(""); // Reset the area input field
  };

  const handleCancel = () => {
    setArea("");
    setSelectedCity("");
    setSelectedArea(null); // Assuming you want to exit edit mode
  };

  return (
    <>
      <Typography variant="" fontWeight="bold">
        {selectedArea ? "Edit Area" : "Add Area"}
      </Typography>
      <Card
        sx={{
          boxShadow: "none",
          border: "none",
          marginTop: "8px",
          height: "75vh",
          padding: "5px",
        }}
      >
        <CardContent>
          <Form onSubmit={handleCityCreate}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginTop: ".2rem" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ fontSize: "14px" }}>Select City</InputLabel>
                  {
                    <Select
                      value={selectedCity}
                      name="city_id"
                      onChange={(e) => setSelectedCity(e.target.value)}
                      label="Select City"
                      sx={{ fontSize: "14px" }}
                    >
                      <MenuItem value="" disabled>
                        Select City
                      </MenuItem>
                      {fetchLoading ? (
                        <MenuItem disabled>Loading Cities...</MenuItem>
                      ) : cityData?.length > 0 ? (
                        cityData.map((city, i) => (
                          <MenuItem key={i} value={city.id}>
                            {city?.city_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Cities Found</MenuItem>
                      )}
                    </Select>
                  }
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Area Name"
                  name="area_name"
                  value={area}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setArea(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "14px" }, // Reduce label size
                  }}
                />
              </Grid>

              <Grid item xs={12} display="flex" gap={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={submitLoading}
                  startIcon={
                    submitLoading && (
                      <CircularProgress size={18} color="inherit" />
                    )
                  }
                >
                  {submitLoading
                    ? selectedArea
                      ? "Updating..."
                      : "Submitting..."
                    : selectedArea
                    ? "Update"
                    : "Submit"}
                </Button>

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
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
