import Skeleton from "react-loading-skeleton";
import { Card, CardContent, Grid, Divider, Box } from "@mui/material";

const DetailCardSkeleton = () => {
  return (
    <Card sx={{ padding: 2, borderRadius: 2 }}>
      <CardContent>
        {/* Header */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Skeleton circle width={60} height={60} />
          </Grid>
          <Grid item xs>
            <Box display="flex" justifyContent="space-between">
              <Box flex={1}>
                <Skeleton height={25} width={180} />
                <Skeleton height={18} width={250} />
              </Box>
              <Box ml={2}>
                <Skeleton height={30} width={100} borderRadius={14} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: ".4rem" }} />

        {/* Society Details */}
        <Box mt={2}>
          <Skeleton height={22} width={160} />
        </Box>

        <Grid container spacing={2} mt={0}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={4} key={`soc-detail-${i}`}>
              <Skeleton height={18} width="90%" />
              <Skeleton height={18} width="80%" style={{ marginTop: 10 }} />
            </Grid>
          ))}
          <Grid item xs={6}>
            <Skeleton height={18} width="95%" />
            <Skeleton height={18} width="90%" style={{ marginTop: 10 }} />
            <Skeleton height={18} width="80%" style={{ marginTop: 10 }} />
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Box mt={2}>
          <Skeleton height={22} width={180} />
        </Box>
        <Skeleton height={18} width="40%" style={{ marginTop: 8 }} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Skeleton height={18} width="90%" />
          </Grid>
          <Grid item xs={6}>
            <Skeleton height={18} width="95%" />
          </Grid>
        </Grid>

        {/* Billing Details */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Skeleton height={20} width={160} />
          </Grid>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={4} key={`bill-line1-${i}`}>
              <Skeleton height={18} width="90%" />
            </Grid>
          ))}
          {[...Array(3)].map((_, i) => (
            <Grid item xs={4} key={`bill-line2-${i}`}>
              <Skeleton height={18} width="90%" />
            </Grid>
          ))}
          <Grid item xs={6}>
            <Skeleton height={18} width="90%" />
            <Skeleton height={18} width="85%" style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCardSkeleton;
