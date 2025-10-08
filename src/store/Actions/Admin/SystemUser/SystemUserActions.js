import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes from "../../../../config/api.js";
import { toast } from "react-toastify";

import {
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFail,
} from "../../../Slice/Admin/SystemUser/SystemUserSlice";

export const getUsers = createAsyncThunk(
  "system_user/getUsers",
  async ({ page, limit, search }) => {
    const response = await axiosInstance.get(
      `${api_routes.admin.get_system_users}`,
      {
        params: { page, limit, search },
      }
    );
    // console.log(response);
    return {
      data: response?.data?.data, // assuming data is under 'data'
      total: response?.data?.total, // total count
      table: response?.data?.table_name,
    };
  }
);

export const createSystemUser = createAsyncThunk(
  "system_user/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_system_user}`,
        userData
      );
      // console.log(response);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (err) {
      const errorMessaage = err.response?.data || err.message;
      toast.error(errorMessaage);
      console.log(err.response);
      return rejectWithValue(errorMessaage);
    }
  }
);

export const updateSystemUser = createAsyncThunk(
  "system_user/update",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_system_user}`,
        userData
      );
      // console.log(response);

      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      toast.error(errorMessage);
      console.log(err);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateUserStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    // console.log(response);
    dispatch(updateUserStatusSuccess({ data }));
    toast.success("Status Updated Succesfully");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateUserStatusFail(error.message));
    toast.error("Failed to update status");
  }
};

export const deleteSystemUser = createAsyncThunk(
  "system_user/deleteSystemUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_common_delete}`,
        data
      );
      // console.log(response);
      toast.success("User Deleted Successfully");
      return data;
    } catch (error) {
      console.log(error);
      const errorMessaage = error.response
        ? error.response.data?.message || error.response.data
        : error.message;

      toast.success(errorMessaage);

      return rejectWithValue(errorMessaage);
    }
  }
);

export const fetchUsers = (params) => async (dispatch) => {
  await dispatch(getUsers(params));
};
