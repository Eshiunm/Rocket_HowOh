import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
  },
});

export default store;
