import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryString:""
};

export const queryStringSlice = createSlice({
  name: "queryString",
  initialState,
  reducers: {
    setQueryStringState: (state, action) => {
      state.queryString = action.payload;
    },
  },
});

export const { setQueryStringState } = queryStringSlice.actions;
export default queryStringSlice.reducer;
