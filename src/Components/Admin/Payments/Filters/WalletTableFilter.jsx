import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function WalletTableFilter({
  filters,
  handleChange,
  setFilters,
  cities,
  areas,
}) {
  const handleClearFilters = () => {
    setFilters({
      city_id: "",
      area_id: "",
      search: "",
    });
  };

  return (
    <Paper sx={{ p: 3, margin: 3, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              name="city_id"
              value={filters.city_id}
              onChange={handleChange}
            >
              {cities.length &&
                cities?.map((city) => (
                  <MenuItem key={city?.id} value={city?.id}>
                    {city?.city_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Area</InputLabel>
            <Select
              label="Area"
              name="area_id"
              value={filters.area_id}
              onChange={handleChange}
            >
              {areas.length &&
                areas?.map((area) => (
                  <MenuItem key={area?.id} value={area?.id}>
                    {area?.area_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            fullWidth
            className="clearfilter-btn"
          >
            <FilterAltOffIcon sx={{ fontSize: "1.2rem !important" }} />
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
