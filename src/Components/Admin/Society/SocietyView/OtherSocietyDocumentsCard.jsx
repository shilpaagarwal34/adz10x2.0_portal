import React from "react";
import { Card, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadFile } from "../../../../helper/helper";

const OtherSocietyDocumentsCard = ({
  title = "Society Documents",
  documents = [],
}) => {
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 3,
        mb: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <Typography variant="body2" fontWeight={600} fontSize={17}>
        {title}
      </Typography>

      {documents.map((doc, index) => {
        const isAvailable = doc?.path;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              marginTop: 1,
              paddingRight: 1,
            }}
          >
            <Box style={{ marginTop: ".6rem" }}>
              <Typography variant="body2" fontWeight={600}>
                {doc.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {doc.status || "Pending"}
              </Typography>
            </Box>

            <Tooltip
              title={doc?.path ? "Download" : "Document not available"}
              arrow
            >
              <span>
                {" "}
                {/* Wrapping span allows disabled IconButton to be clickable-free */}
                <IconButton
                  onClick={
                    isAvailable ? () => downloadFile(doc?.path) : undefined
                  }
                  disabled={!isAvailable}
                  sx={{
                    backgroundColor: isAvailable ? "#156FA3" : "#ccc",
                    color: "white",
                    borderRadius: 2,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: isAvailable ? "#084156" : "#ccc",
                    },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        );
      })}
    </Card>
  );
};

export default OtherSocietyDocumentsCard;
