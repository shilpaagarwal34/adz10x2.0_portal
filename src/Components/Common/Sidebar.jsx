import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings,
  Campaign,
  Payment,
  Assessment,
  People,
  ViewList,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

import logo from "../../assets/Logo/logo.svg";
import smlogo from "../../assets/Logo/Fevicon.png";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const reportMenu = {
  key: "reports",
  label: "Report",
  icon: <Assessment />,
  children: [
    {
      key: "payment-report",
      label: "Payment Report",
      children: [
        {
          to: "/society/report/ad-payment",
          label: "Ads Payment Report",
          privilegeKey: "report",
        },
        {
          to: "/society/report/ad-performance",
          label: "Ads Performance Report",
          privilegeKey: "report",
        },
      ],
    },
    {
      to: "/society/report/payout",
      label: "Payout Report",
      privilegeKey: "report",
    },
    {
      to: "/society/report/ad-log",
      label: "Ads Log Report",
      privilegeKey: "report",
    },
  ],
};

const Sidebar = ({ open, toggleDrawer, handleLogout }) => {
  const location = useLocation();
  const isActive = location.pathname.includes("/dashboard/campaign-view");
  const hasAuthToken = Boolean(localStorage.getItem("auth_token"));
  const { menu, privileges, user_type } = useSelector(
    (state) => state.auth.user || {}
  );

  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  const handleToggle = (key) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key); // close
      } else {
        newSet.add(key); // open
      }
      return newSet;
    });
  };

  const getClass = (pathCheck, fallback = "") => {
    return pathCheck ? "active" : fallback;
  };

  const hasPrivilege = (privilege) => {
    if (!user_type) return true; // browse mode: show normal portal menus
    if (user_type === "Society_User" && privileges)
      return privileges.includes(privilege);
    else if (user_type === "Society_Admin") return true;
  };

  const renderListItem = (
    to,
    label,
    icon,
    pathCheck,
    isAllowed,
    onClick = null
  ) => (
    <ListItem
      className={getClass(pathCheck, "custom-hover-remove")}
      sx={{ cursor: "pointer" }}
      {...(to ? { component: Link, to } : {})}
      {...(onClick ? { onClick } : {})}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  const renderSingleLevelMenu = (
    key,
    label,
    icon,
    children = [],
    isAllowed
  ) => {
    const isOpen = openDropdowns.has(key);

    // Flatten the nested children to a single level
    const flattenedChildren = children.flatMap((item) =>
      item.children ? item.children : [item]
    );

    const menuContent = (
      <React.Fragment key={key}>
        <ListItem
          onClick={() => handleToggle(key)}
          className={isOpen ? "active-master" : "custom-hover-remove"}
          sx={{
            cursor: "pointer",
            ...(key === "payment-report"
              ? { margin: "0 10px !important" }
              : {}),
          }}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={label} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {flattenedChildren.map((item) => (
              <ListItem
                key={item.to}
                component={Link}
                to={item.to}
                sx={{ pl: 3 }}
                className={
                  location.pathname === item.to
                    ? "active-dropdown"
                    : "custom-hover-remove custom-margin"
                }
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );

    return menuContent;
  };

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "open" : "closed"}`}
      open={open} // optional, depending on MUI version
    >
      <div className="image-container"></div>

      <Box className="sidebar-logo">
        <img src={open ? logo : smlogo} alt="Logo" className="logo-image" />
      </Box>

      <List className="sidebar-menu" sx={{ overflowX: "hidden" }}>
        {/* Top Items */}
        <div className="top-items">
          {hasPrivilege("dashboard") &&
            renderListItem(
              "/society",
              "Dashboard",
              <HomeIcon />,
              location.pathname === "/society",
              true
            )}

          {hasPrivilege("profile") &&
            renderListItem(
              "/society/profile",
              "Profile",
              <svg
                width="16"
                height="22"
                viewBox="0 0 16 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 20V18C2 16.9391 2.42143 15.9217 3.17157 15.1716C3.92172 14.4214 4.93913 14 6 14H10C11.0609 14 12.0783 14.4214 12.8284 15.1716C13.5786 15.9217 14 16.9391 14 18V20"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              location.pathname.startsWith("/society/profile"),
              true
            )}

          {hasPrivilege("profile") &&
            renderListItem(
              "/society/media-management",
              "Media Management",
              <ViewList />,
              location.pathname.startsWith("/society/media-management"),
              true
            )}

          {hasPrivilege("campaign") &&
            renderListItem(
              "/society/advertisement",
              "Advertisement",
              <Campaign />,
              location.pathname.startsWith("/society/advertisement"),
              true
            )}

          {hasPrivilege("wallet") &&
            renderListItem(
              "/society/wallet",
              "Wallet",
              <AccountBalanceWalletOutlinedIcon />,
              location.pathname.startsWith("/society/wallet"),
              true
            )}

          {hasPrivilege("payments") &&
            renderListItem(
              "/society/payment",
              "Payments",
              <Payment />,
              location.pathname === "/society/payment" || isActive,
              true
            )}

          {hasPrivilege("users") &&
            renderListItem(
              "/society/users",
              "Users",
              <People />,
              location.pathname.startsWith("/society/users"),
              true
            )}

          {hasPrivilege("reports") &&
            renderSingleLevelMenu(
              reportMenu.key,
              reportMenu.label,
              reportMenu.icon,
              reportMenu.children,
              true
            )}
        </div>

        {/* Bottom Items */}
        <div className="bottom-items">
          {hasPrivilege("settings") &&
            renderListItem(
              "/society/settings",
              "Settings",
              <Settings />,
              location.pathname === "/society/settings",
              true
            )}

          {hasAuthToken &&
            renderListItem(
              null,
              "Logout",
              <InfoOutlinedIcon />,
              false,
              true,
              handleLogout
            )}
        </div>
      </List>

      {/* Bottom Toggle Button */}
      <Box className="toggle-button">
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
