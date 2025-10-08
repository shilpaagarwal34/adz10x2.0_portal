import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const Filter = ({
  selectedCompany,
  selectedCity,
  selectedArea,
  onCompanyChange,
  onCityChange,
  onAreaChange,
  onClearFilters,
  companies,
  cities,
  areas,
  loadingCompanies,
  loadingCities,
  loadingAreas,
}) => {
  return (
    <Paper sx={{ p: 2, margin: 3, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Company Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Company</InputLabel>
            <Select
              label="Company"
              value={selectedCompany ?? ""}
              onChange={onCompanyChange}
            >
              <MenuItem value="">All</MenuItem>
              {loadingCompanies ? (
                <MenuItem disabled>Loading companies...</MenuItem>
              ) : (
                companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.company_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* City Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>City</InputLabel>
            <Select label="City" value={selectedCity} onChange={onCityChange}>
              <MenuItem value="">All</MenuItem>
              {loadingCities ? (
                <MenuItem disabled>Loading cities...</MenuItem>
              ) : (
                cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.city_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Area Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Area</InputLabel>
            <Select label="Area" value={selectedArea} onChange={onAreaChange}>
              <MenuItem value="">All</MenuItem>
              {loadingAreas ? (
                <MenuItem disabled>Loading areas...</MenuItem>
              ) : (
                areas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.area_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Clear Filters Button */}
        <Grid item xs={12} sm={6} md={3}>
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
};

export default Filter;
