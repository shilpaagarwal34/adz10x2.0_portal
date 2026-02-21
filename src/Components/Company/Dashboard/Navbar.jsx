import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

import logo from "../../../assets/Logo/logo.svg";
import api_routes, { base_url } from "../../../config/api.js";
import { getUserType } from "../../../helper/helper.js";
import { setNotifications } from "../../../store/Slice/Common/NotificationsSlice.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import AuthPromptModal from "../../Common/AuthPromptModal.jsx";

const Navbar = ({ user, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const dispatch = useDispatch();
  const previousNotifications = useRef([]);
  const hasFetchedOnce = useRef(false); // <-- new

  const { fullLogo } = useSelector((state) => state.settings);
  const hasAuthToken = Boolean(localStorage.getItem("auth_token"));
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Mapping paths to titles
  const pageTitles = {
    "/company": "Dashboard",
    "/company/profile": "Profile",
    "/company/campaign": "Campaigns",
    "/company/campaign/newcampaign": "New Campaign",
    "/company/profiles": "Profile",
    "/company/profile/edit": "Profile",
    "/company/users": "Users Management",
    "/company/payments": "Payments",
    "/company/report/wallet-history-report": "Wallet Payment Report",
    "/company/report/spent-report": "Total Spend Report",
    "/company/report/campaign-status-report": "Campaign Status & Reach Report",
    "/company/report/user-access-report": "User Access Report",
    "/company/report/campaign-society-report": "Campaign & Society List Report",
    "/company/wallet": "Wallet",
    "/company/settings": "Settings",
    "/company/campaign/": "Campaigns",
    "/company/notifications": "Notifications",
  };

  // Get page title based on path or default to "Dashboard"
  // const pageTitle = pageTitles[location.pathname] || "Dashboard";
  const normalizePath = (path) => {
    if (!path) return "/company";
    return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  };

  const normalizedPath = normalizePath(location.pathname);
  let pageTitle = "";
  if (normalizedPath.startsWith("/company/campaign")) {
    pageTitle = "Campaigns";
  } else if (pageTitles[normalizedPath]) {
    pageTitle = pageTitles[normalizedPath];
  } else {
    pageTitle = "Page Not Found";
  }

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        dispatch(setNotifications([]));
        return;
      }
      const userType = getUserType();
      const endpoint = api_routes[userType]?.fetch_notification;
      if (!endpoint) return;
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
          <div className="d-flex align-items-center gap-2">
            {!hasAuthToken ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setShowAuthPrompt(true)}
                  sx={{
                    background:
                      "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
                    borderRadius: "6px",
                  }}
                >
                  Sign Up / Log In
                </Button>
              </>
            ) : (
              <>
                <Box
                  className="profile-section  me-0 me-sm-3"
                  onClick={() => navigate("/company/profile")}
                >
                  <img
                    src={
                      user?.company_profile_photo_path
                        ? `${base_url}/${user?.company_profile_photo_path}`
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
                      {user?.name || "Guest User"}
                    </Typography>
                    <Typography className="profile-user-type">
                      {user?.user_type === "Company_Admin"
                        ? "Company Admin"
                        : user?.user_type === "Company_User"
                        ? "Company User"
                        : "Company"}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  onClick={() => navigate("/company/notifications")}
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
                    <Notifications />
                  </Badge>
                </IconButton>
              </>
            )}
          </div>
        </div>
      </Toolbar>
      {!hasAuthToken && (
        <AuthPromptModal
          show={showAuthPrompt}
          onHide={() => setShowAuthPrompt(false)}
          title="Join Adz10x Company Portal"
          description="Create your account to launch campaigns, shortlist societies, and track performance."
        />
      )}
    </AppBar>
  );
};

export default Navbar;
