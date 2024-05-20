import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noLimit: {},
  houseTypes: [],
};

export const houseTypeSlice = createSlice({
  name: "houseType",
  initialState,
  reducers: {
    setHouseTypeNoLimitState: (state, action) => {
      state.noLimit = action.payload;
    },
    setHouseTypeItemsState: (state, action) => {
      state.houseTypes = action.payload;
    },
  },
});

export const { setHouseTypeNoLimitState, setHouseTypeItemsState } =
  houseTypeSlice.actions;
export default houseTypeSlice.reducer;
