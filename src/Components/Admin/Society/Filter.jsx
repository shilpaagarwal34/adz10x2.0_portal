import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function Filter({
  cities,
  areas,
  cityLoading,
  areaLoading,
  selectedCity,
  selectedArea,
  onCityChange,
  onAreaChange,
  onClearFilters,
}) {
  return (
    <Paper sx={{ p: 2, margin: 3, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              value={selectedCity}
              onChange={(e) => {
                onCityChange(e.target.value);
                onAreaChange(""); // Reset area on city change
              }}
              name="city_name"
            >
              {cityLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                cities?.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.city_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Area</InputLabel>
            <Select
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              name="area_name"
              label="Area"
              disabled={!selectedCity}
            >
              {areaLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                areas?.map((area) => (
                  <MenuItem key={area.id} value={area?.id}>
                    {area.area_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            className="clearfilter-btn"
            onClick={onClearFilters}
          >
            <FilterAltOffIcon sx={{ fontSize: "1.2rem !important" }} />
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
