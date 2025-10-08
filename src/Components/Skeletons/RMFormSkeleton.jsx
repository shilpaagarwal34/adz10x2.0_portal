import Skeleton from "react-loading-skeleton";
import { Card, CardContent, Grid, Box } from "@mui/material";

const RMFormSkeleton = () => {
  return (
    <Card sx={{ marginTop: 2, padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Status Dropdown */}
          <Grid item xs={12} md={6}>
            <Skeleton height={40} />
          </Grid>

          {/* Relationship Manager Dropdown */}
          <Grid item xs={12} md={6}>
            <Skeleton height={40} />
          </Grid>

          {/* Radio Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
            </Box>
          </Grid>

          {/* Commission Input Fields */}
          {[...Array(3)].map((_, idx) => (
            <Grid key={idx} item xs={12} md={4}>
              <Skeleton width="40%" height={20} style={{ marginBottom: 8 }} />
              <Skeleton height={40} />
            </Grid>
          ))}

          {/* Agreement Upload */}
          <Grid item xs={12}>
            <Skeleton width="30%" height={20} style={{ marginBottom: 8 }} />
            <Skeleton height={100} />
          </Grid>

          {/* Reject Remark (optional section) */}
          <Grid item xs={12}>
            <Skeleton height={70} />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Skeleton height={40} width={100} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RMFormSkeleton;
