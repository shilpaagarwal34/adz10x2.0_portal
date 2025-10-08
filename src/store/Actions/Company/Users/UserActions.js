import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api";
import axiosInstance from "../../../../utils/axiosInstance";
import {updateCompanyUserStatusFail, updateCompanyUserStatusRequest, updateCompanyUserStatusSuccess} from "../../../Slice/Company/Users/UserSlice.js"

export const fetchCompanyUsers = createAsyncThunk(
  "companyUsers/fetchUsers",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.company.get_system_users}`,
        {
          params: { page, limit, search },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch users"
      );
    }
  }
);

export const addCompanyUser = createAsyncThunk(
  "companyUsers/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.company.post_system_users}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to add user"
      );
    }
  }
);

export const deleteCompanyUser = createAsyncThunk(
  "companyUsers/deleteCompanyUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_common_delete}`,
        data
      );
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

export const updateCompanyUserStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateCompanyUserStatusRequest());
    await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    dispatch(updateCompanyUserStatusSuccess({ data }));
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateCompanyUserStatusFail(errorMessaage));
  }
};
