import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileData } from "../../../Actions/Company/Profile/ProfileActions.js";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
    error: null,
    status: "idle", //track loading status
    profileCompletedPercentage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileCompletedPercentage = action.payload?.profile_completion;
        state.profileData = action.payload?.company_registration;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
