import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";

// Components
import CompanyInfo from "../../../Components/Company/Profile/CompanyInfo.jsx";
import CompanyDetails from "../../../Components/Company/Profile/CompanyDetails.jsx";
import CompanyContactInfo from "../../../Components/Company/Profile/CompanyContactInfo.jsx";
import CompanyBillingInfo from "../../../Components/Company/Profile/CompanyBillingInfo.jsx";
import ManagerInfo from "../../../Components/Common/Manager-info.jsx";
import Documents from "../../../Components/Company/Profile/Documents.jsx";
import StatusCard from "../../../Components/Society/Dashboard/AccountStatus/StatusCard.jsx";

// Skeletons
import KYCStatusSkeleton from "../../../Components/Skeletons/KYCStatusSkeleton.jsx";
import DocumentsSkeleton from "../../../Components/Skeletons/DocumentsSkeleton.jsx";
import ManagerInfoSkeleton from "../../../Components/Skeletons/ManagerInfoSkeleton.jsx";
// Actions
import { fetchProfileData } from "../../../store/Actions/Company/Profile/ProfileActions.js";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { profileData, status, profileCompletedPercentage, error } =
    useSelector((state) => state.company.profile);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const isLoading = loading || status === "loading";

  // if (error) {
  //   // console.log(error)
  //   return <div>Error loading data: {error}</div>;
  // }

  return (
    <div className="row g-0 custom-label pb-5">
      <div className="col-12 col-lg-8 p-2 p-sm-3">
        <div className="card shadow-sm p-2 p-sm-3 rounded border-0 ">
          <CompanyInfo
            profileData={profileData}
            percentage={profileCompletedPercentage}
            isLoading={isLoading}
          />
          <CompanyDetails
            companyDetails={profileData?.company_profile}
            isLoading={isLoading}
          />
          <CompanyContactInfo contactInfo={profileData} isLoading={isLoading} />
          <CompanyBillingInfo
            billingInfo={profileData?.company_profile}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="col-12 col-lg-4 p-2 p-sm-3">
        {isLoading ? (
          <KYCStatusSkeleton />
        ) : (
          <StatusCard kyc_status={profileData?.kyc_status} />
        )}
        {isLoading ? <ManagerInfoSkeleton /> : <ManagerInfo />}

        {isLoading ? (
          <DocumentsSkeleton />
        ) : (
          <Documents documents={profileData} />
        )}
      </div>
    </div>
  );
};

export default Profile;
