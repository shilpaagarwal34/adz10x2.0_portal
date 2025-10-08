import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import logo from "../../assets/Logo/logo.svg";

import { setNotifications } from "../../store/Slice/Common/NotificationsSlice.js";
import api_routes, { base_url } from "../../config/api.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { getUserType } from "../../helper/helper.js";
import { toast } from "react-toastify";

const Navbar = ({ handleLogout, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const dispatch = useDispatch();
  const previousNotifications = useRef([]);
  const hasFetchedOnce = useRef(false); // <-- new

  const { fullLogo } = useSelector((state) => state.settings);

  // Mapping paths to titles
  const pageTitles = {
    "/society": "Dashboard",
    "/society/profile": "Profile",
    "/society/advertisement": "Advertisement",
    "/society/profiles": "Profile",
    "/society/profile/edit": "Profile",
    "/society/users": "Users Management",
    "/society/payment": "Payments",
    "/society/wallet": "Wallet",
    "/society/report/payout": "Payout Report",
    "/society/report/ad-performance": "Performance Report",
    "/society/report/ad-log": "Ads Log Report",
    "/society/report/ad-payment":"Ads Payment Report",
    "/society/settings": "Settings",
    "/society/advertisement/*": "Advertisement",
    "/society/notifications": "Notifications",
  };

  const getPageTitle = (path) => {
    if (path.startsWith("/society/advertisement")) return "Advertisement";
    if (path.startsWith("/society/profile")) return "Profile";
    // return pageTitles[path] || "Dashboard";
    if (pageTitles[path]) return pageTitles[path];

    return "Page Not Found";
  };

  const pageTitle = getPageTitle(location.pathname);

  const handleMenuOpen = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
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

  const userData = useSelector((state) => state.auth.user);
  // console.log(userData)

  const count = useSelector((state) => state.notifications.count);

  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 30000); // every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AppBar position="fixed" className="navbar" sx={{ zIndex: 1400 }}>
      <Toolbar className="toolbar">
        <div className="d-flex col-2">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <Box className="navbar-logo">
            <img src={fullLogo || logo} alt="Logo" className="logo-image" />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </div>

        <div className="d-flex justify-content-between align-items-center col-10">
          <h5 className="fw-bold ps-1 hide-text">{pageTitle}</h5>
          <div className="d-flex">
            <Box
              className="profile-section me-0 me-sm-3"
              onClick={handleMenuOpen}
            >
              <div className="profile-info">
                <Box
                  className="profile-section  me-0 me-sm-3"
                  onClick={() => navigate("/society/profile")}
                >
                  <img
                    src={
                      userData?.society_profile_img_path
                        ? `${base_url}/${userData?.society_profile_img_path}`
                        : `/fallback_img.jpg`
                    }
                    alt="Profile Picture"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography className="profile-name">
                      {userData?.name || "Name not found"}
                    </Typography>
                    <Typography className="profile-user-type">
                      {userData?.role_name ?? "Society Admin"}
                    </Typography>
                  </Box>
                </Box>
              </div>

              {/* <ExpandMore className="dropdown-icon" /> */}
            </Box>

            <IconButton
              onClick={() => navigate("/society/notifications")}
              disableRipple
              disableFocusRipple
              sx={{
                boxShadow: "none",
                "&:focus": {
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
                "&:focus-visible": {
                  boxShadow: "none",
                },
              }}
            >
              <Badge badgeContent={count || 0} color="error">
                <Notifications
                  onClick={() => navigate("/society/notifications")}
                />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
