import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 1,
        backgroundColor: "#fff",
        width: "100%",
        position: "relative",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          marginLeft: "17rem",
        }}
      >
        © {new Date().getFullYear()} Adz10x.com. All rights reserved. A
        proprietary platform of Ananta Consultancy.
      </Typography>
    </Box>
  );
};

export default Footer;
