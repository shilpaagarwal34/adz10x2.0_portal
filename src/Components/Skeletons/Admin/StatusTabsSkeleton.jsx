import { Grid, Box } from "@mui/material";
import Skeleton from "react-loading-skeleton";

const StatusTabsSkeleton = ({count = 3}) => (
  <Grid container spacing={2}>
    {[...Array(count)].map((_, idx) => (
      <Grid item xs={12} sm={6} md={2.4} key={idx}>
        <Box sx={{ px: 2, py: 1.5 }}>
          <Skeleton height={60} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default StatusTabsSkeleton;
