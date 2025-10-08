// store/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.filter((n) => !n.read).length;
    },
    clearNotifications: (state) => {
      state.items = [];
      state.count = 0;
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      // const item = state.items.find((n) => n.id === id);
      // if (item) item.read = true;
      state.items = state.items.filter((n) => n?.id !== id);
      state.count = state.items.filter((n) => !n.read).length;
    },
  },
});

export const { setNotifications, clearNotifications, markAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
