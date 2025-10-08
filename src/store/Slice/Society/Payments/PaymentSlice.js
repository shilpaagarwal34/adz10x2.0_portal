import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  fetchSocietyBalanceAmount,
  fetchSocietyPayments,
  submitWithdrawRequest,
} from "../../../Actions/Society/Payments/PaymentActions";

const initialState = {
  data: [],
  totalRecords: 0,
  fetchLoading: false,
  error: null,
  balanceAmount: 0,
  table_name: null,
  paidAmount: 0,
  pendingAmount: 0,
};

const paymentSlice = createSlice({
  name: "society_payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Wallet balance fetch
      .addCase(fetchSocietyBalanceAmount.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchSocietyBalanceAmount.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.balanceAmount = action.payload;
      })
      .addCase(fetchSocietyBalanceAmount.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
        toast.error(`Failed to load balance: ${action.error.message}`);
      })

      // Payment list fetch
      .addCase(fetchSocietyPayments.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchSocietyPayments.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload.data;
        state.totalRecords = action.payload.total;
        state.table_name = action.payload.table_name;
        state.paidAmount = action.payload.approvedCount || 0;
        state.pendingAmount = action.payload?.pendingCount || 0;
      })
      .addCase(fetchSocietyPayments.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
        toast.error(`Failed to load payments: ${action.error.message}`);
      })

      // update store after withdrawl request
      .addCase(submitWithdrawRequest.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(submitWithdrawRequest.fulfilled, (state, action) => {
        state.fetchLoading = false;
        if (action.payload?.data) state.totalRecords += 1;
      })
      .addCase(submitWithdrawRequest.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
