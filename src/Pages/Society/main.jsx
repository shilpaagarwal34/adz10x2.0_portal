import Layout from "../../layouts/layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

// Profile
import Profile from "./Profile/Profile.jsx";
import ProfileEdit from "./Profile/ProfileEdit.jsx";

// Advertisement
import Advertisement from "./Advertisement.jsx";
import Pendingview from "../../Components/Society/Advertisement/Pending/Pending-view.jsx";
import LiveView from "../../Components/Society/Advertisement/Live/Live-view.jsx";
import ApprovedView from "../../Components/Society/Advertisement/Approved/Approved-view.jsx";
import CompletedView from "../../Components/Society/Advertisement/Completed/Completed-view.jsx";
import CancelView from "../../Components/Society/Advertisement/Cancelled/Cancel-view.jsx";

//Wallet
import Wallet from "./Wallet/Wallet.jsx";

// Payment
import Payment from "./Payment.jsx";
import Users from "./Users/Users.jsx";
import Settings from "./Settings.jsx";
import Footer from "./Footer.jsx";
import Notifications from "./Notifications.jsx";
import Report from "./Report.jsx";
import PermissionRoute from "../../utils/PermissionRoute.jsx";
import { AdsModalProvider } from "../../Context/AdsModalContext.jsx";
import AdsModal from "../Admin/Campains/AdsModal.jsx";
import SampleModal from "../../Components/Society/Advertisement/SampleImageModal.jsx";
import { AuthRefresher } from "../../utils/AuthRefresher.jsx";
import NotFoundPage from "../../Auth/Components/NotFoundPage.jsx";

function Society() {
  return (
    <Layout>
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
                <ProfileEdit />
              </PermissionRoute>
            }
          />

          <Route
            path="/advertisement"
            element={
              <PermissionRoute permission="advertisement">
                <Advertisement />
              </PermissionRoute>
            }
          />

          <Route
            path="/advertisement/pending/:advertisementId/view"
            element={
              <PermissionRoute permission="advertisement">
                <Pendingview />
              </PermissionRoute>
            }
          />

          <Route
            path="/advertisement/:advertisementId/view"
            element={
              <PermissionRoute permission="advertisement">
                <ApprovedView />
              </PermissionRoute>
            }
          />

          {/* <Route
            path="/advertisement/completed-view"
            element={
              <PermissionRoute permission="advertisement">
                <ApprovedView />
              </PermissionRoute>
            }
          /> */}

          <Route
            path="/advertisement/:advertisementId/completed-view"
            element={
              <PermissionRoute permission="advertisement">
                <CompletedView />
              </PermissionRoute>
            }
          />

          <Route
            path="/advertisement/cancelled/:advertisementId/view"
            element={
              <PermissionRoute permission="advertisement">
                <CancelView />
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
            path="/payment"
            element={
              <PermissionRoute permission="payments">
                <Payment />
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

          <Route
            path="/settings"
            element={
              <PermissionRoute permission="settings">
                <Settings />
              </PermissionRoute>
            }
          />

          <Route path="/notifications" element={<Notifications />} />

          <Route
            path="/report/:type"
            element={
              <PermissionRoute permission="report">
                <Report />
              </PermissionRoute>
            }
          />

          <Route path="*" element={<NotFoundPage to="/society" />} />
        </Routes>
      </AdsModalProvider>
      <Footer />
    </Layout>
  );
}

export default Society;
