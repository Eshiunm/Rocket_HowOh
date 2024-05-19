import { configureStore } from "@reduxjs/toolkit";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";
import houseTypeSlice from "./searchForm/houseTypeSlice";
import rentRangeSlice from "./searchForm/rentRangeSlice";
import stepSlice from "./signUp/stepSlice";
import identityState from "./common/identitySlice";
import basicInformationSlice from "./post/basicInformationSlice";
import photosSlice from "./post/photosSlice";
import facilitiesSlice from "./post/facilitiesSlice";
import expensesSlice from "./post/expensesSlice";
import introductionSlice from "./post/introductionSlice";
import restrictionsSlice from "./post/restrictionsSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice,
    district: districtSlice,
    houseType: houseTypeSlice,
    rentRange: rentRangeSlice,
    signUpStepState: stepSlice,
    identityState: identityState,
    basicInformationContent: basicInformationSlice,
    photosUpload: photosSlice,
    facilitiesContent: facilitiesSlice,
    expensesContent: expensesSlice,
    description: introductionSlice,
    restrictionsContent: restrictionsSlice,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
