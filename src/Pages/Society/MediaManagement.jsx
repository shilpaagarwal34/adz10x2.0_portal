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
    <div className="d-flex px-2 px-sm-3 pt-2 pt-sm-2 pb-5">
      <div className="w-100">
        <AdvertisementSetting userType="society" showMediaManagementOnly />
      </div>
    </div>
  );
};

export default MediaManagement;
