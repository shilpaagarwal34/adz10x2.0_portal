// actions/dashboardActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData", // action type
  async () => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.company.get_dashboard_data}`
      );
      // console.log(response.data.data)
      return response.data?.data;
    } catch (err) {
      throw Error(err.message);
    }
  }
);

export { fetchDashboardData };