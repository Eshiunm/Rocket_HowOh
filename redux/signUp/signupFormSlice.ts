import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpFormData: {
    // 屬性名稱不能亂改，打 API 用的
    firstName: "", //名字
    lastName: "", //姓氏
    email: "", //信箱
    password: "", //密碼
    telphone: "", //手機
    role: "", //房東or租客
    gender: "", //男or女
    job: "", //職業( 0~21 )
    photo: "", //照片網址
    userIntro: "", //自我介紹
  },
};

export const signupFormSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    setSignUpForm: (state, action) => {
      state.signUpFormData = { ...state.signUpFormData, ...action.payload };
      console.log(state.signUpFormData);
    },
  },
});

export const { setSignUpForm } = signupFormSlice.actions;
export default signupFormSlice.reducer;
