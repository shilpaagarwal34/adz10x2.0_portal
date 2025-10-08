import CompanyLayout from "../../layouts/Company-layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Profile from "./Profile/Profile.jsx";
import Edit from "./Profile/Edit.jsx";
import Campaign from "./Campaign/Campaign.jsx";
import AddCampaign from "./Campaign/AddCampaign.jsx";
import Footer from "../Society/Footer.jsx";
import Payments from "./Payments.jsx";
import Wallet from "./Wallet/Wallet.jsx";
import Settings from "./Settings.jsx";
import Users from "./Users/Users.jsx";
import PermissionRoute from "../../utils/PermissionRoute.jsx";
import CampaignView from "../../Components/Company/Campaign/CampaignView.jsx";
import Report from "./Report.jsx";
import ApprovedAdView from "../../Components/Company/Campaign/Approved/ApprovedAdvView.jsx";
import { AdsModalProvider } from "../../Context/AdsModalContext.jsx";
import AdsModal from "../Admin/Campains/AdsModal.jsx";
import SampleModal from "../../Components/Society/Advertisement/SampleImageModal.jsx";
import CancelAdvView from "../../Components/Company/Campaign/Cancelled/CancelledAdv-View.jsx";
import Notifications from "../Society/Notifications.jsx";
import { AuthRefresher } from "../../utils/AuthRefresher.jsx";
import NotFoundPage from "../../Auth/Components/NotFoundPage.jsx";

function Company() {
  return (
    <CompanyLayout>
      <AdsModalProvider>
        <AdsModal />
        <SampleModal />
        <AuthRefresher />
        <Routes>
          <Route
            path="/"
            element={
              <PermissionRoute permission="dashboard">
                <Dashboard />
              </PermissionRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PermissionRoute permission="profile">
                <Profile />
              </PermissionRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PermissionRoute permission="profile">
                <Edit />
              </PermissionRoute>
            }
          />
          <Route
            path="/campaign"
            element={
              <PermissionRoute permission="advertisement">
                <Campaign />
              </PermissionRoute>
            }
          />
          <Route
            path="/campaign/newcampaign"
            element={
              <PermissionRoute permission="advertisement">
                <AddCampaign />
              </PermissionRoute>
            }
          />

          <Route
            path="/campaign/:campaignId/edit"
            element={
              <PermissionRoute permission="advertisement">
                <AddCampaign />
              </PermissionRoute>
            }
          />

          <Route
            path="/campaign/:campaignId/view"
            element={
              <PermissionRoute permission="advertisement">
                <CampaignView />
              </PermissionRoute>
            }
          />

          <Route
            path="/campaign/:advertisementId/approved-view"
            element={
              <PermissionRoute permission="advertisement">
                <ApprovedAdView />
              </PermissionRoute>
            }
          />

          {/* <Route
          path="/campaign/completedview"
          element={
            <PermissionRoute permission="advertisement">
              <CompletedView />
            </PermissionRoute>
          }
        /> */}

          <Route
            path="/campaign/:advertisementId/cancelled-view"
            element={
              <PermissionRoute permission="advertisement">
                <CancelAdvView />
              </PermissionRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <PermissionRoute permission="payments">
                <Payments />
              </PermissionRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PermissionRoute permission="wallet">
                <Wallet />
              </PermissionRoute>
            }
          />

          <Route
            path="/report/:type"
            element={
              <PermissionRoute permission="report">
                <Report />
              </PermissionRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PermissionRoute permission="settings">
                <Settings />
              </PermissionRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PermissionRoute permission="users">
                <Users />
              </PermissionRoute>
            }
          />

          <Route path="/notifications" element={<Notifications />} />

          <Route path="*" element={<NotFoundPage to="/company" />} />
        </Routes>
      </AdsModalProvider>
      <Footer />
    </CompanyLayout>
  );
}

export default Company;
