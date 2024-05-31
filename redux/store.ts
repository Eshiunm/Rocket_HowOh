import { configureStore } from "@reduxjs/toolkit";
import cityDropdownSlice from "./searchForm/cityDropdownSlice";
import inputSearchSlice from "./searchForm/inputSearchSlice";
import districtSlice from "./searchForm/districtSlice";
import houseTypeSlice from "./searchForm/houseTypeSlice";
import houseFeaturesSlice from "./searchForm/houseFeaturesSlice";
import landLordRatingSlice from "./searchForm/landLordRatingSlice";
import rentRangeSlice from "./searchForm/rentRangeSlice";
import queryStringSlice from "./searchForm/queryStringSlice";
import stepSlice from "./signUp/stepSlice";
import registerIdentitySlice from "./common/registerIdentitySlice";
import currentIdentitySlice from "./common/currentIdentitySlice";
import basicInformationSlice from "./post/basicInformationSlice";
import photosSlice from "./post/photosSlice";
import facilitiesSlice from "./post/facilitiesSlice";
import expensesSlice from "./post/expensesSlice";
import signupFormSlice from "./signUp/signupFormSlice";
import introductionSlice from "./post/introductionSlice";
import restrictionsSlice from "./post/restrictionsSlice";

const store = configureStore({
  reducer: {
    inputSearch: inputSearchSlice, // 首頁搜尋表單，搜尋框
    cityDropdown: cityDropdownSlice, // 首頁搜尋表單，縣市dropdown 
    district: districtSlice, // 搜尋表單，區域條件篩選
    houseType: houseTypeSlice, // 搜尋表單，房型條件篩選
    rentRange: rentRangeSlice, // 搜尋表單，租金條件篩選
    landLordRating: landLordRatingSlice, // 搜尋表單，房東評分條件篩選
    houseFeatures: houseFeaturesSlice, // 搜尋表單，房源特色條件篩選
    queryStringState: queryStringSlice,
    signUpStepState: stepSlice,
    registerIdentityState: registerIdentitySlice,
    currentIdentity: currentIdentitySlice,
    basicInformationContent: basicInformationSlice,
    photosUpload: photosSlice,
    facilitiesContent: facilitiesSlice,
    expensesContent: expensesSlice,
    signupForm: signupFormSlice,
    description: introductionSlice,
    restrictionsContent: restrictionsSlice,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
