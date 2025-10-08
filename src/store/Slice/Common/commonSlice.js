import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchAreasByCity,
  checkIfEmailExists,
  checkIfMobileExists,
  fetchSectors,
} from "../../Actions/Common/commonActions.js";

const initialState = {
  cities: [],
  areas: [],
  areaSuggestions: [],
  sectors: [],
  customError: {
    email: "",
    mobile_number: "",
  },
  loading: false,
  error: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
    setAreaSuggestions: (state, action) => {
      state.areaSuggestions = action.payload;
    },
    clearErrors: (state) => {
      state.customError = { email: "", mobile_number: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchAreasByCity.fulfilled, (state, action) => {
        state.areas = action.payload;
      })
      .addCase(checkIfEmailExists.fulfilled, (state) => {
        state.customError.email = "";
      })
      .addCase(checkIfEmailExists.rejected, (state, action) => {
        state.customError.email = action.payload;
      })
      .addCase(checkIfMobileExists.fulfilled, (state) => {
        state.customError.mobile_number = "";
      })
      .addCase(checkIfMobileExists.rejected, (state, action) => {
        // console.log(action.payload);
        state.customError.mobile_number = action.payload;
      })
      //Handle SEctors
      .addCase(fetchSectors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.sectors = action.payload;
        state.loading = false;
      })
      .addCase(fetchSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sectors";
      });
  },
});

export const { setAreaSuggestions, clearErrors, setAreas, setSector } =
  commonSlice.actions;
export default commonSlice.reducer;
