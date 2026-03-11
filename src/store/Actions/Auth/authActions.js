import axios from "axios";
import api_routes from "../../../config/api.js";
import { setUser, setLoading, setError } from "../../Slice/Auth/authSlice.js";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/** Send OTP to mobile for login. Payload: { mobile } (10-digit string). */
export const sendLoginOtp = async (mobile) => {
  const response = await axios.post(api_routes.common.send_login_otp, {
    mobile: mobile.replace(/\D/g, "").slice(-10),
  });
  return response.data;
};

/** Verify OTP and log in. Same response shape as login (token, user_type, etc.). */
const loginWithOtp = (mobile, otp, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(api_routes.common.verify_login_otp, {
      mobile: mobile.replace(/\D/g, "").slice(-10),
      otp: typeof otp === "string" ? otp : otp.join(""),
    });
    const data = response.data?.data;
    const token = data?.token;
    const userType = data?.user_type;
    if (token && response.status === 200) {
      localStorage.setItem("user_data", JSON.stringify(data));
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", userType);
      window.dispatchEvent(new Event("storage"));
      dispatch(setUser(data));
      if (userType === "Company_Admin" || userType === "Company_User") {
        navigate("/company");
      } else if (userType === "Society_Admin" || userType === "Society_User") {
        navigate("/society");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    const msg = error.response?.data?.message || "Invalid OTP or mobile.";
    toast.error(msg);
    dispatch(setError(msg));
    throw new Error(msg);
  }
};

const societyResendOtp = async () => {
  try {
    // Send POST request using axios
    const token = localStorage.getItem("auth_token");

    // console.log(token);
    const response = await axios.post(api_routes.society.resend_otp, {
      token,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const postCompanyRegister = async (values) => {
  try {
    const response = await axios.post(
      `${api_routes.company.post_company_register}`,
      values,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};

const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      `${api_routes.common.post_login}`,
      credentials
    );

    const data = response.data.data;
    const token = data?.token;
    const userType = data?.user_type;

    if (token && response.status === 200) {
      localStorage.setItem("user_data", JSON.stringify(data));
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", userType);
      window.dispatchEvent(new Event("storage"));

      dispatch(setUser(data));

      // ✅ Navigate after Redux state is updated
      if (userType === "Company_Admin" || userType === "Company_User") {
        navigate("/company");
      } else if (userType === "Society_Admin" || userType === "Society_User") {
        navigate("/society");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    // console.log(error.response);

    if (error.response?.status === 403) {
      const data = error.response?.data;
      const token = data?.token;
      const otp = data?.otp;
      const isOtpVerified = data?.is_otp_verified;

      if (isOtpVerified === "0") {
        localStorage.setItem("auth_token", data?.token);
        localStorage.setItem("selectedCard", data?.userType);
        navigate("/verify-otp", {
          state: {
            registrationData: { otp, token },
          },
        });

        return;
      }
    }

    let errorMessage = "An unexpected error occurred";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    toast.error(errorMessage);
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  }
};

const handleResetPassword = async (
  formData,
  setIsSubmitting,
  onSuccess = () => {}
) => {
  setIsSubmitting(true);

  try {
    const response = await axios.post(
      api_routes.common.post_change_password,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    toast.success(response?.data?.message || "Password reset successful");
    onSuccess(response.data); // optional success handler
  } catch (error) {
    // console.log("Reset Password Error:", error);
    const errorMessage =
      error?.response?.data?.message || "Something went wrong!";
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ user, userType }, { rejectWithValue }) => {
    try {
      if (userType === "admin")
        await axiosInstance.post("/admin-logout", {
          user_id: user?.id,
        });
      else
        await axiosInstance.post("/logout", {
          user_id: user?.id,
          user_type: user?.user_type,
        });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still log out locally when API fails (e.g. 403 expired token)
    } finally {
      localStorage.clear();
    }
    return true; // Always succeed so UI clears auth state and redirects to login
  }
);

// Society Change Password in dashboard
const societyChangePassword = async (formData) => {
  try {
    const response = await axiosInstance.post(
      api_routes.society.post_change_password,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const societyAdminAccountDelete = async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      api_routes.society.post_delete_society_admin_account
    );
    // console.log(response.data);
    if (response.status === 200) {
      toast.success("Account Deleted Successfully");
      setTimeout(() => {
        dispatch(logoutUser());
        localStorage.clear();
      }, [2000]);
    }
  } catch (err) {
    // console.log(err.response?.data);
    toast.error(err.response?.data?.message);
  }
};

// Company Change Password in dashboard
const companyChangePassword = async (formData) => {
  try {
    const response = await axiosInstance.post(
      api_routes.company.post_change_password,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const companyAdminAccountDelete = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      api_routes.company.post_delete_account
    );

    if (response.status === 200) {
      toast.success("Account Deleted Successfully");
      setTimeout(() => {
        dispatch(logoutUser());
        localStorage.clear();
      }, 2000); // just use 2000, not [2000]
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong.");
  }
};

const getFreshLoginData = (email, user) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/login-users`, { email });
    const token = localStorage.getItem("auth_token");
    if (response.status === 200) {
      setTimeout(() => {
        dispatch(setUser({ ...response?.data?.data, token: `${token}` }));
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    // Only logout when API explicitly says session invalid (403 + !is_logged_in).
    // Do not logout on network errors or wrong URL to avoid blank page on refresh.
    const status = err?.response?.status;
    const isLoggedIn = err?.response?.data?.is_logged_in;
    if (status === 403 && isLoggedIn === false) {
      dispatch(logoutUser({ user }));
    }
  }
};

export {
  societyResendOtp,
  postCompanyRegister,
  loginUser,
  loginWithOtp,
  sendLoginOtp,
  handleResetPassword,
  societyChangePassword,
  societyAdminAccountDelete,
  companyChangePassword,
  companyAdminAccountDelete,
  getFreshLoginData,
};
