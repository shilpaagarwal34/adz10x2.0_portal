import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Gallery from "../../../Components/Society/Dashboard/Gallery/gallery.jsx";
import "react-circular-progressbar/dist/styles.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "../../../store/Actions/Society/Profile/ProfileActions.js";
import ProfileDetail from "../../../Components/Society/Profile/ProfileDetail.jsx";
import SocietyMap from "../../../Components/Society/Dashboard/Map/SocietyMap.jsx";
import DocumentCard from "../../../Components/Society/Profile/DocumentCard.jsx";
import { fetchCities } from "../../../store/Actions/Common/commonActions.js";
import StatusCard from "../../../Components/Society/Dashboard/AccountStatus/StatusCard.jsx";
import ManagerInfo from "../../../Components/Common/Manager-info.jsx";
import { Link } from "react-router-dom";
import AuthPromptModal from "../../../Components/Common/AuthPromptModal.jsx";

// skeleton
import ProfileDetailSkeleton from "../../../Components/Skeletons/Society/Profile/ProfileDetailSkeleton.jsx";
import KYCStatusSkeleton from "../../../Components/Skeletons/KYCStatusSkeleton.jsx";
import SocietyDocSkeleton from "../../../Components/Skeletons/Society/Profile/SocietyDocSkeleton.jsx";
import GallerySkeleton from "../../../Components/Skeletons/Society/GallerySkeleton.jsx";
import MapSkeleton from "../../../Components/Skeletons/Society/MapSkeleton.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const hasAuthToken = Boolean(localStorage.getItem("auth_token"));

  useEffect(() => {
    if (!hasAuthToken) return;
    dispatch(fetchProfileData());
    dispatch(fetchCities());
  }, [dispatch, hasAuthToken]);

  const { profileData, status, error, profileCompletedPercentage } =
    useSelector((state) => state.society.profile);

  // console.log(profileData);

  useEffect(() => {
    // console.log(status);
    if (status === "succeeded" || status === "failed") {
      setIsLoading(false);
    }
  }, [status]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hasAuthToken) {
      setShowAuthPrompt(true);
    }
  }, [hasAuthToken]);

  if (!hasAuthToken) {
    const draftProfileData = {
      society_name: "Draft Society",
      society_profile_img_name: "",
      society_profile_img_path: "",
      address: "-",
      latitude: null,
      longitude: null,
      city_id: null,
      area_id: null,
      pincode: "-",
      name: "Draft User",
      mobile_number: "-",
      email: "-",
      edit_permission: false,
      aggrement_copy_path: null,
      society_profile: {
        number_of_flat: 0,
        society_email: "-",
        address_line_1: "-",
        address_line_2: "",
        google_page_url: "",
        account_no: "-",
        bank_name: "-",
        branch_name: "-",
        bank_ifsc_code: "-",
        billing_address_line_1: "-",
        billing_address_line_2: "",
        billing_qr_code_path: null,
        gst_certificate_path: null,
        pan_card_path: null,
        other_document_path: null,
      },
    };

    return (
      <>
        <div className="row g-0 p-2 p-sm-3" style={{ fontSize: "14px" }}>
          <ProfileDetail profileData={draftProfileData} percentage={0} />
          <div className="col-12 col-lg-3 ps-lg-3 pt-1 mt-lg-0 mt-3">
            <StatusCard kyc_status="pending" />
            <DocumentCard profileData={draftProfileData} />
            <SocietyMap
              coordinates={null}
              googlePageUrl={draftProfileData?.society_profile?.google_page_url}
              address={draftProfileData?.address}
            />
          </div>
        </div>
        <AuthPromptModal
          show={showAuthPrompt}
          onHide={() => setShowAuthPrompt(false)}
          title="Complete Society Profile"
          description="Your profile is in draft mode. Sign up or log in to complete details and unlock edit actions."
        />
      </>
    );
  }

  if (status === "failed")
    return <div className="text-danger">Error: {error}</div>;

  if (isLoading || status === "loading") {
    return (
      <div className="p-3 d-flex" style={{ fontSize: "14px" }}>
        <ProfileDetailSkeleton />
        <div className="col-3 ps-3 pt-1">
          <KYCStatusSkeleton />
          <SocietyDocSkeleton />
          <GallerySkeleton />
          <MapSkeleton />
        </div>
      </div>
    );
  }

  if (!profileData)
    return <div className="text-danger">Profile data not available.</div>;

  return (
    <div className="row g-0 p-2 p-sm-3" style={{ fontSize: "14px" }}>
      <ProfileDetail
        profileData={profileData}
        percentage={profileCompletedPercentage}
      />
      <div className="col-12 col-lg-3 ps-lg-3 pt-1 mt-lg-0 mt-3">
        <StatusCard kyc_status={user?.kyc_status} />
        <ManagerInfo relationship_manager={{}} />

        <DocumentCard profileData={profileData} />
        <Gallery profileData={profileData} />
        <SocietyMap
          coordinates={{
            latitude: profileData?.latitude,
            longitude: profileData?.longitude,
          }}
          googlePageUrl={profileData?.society_profile?.google_page_url}
          address={profileData?.address}
        />
      </div>
    </div>
  );
};

export default Profile;
