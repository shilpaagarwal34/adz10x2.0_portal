import AdvertisementSetting from "../../Components/Society/Profile/Edit/AdvertisementSetting.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import "../../Pages/Styles/Society-Dashboard.css";

const MediaManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className="px-2 px-sm-4 pt-3 pb-5" style={{ minHeight: "100%", background: "linear-gradient(180deg, #f0fdf4 0%, #ecfeff 30%, #ffffff 100%)" }}>
      <div className="mb-3">
        <h5 className="fw-bold mb-1" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>Media Management</h5>
        <p className="small mb-0" style={{ color: "#64748b" }}>Manage your media platforms and rates per 15-day slot.</p>
      </div>
      <div className="w-100">
        <AdvertisementSetting userType="society" showMediaManagementOnly />
      </div>
    </div>
  );
};

export default MediaManagement;
