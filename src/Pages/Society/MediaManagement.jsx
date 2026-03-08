import AdvertisementSetting from "../../Components/Society/Profile/Edit/AdvertisementSetting.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";

const MediaManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className="px-2 px-sm-4 pt-3 pb-5">
      <div className="mb-3">
        <h5 className="fw-bold mb-1" style={{ color: "#0f172a" }}>Media Management</h5>
        <p className="text-muted small mb-0">Manage your media platforms and rates per 15-day slot.</p>
      </div>
      <div className="w-100">
        <AdvertisementSetting userType="society" showMediaManagementOnly />
      </div>
    </div>
  );
};

export default MediaManagement;
