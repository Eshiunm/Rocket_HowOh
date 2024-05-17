import { createSlice } from "@reduxjs/toolkit";

export const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = [...action.payload];
    },
  },
});

export const { setPhotos } = photosSlice.actions;
export default photosSlice.reducer;