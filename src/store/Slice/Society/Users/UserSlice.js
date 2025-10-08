import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSocietyUsers,
  addSocietyUser,
  deleteSocietyUser,
} from "../../../Actions/Society/Users/UserActions";
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
  tableName:"",
};

const societySlice = createSlice({
  name: "users",
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
    updateSocietyUserStatusRequest: (state) => {
      state.submitLoading = true;
    },
    updateSocietyUserStatusSuccess: (state, action) => {
      state.submitLoading = false;
      const { id, status } = action.payload.data;
      // console.log(action.payload);
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index].status = status;
      }
      toast.success("Status Updated Succesfully");
    },
    updateSocietyUserStatusFail: (state, action) => {
      state.submitLoading = false;
      state.error = action.payload;
      toast.error("Failed to update status");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocietyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocietyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.tableName = action.payload.table_name;
      })
      .addCase(fetchSocietyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add user
      .addCase(addSocietyUser.pending, (state) => {
        state.addUserStatus = "loading";
        state.error = null;
      })
      .addCase(addSocietyUser.fulfilled, (state, action) => {
        state.addUserStatus = "succeeded";
        const user = action.payload?.data;
        // console.log(user);
        const index = state.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          // It's an update
          state.users[index] = user;
        } else {
          // It's a new user
          state.users.unshift(user);
        }
      })
      .addCase(addSocietyUser.rejected, (state, action) => {
        state.addUserStatus = "failed";
        state.error = action.payload;
      })

      // delete socity yser
      .addCase(deleteSocietyUser.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(deleteSocietyUser.fulfilled, (state, action) => {
        state.submitLoading = false;

        const deletedId = action.payload?.id;

        if (deletedId) {
          state.users = state.users.filter((user) => user.id !== deletedId);

          state.total -= 1;
          toast.success("User deleted successfully!");
        }
      })
      .addCase(deleteSocietyUser.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        toast.error(`Failed to delete city: ${action.payload}`);
      });
  },
});

export const {
  setPage,
  setSearch,
  updateSocietyUserStatusFail,
  updateSocietyUserStatusRequest,
  updateSocietyUserStatusSuccess,
} = societySlice.actions;
export default societySlice.reducer;
