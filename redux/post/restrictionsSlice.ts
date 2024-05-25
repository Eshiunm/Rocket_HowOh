import { createSlice } from "@reduxjs/toolkit";

export const restrictionsSlice = createSlice({
  name: "restrictions",
  initialState: {
    restrictions: {
      hasTenantRestrictions: "false",
      genderRestriction: "性別友善",
      jobRestriction: "",
    }
  },
  reducers: {
    setRestrictions: (state, action) => {
      state.restrictions = {...action.payload};
    },
  },
});

export const { setRestrictions } = restrictionsSlice.actions;
export default restrictionsSlice.reducer;