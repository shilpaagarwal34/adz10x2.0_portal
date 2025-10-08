import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import api_routes, { base_url } from "../../../config/api";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { adminHasPrivilege } from "../../../helper/helper";

const VisualSettings = () => {
  const [files, setFiles] = useState({
    fullLogo: null,
    favicon: null,
    emailLogo: null,
  });

  const [settingId, setSettingId] = useState(null);

  // Store preview URLs for both local files and API images
  const [previews, setPreviews] = useState({
    fullLogo: null,
    favicon: null,
    emailLogo: null,
  });

  // Map your internal state keys to the API field names
  const apiFieldMap = {
    fullLogo: "full_logo_image_path",
    favicon: "mini_logo_image_path",
    emailLogo: "logo_email_image_path",
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axiosInstance.get(
          api_routes.admin.get_post_visual_settings
        );
        const data = res.data?.data;

        if (data) {
          setSettingId(data.id);

          setPreviews({
            fullLogo: data.full_logo_image_path
              ? `${base_url}/${data.full_logo_image_path}`
              : null,
            favicon: data.mini_logo_image_path
              ? `${base_url}/${data.mini_logo_image_path}`
              : null,
            emailLogo: data.logo_email_image_path
              ? `${base_url}/${data.logo_email_image_path}`
              : null,
          });
        } else {
          // ✅ No record found, set default state
          setSettingId(null);
          setPreviews({
            fullLogo: null,
            favicon: null,
            emailLogo: null,
          });
        }
      } catch (error) {
        const msg = error?.response?.data?.message || error.message;

        // ✅ Gracefully handle "no record found"
        if (
          msg?.toLowerCase().includes("no record") ||
          error?.response?.status === 404
        ) {
          setSettingId(null);
          setPreviews({
            fullLogo: null,
            favicon: null,
            emailLogo: null,
          });
        } else {
          toast.error(msg);
          console.error("Failed to fetch images:", error);
        }
      }
    }

    fetchImages();
  }, []);

  // Handle new file drop
  const handleDrop = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    setFiles((prev) => ({ ...prev, [type]: file }));

    // Create preview URL for selected file
    const previewUrl = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [type]: previewUrl }));
  };

  // Prepare dropzone for each field
const renderDropzone = (label, type) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, type),
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  return (
    <Box>
      {/* Label for field */}
      <Typography
        variant="subtitle1"
        sx={{ mb: 1, fontWeight: 600 }}
      >
        {label} <span style={{ color: "red" }}>*</span>
      </Typography>

      {/* Dropzone */}
      <Paper
        {...getRootProps()}
        className="dropzone"
        sx={{
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
          minHeight: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed #ccc",
        }}
      >
        <input {...getInputProps()} />

        {/* Show image preview inside the card if available */}
        {previews[type] ? (
          <img
            src={previews[type]}
            alt={`${label} preview`}
            style={{
              width: "100%",
              maxWidth: "100px",
              height: "80px",
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
        ) : (
          <>
            <Typography className="dropzone-text" sx={{ mb: 1 }}>
              Drag and drop a file here or click
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};


  // Submit handler to send form data
  const handleSubmit = async () => {
    const formData = new FormData();

    // Append files if selected, else fallback to existing URLs (if needed)
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(apiFieldMap[key], file);
      }
    });

    // formData.append("id", settingId || null);
    if (settingId) {
      if (!adminHasPrivilege("visual_settings_edit")) {
        toast.error("You don't have permission to edit visual settings.");
        return;
      }
      formData.append("id", settingId);
    } else {
      if (!adminHasPrivilege("visual_settings_add")) {
        toast.error("You don't have permission to add visual settings.");
        return;
      }
    }

    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.get_post_visual_settings}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload successful", response.data);
      toast.success(response.data?.message);
      // Optionally, refresh previews from response or re-fetch data
    } catch (error) {
      console.error("Upload failed", error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <Paper className="settings-card" elevation={3} sx={{ p: 3, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {renderDropzone("Full Logo (logo with text)", "fullLogo")}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderDropzone("Favicon Logo (logo for browser tab)", "favicon")}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderDropzone("Email Logo (logo appear in mails)", "emailLogo")}
        </Grid>
      </Grid>
      {adminHasPrivilege("visual_settings_add") && (
        <Box className="button-group" sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default VisualSettings;
