import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api";
import axiosInstance from "../../../../utils/axiosInstance";

// Async thunk for fetching payments data
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async ({ searchQuery, currentPage, limit, from_date, to_date }) => {
    const response = await axiosInstance.get(
      `${api_routes.company.get_payments}`,
      {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: limit,
          from_date,
          to_date,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  payments: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  from_date: "",
  to_date: "",
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setDateFilter: (state, action) => {
      state.from_date = action.payload.fromDate;
      state.to_date = action.payload.toDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDateFilter } = paymentsSlice.actions;

export default paymentsSlice.reducer;
