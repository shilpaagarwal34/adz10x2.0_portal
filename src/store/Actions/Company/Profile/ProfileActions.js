import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("auth_token");

      const response = await axiosInstance.get(
        `${api_routes.company.get_profile_data}`
      );

      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.company_registration
      ) {
        throw new Error("Invalid response structure");
      }

      // return response.data.data.company_registration;
      return response?.data?.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

const updateProfile = createAsyncThunk(
  "profile/updateProfile", // action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.company.post_profile_data}`,
        formData, // Send FormData directly here
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      ); // Return error if request fails
    }
  }
);

export { fetchProfileData, updateProfile };
