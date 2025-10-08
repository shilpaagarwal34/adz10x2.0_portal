import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanies,
  deleteCompany,
  fetchCompanyById,
} from "../../../Actions/Admin/Company/CompanyAction.js";

import { toast } from "react-toastify";

// Initial state for the slice
const initialState = {
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  submitLoading: false,
  tableName: "",
};

// Create slice with extraReducers to handle async actions
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    updateCompaniesStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateCompaniesStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;

      const index = state.companies.findIndex((company) => company.id === id);
      if (index !== -1) {
        state.companies[index].status = status;
      }
    },
    updateCompaniesStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Company
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true; // Set loading to true when the request is initiated
        state.error = null; // Clear previous errors
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is completed
        state.companies = action.payload.data; // Save fetched societies data
        state.total = action.payload.total; // Save the total number of societies
        state.page = action.payload.page; // Save the current page
        state.limit = action.payload.limit; // Save the limit
        state.tableName = action.payload.table_name;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload; // Save error message
      })

      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.submitLoading = false;
        const deletedId = action.payload?.id;
        if (deletedId) {
          state.companies = state.companies.filter(
            (company) => company?.id !== deletedId
          );

          state.total -= 1;
          toast.success("Company deleted successfully!");
        }
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete Company: ${action.payload}`);
      })

      // Fetch single Company
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.selectedCompany = action.payload; // assuming { data: { ...Company } }
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateCompaniesStatusRequest,
  updateCompaniesStatusSuccess,
  updateCompaniesStatusFail,
} = companySlice.actions;

// Export the reducer (no need to export actions manually as they are automatically handled by createAsyncThunk)
export default companySlice.reducer;
