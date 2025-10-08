import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/Slice/Auth/authSlice.js"; // Assuming this is your action
import Login from "./Auth/Login.jsx";
import AdminRoutes from "./Pages/Admin/main.jsx";
import Main from "./Pages/Society/main.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./Auth/ForgotPassword.jsx";
import Company from "./Pages/Company/Main.jsx";
import Register from "./Auth/Register.jsx";
import AdminLogin from "./Auth/AdminLogin.jsx";
import ForgetPassword from "./Auth/Admin/ForgetPassword.jsx";
import OTPVerificationPage from "./Auth/OTPVerificationPage .jsx";
import {
  ProtectedSocietyRoute,
  ProtectedCompanyRoute,
  ProtectedAdminRoute,
  PublicRoute,
  PublicAdminRoute,
} from "./utils/ProtectedRoutes.jsx";
import Logout from "./Auth/logout.jsx";
import AdminResetPassword from "./Auth/Admin/AdminResetPassword.jsx";
import NotFoundPage from "./Auth/Components/NotFoundPage.jsx";
import axiosInstance from "./utils/axiosInstance.js";
import api_routes, { base_url } from "./config/api.js";
import { setVisualSettings } from "./store/Slice/settingsSlice.js";
import Terms_conditions from "./Components/Common/TermsCondition.jsx";
import Privacy_Policy from "./Components/Common/PrivacyPolicy.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // On page refresh, check for authentication token and user data in localStorage
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      // If token and user data exist in localStorage, update Redux state
      dispatch(setUser(JSON.parse(userData))); // Assuming you store the user in Redux
    }
  }, [dispatch]);

  const setFavicon = (url) => {
    const favicon = document.getElementById("dynamic-favicon");
    if (favicon) {
      favicon.href = url;
    }
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axiosInstance.get(
          api_routes.admin.get_post_visual_settings
        );
        const data = res.data?.data;

        if (data) {
          const fullLogo = data.full_logo_image_path
            ? `${base_url}/${data.full_logo_image_path}`
            : null;

          const miniLogo = data.mini_logo_image_path
            ? `${base_url}/${data.mini_logo_image_path}`
            : null;

          const emailLogo = data.logo_email_image_path
            ? `${base_url}/${data.logo_email_image_path}`
            : null;

          dispatch(setVisualSettings({ fullLogo, miniLogo, emailLogo }));

          setFavicon(miniLogo);
        }
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
        setFavicon("/default-favicon.png");
      }
    }

    fetchImages();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <OTPVerificationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protected society route */}
        <Route
          path="/society/*"
          element={
            <ProtectedSocietyRoute>
              <Main />
            </ProtectedSocietyRoute>
          }
        />

        {/* Protected company route */}
        <Route
          path="/company/*"
          element={
            <ProtectedCompanyRoute>
              <Company />
            </ProtectedCompanyRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />

        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

        <Route
          path="/admin/forget-password"
          element={
            <PublicAdminRoute>
              <ForgetPassword />
            </PublicAdminRoute>
          }
        />

        <Route
          path="/admin/reset-password"
          element={
            <PublicAdminRoute>
              <AdminResetPassword />
            </PublicAdminRoute>
          }
        />

        {/* Protected admin route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminRoutes />
            </ProtectedAdminRoute>
          }
        />


        <Route path="/privacy-policy" element={<Privacy_Policy />} />
        <Route path="/terms-condition" element={<Terms_conditions />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="*" element={<NotFoundPage to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
