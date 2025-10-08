import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import api_routes from "../../../config/api";

const ChangePassword = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setValues({ ...values, [field]: !values[field] });
  };

  const handleSubmit = async () => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.change_admin_password}`,
        {
          old_password: values.oldPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        }
      );

      toast(response?.data?.message);
      setValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showNewPassword: false,
        showConfirmPassword: false,
      });
    } catch (err) {
      // axios error handling
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <Paper
        className="change-password-card"
        elevation={3}
        style={{ padding: 20 }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: 16 }}
        >
          Change Password
        </Typography>

        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          value={values.oldPassword}
          onChange={handleChange("oldPassword")}
          size="small"
          InputLabelProps={{
            sx: { fontSize: "14px" },
          }}
        />

        <TextField
          label="New Password"
          type={values.showNewPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={values.newPassword}
          onChange={handleChange("newPassword")}
          size="small"
          InputLabelProps={{
            sx: { fontSize: "14px" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility("showNewPassword")}
                >
                  {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={values.showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          size="small"
          InputLabelProps={{
            sx: { fontSize: "14px" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    togglePasswordVisibility("showConfirmPassword")
                  }
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div
          className="button-group"
          style={{ marginTop: 24, display: "flex", gap: 16 }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              setValues({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                showNewPassword: false,
                showConfirmPassword: false,
              })
            }
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ChangePassword;
