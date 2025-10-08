import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axiosInstance.js";
import api_routes from "../../../../config/api.js";
import { setTotal } from "../../../Slice/Admin/Payments/PaymentSlice.js";

export const fetchCompanyPayments = createAsyncThunk(
  "payments/fetchCompanyPayments",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.fetch_company_payment_datatable}`,
        {
          params: filters,
        }
      );
      
      return response?.data; // assuming `data` contains the list of payments
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

export const fetchWalletTableData = createAsyncThunk(
  "payments/fetchWalletPayment",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.fetch_wallet_datatable}`,
        {
          params: filters,
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

export const fetchSocietyPayments = createAsyncThunk(
  "payments/fetchSocietyPayments",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.fetch_society_datatable}`,
        {
          params: filters,
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

export const updateTransactionDetails = createAsyncThunk(
  "payments/updateTransactionDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.update_transaction_details}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response?.data);

      return response.data; // <== RETURN the response data here!
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update payments"
      );
    }
  }
);
