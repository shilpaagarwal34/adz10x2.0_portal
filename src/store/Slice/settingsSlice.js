import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullLogo: null,
  miniLogo: null,
  emailLogo: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setVisualSettings: (state, action) => {
      const { fullLogo, miniLogo, emailLogo } = action.payload;
      state.fullLogo = fullLogo;
      state.miniLogo = miniLogo;
      state.emailLogo = emailLogo;
    },
  },
});

export const { setVisualSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
