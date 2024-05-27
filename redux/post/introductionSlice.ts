import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  introduction: "",
}

export const introductionSlice = createSlice({
  name: "introduction",
  initialState,
  reducers: {
    setIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
    resetIntroduction: () => initialState
  },
});

export const { setIntroduction, resetIntroduction } = introductionSlice.actions;
export default introductionSlice.reducer;