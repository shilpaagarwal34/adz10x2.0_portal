// actions/dashboardActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

const fetchDashboardData = createAsyncThunk(
  "adminDashboard/fetchDashboardData", // action type
  async () => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_dashboard_data}`
      );
      // console.log(response.data.data)
      return response.data?.data;
    } catch (err) {
      throw Error(err.message);
    }
  }
);

const fetchLiveCampaigns = createAsyncThunk(
  "adminDashboard/fetchLiveCampaigns",
  async ({ page, limit, search }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_live_campaign_datatable}`,
        {
          params: {
            page,
            limit,
            search,
            campaign_status: "live",
          },
        }
      );

      return response.data;
    } catch (err) {
      throw Error(err.message);
    }
  }
);

export { fetchDashboardData, fetchLiveCampaigns };
