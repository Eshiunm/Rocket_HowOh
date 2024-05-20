import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noLimit: {},
  districts:[],
};

export const districtSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {
    setDistrictNoLimitState: (state, action) => {
      state.noLimit = action.payload;
    },
    setDistrictItemsState: (state, action) => {
      state.districts = action.payload;
    }
  },
});

export const { setDistrictNoLimitState, setDistrictItemsState} = districtSlice.actions;
export default districtSlice.reducer;
