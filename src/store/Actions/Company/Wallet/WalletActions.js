import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance";
import api_routes from "../../../../config/api";

export const fetchWalletData = createAsyncThunk(
  "wallet/fetchWalletData",
  async (params, { rejectWithValue }) => {
    try {
      // Make the API call using axiosInstance with parameters directly from params
      const response = await axiosInstance.get(
        `${api_routes.company.get_company_wallet}`,
        {
          params: {
            search: params.searchQuery,
            page: params.page,
            limit: params.pageSize,
            from_date: params.from_date,
            to_date: params.to_date,
          },
        }
      );
      // console.log(response?.data);
      // Return the data from the response
      return response.data; // Return the fetched data to be used in the `fulfilled` case
    } catch (error) {
      // Handle errors
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addFunds = createAsyncThunk(
  "wallet/addFunds",
  async (payload, { rejectWithValue }) => {
    try {
      // API request to add funds
      const response = await axiosInstance.post(
        `${api_routes.company.post_add_wallet_fund}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Returns error if request fails
    }
  }
);

export const fetchWalletAmount = async () => {
  try {
    const res = await axiosInstance.get(
      `${api_routes.company.get_wallet_amount}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSocietyDataTable = createAsyncThunk(
  "wallet/fetchWalletData",
  async (params, { rejectWithValue }) => {
    try {
      // Make the API call using axiosInstance with parameters directly from params
      const response = await axiosInstance.get(
        `${api_routes.society.fetch_society_wallet_datatable}`,
        {
          params: {
            search: params.searchQuery,
            page: params.page,
            limit: params.pageSize,
            from_date: params.from_date,
            to_date: params.to_date,
          },
        }
      );
      // console.log(response?.data);
      // Return the data from the response
      return response.data; // Return the fetched data to be used in the `fulfilled` case
    } catch (error) {
      // Handle errors
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
