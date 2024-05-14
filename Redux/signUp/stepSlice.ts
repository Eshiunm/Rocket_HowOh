import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStepState: 0,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setCurrentStepState: (state, action) => {
      state.currentStepState = action.payload;
    },
  },
});

export const { setCurrentStepState } = stepSlice.actions;
export default stepSlice.reducer;
