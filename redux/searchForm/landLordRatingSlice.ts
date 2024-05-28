import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noLimit: {},
  landLordRating: [],
};

export const landLordRatingSlice = createSlice({
  name: "landLordRating",
  initialState,
  reducers: {
    setLandLordRatingNoLimitState: (state, action) => {
      state.noLimit = action.payload;
    },
    setLandLordRatingItemsState: (state, action) => {
      state.landLordRating = action.payload;
    },
  },
});

export const { setLandLordRatingNoLimitState, setLandLordRatingItemsState } =
  landLordRatingSlice.actions;
export default landLordRatingSlice.reducer;
