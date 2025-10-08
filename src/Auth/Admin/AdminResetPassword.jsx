import { use, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container, TextField, Button, Box, Paper, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "../Auth.css";
import { useSelector } from "react-redux";
import logo from "../../assets/Logo/logo.svg";
import axiosInstance from "../../utils/axiosInstance";
import api_routes from "../../config/api";

const AdminResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')
  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Token is required!");
    }

    try {
      const res = await axiosInstance.post(
        api_routes.admin.post_change_password,
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
          token,
        }
      );
      // console.log(res);
      toast.success("Password has been reset!");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const { fullLogo } = useSelector((state) => state.settings);

  return (
    <>
      <ToastContainer />
      <Container className="login-container">
        <Paper elevation={3} className="login-paper">
          <Grid container>
            <Grid item xs={12} md={6} className="login-form">
              <Box className="login-box">
                <div className="mb-4">
                  <Link to="/register">
                    <img
                      src={fullLogo || logo}
                      alt="Logo"
                      style={{ width: 200 }}
                    />
                  </Link>
                </div>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorMessage("");
                  }}
                />
                <TextField
                  fullWidth
                  label="Re-enter Password"
                  type="password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, fontSize: 16 }}
                  onClick={handleReset}
                >
                  Reset Password
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="signup-section"></Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AdminResetPassword;
