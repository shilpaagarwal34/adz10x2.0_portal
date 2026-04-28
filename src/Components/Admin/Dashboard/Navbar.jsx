import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Avatar,
} from "@mui/material";
import { Notifications, Logout, ExpandMore } from "@mui/icons-material";

import logo from "../../../assets/Logo/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/Actions/Auth/authActions.js";
import { formatRoleName, getUserType } from "../../../helper/helper.js";
import api_routes from "../../../config/api.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { setNotifications } from "../../../store/Slice/Common/NotificationsSlice.js";
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast.jsx";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const previousNotifications = useRef([]);
  const hasFetchedOnce = useRef(false); // <-- new
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);
  const { fullLogo } = useSelector((state) => state.settings);
  const [navbarLogoSrc, setNavbarLogoSrc] = useState(logo);

  useEffect(() => {
    setNavbarLogoSrc(fullLogo || logo);
  }, [fullLogo]);

  const handleMenuOpen = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      ConfirmDeleteToast({
        message: "Are you sure you want to Logout?",
        onConfirm: async () => {
          await dispatch(logoutUser({ user, userType: "admin" }));
          if (location.pathname !== "/admin/login") {
            navigate("/admin/login", { replace: true });
          }
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const fetchNotifications = async () => {
    try {
      const userType = getUserType();
      const endpoint = api_routes[userType]?.fetch_notification;
      const response = await axiosInstance.get(endpoint);
      const newNotifications = response.data?.data || [];

      if (hasFetchedOnce.current) {
        const prevIds = new Set(previousNotifications.current.map((n) => n.id));
        const newOnes = newNotifications.filter((n) => !prevIds.has(n.id));

        newOnes.forEach((n) =>
          toast.info(n.message || "You have a new notification")
        );
      } else {
        hasFetchedOnce.current = true;
      }

      previousNotifications.current = newNotifications;
      dispatch(setNotifications(newNotifications));
    } catch (err) {
      console.error("Error fetching notification count:", err);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 30000); // every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const count = useSelector((state) => state.notifications.count);

  const pageTitles = {
    "/admin/report/total-societies-report": "Total Societies Report",
    "/admin/report/total-companies-report": "Total Company Report",
    "/admin/report/total-ads-report": "Total Ads Report",
    "/admin/report/society-payments": "Society Payments Report",
    "/admin/report/company-payments": "Company Payments Report",
    "/admin/report/system-user-logs": "System User Logs Report",
    "/admin/report/platform-earning-report": "Platform Earning Report",
  };

  return (
    <AppBar position="fixed" className="navbar" sx={{ zIndex: 1400 }}>
      <Toolbar className="toolbar">
        {/* Logo */}
        <div className="d-flex col-2">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <Box className="navbar-logo">
            <img
              src={navbarLogoSrc}
              alt="Logo"
              className="logo-image"
              onError={() => setNavbarLogoSrc(logo)}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
        </div>

        <div className="d-flex justify-content-between align-items-center col-10">
          <h5 className="fw-bold ps-1 hide-text">
            {pageTitles[location.pathname]}
          </h5>
          <div className="d-flex">
            {/* Profile Dropdown */}
            <Box className="profile-section " onClick={handleMenuOpen}>
              <Avatar className="avatar-icon" />
              <Typography className="profile-name d-none d-sm-block">
                {user?.user_name || ""}
                <Box>
                  <p className="m-0" style={{ fontSize: "12px" }}>
                    {formatRoleName(user?.role_name) ?? "Admin"}
                  </p>
                </Box>
              </Typography>

              <ExpandMore className="dropdown-icon" />
            </Box>

            {/* Dropdown Menu with Increased z-index */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  zIndex: 1500000, // Increase z-index of the dropdown menu
                  top: "70px !important",
                },
              }}
            >
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>

            {/* Notifications Icon */}
            <IconButton onClick={() => navigate("/admin/notifications")}>
              <Badge badgeContent={count || 0} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
