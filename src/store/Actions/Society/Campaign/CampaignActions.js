import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance";
import api_routes from "../../../../config/api";

export const fetchSocietyCampaigns = createAsyncThunk(
  "campaign/fetchCampaigns",
  async ({ searchQuery, currentPage, limit, status = "pending" }) => {
    const response = await axiosInstance.get(
      `${api_routes.society.fetch_campaign_datatable}`,
      {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: limit,
          campaign_status: status,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  }
);

export const fetchAdByID = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.society.fetch_ad_by_id}/${payload.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw error;
  }
};
