import React from "react";
import { Card, Box, Typography, Divider, Skeleton } from "@mui/material";

const SocietyDetailsSkeleton = () => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "10px",
        boxShadow: 2,
        maxWidth: 400,
      }}
    >
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography fontWeight="bold">
          <Skeleton width={120} height={28} />
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Image and details */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          gap: 2,
          flexWrap: {
            xs: "wrap",
            sm: "nowrap",
          },
        }}
      >
        {/* Image skeleton */}
        <Skeleton variant="rectangular" width={60} height={60} />

        {/* Text skeleton */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            <Skeleton width={150} height={24} />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Skeleton width={200} height={18} />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SocietyDetailsSkeleton;
