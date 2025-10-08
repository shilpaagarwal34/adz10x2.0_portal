// src/store/slices/campaignDaysSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCampaignDays } from "../../../Actions/Society/CampaignDays/CampaignDaysActions.js";

const campaignDaysSlice = createSlice({
  name: "campaignDays",
  initialState: {
    days: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateDaySetting: (state, action) => {
      const { day, field, value } = action.payload;
      const dayObj = state.days.find((d) => d.day === day);
      if (dayObj) {
        dayObj[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignDays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignDays.fulfilled, (state, action) => {
        state.days = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampaignDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { updateDaySetting } = campaignDaysSlice.actions;

export default campaignDaysSlice.reducer;
