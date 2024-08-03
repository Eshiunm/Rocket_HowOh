import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerIdentity: null,
};

export const registerIdentitySlice = createSlice({
  name: "registerIdentity",
  initialState,
  reducers: {
    setRegisterIdentityState: (state, action) => {
      state.registerIdentity = action.payload;
    },
  },
});

export const { setRegisterIdentityState } = registerIdentitySlice.actions;
export default registerIdentitySlice.reducer;
