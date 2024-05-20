import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identity: null,
};

export const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setIdentityState: (state, action) => {
      state.identity = action.payload;
    },
  },
});

export const { setIdentityState } = identitySlice.actions;
export default identitySlice.reducer;
