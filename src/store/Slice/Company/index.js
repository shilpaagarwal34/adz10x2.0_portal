import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import profileReducer from "./Profile/profileSlice.js";
import dashboardReducer from "./Dashboard/DashboardSlice.js";
import companyUserReducer from "./Users/UserSlice.js";
import walletReducer from "./Wallet/WalletSlice.js";
import paymentReducer from "./Payment/PaymentSlice.js";
import campaignReducer from "./Campaign/CampaignSlice.js";

const companyReducer = combineReducers({
  profile: profileReducer,
  dashboard: dashboardReducer,
  companyUser: companyUserReducer,
  wallet: walletReducer,
  payments: paymentReducer,
  campaign: campaignReducer,
});

export default companyReducer;
