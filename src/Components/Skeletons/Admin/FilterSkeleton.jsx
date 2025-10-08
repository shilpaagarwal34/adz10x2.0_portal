import { Grid, Paper } from "@mui/material";
import Skeleton from "react-loading-skeleton";

const FilterSkeleton = () => (
  <Paper sx={{ p: 2, margin: 3, borderRadius: 2 }}>
    <Grid container spacing={2}>
      {[...Array(3)].map((_, idx) => (
        <Grid item xs={3} key={idx}>
          <Skeleton height={40} />
        </Grid>
      ))}
      <Grid item xs={2}>
        <Skeleton height={40} />
      </Grid>
    </Grid>
  </Paper>
);

export default FilterSkeleton;
