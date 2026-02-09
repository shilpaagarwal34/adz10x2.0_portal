import {
  setLoading,
  setData,
  setError,
} from "../../../Slice/Admin/Master/CampaignConfigSlice.js";
import api_routes from "../../../../config/api.js";
import { toast } from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance.js";

// Fetch campaign configuration
export const fetchCampaignConfig = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(
      `${api_routes.admin.get_campaign_configuration}`
    );
    // console.log(response);
    dispatch(setData(response?.data?.data));
  } catch (error) {
    dispatch(setError(error.message));
    // toast.error(`Error: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

// Update campaign configuration
export const updateCampaignConfig = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axiosInstance.post(
      `${api_routes.admin.post_campaign_configuration}`,
      formData
    );

    toast.success("Campaign Configuration Updated Successfully!");

    dispatch(setData(response?.data?.data));
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
