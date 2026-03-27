import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings,
  Business,
  Apartment,
  CorporateFare,
  Campaign,
  Payment,
  Assessment,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import logo from "../../../assets/Logo/logo.svg";
import smlogo from "../../../assets/Logo/Fevicon.png";
import { adminHasPrivilege } from "../../../helper/helper";
import { Modal } from "bootstrap";
import { Headset } from "lucide-react";

const reportMenu = {
  key: "reports",
  label: "Report",
  icon: <Assessment />,
  children: [
    {
      to: "/admin/report/total-societies-report",
      label: "Total Societies Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/total-companies-report",
      label: "Total Company Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/total-ads-report",
      label: "Total Ads Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/society-payments",
      label: "Society Payments Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/company-payments",
      label: "Company Payments Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/system-user-logs",
      label: "System User Log Report",
      privilegeKey: "reports_view",
    },
    {
      to: "/admin/report/platform-earning-report",
      label: "Platform Earning Report ",
      privilegeKey: "reports_view",
    },
  ],
};

const Sidebar = ({ open }) => {
  const location = useLocation();

  // Single state to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  const handleReportToggle = (key) => {
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

  // Function to handle dropdown toggle
  const handleToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleOpenModal = () => {
    const modalElement = document.getElementById("supportModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const renderSingleLevelMenu = (key, label, icon, children = []) => {
    const isOpen = openDropdowns.has(key);

    // Flatten the nested children to a single level
    const flattenedChildren = children.flatMap((item) =>
      item.children ? item.children : [item]
    );

    return (
      <React.Fragment key={key}>
        <ListItem
          onClick={() => handleReportToggle(key)}
          className={isOpen ? "active-master" : "custom-hover-remove"}
          style={{ cursor: "pointer" }}
          sx={key === "payment-report" ? { margin: "0 10px !important" } : {}}
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
  };

  return (
    <>
      <Drawer
        variant="permanent"
        className={`sidebar ${open ? "open" : "closed"}`}
        open={open} // optional, depending on MUI version
      >
        <div className="image-container"></div>

        <Box className="sidebar-logo">
          <img src={open ? logo : smlogo} alt="Logo" className="logo-image" />
        </Box>

        <List>
          {/* Dashboard Link */}
          {adminHasPrivilege("dashboard_view") && (
            <ListItem
              component={Link}
              to="/admin"
              className={
                location.pathname === "/admin"
                  ? "active"
                  : "custom-hover-remove"
              }
            >
              <ListItemIcon>
                <HomeIcon
                  className={location.pathname === "/admin" ? "" : "icon "}
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          )}

          {/* Master Dropdown */}

          {(adminHasPrivilege("city_view") ||
            adminHasPrivilege("area_view") ||
            adminHasPrivilege("company_sector_view") ||
            adminHasPrivilege("campaign_configuration_view")) && (
            <>
              <ListItem
                onClick={() => handleToggle("master")}
                style={{ cursor: "pointer" }}
                className={
                  location.pathname.startsWith("/dashboard/master")
                    ? "active-master"
                    : "custom-hover-remove"
                }
              >
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Master" />
                {openDropdown === "master" ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openDropdown === "master"}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {/* City */}
                  {adminHasPrivilege("city_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/master/city"
                      className={
                        location.pathname === "/admin/master/city"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                      // sx={{ pl: 4 }}
                    >
                      <ListItemText primary="City" />
                    </ListItem>
                  )}

                  {/* area */}
                  {adminHasPrivilege("area_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/master/area"
                      className={
                        location.pathname === "/admin/master/area"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                      // sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Area" />
                    </ListItem>
                  )}

                  {/* Company Sector */}
                  {adminHasPrivilege("company_sector_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/master/companysector"
                      className={
                        location.pathname === "/admin/master/companysector"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                      // sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Company Sector" />
                    </ListItem>
                  )}

                  {/* Campaign Configuration  */}
                  {adminHasPrivilege("campaign_configuration_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/master/campaign-configuration"
                      className={
                        location.pathname ===
                        "/admin/master/campaign-configuration"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="Campaign Configuration" />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </>
          )}

          {/* Societies Link */}
          {adminHasPrivilege("societies_view") && (
            <ListItem
              component={Link}
              to="/admin/societies"
              className={
                location.pathname.startsWith("/admin/societies")
                  ? "active"
                  : "custom-hover-remove"
              }
            >
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText primary="Societies" />
            </ListItem>
          )}

          {/* Company Link */}
          {adminHasPrivilege("company_view") && (
            <ListItem
              component={Link}
              to="/admin/company"
              className={
                location.pathname.startsWith("/admin/company")
                  ? "active"
                  : "custom-hover-remove"
              }
            >
              <ListItemIcon>
                <CorporateFare />
              </ListItemIcon>
              <ListItemText primary="Company" />
            </ListItem>
          )}

          {/* Campaigns */}
          {adminHasPrivilege("campaigns_view") && (
            <ListItem
              component={Link}
              to="/admin/campaigns"
              className={
                location.pathname.startsWith("/admin/campaign")
                  ? "active"
                  : "custom-hover-remove"
              }
            >
              <ListItemIcon>
                <Campaign />
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
          )}

          {/* Payments */}

          {(adminHasPrivilege("company_payments_view") ||
            adminHasPrivilege("society_payments_view") ||
            adminHasPrivilege("company_wallet_view")) && (
            <>
              <ListItem
                onClick={() => handleToggle("payments")}
                className={
                  location.pathname.startsWith("/dashboard/payments")
                    ? "active-master"
                    : "custom-hover-remove"
                }
                style={{ cursor: "pointer" }}
              >
                <ListItemIcon>
                  <Payment />
                </ListItemIcon>
                <ListItemText primary="Payments" />
                {openDropdown === "payments" ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openDropdown === "payments"}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {/* company Payment */}
                  {adminHasPrivilege("company_payments_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/payments/company"
                      className={
                        location.pathname === "/admin/payments/company"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                      // sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Company Payments" />
                    </ListItem>
                  )}

                  {/* Wallet Paymnts */}
                  {adminHasPrivilege("company_wallet_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/payments/wallet"
                      className={
                        location.pathname === "/admin/payments/wallet"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="Company Wallet" />
                    </ListItem>
                  )}

                  {adminHasPrivilege("society_payments_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/payments/settlements"
                      className={
                        location.pathname === "/admin/payments/settlements"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="Campaign Settlements" />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </>
          )}

          {/* Reports */}
          {adminHasPrivilege("reports_view") &&
            renderSingleLevelMenu(
              reportMenu.key,
              reportMenu.label,
              reportMenu.icon,
              reportMenu.children
            )}

          {/* System Users */}
          {adminHasPrivilege("system_users_view") && (
            <ListItem
              component={Link}
              to="/admin/users"
              className={
                location.pathname.startsWith("/admin/users")
                  ? "active"
                  : "custom-hover-remove"
              }
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Users" />
            </ListItem>
          )}

          {/* Settings Dropdown */}

          {(adminHasPrivilege("general_settings_view") ||
            adminHasPrivilege("visual_settings_view") ||
            adminHasPrivilege("change_password_view")) && (
            <>
              <ListItem
                onClick={() => handleToggle("settings")}
                style={{ cursor: "pointer" }}
                className={
                  location.pathname.startsWith("/admin/settings")
                    ? "active-master"
                    : "custom-hover-remove"
                }
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {openDropdown === "settings" ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openDropdown === "settings"}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {/* general setting */}
                  {adminHasPrivilege("general_settings_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/settings/general"
                      className={
                        location.pathname === "/admin/settings/general"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="General Settings" />
                    </ListItem>
                  )}

                  {/* visual setting */}
                  {adminHasPrivilege("visual_settings_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/settings/visual"
                      className={
                        location.pathname === "/admin/settings/visual"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="Visual Settings" />
                    </ListItem>
                  )}

                  {/* password change */}
                  {adminHasPrivilege("change_password_view") && (
                    <ListItem
                      component={Link}
                      to="/admin/settings/change-password"
                      className={
                        location.pathname === "/admin/settings/change-password"
                          ? "active-dropdown"
                          : "custom-hover-remove custom-margin"
                      }
                    >
                      <ListItemText primary="Change Password" />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </>
          )}

          <ListItem component={Link} onClick={handleOpenModal}>
            <ListItemIcon>
              <Headset />
            </ListItemIcon>
            <ListItemText primary="Application Support" />
          </ListItem>
        </List>
      </Drawer>

      {/* Modal HTML (copied from your code) */}
      <div
        className="modal fade"
        id="supportModal"
        tabIndex="-1"
        aria-labelledby="supportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="supportModalLabel">
                Application Support Guide
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ lineHeight: 1.8 }}>
              <p>
                If you have any issues or concerns related to the project, they
                should be raised through our support ticket system.
              </p>
              <h5>
                <strong>Support Application URL:</strong>
              </h5>
              <p className="mb-0">
                <strong>Login Link:</strong>{" "}
                <a
                  href="https://support.mplussoft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://support.mplussoft.com/
                </a>
              </p>
              <p>
                <strong>Login ID:</strong> <br />
                <strong>Password:</strong> The password has been shared with
                your registered email ID. (If the password does not work, you
                can use the{" "}
                <a
                  href="https://support.mplussoft.com/index.php/signin/request_reset_password"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Forgot Password
                </a>{" "}
                option.)
              </p>
              <hr />
              <h5>
                <strong>Steps to Raise a Ticket:</strong>
              </h5>
              <ol>
                <li>Go to support application link and login your account.</li>
                <li>
                  Go to ticket section in the menu and click on{" "}
                  <strong>"Add ticket"</strong> button.
                </li>
                <li>Fill the ticket form with necessary details and submit.</li>
                <li>You can view all raised tickets with their status.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
