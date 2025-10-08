import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings,
  Campaign,
  Payment,
  Assessment,
  People,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import logo from "../../../assets/Logo/logo.svg";
import smlogo from "../../../assets/Logo/Fevicon.png";
import { useNavigate } from "react-router-dom";

const reportMenu = {
  key: "reports",
  label: "Report",
  icon: <Assessment />,
  children: [
    {
      to: "/company/report/spent-report",
      label: "Total Spend Report",
      privilegeKey: "report",
    },
    {
      to: "/company/report/campaign-status-report",
      label: "Campaign Status & Reach Report",
      privilegeKey: "report",
    },
    {
      to: "/company/report/user-access-report",
      label: "User Access Report",
      privilegeKey: "report",
    },
    {
      to: "/company/report/wallet-history-report",
      label: "Wallet Payment Report",
      privilegeKey: "report",
    },
    {
      to: "/company/report/campaign-society-report",
      label: "Campaign Society List Report",
      privilegeKey: "report",
    },
  ],
};

const Sidebar = ({ open, toggleDrawer, handleLogout }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  const isActive = location.pathname.includes("/dashboard/campaign-view");

  const { menu, privileges, user_type } = useSelector(
    (state) => state.auth.user || {}
  );

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
    if (user_type === "Company_User" && privileges)
      return privileges.includes(privilege);
    else if (user_type === "Company_Admin") return true;
  };

  const renderListItem = (
    to,
    label,
    icon,
    pathCheck,
    isAllowed,
    onClick = null
  ) => {
    const listItem = (
      <ListItem
        className={
          isAllowed
            ? getClass(pathCheck, "custom-hover-remove")
            : "not-authorised"
        }
        sx={{
          cursor: isAllowed ? "pointer" : "not-allowed",
          opacity: isAllowed ? 1 : 0.6,
          pointerEvents: isAllowed ? "auto" : "none", // 🔒 disables interaction
        }}
        {...(isAllowed && to ? { component: Link, to } : {})}
        {...(isAllowed && onClick ? { onClick } : {})}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    );

    return isAllowed ? (
      listItem
    ) : (
      <Tooltip
        title="You are not authorized to access this section"
        placement="right"
      >
        <Box>{listItem}</Box>
      </Tooltip>
    );
  };

  // const renderSingleLevelMenu = (key, label, icon, children = [], isAllowed) => {
  //   const isOpen = openDropdowns.has(key);

  //   // Flatten the nested children to a single level
  //   const flattenedChildren = children.flatMap((item) =>
  //     item.children ? item.children : [item]
  //   );

  //   return (
  //     <React.Fragment key={key}>
  //       <ListItem
  //         onClick={() => handleToggle(key)}
  //         className={isOpen ? "active-master" : "custom-hover-remove"}
  //         sx={key === "payment-report" ? { margin: "0 10px !important" } : {}}
  //       >
  //         {icon && <ListItemIcon>{icon}</ListItemIcon>}
  //         <ListItemText primary={label} />
  //         {isOpen ? <ExpandLess /> : <ExpandMore />}
  //       </ListItem>

  //       <Collapse in={isOpen} timeout="auto" unmountOnExit>
  //         <List component="div" disablePadding>
  //           {flattenedChildren.map((item) => (
  //             <ListItem
  //               key={item.to}
  //               component={Link}
  //               to={item.to}
  //               sx={{ pl: 3 }}
  //               className={
  //                 location.pathname === item.to
  //                   ? "active-dropdown"
  //                   : "custom-hover-remove custom-margin"
  //               }
  //             >
  //               <ListItemText primary={item.label} />
  //             </ListItem>
  //           ))}
  //         </List>
  //       </Collapse>
  //     </React.Fragment>
  //   );
  // };

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
          onClick={isAllowed ? () => handleToggle(key) : undefined}
          className={`${isOpen ? "active-master" : "custom-hover-remove"} ${
            !isAllowed ? "not-authorised" : ""
          }`}
          sx={{
            cursor: isAllowed ? "pointer" : "not-allowed",
            opacity: isAllowed ? 1 : 0.6,
            pointerEvents: isAllowed ? "auto" : "none",
            ...(key === "payment-report"
              ? { margin: "0 10px !important" }
              : {}),
          }}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={label} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={isOpen && isAllowed} timeout="auto" unmountOnExit>
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

    return isAllowed ? (
      menuContent
    ) : (
      <Tooltip
        key={key}
        title="You are not authorized to access this section"
        placement="right"
      >
        <Box>{menuContent}</Box>
      </Tooltip>
    );
  };

  return (
    // <Drawer variant="permanent" className={`sidebar ${open ? "open" : ""}`}>
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
              "/company",
              "Dashboard",
              <HomeIcon />,
              location.pathname === "/company",
              user_type === "Company_Admin" ? menu.dashboard : true
            )}

          {hasPrivilege("profile") &&
            renderListItem(
              "/company/profile",
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
              location.pathname.startsWith("/company/profile"),
              user_type === "Company_Admin" ? menu.profile : true
            )}

          {hasPrivilege("campaign") &&
            renderListItem(
              "/company/campaign",
              "Campaign",
              <Campaign />,
              location.pathname.startsWith("/company/campaign"),
              user_type === "Company_Admin" ? menu.advertisement : true
            )}

          {hasPrivilege("wallet") &&
            renderListItem(
              "/company/wallet",
              "Wallet",
              <AccountBalanceWalletOutlinedIcon />,
              location.pathname.startsWith("/company/wallet"),
              user_type === "Company_Admin" ? menu.wallet : true
            )}

          {hasPrivilege("payments") &&
            renderListItem(
              "/company/payments",
              "Payments",
              <Payment />,
              location.pathname === "/company/payments" || isActive,
              user_type === "Company_Admin" ? menu.payments : true
            )}

          {hasPrivilege("users") &&
            renderListItem(
              "/company/users",
              "Users",
              <People />,
              location.pathname.startsWith("/company/users"),
              user_type === "Company_Admin" ? menu.users : true
            )}

          {/* {hasPrivilege("reports") &&
            renderListItem(
              "/company/report",
              "Report",
              <Assessment />,
              location.pathname === "/company/report",
              user_type === "Company_Admin" ? menu.report : true
            )} */}

          {hasPrivilege("reports") &&
            renderSingleLevelMenu(
              reportMenu.key,
              reportMenu.label,
              reportMenu.icon,
              reportMenu.children,
              user_type === "Company_Admin" ? menu.users : true
            )}
        </div>

        {/* Bottom Items */}
        <div className="bottom-items">
          {hasPrivilege("settings") &&
            renderListItem(
              "/company/settings",
              "Settings",
              <Settings />,
              location.pathname === "/company/settings",
              user_type === "Company_Admin" ? menu.settings : true
            )}

          {renderListItem(
            null, // No `to` prop as we're handling the navigation manually
            "Logout",
            <InfoOutlinedIcon />,
            false, // No path check, since it's handled manually
            menu?.logout,
            () => {
              handleLogout();
            }
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
