import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/Styles/Society-Dashboard.css";

// Components
import SocietyName from "../../Components/Society/Dashboard/SocietyName/SocietyName.jsx";
import CampaingCount from "../../Components/Society/Dashboard/CampaignCount/CampaignCount.jsx";
import CampaignList from "../../Components/Society/Dashboard/Campaings/CampaignList.jsx";
import StatusCard from "../../Components/Society/Dashboard/AccountStatus/StatusCard.jsx";
import ManagerInfo from "../../Components/Common/Manager-info.jsx";
import Gallery from "../../Components/Society/Dashboard/Gallery/gallery.jsx";
import { fetchDashboardData } from "../../store/Actions/Society/Dashboard/DashboardActions.js";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import DashboardProfileSkeleton from "../../Components/Skeletons/Dashboard/DashboardProfileSkeleton.jsx";
import DashboardCountSkeleton from "../../Components/Company/Dashboard/DashboardCountSkeleton.jsx";
import CampaignCardSkeleton from "../../Components/Skeletons/Campaign/CampaignCardSkeleton.jsx";
import KYCStatusSkeleton from "../../Components/Skeletons/KYCStatusSkeleton.jsx";
import ManagerInfoSkeleton from "../../Components/Skeletons/ManagerInfoSkeleton.jsx";

import GallerySkeleton from "../../Components/Skeletons/Society/GallerySkeleton.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import api_routes from "../../config/api.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [staticRM, setStaticRM] = useState(null);

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchProfileData());
  }, [dispatch]);

  const { dashboardData, status, error } = useSelector(
    (state) => state.society.dashboard
  );

  const {
    live_campaigns = [],
    pending_campaigns = [],
    upcoming_campaigns = [],
    counter = {},
  } = dashboardData || {};

  const { profileData } = useSelector((state) => state.society.profile);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axiosInstance
      .get(api_routes.admin.get_post_general_settings)
      .then((res) => {
        const data = res.data?.data;

        const fetchedData = {
          name: "Assistance",
          designation: "Relationship Manager",
          mobile_no: data?.mobile_no || "",
        };

        setStaticRM(fetchedData);
      })
      .catch((error) => {
        const msg = error?.response?.data?.message || error.message;
        console.log(msg);
      });
  }, []);

  // if (status === "failed") {
  //   return <div className="text-danger text-center py-4">Error: {error}</div>;
  // }

  return (
    <div className="row g-0" style={{ fontSize: "14px" }}>
      <div className="p-2 p-sm-3 rounded col-12 col-lg-9">
        {/* Header Section */}

        {status === "loading" ? (
          <DashboardProfileSkeleton />
        ) : (
          <SocietyName kyc_account_status={user?.kyc_status} />
        )}

        {status === "loading" ? (
          <DashboardCountSkeleton />
        ) : (
          <CampaingCount counter={counter} user={user} />
        )}

        {/* Campaign List */}
        <div>
          {status === "loading" ? (
            <>
              <CampaignCardSkeleton />
              <CampaignCardSkeleton />
              <CampaignCardSkeleton />
            </>
          ) : (
            <>
              <CampaignList
                title="Live Campaigns"
                badgeText="LIVE"
                campaigns={live_campaigns}
                status="live"
                kyc_status={user?.kyc_status}
              />
              <CampaignList
                title="Pending From Society"
                badgeText="PENDING"
                campaigns={pending_campaigns}
                status="pending"
                kyc_status={user?.kyc_status}
              />
              <CampaignList
                title="Upcoming Campaigns"
                badgeText="Upcoming"
                campaigns={upcoming_campaigns}
                status="approved"
                kyc_status={user?.kyc_status}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-3 p-1 p-sm-2 rounded col-12 col-lg-3">
        <div>
          {status === "loading" ? (
            <KYCStatusSkeleton />
          ) : (
            <StatusCard kyc_status={user?.kyc_status} />
          )}

          {status === "loading" ? (
            <ManagerInfoSkeleton />
          ) : (
            <ManagerInfo
              relationship_manager={
                user?.kyc_status === "pending"
                  ? staticRM
                  : dashboardData.relationship_manager
              }
            />
          )}

          {status === "loading" ? (
            <GallerySkeleton />
          ) : (
            <Gallery profileData={profileData} />
          )}
        </div>
      </div>
    </div>
  );
}
