import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noLimit: {},
  houseFeatures: [],
};

export const houseFeaturesSlice = createSlice({
  name: "houseFeatures",
  initialState,
  reducers: {
    setHouseFeaturesNoLimitState: (state, action) => {
      state.noLimit = action.payload;
    },
    setHouseFeaturesItemsState: (state, action) => {
      state.houseFeatures = action.payload;
    },
  },
});

export const { setHouseFeaturesNoLimitState, setHouseFeaturesItemsState } =
  houseFeaturesSlice.actions;
export default houseFeaturesSlice.reducer;
