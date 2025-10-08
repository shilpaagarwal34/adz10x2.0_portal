import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import Toastify

import {
  fetchCityData,
  createCity,
  deleteCity,
} from "../../../Actions/Admin/Master/CityActions.js";

// Initial state
const initialState = {
  cityData: [],
  fetchLoading: false,
  submitLoading: false,
  error: null,
  totalCities: 0,
  tableName: "",
};

const CitySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    updateCityStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateCityStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;

      const index = state.cityData.findIndex((city) => city.id === id);
      if (index !== -1) {
        state.cityData[index].status = status;
      }
    },
    updateCityStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityData.pending, (state) => {
        state.fetchLoading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchCityData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.cityData = action.payload.data;
        state.tableName = action.payload?.table_name;
        state.totalCities = action.payload.total;
      })
      .addCase(fetchCityData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message; // Store error message
        toast.error(`Failed to load city data: ${action.error.message}`);
      });

    // Create city
    builder
      .addCase(createCity.pending, (state) => {
        state.submitLoading = true; // Set submitLoading  state
        state.error = null; // Reset error
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.submitLoading = false;

        const newOrUpdatedCity = action.payload;

        const index = state.cityData.findIndex(
          (city) => city.id === newOrUpdatedCity.id
        );

        if (index !== -1) {
          // Update existing city
          state.cityData[index] = newOrUpdatedCity;
          toast.success("City updated successfully!");
        } else {
          // Add new city
          state.cityData.push(newOrUpdatedCity);
          state.totalCities += 1;
          toast.success("City created successfully!");
        }
      })
      .addCase(createCity.rejected, (state, action) => {
        state.submitLoading = false; // Reset loading state
        state.error = action.payload; // Set error
        toast.error(action.payload); // Show success toast
      })

      // Delete city
      .addCase(deleteCity.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;

        if (deletedId) {
          state.cityData = state.cityData.filter(
            (city) => city.id !== deletedId
          );

          state.totalCities -= 1;
          toast.success("City deleted successfully!");
        }
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete city: ${action.payload}`);
      });
  },
});

export const {
  updateCityStatusRequest,
  updateCityStatusFail,
  updateCityStatusSuccess,
} = CitySlice.actions;

export default CitySlice.reducer;
