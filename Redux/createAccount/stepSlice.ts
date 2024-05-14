import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enterPhoneStepIsDone: false,
  phoneValidationIsDone: false,
  basicInfoIsDone:false,
  completedIsDone: false,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStepState: (state, action) => {
      
    },
  },
});

export const { setStepState } = stepSlice.actions;
export default stepSlice.reducer;
