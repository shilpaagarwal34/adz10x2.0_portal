// slices/relationshipManagerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchRelationshipManagers } from "../../../Actions/Admin/Relationship Manager/RelationshipAction.js";

const initialState = {
  relationshipManagers: [],
  relationshipManagerLoading: false,
  relationShipError: null,
};

const RelationshipManagerSlice = createSlice({
  name: "relationshipManagers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelationshipManagers.pending, (state) => {
        state.relationshipManagerLoading = true;
        state.relationShipError = null;
      })
      .addCase(fetchRelationshipManagers.fulfilled, (state, action) => {
        state.relationshipManagerLoading = false;
        state.relationshipManagers = action.payload?.data || [];
      })
      .addCase(fetchRelationshipManagers.rejected, (state, action) => {
        state.relationshipManagerLoading = false;
        state.relationShipError = action.payload;
      });
  },
});

export default RelationshipManagerSlice.reducer;
