import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../../Components/Admin/Dashboard/Sidebar.jsx";
import Navbar from "../../Components/Admin/Dashboard/Navbar.jsx";
import Home from "../../Components/Admin/Dashboard/Home.jsx";
import CampaignConfiguration from "../../Components/Admin/Master/CampaignConfiguration.jsx";
import SettingsPage from "../../Components/Admin/Settings/Settings.jsx";
import GeneralSettings from "../../Components/Admin/Settings/GeneralSettings.jsx";
import VisualSettings from "../../Components/Admin/Settings/VisualSettings.jsx";
import "../../../Styles/Dashboard.css";
import "../../../Styles/Settings.css";
import SocietyTableComponent from "../Societies/table.jsx";
import CompanyTable from "../Company.jsx";
import CompanyPayments from "../../Components/Admin/Payments/Company.jsx";
import SocietyPayments from "../../Components/Admin/Payments/Society.jsx";
import CityManager from "../../Components/Admin/Master/city.jsx";
import AreaManager from "../../Components/Admin/Master/area.jsx";
import Campains from "../Campains/main.jsx";
import Footer from "../../Components/Common/Footer.jsx"
import CampaignView from "../Campains/CampaignView.jsx";
import LiveCampaignView from "../Campains/LiveCampaignView.jsx";
import ApprovedCampaignView from "../Campains/ApprovedView.jsx";
import CompletedView from "../Campains/CompletedView.jsx";
import CancelledView from "../Campains/CancelledView.jsx";
import Societyview from "../Societies/view.jsx";
import CompanyView from '../Company/view.jsx'
import Main from "../Societies/main.jsx";
import Pending from "../Societies/Pending.jsx";
import Approved from "../Societies/Approved.jsx";
import Rejected from "../Societies/Rejected.jsx";
import UsersView from "../Users/Main.jsx";
import AddUser from "../Users/AddUser.jsx";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
  setOpen((prevOpen) => {
    // console.log("Toggling drawer. New state:", !prevOpen); // ✅ Log toggle
    return !prevOpen;
  });
};
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar open={open} />
      <Navbar toggleDrawer={toggleDrawer}/>

      <Box className="main-content" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master/area" element={<AreaManager />} />
          <Route path="/master/city" element={<CityManager />} />
          <Route
            path="/master/campaign-configuration"
            element={<CampaignConfiguration />}
          />
          <Route path="/societies" element={<Main />} />
          <Route path="/societies/:id/Pending" element={<Pending />} />
          <Route path="/societies/:id/Approved" element={<Approved />} />
          <Route path="/societies/:id/Rejected" element={<Rejected />} />
          <Route path="/societies-view" element={<Societyview />} />
          <Route path="/campains" element={<Campains />} />
          <Route path="/campaign-view/:id/pending" element={<CampaignView />} />
          <Route path="/campaign-view/:id/draft" element={<LiveCampaignView />} />
          <Route path="/campaign-view/:id/completed" element={<CompletedView />} />
          <Route path="/campaign-view/:id/cancelled" element={<CancelledView />} />
          <Route path="/campaign-view/:id/approved" element={<ApprovedCampaignView />} />
          <Route path="/payments/society" element={<SocietyPayments />} />
          <Route path="/payments/company" element={<CompanyPayments />} />
          <Route path="/company" element={<CompanyTable />} />
          <Route path="/company-view" element={<CompanyView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/create" element={<AddUser />} />
          <Route path="/settings" element={<SettingsPage />}>
            <Route path="general" element={<GeneralSettings />} />
            <Route path="visual" element={<VisualSettings />} />
          </Route>
        </Routes>
      </Box>

      <Footer /> 
    </Box>
  );
};


export default Dashboard;
