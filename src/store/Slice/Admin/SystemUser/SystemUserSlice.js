import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  createSystemUser,
  updateSystemUser,
  deleteSystemUser,
} from "../../../Actions/Admin/SystemUser/SystemUserActions.js";

const initialState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  submitLoading: false,
  tableName: null,
};

const systemUserSlice = createSlice({
  name: "system_user",
  initialState,
  reducers: {
    updateUserStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateUserStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;
      // console.log(action.payload);
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index].status = status;
      }
    },
    updateUserStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.tableName = action.payload.table;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE USER
      .addCase(createSystemUser.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(createSystemUser.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.users.unshift(action.payload); // Add new user to top of list
      })
      .addCase(createSystemUser.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload || "Failed to create user.";
      })

      // UPDATE USER
      .addCase(updateSystemUser.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(updateSystemUser.fulfilled, (state, action) => {
        state.submitLoading = false;

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload; // Update the user in the list
        }
      })
      .addCase(updateSystemUser.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload || "Failed to update user.";
      })
      // delete system user
      .addCase(deleteSystemUser.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteSystemUser.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;
        // console.log(action.payload)

        if (deletedId) {
          state.users = state.users.filter((user) => user.id !== deletedId);
          state.total -= 1;
        }
      })
      .addCase(deleteSystemUser.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFail,
} = systemUserSlice.actions;

export default systemUserSlice.reducer;
