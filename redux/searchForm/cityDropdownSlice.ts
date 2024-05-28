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
    setCountryDropdownState: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setCountryDropdownState } = cityDropdownSlice.actions;
export default cityDropdownSlice.reducer;
