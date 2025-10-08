import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";

// Thunk for fetching campaign days
export const fetchCampaignDays = createAsyncThunk(
  "campaignDays/fetchCampaignDays",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api_routes.society.get_campaign_days}`
      );
      //   console.log(response);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCampaignDay = (payload) => async (dispatch) => {
  try {
    await axios.post(
      `${api_routes.society.post_campaign_ads_setting}`,
      payload
    ); // adjust endpoint
    // Optionally, re-fetch campaign days if needed
    // dispatch(fetchCampaignDays());
  } catch (error) {
    console.error("Failed to update campaign day", error);
    // Optionally, dispatch an error action or toast
  }
};
