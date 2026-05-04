import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfileData,
  updateProfile,
} from "../../../Actions/Society/Profile/ProfileActions.js";

const initialState = {
  profileData: {},
  error: null,
  status: "idle", //track loading status
  profileCompletedPercentage: 0,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const next = action.payload?.society_registration;
        state.profileData = next != null ? next : state.profileData;
        // Use API profile_completion value directly without any frontend calculation
        state.profileCompletedPercentage =
          typeof action.payload?.profile_completion === "number"
            ? action.payload.profile_completion
            : 0;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || action.error.message;
      })
      // Profile Update Promise Handler
      .addCase(updateProfile.pending, (state) => {
        state.status = "updating";
      })
      // Handle fulfilled state for updating profile data (when the update is successful)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || action.error.message;
      });
  },
});

export default ProfileSlice.reducer;
