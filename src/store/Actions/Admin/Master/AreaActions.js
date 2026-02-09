import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

import { toast } from "react-toastify";

import {
  updateAreaStatusFail,
  updateAreaStatusRequest,
  updateAreaStatusSuccess,
} from "../../../Slice/Admin/Master/AreaSlice.js";

export const fetchAreaData = createAsyncThunk(
  "menu/fetchAreaData",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_area}?page=${page}&limit=${limit}&search=${search}`
      );

      // console.log(response);
      const { data, total } = response?.data;
      return { data, total }; // Ensure the data is in the format you expect.
    } catch (error) {
      // Return error message if the request fails
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

export const createArea = createAsyncThunk(
  "menu/createArea",
  async (newAreaData, { rejectWithValue }) => {
    try {
      // console.log("Sending payload:", newAreaData); // Check the payload before the request
      const response = await axiosInstance.post(
        `${api_routes.admin.post_area_create}`,
        newAreaData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data?.message : "An error occurred"
      );
    }
  }
);

export const updateAreaStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateAreaStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    dispatch(updateAreaStatusSuccess({ data }));
    toast.success("Area status updated");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateAreaStatusFail(error.message));
    toast.error("Failed to update status");
  }
};

export const deleteArea = createAsyncThunk(
  "area/deleteArea",
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

// CITIES FOR DROPDOWN
// AREAS FOR DROPDOWN
export const fetchDropdownAreas = async (cityId = "") => {
  try {
    // console.log(cityId)
    const response = await axiosInstance.get(
      `${api_routes.admin.get_all_areas}/${cityId}`
    );
    return response?.data?.data; // Area array
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};
