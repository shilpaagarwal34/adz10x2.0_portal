import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWalletData,
  addFunds,
} from "../../../Actions/Company/Wallet/WalletActions";

// Define an initial state for the wallet
const initialState = {
  walletData: [],
  loading: false,
  submitLoading: false,
  error: null,
  page: 1,
  pageSize: 10,
  totalRecords: 0,
  searchQuery: "",
  from_date: "",
  to_date: "",
  table_name: "",
  refreshFlag: 0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDateFilter: (state, action) => {
      state.from_date = action.payload.fromDate;
      state.to_date = action.payload.toDate;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.loading = false;
        state.walletData = action.payload.data;
        state.totalRecords = action.payload.total;
        state.table_name = action.payload.table_name;
        state.error = null;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          action.error?.message ||
          "Failed to fetch wallet data";
      })
      // Update Wallet AMount
      .addCase(addFunds.pending, (state) => {
        state.submitLoading = true;
      })
      .addCase(addFunds.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.walletData.unshift(action.payload.data);
        state.totalRecords += 1;
        state.refreshFlag += 1;
      })
      .addCase(addFunds.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setSearchQuery, setDateFilter, setPageSize } =
  walletSlice.actions;

export default walletSlice.reducer;
