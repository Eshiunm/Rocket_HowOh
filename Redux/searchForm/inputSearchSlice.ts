import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textContent: "信義國小",
};

export const inputSearchSlice = createSlice({
  name: "inputSearch",
  initialState,
  reducers: {
    changeContent: (state, action) => {
      state.textContent = action.payload;
    },
  },
});

export const { changeContent } = inputSearchSlice.actions;
export default inputSearchSlice.reducer;
