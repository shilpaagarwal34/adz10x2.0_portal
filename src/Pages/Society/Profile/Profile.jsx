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

// skeleton
import ProfileDetailSkeleton from "../../../Components/Skeletons/Society/Profile/ProfileDetailSkeleton.jsx";
import KYCStatusSkeleton from "../../../Components/Skeletons/KYCStatusSkeleton.jsx";
import SocietyDocSkeleton from "../../../Components/Skeletons/Society/Profile/SocietyDocSkeleton.jsx";
import GallerySkeleton from "../../../Components/Skeletons/Society/GallerySkeleton.jsx";
import MapSkeleton from "../../../Components/Skeletons/Society/MapSkeleton.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProfileData());
    dispatch(fetchCities());
  }, [dispatch]);

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
        />
      </div>
    </div>
  );
};

export default Profile;
