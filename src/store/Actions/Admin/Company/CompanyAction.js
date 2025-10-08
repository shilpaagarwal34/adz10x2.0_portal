// src/redux/slices/CompanySlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { toast } from "react-toastify";

import {
  updateCompaniesStatusRequest,
  updateCompaniesStatusFail,
  updateCompaniesStatusSuccess,
} from "../../../Slice/Admin/Company/CompanySlice.js";

// Async thunk for fetching Company data
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies", // Action type
  async (
    { page = 1, limit = 10, search, area_id, city_id, kyc_status },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(api_routes.admin.get_companies, {
        params: {
          page,
          limit,
          search,
          city_id,
          area_id,
          kyc_status,
        },
      });
      // console.log(response);
      return response?.data; // This will be passed as payload in the fulfilled action
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message); // In case of error, pass it as payload to the rejected action
    }
  }
);

export const updateCompanyStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateCompaniesStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    // console.log(response);
    dispatch(updateCompaniesStatusSuccess({ data }));
    toast.success("Company status updated");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateCompaniesStatusFail(error.message));
    toast.error(errorMessaage);
  }
};

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_common_delete}`,
        data
      );

      return { id: data.id };
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

// Fetch single Company
export const fetchCompanyById = createAsyncThunk(
  "companies/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      // console.log("🟡 URL:", `${api_routes.admin.get_company_by_id}/${id}`);

      const response = await axiosInstance.get(
        `${api_routes?.admin?.get_company_by_id}/${id}`
      );
      // console.log(response);
      return response?.data?.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to fetch Company."
      );
    }
  }
);
