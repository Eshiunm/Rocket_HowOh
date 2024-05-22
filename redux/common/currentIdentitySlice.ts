import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIdentity: null,
};

export const currentIdentitySlice = createSlice({
  name: "currentIdentity",
  initialState,
  reducers: {
    setCurrentIdentityState: (state, action) => {
      state.currentIdentity = action.payload;
    },
  },
});

export const { setCurrentIdentityState } = currentIdentitySlice.actions;
export default currentIdentitySlice.reducer;
