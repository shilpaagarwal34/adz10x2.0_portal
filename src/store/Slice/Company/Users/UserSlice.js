import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyUsers,
  addCompanyUser,
  deleteCompanyUser,
} from "../../../Actions/Company/Users/UserActions";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  total: 0,
  page: 1,
  limit: 10,
  search: "",
  loading: false,
  error: null,
  addUserStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  submitLoading: false,
  tableName: "",
};

const companyUsers = createSlice({
  name: "companyUsers",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetAddUserStatus: (state) => {
      state.addUserStatus = "idle";
      state.error = null;
    },
    // SWICTH STAYTUS STATE
    updateCompanyUserStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateCompanyUserStatusSuccess: (state, action) => {
      state.submitLoading = false;
    
      const { id, status } = action.payload.data;
      // console.log(action.payload);
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index].status = status;
      }
      toast.success("Status Updated Succesfully");
    },
    updateCompanyUserStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
      toast.error("Failed to update status");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.tableName = action.payload.table_name;
      })
      .addCase(fetchCompanyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add user
      .addCase(addCompanyUser.pending, (state) => {
        state.addUserStatus = "loading";
        state.error = null;
      })
      .addCase(addCompanyUser.fulfilled, (state, action) => {
        state.addUserStatus = "succeeded";
        const user = action.payload?.data;

        const index = state.users.findIndex((u) => u.id === user.id);
        // console.log(index);
        if (index !== -1) {
          // It's an update
          state.users[index] = user;
        } else {
          // It's a new user
          state.users.unshift(user);
        }
      })
      .addCase(addCompanyUser.rejected, (state, action) => {
        state.addUserStatus = "failed";
        state.error = action.payload;
      })

      // delete socity yser
      .addCase(deleteCompanyUser.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteCompanyUser.fulfilled, (state, action) => {
        state.submitLoading = false;
        const deletedId = action.payload?.id;

        if (deletedId) {
          state.users = state.users.filter((user) => user.id !== deletedId);

          state.total -= 1;
          toast.success("User deleted successfully!");
        }
      })
      .addCase(deleteCompanyUser.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete city: ${action.payload}`);
      });
  },
});

export const {
  setPage,
  setSearch,
  updateCompanyUserStatusFail,
  updateCompanyUserStatusRequest,
  updateCompanyUserStatusSuccess,
} = companyUsers.actions;
export default companyUsers.reducer;
