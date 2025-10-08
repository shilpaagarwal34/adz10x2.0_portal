import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes from "../../../../config/api.js";

export const fetchCampaigns = createAsyncThunk(
  "campaign/fetchCampaigns",
  async ({ searchQuery, currentPage, limit, status = "pending" }) => {
    const response = await axiosInstance.get(
      `${api_routes.company.get_campagin_list}`,
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

export const fetchCampaignForAdmin = createAsyncThunk(
  "campaign/fetchCampaigns",
  async ({
    searchQuery,
    currentPage,
    limit,
    area_id,
    city_id,
    company_id,
    status = "pending",
  }) => {
    const response = await axiosInstance.get(
      `${api_routes.admin.get_campaign_data_table}`,
      {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: limit,
          campaign_status: status,
          city_id,
          area_id,
          company_id,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  }
);

export const fetchCampaignById = async (campaignId) => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.company.get_campaign}/${campaignId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCampaignByIdAdmin = async (campaignId) => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.admin.get_campaign_details}/${campaignId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCampaign = createAsyncThunk(
  "campaign/deleteCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_common_delete}`,
        data
      );
      // console.log(response);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response
          ? error.response.data?.message || error.response.data
          : error.message
      );
    }
  }
);

export const fetchAdvertisementForCompany = async (advertisementId) => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.company.get_ad_by_id}/${advertisementId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};
