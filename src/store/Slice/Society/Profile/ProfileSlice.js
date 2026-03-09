import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfileData,
  updateProfile,
} from "../../../Actions/Society/Profile/ProfileActions.js";

/** Compute profile completion (0–100). Basic 5 fields 30%, contact 3 fields 35%, location 4 fields 35%. Billing, photos, documents, Google URL not required for 100%. Only 100% when terms_accepted is true. */
function computeProfileCompletion(reg) {
  if (!reg || typeof reg !== "object") return 0;
  const profile = reg.society_profile || {};
  const filled = (v) => v != null && v !== "" && String(v).trim() !== "";
  let completion = 0;
  const basic = [
    reg.society_name,
    profile.number_of_flat,
    profile.society_email,
    profile.address_line_1,
    profile.address_line_2,
  ].filter(filled).length;
  completion += (basic / 5) * 30;
  const contact = [reg.name, reg.mobile_number, reg.email].filter(filled).length;
  completion += (contact / 3) * 35;
  const location = [reg.address, reg.city_id, reg.area_id, reg.pincode].filter(
    filled
  ).length;
  completion += (location / 4) * 35;
  const raw = Math.round(Math.min(100, completion));
  const termsAccepted = Boolean(reg.terms_accepted ?? profile.terms_accepted);
  return termsAccepted ? raw : Math.min(raw, 99);
}

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
        const computed = computeProfileCompletion(state.profileData);
        state.profileCompletedPercentage =
          typeof action.payload?.profile_completion === "number"
            ? Math.max(action.payload.profile_completion, computed)
            : computed;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      });
  },
});

export default ProfileSlice.reducer;
