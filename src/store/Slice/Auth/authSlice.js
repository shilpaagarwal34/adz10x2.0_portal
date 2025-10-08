import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../Actions/Auth/authActions";
const userData = JSON.parse(localStorage.getItem("user_data")) || null;

const initialState = {
  user: userData,
  isAuthenticated: !!userData,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      // Add setError action
      state.error = action.payload;
      state.loading = false;
    },

    updateUserData: (state, action) => {
      const { name } = action.payload;
      state.user.name = name;
      const existingUser = JSON.parse(localStorage.getItem("user_data"));
      if (existingUser) {
        existingUser.name = name;
        localStorage.setItem("user_data", JSON.stringify(existingUser));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setLoading, setError, updateUserData } =
  authSlice.actions;

export default authSlice.reducer;
