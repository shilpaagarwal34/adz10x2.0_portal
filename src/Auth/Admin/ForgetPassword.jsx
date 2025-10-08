import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Paper, Grid } from "@mui/material";
import "../Auth.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/Logo/logo.svg";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import api_routes from "../../config/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For storing error messages
  const navigate = useNavigate();

  const handleSendLink = async () => {
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }
    try {
      const res = await axiosInstance.post(
        api_routes.admin.post_forget_password,
        { email }
      );
      // console.log(res);
      toast.success("Password reset link sent!");
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      console.log(err?.response?.data?.message);
      toast.error(message);
    }

    // Simulate API call
    // setTimeout(() => {
    //   navigate("/admin/reset-password"); // Navigate to reset password page
    // }, 1500);
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
                <div>
                  <h4>Forgot Password</h4>
                  <p className="mb-0 custom-label">
                    Forgot Password Please Enter Your Email To Receive a Reset
                    Password Link.
                  </p>
                </div>
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  onClick={handleSendLink}
                >
                  Send Link
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

export default ForgetPassword;
