import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCampaigns,
  deleteCampaign,
} from "../../../Actions/Company/Campaign/CampaignActions";
import { toast } from "react-toastify";

const initialState = {
  campaigns: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  submitLoading: false,
  error: null,
  table_name: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.table_name = action.payload.table_name;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;

        if (deletedId) {
          state.campaigns = state.campaigns.filter(
            (campaign) => campaign.id !== deletedId
          );
          state.total -= 1;
          toast.success("Campaign deleted successfully!");
        }
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete city: ${action.payload}`);
      });
  },
});

export default campaignSlice.reducer;
