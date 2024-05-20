import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noLimit: {},
  rentRanges: [],
};

export const rentRangeSlice = createSlice({
  name: "rentRange",
  initialState,
  reducers: {
    setRentRangeNoLimitState: (state, action) => {
      state.noLimit = action.payload;
    },
    setRentRangeItemsState: (state, action) => {
      state.rentRanges = action.payload;
    },
  },
});

export const { setRentRangeNoLimitState, setRentRangeItemsState } =rentRangeSlice.actions;
export default rentRangeSlice.reducer;
