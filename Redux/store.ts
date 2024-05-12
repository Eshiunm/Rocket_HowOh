import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";
import houseTypeSlice from "./searchForm/houseTypeSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    district: districtSlice,
    houseType: houseTypeSlice
  },
});

export default store;
