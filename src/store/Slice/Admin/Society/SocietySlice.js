  import { createSlice } from "@reduxjs/toolkit";
  import {
    fetchSocieties,
    deleteSociety,
    fetchSocietyById,
  } from "../../../Actions/Admin/Society/SocietyAction.js";

  import { toast } from "react-toastify";

  // Initial state for the slice
  const initialState = {
    societies: [],
    selectedSociety: null,
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    submitLoading: false,
    tableName: "",
  };

  // Create slice with extraReducers to handle async actions
  const societySlice = createSlice({
    name: "societies",
    initialState,
    reducers: {
      updateSocietyStatusRequest: (state) => {
        state.submitLoading = true;
      },
      updateSocietyStatusSuccess: (state, action) => {
        state.submitLoading = false;
        const { id, status } = action.payload.data;

        const index = state.societies.findIndex((society) => society.id === id);
        if (index !== -1) {
          state.societies[index].status = status;
        }
      },
      updateSocietyStatusFail: (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch Society
        .addCase(fetchSocieties.pending, (state) => {
          state.loading = true; // Set loading to true when the request is initiated
          state.error = null; // Clear previous errors
        })
        .addCase(fetchSocieties.fulfilled, (state, action) => {
          state.loading = false; // Set loading to false when the request is completed
          state.societies = action.payload.data; // Save fetched societies data
          state.total = action.payload.total; // Save the total number of societies
          state.page = action.payload.page; // Save the current page
          state.limit = action.payload.limit; // Save the limit
          state.tableName = action.payload.table_name;
        })
        .addCase(fetchSocieties.rejected, (state, action) => {
          state.loading = false; // Set loading to false when the request fails
          state.error = action.payload; // Save error message
        })

        // Delete Society
        .addCase(deleteSociety.pending, (state) => {
          state.submitLoading = true;
          state.error = null;
        })
        .addCase(deleteSociety.fulfilled, (state, action) => {
          state.submitLoading = false;

          const deletedId = action.payload?.id;

          if (deletedId) {
            state.societies = state.societies.filter(
              (society) => society.id !== deletedId
            );

            state.total -= 1;
            toast.success("Society deleted successfully!");
          }
        })
        .addCase(deleteSociety.rejected, (state, action) => {
          state.submitLoading = false;
          state.error = action.payload;
          toast.error(`Failed to delete Society: ${action.payload}`);
        })

        // Fetch single society
        .addCase(fetchSocietyById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSocietyById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedSociety = action.payload.data; // assuming { data: { ...society } }
        })
        .addCase(fetchSocietyById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const {
    updateSocietyStatusRequest,
    updateSocietyStatusFail,
    updateSocietyStatusSuccess,
  } = societySlice.actions;

  // Export the reducer (no need to export actions manually as they are automatically handled by createAsyncThunk)
  export default societySlice.reducer;
