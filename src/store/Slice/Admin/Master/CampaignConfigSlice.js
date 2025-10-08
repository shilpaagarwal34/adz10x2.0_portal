import { createSlice } from "@reduxjs/toolkit";

// Initial state for the slice
const initialState = {
  data: null,
  loading: false,
  error: null,
  tableName: null,
};

// Slice
const CampaignConfigSlice = createSlice({
  name: "campaginConfig",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setData, setLoading, setError } = CampaignConfigSlice.actions;

// Export the reducer to be included in the store
export default CampaignConfigSlice.reducer;
