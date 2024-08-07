import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { photosDataType } from "../../src/components/landLordManagement/posts/procedures/Photos";

interface PhotosDataState {
  photos: photosDataType[];
}

const initialState: PhotosDataState = {
  photos: [],
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<photosDataType[]>) => {
      state.photos = [...action.payload];
    },
    resetPhotos : () => initialState
  },
});

export const { setPhotos, resetPhotos } = photosSlice.actions;
export default photosSlice.reducer;