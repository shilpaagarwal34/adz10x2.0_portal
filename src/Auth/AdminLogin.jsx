import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { useDispatch, useSelector } from "react-redux"; // Import dispatch from react-redux
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./AdminAuth.css";
import { ToastContainer, toast } from "react-toastify";

import api_routes from "../config/api.js";
import { setUser, setLoading } from "../store/Slice/Auth/authSlice.js";
import axiosInstance from "../utils/axiosInstance.js";
import logo from "../assets/Logo/logo.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For storing error messages
  const [loading, setLoadingState] = useState(false); // For loading state
  const dispatch = useDispatch(); // Initialize dispatch from redux

  const navigate = useNavigate();
  const { fullLogo } = useSelector((state) => state.settings);

  const handleLogin = async () => {
    // Clear previous errors
    setErrorMessage("");

    // Validate fields
    if (!email || !password) {
      setErrorMessage("This field is required");
      return;
    }

    // Dispatch loading state
    dispatch(setLoading(true));

    try {
      // Send login request using axios
      const response = await axiosInstance.post(
        `${api_routes.admin.post_login}`,
        {
          email,
          password,
        }
      );

      // Assuming the response contains a user object or token
      if (response.status === 200) {
        // Save user data to localStorage
        localStorage.setItem("user_data", JSON.stringify(response?.data?.data));
        localStorage.setItem(
          "admin_token",
          JSON.stringify(response?.data?.data?.admin_token)
        );

        dispatch(setUser(response.data.data));
        toast.success("Admin Logged IN sucessfully");
        // Redirect to dashboard
        navigate("/admin");
      }
    } catch (error) {
      // Handle network or server errors
      const errorMsg = error?.response?.data?.message || "Unable to login!";
      toast.error(errorMsg);
    } finally {
      setLoadingState(false); // Stop loading state
    }
  };

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
                  <h4>Sign In to your Account</h4>
                  <p className="mb-0 custom-label">
                    Sign In to your Account Welcome back! please enter your
                    detail
                  </p>
                </div>
                <TextField
                  name="email"
                  fullWidth
                  autoComplete="off"
                  label="Username / Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  error={!!errorMessage} // Show error if there's any
                  helperText={errorMessage} // Display error message below the input
                />
                <TextField
                  fullWidth
                  autoComplete="off"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
                <Box className="remember-forgot">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                  <Link
                    to="/admin/forget-password"
                    underline="hover"
                    className="forgotPassowrdText"
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, fontSize: 16 }}
                  onClick={handleLogin}
                  disabled={loading} // Disable the button if loading
                >
                  {loading ? "Logging in..." : "LOG IN"}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} className="signup-section"></Grid>
          </Grid>
        </Paper>

        {/* Snackbar for error messages */}
        {/* <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
        >
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar> */}
      </Container>
    </>
  );
};

export default LoginPage;
