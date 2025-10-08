import { configureStore } from "@reduxjs/toolkit";

// Reducers
import commonReducer from "./Slice/Common/commonSlice.js";
import authReducer from "./Slice/Auth/authSlice.js";
// import societyReducer from "./Slice/Society.js";
import societyReducer from "./Slice/Society/index.js";
// import companyReducer from "./Slice/Company.js";
import companyReducer from "./Slice/Company/index.js";
// import adminReducer from "./Slice/Admin.js";
import adminReducer from "./Slice/Admin/index.js";

import notificationReducer from "./Slice/Common/NotificationsSlice.js";
import settingsReducer from "./Slice/settingsSlice.js";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    society: societyReducer,
    company: companyReducer,
    admin: adminReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
  },
});

export default store;
