import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";
import houseTypeSlice from "./searchForm/houseTypeSlice";
import rentRangeSlice from "./searchForm/rentRangeSlice";
import stepSlice from "./signUp/stepSlice";
import identityState from "./common/identitySlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    district: districtSlice,
    houseType: houseTypeSlice,
    rentRange: rentRangeSlice,
    signUpStepState: stepSlice,
    identityState: identityState,
  },
});

export default store;
