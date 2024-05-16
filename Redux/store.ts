import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";
import houseTypeSlice from "./searchForm/houseTypeSlice";
import rentRangeSlice from "./searchForm/rentRangeSlice";
import stepSlice from "./signUp/stepSlice"
import identityState from "./common/identitySlice";
import basicInformationSlice from "./post/basicInformationSlice";
import photosSlice from "./post/photosSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    district: districtSlice,
    houseType: houseTypeSlice,
    rentRange: rentRangeSlice,
    signUpStepState: stepSlice,
    identityState: identityState,
    basicInformationContent: basicInformationSlice,
    photosUpload: photosSlice
  },
});

export default store;
