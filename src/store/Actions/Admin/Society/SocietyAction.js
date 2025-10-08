// src/redux/slices/societySlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes from "../../../../config/api.js";
import { toast } from "react-toastify";
import {
  updateSocietyStatusRequest,
  updateSocietyStatusSuccess,
  updateSocietyStatusFail,
} from "../../../Slice/Admin/Society/SocietySlice.js";

// Async thunk for fetching society data
export const fetchSocieties = createAsyncThunk(
  "societies/fetchSocieties", // Action type
  async (
    { page = 1, limit = 10, search, area_id, city_id, kyc_status },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(api_routes.admin.get_societies, {
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

export const updateSocietyStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateSocietyStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    // console.log(response);
    dispatch(updateSocietyStatusSuccess({ data }));
    toast.success("Society status updated");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateSocietyStatusFail(error.message));
    toast.error("Failed to update status");
  }
};

export const deleteSociety = createAsyncThunk(
  "societies/deleteSociety",
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

// Fetch single society
export const fetchSocietyById = createAsyncThunk(
  "societies/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_society_by_id}/${id}`
      );
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to fetch society."
      );
    }
  }
);

export const fetchSocities = async () => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.society.fetch_society_list}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching Societies:", error);
    throw error.response
      ? error.response.data?.message
      : new Error("An error occurred");
  }
};

export const changeRejectToPending = async ({ id, userRole }) => {
  try {
    let endpoint =
      userRole === "society"
        ? `${api_routes.admin.post_change_society_status_to_pending}`
        : `${api_routes.admin.post_change_company_status_to_pending}`;

    const res = await axiosInstance.post(endpoint, { id });

    return res;
  } catch (err) {
    throw err;
  }
};
