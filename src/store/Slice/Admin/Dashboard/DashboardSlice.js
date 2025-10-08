import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardData,
  fetchLiveCampaigns,
} from "../../../Actions/Admin/Dashboard/DashboardActions.js";

const dashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    data: null,
    liveCampaigns: [],
    total: 0,
    table_name: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLiveCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.liveCampaigns = action.payload?.data;
        state.total = action.payload.total;
        state.table_name = action.payload?.table_name;
      })
      .addCase(fetchLiveCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
