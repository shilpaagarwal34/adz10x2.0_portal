// Actions/Admin/RelationshipManager/RelationshipManagerAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

export const fetchRelationshipManagers = createAsyncThunk(
  "relationshipManagers/fetchRelationshipManagers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.get_relationship_manager}`
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch relationship managers"
      );
    }
  }
);

export const fetchSocietyCommission = async (
  setCommissionType,
  setCommissionValues,
  setLoadingCommission
) => {
  try {
    setLoadingCommission(true);
    const res = await axiosInstance.get(api_routes.admin.get_society_comission);
    const data = res?.data?.data;
    console.log(data)
    setCommissionType(data.society_commission); // "INR" or "%"
    setCommissionValues({
      "Brand Promotion": data.society_brand_promotion || "",
      "Lead Generation": data.society_lead_generation || "",
      Survey: data.society_survey || "",
    });
  } catch (err) {
    console.error("Failed to fetch society commission:", err);
  } finally {
    setLoadingCommission(false);
  }
};

export const updateSocietyCommission = async (payload) => {
  try {
    const res = await axiosInstance.post(
      api_routes.admin.post_update_kyc_status,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to update society commission:", err);
    throw err;
  }
};

// Company Comission

export const fetchCompanyCommission = async (
  setCommissionType,
  setCommissionValues,
  setLoadingCommission
) => {
  try {
    setLoadingCommission(true);
    const res = await axiosInstance.get(api_routes.admin.get_company_comission);
    const data = res?.data?.data;
    console.log(res);

    setCommissionType(data.society_commission); // "INR" or "%"
    setCommissionValues({
      "Brand Promotion": data.brand_promotion || "",
      "Lead Generation": data.lead_generation || "",
      Survey: data.survey || "",
    });
  } catch (err) {
    console.error("Failed to fetch society commission:", err);
  } finally {
    setLoadingCommission(false);
  }
};

export const updateCompanyCommission = async (payload) => {
  try {
    const res = await axiosInstance.post(
      api_routes.admin.post_update_company_kyc_status,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.error("Failed to update Company commission:", err);
    throw err;
  }
};
