import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 1,
        backgroundColor: "#D6D6E3",
        width: "100%",
        position: "relative",
        bottom: 0,
        left: 0,
        margin: "10px 0 0 0",
        padding: " 3px 0",
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        className="ps-2 px-sm-4"
        sx={{
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} Adz10x.com. All rights reserved. A proprietary platform of Ananta Consultancy.
        {/* <Link
          href="https://www.mplussoft.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            marginLeft: ".4rem",
            color: "inherit ",
          }}
        >
          Mplussoft
        </Link> */}
      </Typography>
    </Box>
  );
};

export default Footer;
