import { Card, CardContent, Typography, Grid, Skeleton } from "@mui/material";

export default function ApproveRejectCardSkeleton() {
  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <div className="d-flex justify-content-between align-items-start">
          <Typography
            variant="h6"
            sx={{ marginBottom: "15px" }}
            fontWeight={600}
            gutterBottom
          >
            <Skeleton width={150} height={30} />
          </Typography>
          <Skeleton variant="circular" width={24} height={24} />
        </div>

        <Grid container spacing={2}>
          {/* Status */}
          <Grid item md={4} xs={12}>
            <Typography variant="body2" fontWeight={600}>
              <Skeleton width="40%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="70%" height={28} />
            </Typography>
          </Grid>

          {/* Approved By */}
          <Grid item md={4} xs={12}>
            <Typography>
              <Skeleton width="50%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="80%" height={28} />
            </Typography>
          </Grid>

          {/* Approved Date & Time */}
          <Grid item md={4} xs={12}>
            <Typography>
              <Skeleton width="70%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="80%" height={28} />
            </Typography>
          </Grid>

          {/* Brand Promotion */}
          <Grid item md={4} xs={12}>
            <Typography>
              <Skeleton width="60%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="70%" height={28} />
            </Typography>
          </Grid>

          {/* Lead Generation */}
          <Grid item md={4} xs={12}>
            <Typography>
              <Skeleton width="60%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="70%" height={28} />
            </Typography>
          </Grid>

          {/* Survey */}
          <Grid item md={4} xs={12}>
            <Typography>
              <Skeleton width="60%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton width="70%" height={28} />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
