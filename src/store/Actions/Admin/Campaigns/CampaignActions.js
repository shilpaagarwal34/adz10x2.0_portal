import api_routes from "../../../../config/api";
import axiosInstance from "../../../../utils/axiosInstance";

export const postChangeSocietyCampaignStatus = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${api_routes.admin.post_change_society_campaign_status}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("API success:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw error;
  }
};

export const getTimeSlots = async (payload) => {
  try {
    // console.log(payload);
    const response = await axiosInstance.get(
      `${api_routes.admin.get_time_slot}/${payload?.society_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API success:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchAdByID = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.admin.get_ad_by_id}/${payload.campaignLogId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API success:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw error;
  }
};
