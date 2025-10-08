import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../store/Actions/Company/Dashboard/DashboardActions.js";
import ManagerInfo from "../../Components/Common/Manager-info.jsx";
import "../../Pages/Styles/Society-Dashboard.css";

import StatusCard from "../../Components/Society/Dashboard/AccountStatus/StatusCard.jsx";
import PendingStatusLabel from "../../Components/Common/PendingStatusLabel.jsx";
import CampaignList from "../../Components/Society/Dashboard/Campaings/CampaignList.jsx";
import CompanyCounter from "../../Components/Company/Dashboard/CompanyCounter.jsx";
import DashboardWallet from "../../Components/Company/Dashboard/DashboardWallet.jsx";
import CreateCampaignBanner from "../../Components/Company/Dashboard/CreateCampaignBanner.jsx";
import DashboardSocietyProfile from "../../Components/Company/Dashboard/DashboardSocietyProfile.jsx";
import DashboardProfileSkeleton from "../../Components/Skeletons/Dashboard/DashboardProfileSkeleton.jsx";
import DashboardCountSkeleton from "../../Components/Company/Dashboard/DashboardCountSkeleton.jsx";
import CampaignCardSkeleton from "../../Components/Skeletons/Campaign/CampaignCardSkeleton.jsx";
import KYCStatusSkeleton from "../../Components/Skeletons/KYCStatusSkeleton.jsx";
import ManagerInfoSkeleton from "../../Components/Skeletons/ManagerInfoSkeleton.jsx";
import AddFundCardSkeleton from "../../Components/Skeletons/Company/Wallet/AddFundCardSkeleton.jsx";
import WalletBalanceCardSkeleton from "../../Components/Skeletons/Company/Wallet/WalletBalanceCardSkeleton.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import api_routes from "../../config/api.js";
import { toast } from "react-toastify";

function Dashboard() {
  const dispatch = useDispatch();

  // Fetching dashboard data from Redux store
  const { data, loading, error } = useSelector(
    (state) => state.company.dashboard
  );

  const [staticRM, setStaticRM] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData()); // Fetch data if not already fetched
  }, [dispatch]);

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

  // Handle error state
  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div className="row g-0 pb-5" style={{ fontSize: "14px" }}>
      <div className="p-2 p-sm-3 rounded col-12 col-lg-8">
        {user?.kyc_status === "pending" && (
          <PendingStatusLabel userType="company" />
        )}

        {loading ? (
          <DashboardProfileSkeleton />
        ) : (
          <DashboardSocietyProfile company={data?.company} />
        )}

        {loading ? (
          <DashboardCountSkeleton />
        ) : (
          <CompanyCounter counter={data?.counter} user={user} />
        )}

        <div>
          {loading ? (
            <>
              <CampaignCardSkeleton />
              <CampaignCardSkeleton />
              <CampaignCardSkeleton />
            </>
          ) : (
            <>
              <CampaignList
                title={"Live Campaigns"}
                campaigns={data?.live_campaigns || []}
                company={data?.company}
                status="approved"
                kyc_status={user?.kyc_status}
              />

              <CampaignList
                title={"Pending From Society"}
                campaigns={data?.pending_society || []}
                company={data?.company}
                status="pending"
                kyc_status={user?.kyc_status}
              />
  
              <CampaignList
                title={"Approved Campaigns"}
                campaigns={data?.approved_campaigns || []}
                company={data?.company}
                status="approved"
                kyc_status={user?.kyc_status}
              />
            </>
          )}
        </div>
      </div>

      <div className="p-2 p-sm-3 rounded col-12 col-lg-4">
        {/* Account Status and other sections */}
        <div>
          {loading ? (
            <KYCStatusSkeleton />
          ) : (
            <StatusCard kyc_status={user?.kyc_status} />
          )}

          {/* Manager Info Section */}
          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            user?.kyc_status === "approved" && (
              <ManagerInfo relationship_manager={data?.relationship_manager} />
            )
          )}

          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            user?.kyc_status === "pending" && (
              <ManagerInfo relationship_manager={staticRM} />
            )
          )}

          {/* My Wallet Section */}
          {loading ? (
            <AddFundCardSkeleton />
          ) : (
            user?.kyc_status === "approved" && <DashboardWallet />
          )}

          {/* Campaign Creation Section */}
          {loading ? (
            <WalletBalanceCardSkeleton />
          ) : (
            user?.kyc_status === "approved" && <CreateCampaignBanner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
