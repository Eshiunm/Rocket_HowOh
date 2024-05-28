import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: {
    id:"",
    name: "",
  },
};

export const cityDropdownSlice = createSlice({
  name: "cityDropdown",
  initialState,
  reducers: {
    setCityDropdownState: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setCityDropdownState } = cityDropdownSlice.actions;
export default cityDropdownSlice.reducer;
