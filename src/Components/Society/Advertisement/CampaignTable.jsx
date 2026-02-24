import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  formatCampaignType,
  formatToTitleCase,
} from "../../../helper/helper.js";
import CompleteProfileModal from "../../Common/CompleteProfileModal.jsx";

const CampaignTable = ({ data, status }) => {
  const navigate = useNavigate();
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const profileCompletedPercentage = useSelector(
    (state) => state.society.profile?.profileCompletedPercentage ?? 0
  );

  const handleViewRedirection = (campaignStatus, advertisementId) => {
    if (Number(profileCompletedPercentage || 0) < 100) {
      setShowCompleteProfileModal(true);
      return;
    }
    switch (campaignStatus) {
      case "pending":
        navigate(`/society/advertisement/pending/${advertisementId}/view`);
        break;

      case "live":
        navigate(
          `/society/advertisement/${advertisementId}/view?status=${campaignStatus}`
        );
        break;

      case "approved":
        navigate(
          `/society/advertisement/${advertisementId}/view?status=${campaignStatus}`
        );
        break;

      // case "completed":
      //   navigate(
      //     `/society/advertisement/${advertisementId}/view?status=${campaignStatus}`
      //   );
      //   break;
      case "completed":
        navigate(`/society/advertisement/${advertisementId}/completed-view`);
        break;

      case "reject":
        navigate(`/society/advertisement/cancelled/${advertisementId}/view`);
        break;

      default:
        console.warn("Unknown status:", status);
    }
  };

  return (
    <>
    <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
      <thead>
        <tr className="striped-thead">
          <th>Sr No.</th>
          <th>Campaign ID</th>
          <th>Ads Date</th>
          {status === "live" && <th>Time Slot</th>}
          {(status === "live" || status === "pending") && <th>Company Name</th>}
          {(status === "approved" ||
            status === "completed" ||
            status === "reject") && <th>Campaign Heading</th>}
          <th>Ads Type</th>
          <th>Creative Type</th>
          {/* {(status === "live" || status === "approved") && (
            <th>Report Status</th>
          )} */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((ad, index) => (
          <tr key={ad.id}>
            <td>{index + 1}</td>
            <td>{ad?.id_prifix_campaign_ads}</td>
            <td>{ad?.createdAtFormatted}</td>
            {status === "live" && (
              <td>
                {`${ad.slot_start_time
                  .split(":")[0]
                  .padStart(2, "0")} ${ad.slot_start_time.slice(
                  -2
                )} - ${ad.slot_end_time
                  .split(":")[0]
                  .padStart(2, "0")} ${ad.slot_end_time.slice(-2)}`}
              </td>
            )}
            {(status === "live" || status === "pending") && (
              <td>{ad?.company_name}</td>
            )}
            {(status === "approved" ||
              status === "completed" ||
              status === "reject") && <td>{ad?.campaign_name}</td>}
            <td>{formatCampaignType(ad?.campaign_type || "")}</td>
            <td>{formatToTitleCase(ad?.creative_type)}</td>
            {/* {(status === "live" || status === "approved") && (
              <td>{formatToTitleCase(ad?.report_status || "")}</td>
            )} */}
            <td className="text-center">
              <img
                src="/view.svg"
                onClick={() => handleViewRedirection(status, ad?.id)}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
      <CompleteProfileModal
        show={showCompleteProfileModal}
        onHide={() => setShowCompleteProfileModal(false)}
        profileEditPath="/society/profile/edit"
        message="Your profile is incomplete. Please complete profile to 100% before viewing campaign details. Do you want to go to Edit Profile now?"
      />
    </>
  );
};

export default CampaignTable;
