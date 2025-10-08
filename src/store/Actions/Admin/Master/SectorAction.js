// src/redux/menuActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import { toast } from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance.js";
import {
  updateSectorStatusFail,
  updateSectorStatusSuccess,
  updateSectorStatusRequest,
} from "../../../Slice/Admin/Master/SectorSlice.js";

export const fetchSectorData = createAsyncThunk(
  "sector/fetchSectorData",
  async ({ currentPage, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_sector_data}?page=${currentPage}&limit=${limit}&search=${search}`
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

export const createSector = createAsyncThunk(
  "sector/createSector",
  async (sector, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_sector_data}`,
        sector
      ); // Replace with your actual API URL
      return response?.data?.data; // Return the data if successful
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response
          ? error.response.data?.message || error.response.data
          : error.message
      ); // Reject with error message
    }
  }
);

export const updateSectorStatus = (data) => async (dispatch) => {
  try {
    dispatch(updateSectorStatusRequest());
    const response = await axiosInstance.post(
      `${api_routes.admin.post_common_status_change}`,
      data
    );
    console.log(response);
    dispatch(updateSectorStatusSuccess({ data }));
    toast.success("Sector status updated");
  } catch (error) {
    const errorMessaage = error.response
      ? error.response.data?.message || error.response.data
      : error.message;
    dispatch(updateSectorStatusFail(error.message));
    toast.error("Failed to update status");
  }
};

export const deleteSector = createAsyncThunk(
  "city/deleteSector",
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
