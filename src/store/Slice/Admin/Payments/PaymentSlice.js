import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyPayments,
  fetchWalletTableData,
  fetchSocietyPayments,
  updateTransactionDetails,
} from "../../../Actions/Admin/Payments/PaymentAction.js";

const initialState = {
  company: {
    data: [],
    total: null,
    loading: false,
    error: null,
  },
  society: {
    data: [],
    total: null,
    paidAmount: 0,
    pendingAmount: 0,
    loading: false,
    error: null,
  },
  wallet: {
    data: [],
    total: null,
    loading: false,
    error: null,
  },
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearAllPayments: (state) => {
      state.company = { data: [], loading: false, error: null };
      state.society = { data: [], loading: false, error: null };
      state.wallet = { data: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // Company Payments
    builder
      .addCase(fetchCompanyPayments.pending, (state) => {
        state.company.loading = true;
        state.company.error = null;
      })
      .addCase(fetchCompanyPayments.fulfilled, (state, action) => {
        state.company.loading = false;
        state.company.data = action.payload.data;
        state.company.total = action.payload.total;
      })
      .addCase(fetchCompanyPayments.rejected, (state, action) => {
        state.company.loading = false;
        state.company.error = action.payload;
      });

    // Society Payments
    builder
      .addCase(fetchSocietyPayments.pending, (state) => {
        state.society.loading = true;
        state.society.error = null;
      })
      .addCase(fetchSocietyPayments.fulfilled, (state, action) => {
        state.society.loading = false;
        state.society.data = action.payload.data;
        state.society.total = action.payload.total;
        state.society.pendingAmount = action.payload.pendingCount;
        state.society.paidAmount = action.payload.approvedCount;
      })
      .addCase(fetchSocietyPayments.rejected, (state, action) => {
        state.society.loading = false;
        state.society.error = action.payload;
      });

    // Wallet Payments
    builder
      .addCase(fetchWalletTableData.pending, (state) => {
        state.wallet.loading = true;
        state.wallet.error = null;
      })
      .addCase(fetchWalletTableData.fulfilled, (state, action) => {
        state.wallet.loading = false;
        state.wallet.data = action.payload.data;
        state.wallet.total = action.payload.total;
      })
      .addCase(fetchWalletTableData.rejected, (state, action) => {
        state.wallet.loading = false;
        state.wallet.error = action.payload;
      });

    builder
      .addCase(updateTransactionDetails.pending, (state) => {
        state.wallet.loading = true;
        state.wallet.error = null;
      })
      .addCase(updateTransactionDetails.fulfilled, (state, action) => {
        state.wallet.loading = false;
 
        state.society.data = state.society.data.filter(
          (data) => data.id !== action.payload.data.id
        );
        state.wallet.total -= action.payload.total;
      })
      .addCase(updateTransactionDetails.rejected, (state, action) => {
        state.wallet.loading = false;
        state.wallet.error = action.payload;
      });
  },
});

export const { clearAllPayments, setTotal } = paymentSlice.actions;
export default paymentSlice.reducer;
