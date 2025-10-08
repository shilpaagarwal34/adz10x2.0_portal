import Skeleton from "react-loading-skeleton";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function CampaignConfigurationSkeleton() {
  return (
    <Box p={2}>
      <Typography className="pb-2" fontWeight="bold">
        <Skeleton width={200} height={24} />
      </Typography>

      <Card sx={{ backgroundColor: "white", p: 2, marginTop: ".4rem" }}>
        <CardContent>
          <Grid container spacing={3} direction="column">
            {/* Campaign Amount Section */}
            <Grid item>
              <Typography sx={{ fontWeight: "bold" }}>
                <Skeleton width={160} height={20} />
              </Typography>
              <Grid container spacing={3} mt={1}>
                {[1, 2, 3].map((i) => (
                  <Grid item xs={12} md={4} key={`amount-${i}`}>
                    <Skeleton height={50} />
                    <Skeleton width={60} height={14} style={{ marginTop: 6 }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Campaign Days Section */}
            <Grid item>
              <Typography sx={{ fontWeight: "bold" }}>
                <Skeleton width={220} height={20} />
              </Typography>
              <Grid container spacing={1} mt={1}>
                {[...Array(7)].map((_, i) => (
                  <Grid item key={`day-${i}`}>
                    <Skeleton width={60} height={25} borderRadius={6} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={3} mt={2}>
                <Grid item>
                  <Skeleton width={130} height={40} />
                </Grid>
                <Grid item>
                  <Skeleton width={130} height={40} />
                </Grid>
              </Grid>
            </Grid>

            {/* Society Commission Section */}
            <Grid item>
              <Typography sx={{ fontWeight: "bold" }}>
                <Skeleton width={180} height={20} />
              </Typography>
              <Skeleton width={100} height={20} style={{ marginBottom: 10 }} />
              <Grid container spacing={3}>
                {[1, 2, 3].map((i) => (
                  <Grid item xs={12} md={4} key={`commission-${i}`}>
                    <Skeleton height={50} />
                    <Skeleton width={60} height={14} style={{ marginTop: 6 }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Save Button */}
            <Grid item>
              <Box display="flex" justifyContent="flex-start">
                <Skeleton width={100} height={40} borderRadius={4} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
