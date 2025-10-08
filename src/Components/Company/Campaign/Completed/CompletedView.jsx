// import React from 'react'
// import CampaignDetail from '../CampaignDetail'
// import CampaignCard from '../CampaignCard'

// function CompletedView() {
//   const handleMoreDetails = (status, id) => {
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes("pending")) {
//       setShowModal(true);
//     } else if (
//       lowerStatus.includes("approved") ||
//       lowerStatus.includes("completed")
//     ) {
//       navigate(`/company/campaign/completedadvview`);
//     } else if (lowerStatus.includes("cancelled")) {
//       navigate(`/company/campaign/canceladvview`);
//     } else {
//       navigate(`/campaign/details/${id}`);
//     }
//   };
//   return (
//     <div className="pt-3">
//     <div className="row m-0" >
//         <div className="col-8">
//             <CampaignCard 
//             heading="Approved Campaign"
//             id="30334953"
//             campaignType="Lead Generation Date - 13 Feb 2025"
//             status="Completed"
//             flats="380"
//             companyName="Gulmohar"
//             address="New airport road, Viman Nagar, Pune - 412105"
//             companyImg="/pendingimg.svg"
//             campaignImg="/pending.svg"
//             onMoreDetails={handleMoreDetails}
//             />
//             <CampaignCard 
//             heading="Cancelled Campaign"
//             id="30334953"
//             campaignType="Lead Generation Date - 13 Feb 2025"
//             status="Cancelled - Society"
//             flats="380"
//             companyName="Gulmohar"
//             address="New airport road, Viman Nagar, Pune - 412105"
//             companyImg="/pendingimg.svg"
//             campaignImg="/pending.svg"
//             onMoreDetails={handleMoreDetails}
//             />
//         </div>
//         <div className="col-4">
//         <CampaignDetail status="Completed"/>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default CompletedView


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignDetail from "../CampaignDetail";
import CampaignCard from "../CampaignCard";
import PendingAdvView from "../../Pending/PendingAdv-View";
import "../../../../Pages/Styles/Society-Dashboard.css";
function CompletedView() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleMoreDetails = (status, id) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("pending")) {
      setShowModal(true);
    } else if (
      lowerStatus.includes("approved") ||
      lowerStatus.includes("completed")
    ) {
      navigate(`/company/campaign/completedadvview`);
    } else if (lowerStatus.includes("cancelled")) {
      navigate(`/company/campaign/canceladvview`);
    } else {
      navigate(`/campaign/details/${id}`);
    }
  };

  const [show, setShow] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const handlePreviewShow = () => setShowPreviewModal(true);
  const handlePreviewClose = () => setShowPreviewModal(false);

  return (
    <div className="pt-3">
      <div className="row m-0">
        <div className="col-8">
          <CampaignCard
            heading="Approved Campaign"
            id="30334953"
            campaignType="Lead Generation Date - 13 Feb 2025"
            status="Completed"
            flats="380"
            companyName="Gulmohar"
            address="New airport road, Viman Nagar, Pune - 412105"
            companyImg="/pendingimg.svg"
            campaignImg="/pending.svg"
            onMoreDetails={handleMoreDetails}
          />
          <CampaignCard
            heading="Cancelled Campaign"
            id="30334953"
            campaignType="Lead Generation Date - 13 Feb 2025"
            status="Cancelled - Society"
            flats="380"
            companyName="Gulmohar"
            address="New airport road, Viman Nagar, Pune - 412105"
            companyImg="/pendingimg.svg"
            campaignImg="/pending.svg"
            onMoreDetails={handleMoreDetails}
          />
        </div>
        <div className="col-4">
          <CampaignDetail status="Completed" />
        </div>
        <PendingAdvView
          show={showModal}
          onHide={() => setShowModal(false)}
          onPreviewShow={handlePreviewShow}
          showPreview={showPreviewModal}
          onPreviewClose={handlePreviewClose}
        />
      </div>
    </div>
  );
}

export default CompletedView;
