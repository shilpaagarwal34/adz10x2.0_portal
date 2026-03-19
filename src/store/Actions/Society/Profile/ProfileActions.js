import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.society.post_profile_data}`
      );

      if (
        response.status === 200 &&
        response.data?.data?.society_registration
      ) {
        // console.log(response.data.data)
        return response?.data?.data;
      }

      // return rejectWithValue(`Unexpected response status: ${response.status}`);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

const updateProfile = createAsyncThunk(
  "profile/updateProfile", // action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.society.put_profile_data}`,
        formData, // Send FormData directly here
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      return null;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to update profile"
      );
    }
  }
);

const deleteSocietyImage = async (profile_id, image_id) => {
  try {
    const response = await axios.delete(
      `${api_routes.society.delete_society_image}`,
      {
        data: {
          profile_id,
          image_id,
        },
      }
    );
    return response; // Return response so we can handle it in the calling function
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error; // Throw error for further handling in the calling function
  }
};

export { fetchProfileData, updateProfile, deleteSocietyImage };
