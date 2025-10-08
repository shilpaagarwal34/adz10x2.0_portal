import { useState } from "react";
import AdvDetails from "../AdvDetail.jsx";
import ApprovedAdReport from "./ApprovedAdReport.jsx";
import CompletedAdReport from "../Completed/CompletedAdReport.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAdvertisementForCompany } from "../../../../store/Actions/Company/Campaign/CampaignActions.js";
import { toast } from "react-toastify";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton.jsx";
import ApprovedCardSkeleton from "../../../Skeletons/Campaign/ApprovedCardSkeleton.jsx";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import ApprovedDetail from "../../../Society/Advertisement/Approved/ApprovedDetail.jsx";

const imagePreviewCss = {
  width: "80%",
  height: "200px",
  cursor: "pointer",
  objectFit: "contain",
};

const ApprovedAdView = () => {
  const { advertisementId } = useParams();

  const [loading, setLoading] = useState(false);

  const [campaignData, setCampaignData] = useState({
    campaign_logs: null,
    campaign: null,
    society: null,
    company: null,
    advertisement: null,
    rel_managers: null,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetchAdvertisementForCompany(advertisementId);
        // console.log(res);
        setCampaignData(res);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [advertisementId]);

  return (
    <>
      <div className="row g-0 pb-5" style={{ backgroundColor: "#f7f7fe" }}>
        <div className="col-12 col-lg-8  p-1 p-lg-3">
          <div className="card border-0">
            {loading ? (
              <LiveCardSkeleton />
            ) : (
              <ApprovedAdReport
                advertisementData={campaignData?.advertisement}
                logData={campaignData?.campaign_logs}
                campaign_status={campaignData?.campaign?.campaign_status}
                creative_type={campaignData?.campaign?.creative_type}
                imagePreviewCss={imagePreviewCss}
              />
            )}
            {loading ? (
              <ApprovedCardSkeleton />
            ) : (
              campaignData?.campaign?.campaign_status === "completed" && (
                <CompletedAdReport
                  advertisementData={campaignData?.advertisement}
                  // imagePreviewCss={imagePreviewCss}
                />
              )
            )}
          </div>
        </div>

        <div className="col-12 col-lg-4 px-1 px-lg-0">
          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            <ManagerInfo relationship_manager={campaignData?.rel_managers} />
          )}

          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <AdvDetails
              campaignData={campaignData?.campaign}
              campaignAdAmount={
                campaignData?.campaign_logs?.campaign_ads_amount
              }
              society={campaignData?.society}
            />
          )}

          <ApprovedDetail data={campaignData?.campaign_logs} />
        </div>
      </div>
    </>
  );
};

export default ApprovedAdView;
