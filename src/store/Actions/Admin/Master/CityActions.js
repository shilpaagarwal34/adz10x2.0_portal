// src/redux/menuActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import {
  updateCityStatusFail,
  updateCityStatusRequest,
  updateCityStatusSuccess,
} from "../../../Slice/Admin/Master/CitySlice.js";
import { toast } from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance.js";

// Async thunk to fetch city data

export const fetchCityData = createAsyncThunk(
  "menu/fetchCityData",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_city}?page=${page}&limit=${limit}&search=${search}`
      );

      const { data, total, table_name } = response?.data;

      return { data, total, table_name }; // Return both cities and totalCities
    } catch (error) {
      // Handle any errors and return the error message
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

export const createCity = createAsyncThunk(
  "city/createCity",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_city}`,
        city
      ); // Replace with your actual API URL
      return response?.data?.data; // Return the data if successful
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response
          ? error.response.data?.message || error.response.data
          : error.message
      ); // Reject with error message
    }
  }
);

export const deleteCity = createAsyncThunk(
  "city/deleteCity",
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

export const updateCityStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateCityStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    // console.log(response);
    dispatch(updateCityStatusSuccess({ data }));
    toast.success("City status updated");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateCityStatusFail(error.message));
    toast.error("Failed to update status");
  }
};

// CITIES FOR DROPDOWN
export const fetchDropdownCities = async () => {
  try {
    const response = await axiosInstance.get(
      `${api_routes.admin.get_all_cities}`
    );
    return response?.data?.data; // Cities array
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error.response ? error.response.data?.message : new Error("An error occurred");
  }
};
