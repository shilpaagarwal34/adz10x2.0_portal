import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  createSector,
  deleteSector,
  fetchSectorData,
} from "../../../Actions/Admin/Master/SectorAction.js";

// Initial state
const initialState = {
  sectorData: [],
  tableName: "",
  fetchLoading: false,
  submitLoading: false,
  error: null,
  totalSector: 0,
};

const SectorSlice = createSlice({
  name: "sector",
  initialState,
  reducers: {
    updateSectorStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateSectorStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;

      const index = state.sectorData.findIndex((sector) => sector.id === id);
      if (index !== -1) {
        state.sectorData[index].status = status;
      }
    },
    updateSectorStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectorData.pending, (state) => {
        state.fetchLoading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchSectorData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.tableName = action.payload.table_name;
        state.sectorData = action.payload.data;
        state.totalSector = action.payload.total;
      })
      .addCase(fetchSectorData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message; // Store error message
        toast.error(`Failed to load Sector data: ${action.error.message}`);
      });

    // Create sector
    builder
      .addCase(createSector.pending, (state) => {
        state.submitLoading = true; // Set submitLoading  state
        state.error = null; // Reset error
      })
      .addCase(createSector.fulfilled, (state, action) => {
        state.submitLoading = false;

        const newOrUpdatedSector = action.payload;

        const index = state.sectorData.findIndex(
          (sector) => sector.id === newOrUpdatedSector.id
        );

        if (index !== -1) {
          // Update existing sector
          state.sectorData[index] = newOrUpdatedSector;
          toast.success("Sector updated successfully!");
        } else {
          // Add new Sector
          state.sectorData.push(newOrUpdatedSector);
          state.totalSector += 1;
          toast.success("Sector created successfully!");
        }
      })
      .addCase(createSector.rejected, (state, action) => {
        state.submitLoading = false; // Reset loading state
        state.error = action.payload; // Set error
        toast.error(action.payload); // Show success toast
      })

      // Delete sector
      .addCase(deleteSector.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteSector.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;

        if (deletedId) {
          state.sectorData = state.sectorData.filter(
            (sector) => sector.id !== deletedId
          );

          state.totalSector -= 1;
          toast.success("Sector deleted successfully!");
        }
      })
      .addCase(deleteSector.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete Sector: ${action.payload}`);
      });
  },
});

export const {
  updateSectorStatusRequest,
  updateSectorStatusFail,
  updateSectorStatusSuccess,
} = SectorSlice.actions;

export default SectorSlice.reducer;
