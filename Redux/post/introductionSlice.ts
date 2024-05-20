import { createSlice } from "@reduxjs/toolkit";

export const introductionSlice = createSlice({
  name: "introduction",
  initialState: {
    introduction: "",
  },
  reducers: {
    setIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
  },
});

export const { setIntroduction } = introductionSlice.actions;
export default introductionSlice.reducer;