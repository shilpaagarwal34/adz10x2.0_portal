import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignDetail from "../../Company/Campaign/CampaignDetail.jsx";
import CampaignCard from "../../Company/Campaign/CampaignCard.jsx";
import "../../../Pages/Styles/Society-Dashboard.css";
import { fetchCampaignByIdAdmin } from "../../../store/Actions/Company/Campaign/CampaignActions.js";
import StatusDropdown from "../../Common/StatusDropdown.jsx";
import { toast } from "react-toastify";
import {
  adminHasPrivilege,
  getCombinedStatus,
} from "../../../helper/helper.js";
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
  const [rejectedCampaigns, setRejectedCampaigns] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        const data = await fetchCampaignByIdAdmin(campaignId);
        const { campaign, campaign_logs, company, total_flats } = data;
        setCampaignData(campaign); // Set the meta data about campaign
        setCampaignLog(campaign_logs);
        setCompanyDetails(company);
        setFlats(total_flats);

        // Filter campaigns into pending, rejected, and active categories
        const pending = [];
        const rejected = [];
        const active = [];
        const approved = [];
        const completed = [];

        campaign_logs.forEach((log) => {
          const { admin_approved_status, society_approved_status } = log;

          // const status = getCombinedStatus(log);
          // if (status.startsWith("Pending")) pending.push(log);
          // else if (status === "Approved") approved.push(log);
          // else if (status === "Rejected") rejected.push(log);
          // else if (status === "Live") active.push(log);
          // else if (status === "Completed") completed.push(log);

          if (
            (admin_approved_status === "approved" &&
              society_approved_status === "pending") ||
            (admin_approved_status === "pending" &&
              society_approved_status === "approved") ||
            (admin_approved_status === "pending" &&
              society_approved_status === "pending") ||
            (admin_approved_status === "approved" &&
              !society_approved_status) ||
            (!admin_approved_status && society_approved_status === "approved")
          ) {
            pending.push(log);
          }
          // Rejected: Either one of the statuses is rejected
          else if (
            admin_approved_status === "reject" ||
            society_approved_status === "reject"
          ) {
            rejected.push(log);
          }
          // Active: Both are approved (active)
          else if (
            admin_approved_status === "active" &&
            society_approved_status === "active"
          ) {
            active.push(log);
          } else if (
            admin_approved_status === "approved" &&
            society_approved_status === "approved"
          ) {
            approved.push(log);
          }
        });

        // Set the filtered campaigns to state
        setPendingCampaigns(pending);
        setRejectedCampaigns(rejected);
        setActiveCampaigns(active);
        setApprovedCampaigns(approved);
        setCompletedCampaigns(completed);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        // console.error("Error fetching campaign data:", error);
        toast.error(error?.message || error?.response?.data?.message);
        setLoading(false);
      }
    };

    getCampaignData();
  }, [campaignId]);

  return (
    <div className="pt-3">
      <div className="row m-0">
        <div className="col-12 col-lg-8">
          {loading ? (
            <CampaignCardSkeleton />
          ) : (
            <>
              {pendingCampaigns.length > 0 && (
                <CampaignCard
                  heading="Pending Campaign"
                  data={pendingCampaigns}
                  metaData={campaignData}
                  userType="admin"
                  companyDetails={companyDetails}
                  status="pending"
                />
              )}

              {activeCampaigns.length > 0 && (
                <CampaignCard
                  heading="Live Campaign"
                  data={activeCampaigns}
                  metaData={campaignData}
                  userType="admin"
                  companyDetails={companyDetails}
                  status="active"
                />
              )}

              {approvedCampaigns.length > 0 && (
                <CampaignCard
                  heading="Approved Campaign"
                  data={approvedCampaigns}
                  metaData={campaignData}
                  userType="admin"
                  companyDetails={companyDetails}
                  status="approved"
                />
              )}

              {/* {completedCampaigns.length > 0 && (
                <CampaignCard
                  heading="Completed Campaign"
                  data={completedCampaigns}
                  metaData={campaignData}
                  userType="admin"
                  companyDetails={companyDetails}
                  status="completed"
                />
              )} */}

              {rejectedCampaigns.length > 0 && (
                <CampaignCard
                  heading="Rejected Campaign"
                  data={rejectedCampaigns}
                  metaData={campaignData}
                  userType="admin"
                  companyDetails={companyDetails}
                  status="cancelled"
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
              campaignId={campaignData?.id}
            />
          )}
          {adminHasPrivilege("campaigns_edit") &&
            campaignData?.campaign_status === "pending" && (
              <StatusDropdown campaignId={campaignId} />
            )}
        </div>
      </div>
    </div>
  );
}

export default CampaignView;
