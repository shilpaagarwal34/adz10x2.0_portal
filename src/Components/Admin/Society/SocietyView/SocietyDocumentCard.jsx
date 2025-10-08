import React from "react";
import { Card, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const SocietyDocumentCard = ({
  title = "Society Documents",
  subtitle = "Agreement Copy",
  statusText = "Pending to upload",
  onDownloadClick,
  isDownloadAvailable = false, // add this flag to determine button state
}) => {
  const isPending = !isDownloadAvailable;

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 3,
        mb: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body2" fontWeight={600} fontSize={17}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          mt: 2,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {statusText}
          </Typography>
        </Box>

        <Tooltip title={isPending ? "Document not available" : "Download"}>
          <span>
            <IconButton
              onClick={onDownloadClick}
              disabled={isPending}
              sx={{
                backgroundColor: "#156FA3",
                color: "white",
                borderRadius: 2,
                padding: 1,
                "&:hover": {
                  backgroundColor: "#084156",
                },
              }}
            >
              <DownloadIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default SocietyDocumentCard;
