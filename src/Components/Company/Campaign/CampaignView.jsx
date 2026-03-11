import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignDetail from "./CampaignDetail.jsx";
import CampaignCard from "./CampaignCard.jsx";

import "../../../Pages/Styles/Society-Dashboard.css";
import { fetchCampaignById } from "../../../store/Actions/Company/Campaign/CampaignActions.js";
import { toast } from "react-toastify";
import CampaignCardSkeleton from "../../Skeletons/Campaign/CampaignCardSkeleton.jsx";
import CampaignDetailsSkeleton from "../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";

function CampaignView() {
  const { campaignId } = useParams();
  const [loading, setLoading] = useState(true);
  const [campaignData, setCampaignData] = useState(null);
  const [campaignLog, setCampaignLog] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [flats, setFlats] = useState(0);

  // State to hold the filtered campaign logs
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  const [cancelledCampaigns, setCancelledCampaigns] = useState([]);

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        const data = await fetchCampaignById(campaignId);
        const { campaign, campaign_logs, company, total_flats } = data;
        setCampaignData(campaign); // Set the meta data about campaign
        setCampaignLog(campaign_logs);
        setCompanyDetails(company);
        setFlats(total_flats);

        const pending = [];
        const approved = [];
        const completed = [];
        const cancelled = [];

        // Filter the campaign logs based on conditions
        campaign_logs.forEach((log) => {
          const { admin_approved_status, society_approved_status } = log;
          
          const isAdminPending =
            admin_approved_status === "pending" ||
            admin_approved_status === null;
          const isSocietyPending =
            society_approved_status === "pending" ||
            society_approved_status === null;

          if (
            isAdminPending ||
            (admin_approved_status === "approved" && isSocietyPending)
          ) {
            pending.push(log);
          }

          // Active: Both are approved (active)
          else if (
            admin_approved_status === "approved" &&
            society_approved_status === "approved"
          ) {
            approved.push(log);
          } else if (
            admin_approved_status === "completed" &&
            society_approved_status === "completed"
          ) {
            completed.push(log);
          } else if (
            admin_approved_status === "reject" ||
            society_approved_status === "reject"
          ) {
            cancelled.push(log);
          }
        });

        // Set the filtered campaigns to state
        setPendingCampaigns(pending);
        setApprovedCampaigns(approved);
        setCompletedCampaigns(completed);
        setCancelledCampaigns(cancelled);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.error("Error fetching campaign data:", error);
        setLoading(false);
      }
    };

    getCampaignData();
  }, [campaignId]);

  return (
    <div className="pb-5">
      <div className="row m-0">
        <div className="col-12 col-lg-8">
          {loading ? (
            <>
              <CampaignCardSkeleton count={2} />
              <CampaignCardSkeleton count={2} />
              <CampaignCardSkeleton count={2} />
            </>
          ) : (
            <>
              {pendingCampaigns.length > 0 && (
                <CampaignCard
                  heading="Pending Campaign"
                  data={pendingCampaigns}
                  metaData={campaignData}
                  companyDetails={companyDetails}
                  status="pending"
                  userType="company"
                />
              )}
              {approvedCampaigns.length > 0 && (
                <CampaignCard
                  heading="Approved Campaign"
                  data={approvedCampaigns}
                  metaData={campaignData}
                  companyDetails={companyDetails}
                  status="approved"
                  userType="company"
                />
              )}

              {completedCampaigns.length > 0 && (
                <CampaignCard
                  heading="Completed Campaign"
                  data={completedCampaigns}
                  metaData={campaignData}
                  companyDetails={companyDetails}
                  status="completed"
                  userType="company"
                />
              )}
              {cancelledCampaigns.length > 0 && (
                <CampaignCard
                  heading="Cancelled Campaign"
                  data={cancelledCampaigns}
                  metaData={campaignData}
                  companyDetails={companyDetails}
                  status="cancelled"
                  userType="company"
                />
              )}
            </>
          )}
        </div>
        <div className="col-12 col-lg-4">
          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <CampaignDetail
              data={campaignData}
              campaignLogs={campaignLog}
              companyDetails={companyDetails}
              flats={flats}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignView;
