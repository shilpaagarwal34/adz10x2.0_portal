import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthPromptModal from "../../../Components/Common/AuthPromptModal.jsx";

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
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const hasAuthToken = Boolean(localStorage.getItem("auth_token"));

  const { profileData, status, profileCompletedPercentage, error } =
    useSelector((state) => state.company.profile);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (!hasAuthToken) return;
    dispatch(fetchProfileData());
  }, [dispatch, hasAuthToken]);

  useEffect(() => {
    if (!hasAuthToken) {
      setShowAuthPrompt(true);
    }
  }, [hasAuthToken]);

  const isLoading = loading || status === "loading";

  if (!hasAuthToken) {
    const draftProfileData = {
      company_name: "Draft Company",
      sector: "-",
      company_brand_name: "-",
      company_profile_photo_path: "",
      kyc_status: "pending",
      name: "Draft User",
      mobile_number: "-",
      email: "-",
      company_aggrement_copy_path: null,
      edit_permission: false,
      company_profile: {
        company_mobile_number: "-",
        company_email_id: "-",
        website: "-",
        party_name: "-",
        gst_number: "-",
        billing_address_line_1: "-",
        billing_address_line_2: "",
        pan_card_path: null,
        gst_certificate_path: null,
        other_document_path: null,
      },
    };

    return (
      <>
        <div className="row g-0 custom-label pb-5">
          <div className="col-12 col-lg-8 p-2 p-sm-3">
            <div className="card shadow-sm p-2 p-sm-3 rounded border-0 ">
              <CompanyInfo
                profileData={draftProfileData}
                percentage={0}
                isLoading={false}
              />
              <CompanyDetails
                companyDetails={draftProfileData?.company_profile}
                profileData={draftProfileData}
                isLoading={false}
              />
              <CompanyContactInfo contactInfo={draftProfileData} isLoading={false} />
              <CompanyBillingInfo
                billingInfo={draftProfileData?.company_profile}
                isLoading={false}
              />
            </div>
          </div>

          <div className="col-12 col-lg-4 p-2 p-sm-3">
            <StatusCard kyc_status="pending" />
            <Documents documents={draftProfileData} />
          </div>
        </div>
        <AuthPromptModal
          show={showAuthPrompt}
          onHide={() => setShowAuthPrompt(false)}
          title="Complete Company Profile"
          description="Your profile is in draft mode. Sign up or log in to complete profile and launch campaigns."
        />
      </>
    );
  }

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
            profileData={profileData}
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
