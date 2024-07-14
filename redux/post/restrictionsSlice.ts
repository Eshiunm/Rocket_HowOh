import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restrictions: {
    hasTenantRestrictions: "false",
    genderRestriction: "性別友善",
    jobRestriction: "",
  }
}

export const restrictionsSlice = createSlice({
  name: "restrictions",
  initialState,
  reducers: {
    setRestrictions: (state, action) => {
      state.restrictions = {...action.payload};
    },
    resetRestrictions: () => initialState
  },
});

export const { setRestrictions, resetRestrictions } = restrictionsSlice.actions;
export default restrictionsSlice.reducer;