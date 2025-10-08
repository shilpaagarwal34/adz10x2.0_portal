import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import Toastify

import {
  fetchAreaData,
  createArea,
  deleteArea,
} from "../../../Actions/Admin/Master/AreaActions.js";
// Initial state
const initialState = {
  areaData: [],
  totalRecords: 0,
  fetchLoading: false,
  x: false,
  error: null,
};

const AreaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    updateAreaStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateAreaStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;

      const index = state.areaData.findIndex((area) => area.id === id);
      if (index !== -1) {
        state.areaData[index].status = status;
      }
    },
    updateAreaStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreaData.pending, (state) => {
        state.fetchLoading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchAreaData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.areaData = action.payload.data;
        state.totalRecords = action.payload.total;
      })
      .addCase(fetchAreaData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message; // Store error message
        toast.error(`Failed to load Area data: ${action.error.message}`);
      })

      // Create Area
      .addCase(createArea.pending, (state) => {
        state.submitLoading = true; // Set loading state when creating area
        state.error = null; // Reset error
      })
      .addCase(createArea.fulfilled, (state, action) => {
        state.submitLoading = false; // Set loading to false
        state.areaData.push(action.payload); // Add the new area to the areaData array
        state.totalRecords += 1;
        toast.success("Area created successfully!"); // Show success toast
      })
      .addCase(createArea.rejected, (state, action) => {
        state.submitLoading = false; // Set loading to false
        state.error = action.payload; // Set error state from rejected action
        toast.error(`${action.payload}`); // Show error toast
      })

      // Delete city
      .addCase(deleteArea.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;

        if (deletedId) {
          state.areaData = state.areaData.filter(
            (area) => area.id !== deletedId
          );
          state.totalRecords -= 1;
          toast.success("City deleted successfully!");
        }
      })
      .addCase(deleteArea.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete city: ${action.payload}`);
      });
  },
});

export const {
  updateAreaStatusFail,
  updateAreaStatusRequest,
  updateAreaStatusSuccess,
} = AreaSlice.actions;

export default AreaSlice.reducer;
