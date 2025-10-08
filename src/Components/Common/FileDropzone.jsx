import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const FileDropzone = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles(mappedFiles);
      onFileSelect(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: true,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        marginLeft: "13px",
        border: "2px dashed #1976d2",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#e3f2fd" : "#fafafa",
        transition: "background-color 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "120px",
        marginTop: "20px",
      }}
    >
      <input {...getInputProps()} />

      {/* If no files, show icon + text */}
      {files.length === 0 ? (
        <>
          <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mt: 1,
              "@media (max-width:400px)": { display: "none" },
            }}
          >
            {isDragActive
              ? "Drop the files here..."
              : "Drag & Drop files here or Click to Upload"}
          </Typography>
        </>
      ) : (
        // If files exist, show previews
        <Box
          mt={1}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {files.map((file) =>
            file.type.includes("image") ? (
              <Box
                key={file.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "#fff",
                  }}
                />
              </Box>
            ) : (
              <Box
                key={file.name}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 100,
                }}
              >
                <PictureAsPdfIcon sx={{ fontSize: 50, color: "red" }} />
                <Typography
                  variant="caption"
                  sx={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                  }}
                >
                  {file.name}
                </Typography>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileDropzone;
