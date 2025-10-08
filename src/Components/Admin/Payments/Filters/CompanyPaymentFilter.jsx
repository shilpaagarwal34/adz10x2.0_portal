import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function CompanyPaymentFilter({
  filterData,
  setFilterData,
  handleFilterChange,
  companies,
}) {
  const handleClearFilters = () => {
    setFilterData({
      from_date: "",
      to_date: "",
      company: "",
    });
  };
  return (
    <Paper sx={{ padding: 2, margin: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            value={filterData.from_date}
            onChange={(e) => handleFilterChange("from_date", e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            value={filterData.to_date}
            onChange={(e) => handleFilterChange("to_date", e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Company</InputLabel>
            <Select
              value={filterData.company_id}
              onChange={(e) => handleFilterChange("company_id", e.target.value)}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.company_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            fullWidth
            className="clearfilter-btn"
          >
            <FilterAltOffIcon sx={{ fontSize: "1.2rem" }} />
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
