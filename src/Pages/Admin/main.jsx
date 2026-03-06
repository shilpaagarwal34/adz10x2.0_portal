import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
// LAYOUT FILES
import Sidebar from "../../Components/Admin/Dashboard/Sidebar.jsx";
import Navbar from "../../Components/Admin/Dashboard/Navbar.jsx";

import Home from "../../Components/Admin/Dashboard/Home.jsx";

// GENERAL SETTINGS
import SettingsPage from "../../Components/Admin/Settings/Settings.jsx";
import GeneralSettings from "../../Components/Admin/Settings/GeneralSettings.jsx";
import VisualSettings from "../../Components/Admin/Settings/VisualSettings.jsx";

// STYLESHEETS
import "../Styles/Dashboard.css";
import "../Styles/Settings.css";

// Master Imports
import CityManager from "../../Components/Admin/Master/City/City.jsx";
import Area from "../../Components/Admin/Master/Area/Area.jsx";
import CompanySector from "./Master/Company-sector.jsx";
import CampaignConfiguration from "./Master/CampaingConfiguration.jsx";

// Society Routes
import Society from "./Societies/Society.jsx";
import SocietyView from "./Societies/SocietyView.jsx";

// Company Routes
import Company from "./Company/Company.jsx";
import CompanyView from "./Company/CompanyView.jsx";

// PAYMENT OUTES
import CompanyPayments from "../../Components/Admin/Payments/Company.jsx";
import SocietyPayments from "../../Components/Admin/Payments/Society.jsx";
import CampaignSettlements from "../../Components/Admin/Payments/CampaignSettlements.jsx";

// CAMPAIGN VIEWS
import Campains from "./Campains/main.jsx";
import CampaignView from "./Campains/CampaignView.jsx";

import Footer from "../../Components/Common/Footer.jsx";

// USER ROUTES
import UsersView from "./Users/Main.jsx";
import AddUser from "./Users/AddUser.jsx";

// WALLET
import Wallet from "../../Components/Admin/Payments/Wallet.jsx";

// Campaign
import AdminCampaignView from "../../Components/Admin/Campaigns/AdminCampaignView.jsx";
import CancelledView from "./Campains/Views/CancelledView.jsx";
import CompletedView from "./Campains/Views/CompletedView.jsx";
import LiveApprovedView from "./Campains/Views/LiveApprovedView.jsx";
import { AdsModalProvider } from "../../Context/AdsModalContext.jsx";
import AdsModal from "./Campains/AdsModal.jsx";
import SampleModal from "../../Components/Society/Advertisement/SampleImageModal.jsx";
import ChangePassword from "../../Components/Admin/Settings/ChangePassword.jsx";
import { adminHasPrivilege } from "../../helper/helper.js";
import Notifications from "../Society/Notifications.jsx";
import NotFoundPage from "../../Auth/Components/NotFoundPage.jsx";
import Report from "./Report.jsx";

const AdminRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // initially open

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // show on big screen
      } else {
        setIsSidebarOpen(false); // hide on small screen
      }
    };

    window.addEventListener("resize", handleResize);

    // run once on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box className="layout">
      <CssBaseline />
      <Sidebar open={isSidebarOpen} />

      <Box className="main-content pt-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <ToastContainer />
        <AdsModalProvider>
          <AdsModal />
          <SampleModal />
          <Routes>
            <Route
              path="/"
              element={
                adminHasPrivilege("dashboard_view") ? (
                  <Home />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* MASTER ROUTES */}

            <Route
              path="/master/area"
              element={
                adminHasPrivilege("area_view") ? (
                  <Area />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/master/city"
              element={
                adminHasPrivilege("city_view") ? (
                  <CityManager />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/master/companysector"
              element={
                adminHasPrivilege("company_sector_view") ? (
                  <CompanySector />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/master/campaign-configuration"
              element={
                adminHasPrivilege("campaign_configuration_view") ? (
                  <CampaignConfiguration />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* SOCIETY ROUTES */}

            <Route
              path="/societies"
              element={
                adminHasPrivilege("societies_view") ? (
                  <Society />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/societies/view/:id"
              element={
                adminHasPrivilege("societies_view") ? (
                  <SocietyView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* COMPANY ROUTES */}
            <Route
              path="/company"
              element={
                adminHasPrivilege("company_view") ? (
                  <Company />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/company/view/:id"
              element={
                adminHasPrivilege("company_view") ? (
                  <CompanyView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* CAMPAIGN ROUTES */}

            <Route
              path="/campaigns"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <Campains />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/campaign/view/:campaignId"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <AdminCampaignView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* for pending */}
            <Route
              path="/campaign/change-status/:logId"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <CampaignView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* for live */}
            <Route
              path="/campaign-view/:id/live"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <LiveApprovedView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/campaign-view/:id/approved"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <LiveApprovedView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/campaign-view/:id/completed"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <CompletedView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/campaign-view/:id/cancelled"
              element={
                adminHasPrivilege("campaigns_view") ? (
                  <CancelledView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* PAYMENT ROUTES */}

            <Route
              path="/payments/society"
              element={
                adminHasPrivilege("society_payments_view") ? (
                  <SocietyPayments />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/payments/company"
              element={
                adminHasPrivilege("company_payments_view") ? (
                  <CompanyPayments />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/payments/wallet"
              element={
                adminHasPrivilege("company_wallet_view") ? (
                  <Wallet />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/payments/settlements"
              element={
                adminHasPrivilege("society_payments_view") ? (
                  <CampaignSettlements />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/report/:type"
              element={
                adminHasPrivilege("reports_view") ? (
                  <Report />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* SYSTEM USER ROUTES */}

            <Route
              path="/users"
              element={
                adminHasPrivilege("system_users_view") ? (
                  <UsersView />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/users/create"
              element={
                adminHasPrivilege("system_users_add") ? (
                  <AddUser />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            <Route
              path="/users/edit/:userId"
              element={
                adminHasPrivilege("system_users_edit") ? (
                  <AddUser />
                ) : (
                  <Navigate to="/admin/unauthorized" />
                )
              }
            />

            {/* Settings */}

            <Route path="/settings" element={<SettingsPage />}>
              <Route
                path="general"
                element={
                  adminHasPrivilege("general_settings_view") ? (
                    <GeneralSettings />
                  ) : (
                    <Navigate to="/admin/unauthorized" />
                  )
                }
              />
              <Route
                path="visual"
                element={
                  adminHasPrivilege("visual_settings_view") ? (
                    <VisualSettings />
                  ) : (
                    <Navigate to="/admin/unauthorized" />
                  )
                }
              />

              <Route
                path="change-password"
                element={
                  adminHasPrivilege("change_password_view") ? (
                    <ChangePassword />
                  ) : (
                    <Navigate to="/admin/unauthorized" />
                  )
                }
              />
            </Route>
            <Route path="/notifications" element={<Notifications />} />

            <Route path="*" element={<NotFoundPage to="/admin" />} />
          </Routes>
        </AdsModalProvider>
      </Box>

      <Footer />
    </Box>
  );
};

export default AdminRoutes;
