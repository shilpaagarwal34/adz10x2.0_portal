import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./Dashboard/DashboardSlice.js";
import profileReducer from "./Profile/ProfileSlice.js";
import campaignDaysReducer from "./CampaignDays/campaignDaysSlice.js";
import paymentReducer from "./Payments/PaymentSlice.js";
import userReducer from "./Users/UserSlice.js";

const societyReducer = combineReducers({
  dashboard: dashboardReducer,
  profile: profileReducer,
  campaignDays: campaignDaysReducer,
  users: userReducer,
  payments: paymentReducer,
});

export default societyReducer;
