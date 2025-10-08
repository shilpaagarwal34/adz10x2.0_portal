import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api_routes from "../../../config/api.js";
import { setSector } from "../../Slice/Common/commonSlice.js";

// Fetch Cities
export const fetchCities = createAsyncThunk(
  "common/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_routes.common.get_cities}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch cities.");
    }
  }
);

// Fetch Areas by City
export const fetchAreasByCity = createAsyncThunk(
  "common/fetchAreasByCity",
  async (cityId, { rejectWithValue }) => {
    if (!cityId) return rejectWithValue("City ID is required");
    try {
      const response = await axios.get(
        `${api_routes.common.get_areas}/${cityId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch areas.");
    }
  }
);

// Check if Email Exists
export const checkIfEmailExists = createAsyncThunk(
  "common/checkIfEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      await axios.get(api_routes.society.email_exist, { params: { email } });
      return ""; // No error
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.errors?.email || "Error checking email."
      );
    }
  }
);  

// Check if Mobile Exists
export const checkIfMobileExists = createAsyncThunk(
  "common/checkIfMobileExists",
  async (mobile_number, { rejectWithValue }) => {
    try {
      await axios.get(api_routes.society.mobile_exist, {
        params: { mobile_number },
      });
      return ""; // No error
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.mobile_number ||
          "Error checking mobile number."
      );
    }
  }
);

/*******************************COMPANY RELATED CHECK ************************** */

// export const checkCompanyEmailExist = async (email_id) => {
//   try {
//     // Await the response from the API call
//     const res = await axios.get(api_routes.company.check_email_exists, {
//       params: { email: email_id },
//     });

//     console.log(res);

//     if (res.data.status === 200) {
//       alert("Email Dont Exist");
//       return false;
//     } // false when email dont exist

//     return true; //true when email exist
//   } catch (error) {
//     throw new Error(err);
//   }
// };

// export const checkCompanyMobileExist = async (mobile_number) => {
//   try {
//     // Await the response from the API call
//     const res = await axios.get(api_routes.company.check_mobile_exisit, {
//       params: { mobile_number: mobile_number },
//     });

//     if (res.data.status === 200) return true; // true when email dont exist

//     if (res.data.status === 400) return false;
//   } catch (error) {
//     console.log(error)
//     // throw new Error(error);
//   }
// };

export const checkCompanyMobileExist = async (mobile_number) => {
  try {
    const res = await axios.get(api_routes.company.check_mobile_exisit, {
      params: { mobile_number },
    });

    if (res.data.status === 200) {
      return false; // Mobile doesn't exist (valid)
    } else if (res.data.status === 400) {
      return true; // Mobile exists
    }

    // For any other unexpected status
    throw new Error("Unexpected server response");
  } catch (error) {
    // Network error (no response)
    if (!error.response) {
      throw new Error("Network error");
    }

    // Specific handling for known 400 response
    if (error.response.status === 400) {
      return true; // Treat as mobile already exists
    }

    // Unknown server error
    throw new Error("Server error. Please try again.");
  }
};

export const checkCompanyEmailExist = async (email_id) => {
  try {
    const res = await axios.get(api_routes.company.check_email_exists, {
      params: { email: email_id },
    });

    // Email doesn't exist
    if (res.data.status === 200) {
      return false;
    }

    // Email exists
    if (res.data.status === 400) {
      return true;
    }

    // Unexpected server response
    throw new Error("Unexpected server response");
  } catch (error) {
    if (!error.response) {
      // Network error
      throw new Error("Network error");
    }

    if (error.response.status === 400) {
      return true; // Treat 400 as email already exists
    }

    if (error.response.status === 500) {
      throw new Error("Internal server error. Please try again later.");
    }

    throw new Error("Something went wrong while checking email.");
  }
};

export const fetchSectors = createAsyncThunk(
  "common/fetchSectors", // Action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(api_routes.company.get_sectors);
      return response.data.data;
    } catch (error) {
      // Handle any errors that occur during the request
      return rejectWithValue(error.response?.data || "Failed to fetch sectors");
    }
  }
);
