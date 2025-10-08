import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api";
import axiosInstance from "../../../../utils/axiosInstance";

export const fetchSocietyBalanceAmount = createAsyncThunk(
  "society_payment/fetchBalanceAmount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance(
        `${api_routes.society.fetch_society_payments_balance}`
      );
      return res?.data?.society_wallet_amount;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSocietyPayments = createAsyncThunk(
  "society_payment/fetchPayments",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${api_routes.society.fetch_society_payment_datatable}`,
        { params }
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const submitWithdrawRequest = createAsyncThunk(
  "society_payment/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.society.post_withdrawl_request}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
