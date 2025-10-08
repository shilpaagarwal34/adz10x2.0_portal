import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import cityReducer from "./Master/CitySlice.js";
import areaReducer from "./Master/AreaSlice.js";
import sectorReducer from "./Master/SectorSlice.js";
import campaingConfigReducer from "./Master/CampaignConfigSlice.js";
import societyReducer from "./Society/SocietySlice.js";
import companyReducer from "./Company/CompanySlice.js";
import systemUserReducer from "./SystemUser/SystemUserSlice.js";
import relationshipManagerReducer from "./Relationship Manager/RelationshipManagerSlice.js";
import paymentReducer from "./Payments/PaymentSlice.js";
import dashboardReducer from "./Dashboard/DashboardSlice.js";

const adminReducer = combineReducers({
  city: cityReducer,
  area: areaReducer,
  sector: sectorReducer,
  campaignConfig: campaingConfigReducer,
  societies: societyReducer,
  companies: companyReducer,
  system_user: systemUserReducer,
  relationship_manager: relationshipManagerReducer,
  payments: paymentReducer,
  dashboard:dashboardReducer,
});

export default adminReducer;
