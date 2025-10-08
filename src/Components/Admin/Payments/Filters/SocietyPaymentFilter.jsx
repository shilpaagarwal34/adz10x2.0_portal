import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function SocietyPaymentFilter({
  filters,
  handleChange,
  setFilters,
  cities,
  areas,
  loading,
  socities,
  loadingSocieties,
}) {
  const handleClearFilters = () => {
    setFilters({
      city_id: "",
      area_id: "",
      society_id: "",
    });
  };

  return (
    <Paper sx={{ padding: 2, margin: 3, borderRadius: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} lg={3} md={2.4}>
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
        <Grid item xs={12} sm={6} lg={3} md={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel size="small">Area</InputLabel>
            <Select
              label="Area"
              name="area_id"
              value={filters.area_id}
              onChange={handleChange}
            >
              {loading && <p>Loading...</p>}
              {areas.length &&
                areas?.map((area) => (
                  <MenuItem key={area?.id} value={area?.id}>
                    {area?.area_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={3} md={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel size="small">Society</InputLabel>
            <Select
              name="society_id"
              value={filters.society_id}
              onChange={handleChange}
              label="society"
            >
              {loadingSocieties && <p>Loading...</p>}
              {socities?.length &&
                socities?.map((society, i) => (
                  <MenuItem key={i} value={society.id}>
                    {society?.society_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} lg={3} md={2.4}>
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
