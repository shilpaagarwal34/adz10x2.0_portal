import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  updateSocietyUserStatusFail,
  updateSocietyUserStatusSuccess,
  updateSocietyUserStatusRequest,
} from "../../../Slice/Society/Users/UserSlice";

export const fetchSocietyUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.society.get_users}`,
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

export const addSocietyUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.society.post_create_user}`,
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

export const deleteSocietyUser = createAsyncThunk(
  "society/deleteSocietyUser",
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

export const updateSocietyUserStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateSocietyUserStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    console.log(response);
    dispatch(updateSocietyUserStatusSuccess({ data }));
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateSocietyUserStatusFail(errorMessaage));
  }
};
