import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    district: districtSlice,
  },
});

export default store;
