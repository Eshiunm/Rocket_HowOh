import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identityState: null,
};

export const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setIdentityState: (state, action) => {
      state.identityState = action.payload;
    },
  },
});

export const { setIdentityState } = identitySlice.actions;
export default identitySlice.reducer;
