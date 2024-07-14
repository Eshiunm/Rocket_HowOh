import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "",
}

export const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    resetDescription: () => initialState
  },
});

export const { setDescription, resetDescription } = descriptionSlice.actions;
export default descriptionSlice.reducer;