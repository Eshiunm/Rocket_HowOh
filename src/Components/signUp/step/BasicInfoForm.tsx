import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../../redux/signUp/stepSlice";
import { setSignUpForm } from "../../../../redux/signUp/signupFormSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { useState } from "react";
import { occupations } from "../../../constants/occupations";
import { Spinner } from "flowbite-react";
import axios from "axios";
import Modal from "../imgUpload/Modal";
import PlaceholderIcon from "../imgUpload/PlaceholderIcon";
interface formDataType {
  lastName: string;
  firstName: string;
  gender: string;
  email: string;
  password: string;
  passwordConfirm: string;
  career: string;
}

function BasicInfoForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const identityState = useSelector(
    (store: RootState) => store.identityState.identity
  );
  const phoneNumber = useSelector(
    (store: RootState) => store.signupForm.signUpFormData.telphone
  );
  // 是否正在打 API
  const [posting, setPosting] = useState(false);
  // 控制 modal 開關
  const [modalOpen, setModalOpen] = useState(false);
  // 設定大頭貼 srcUrl
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  // react hook form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<formDataType>();

  const [isCareerFocused, setIsCareerFocused] = useState(false);

  const currentStepState = useSelector(
    (store: RootState) => store.signUpStepState.currentStepState
  );

  const cancelSignUp = () => {
    dispatch(setCurrentStepState(0));
    navigate("/signUp");
  };

  const passwordConfirm = (value: string) => {
    const password = watch("password"); // 利用 watch 抓取 name="userPassword" 的 input 的 value
    if (value !== password) {
      return "與第一次輸入的密碼不同";
    }
  };

  const handleUploadImage = async () => {
    const ImgData = new FormData();
    // 用 append 的方式將資料組成 "key":"value" 的形式
    ImgData.append("file", avatarUrl); // 圖片 url
    ImgData.append(
      "cloud_name",
      import.meta.env.VITE_CLOUDINARY_Eshiunm_CLOUD_NAME
    ); // Cloudinary 的帳號名稱
    ImgData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_Eshiunm_UPLOAD_PRESET
    ); // Cloudinary 上預設存放圖片的地方
    ImgData.append("folder", "HowOh_UserAvatar"); // 存放圖片的資料夾名稱
    try {
      // 將圖片上傳到 Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_Eshiunm_CLOUD_NAME
        }/image/upload`,
        ImgData
      );
      const imgUrl = response.data.url;
      return imgUrl;
    } catch (error) {
      alert("圖片上傳失敗,請重新上傳");
      console.log(error);
    }
  };

  const onSubmit = async (formData: formDataType) => {
    const signUpFormData = {
      firstName: formData.firstName, //名字
      lastName: formData.lastName, //姓氏
      email: formData.email, //信箱
      password: formData.password, //密碼
      telphone: phoneNumber, //手機
      role: `${identityState === "landlord" ? "房東" : "租客"}`, //房東or租客
      gender: formData.gender, //男or女
      job: Number(formData.career), //職業 （參考下表）
      photo: "", //照片網址
      userIntro: `${
        identityState === "landlord"
          ? `您好，我是房東${formData.lastName}${
              formData.gender === "男" ? "先生" : "小姐"
            }，希望能找到合適的租客！ `
          : `您好，我是租客${formData.lastName}${
              formData.gender === "男" ? "先生" : "小姐"
            }，希望能找到合適的房子！`
      }}`,
    };

    setPosting(true);
    if (avatarUrl) {
      const imgUrl = await handleUploadImage();
      signUpFormData.photo = imgUrl;
    }
    dispatch(setSignUpForm(signUpFormData));
    try {
      await axios.post("http://98.70.102.116/api/signup", signUpFormData);
      dispatch(setCurrentStepState(currentStepState + 1));
    } catch (errors) {
      console.log(errors);
    }
    setPosting(false);
  };

  return (
    <div className="wrap bg-Neutral-99 py-[60px]">
      <div className="container layout-grid">
        <div className="col-span-6 col-start-4 ">
          <form
            className="bg-white rounded-2xl p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-sans-h5 mb-10">輔助資訊</h2>
            <span className="block text-sans-body1 mb-[34px]">
              輔助資訊有助於房東更了解您。
            </span>
            <span className="block text-sans-caption mb-3">性別</span>
            {/* 性別 */}
            <div className="flex items-center gap-6 mb-[34px]">
              <div className="flex items-center cursor-pointer">
                <input
                  checked
                  id="male-radio"
                  type="radio"
                  value="男"
                  className="w-4 h-4 text-black focus:ring-transparent border-black focus:border-black"
                  {...register("gender")}
                />
                <label
                  htmlFor="male-radio"
                  className="ml-3 text-sans-body1 text-black cursor-pointer"
                >
                  男
                </label>
              </div>
              <div className="flex items-center cursor-pointer">
                <input
                  id="female-radio"
                  type="radio"
                  value="女"
                  className="w-4 h-4 text-black focus:ring-transparent border-black focus:border-black"
                  {...register("gender")}
                />
                <label
                  htmlFor="female-radio"
                  className="ml-3 text-sans-body1 text-black cursor-pointer"
                >
                  女
                </label>
              </div>
            </div>
            {/* 姓名 */}
            <div className="flex items-center gap-x-6 mb-3">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
                      errors.lastName
                        ? "focus:border-Alert-50 border-Alert-50"
                        : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
                    } peer`}
                    placeholder=""
                    {...register("lastName", {
                      required: { value: true, message: "必填" },
                    })}
                  />
                  <label
                    htmlFor="lastName"
                    className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
                  >
                    姓
                  </label>
                </div>
                {/* 錯誤提示字 */}
                <span
                  className={`${
                    errors.lastName ? "text-Alert-50" : "text-black"
                  } inline-block pl-3 text-sans-caption`}
                >
                  {errors.lastName && errors.lastName.message}
                </span>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
                      errors.firstName
                        ? "focus:border-Alert-50 border-Alert-50"
                        : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
                    } peer`}
                    placeholder=""
                    {...register("firstName", {
                      required: { value: true, message: "必填" },
                    })}
                  />
                  <label
                    htmlFor="firstName"
                    className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
                  >
                    名
                  </label>
                </div>
                {/* 錯誤提示字 */}
                <span
                  className={`${
                    errors.firstName ? "text-Alert-50" : "text-black"
                  } inline-block pl-3 text-sans-caption`}
                >
                  {errors.firstName ? errors.firstName.message : ""}
                </span>
              </div>
            </div>
            {/* Email */}
            <div className="w-full mb-3">
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
                    errors.email
                      ? "focus:border-Alert-50 border-Alert-50"
                      : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
                  } peer`}
                  placeholder=""
                  {...register("email", {
                    required: { value: true, message: "必填" },
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Email 格式不正確",
                    },
                  })}
                />
                <label
                  htmlFor="email"
                  className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
                >
                  Email
                </label>
              </div>
              {/* 錯誤提示字 */}
              <span
                className={`${
                  errors.email ? "text-Alert-50" : "text-black"
                } inline-block pl-3 text-sans-caption`}
              >
                {errors.email && errors.email.message}
              </span>
            </div>
            {/* 密碼 */}
            <div className="w-full mb-3">
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
                    errors.password
                      ? "focus:border-Alert-50 border-Alert-50"
                      : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
                  } peer`}
                  placeholder=""
                  {...register("password", {
                    required: { value: true, message: "必填" },
                    minLength: { value: 8, message: "密碼至少 8 碼" },
                  })}
                />
                <label
                  htmlFor="password"
                  className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
                >
                  密碼
                </label>
              </div>
              {/* 錯誤提示字 */}
              <span
                className={`${
                  errors.password ? "text-Alert-50" : "text-black"
                } inline-block pl-3 text-sans-caption`}
              >
                {errors.password && errors.password.message}
              </span>
            </div>
            {/* 再次確認密碼 */}
            <div className="w-full mb-3">
              <div className="relative">
                <input
                  type="password"
                  id="passwordConfirm"
                  className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
                    errors.passwordConfirm
                      ? "focus:border-Alert-50 border-Alert-50"
                      : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
                  } peer`}
                  placeholder=""
                  {...register("passwordConfirm", {
                    required: { value: true, message: "必填" },
                    minLength: { value: 8, message: "密碼至少 8 碼" },
                    validate: passwordConfirm,
                  })}
                />
                <label
                  htmlFor="passwordConfirm"
                  className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
                >
                  再次確認密碼
                </label>
              </div>
              {/* 錯誤提示字 */}
              <span
                className={`${
                  errors.passwordConfirm ? "text-Alert-50" : "text-black"
                } inline-block pl-3 text-sans-caption`}
              >
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </span>
            </div>
            {/* 職業 */}
            <div className="w-full mb-6">
              <div
                tabIndex={0}
                className={`relative flex w-full p-3 rounded ${
                  errors.career
                    ? "border-Alert-50 border"
                    : isCareerFocused
                    ? "border-Brand-30 border-2 -m-[1px]"
                    : "border-black border"
                }`}
                onFocus={() => setIsCareerFocused(true)}
                onBlur={() => setIsCareerFocused(false)}
              >
                <select
                  id="career"
                  required
                  className="cursor-pointer block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  {...register("career", {
                    required: { value: true, message: "必填" },
                  })}
                >
                  {
                    // 為了讓下面 label 的 peer-[:invalid:focus] 類別起到樣式的作用，要加上這個空值選項，Select 標籤也要加上 required 屬性
                    <option value={""} selected disabled hidden></option>
                  }
                  {occupations.map(({ id, title: occupation }, index) => (
                    <option value={index} key={id}>
                      {occupation}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="city"
                  className="absolute text-sans-body1 text-Neutral-50 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 
                  peer-focus:text-black
                  peer-[:invalid:focus]:top-[3px] 
                  peer-[:invalid:focus]:scale-75 
                  peer-[:invalid:focus]:-translate-y-4 start-3
                  peer-[:invalid]:scale-100 
                  peer-[:invalid]:-translate-y-1/2 
                  peer-[:invalid]:top-1/2"
                >
                  職業
                </label>
              </div>
              {errors.career ? (
                <p className="post-alert">{errors.career?.message}</p>
              ) : null}
            </div>
            {/* 上傳大頭貼區塊 */}
            <span className="block text-sans-caption mb-8">上傳大頭貼</span>

            {/* Profile */}
            <div className="flex flex-col items-center mb-20">
              {avatarUrl ? (
                <div className="relative">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
                  />
                  {/* 編輯按鈕 */}
                  <button
                    type="button"
                    className="absolute text-white bottom-[37%] -right-[67%] w-[50%] p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Change photo"
                    onClick={() => setModalOpen(true)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="absolute text-white bottom-[37%] -right-[130%] w-[50%] p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Change photo"
                    onClick={() => setAvatarUrl("")}
                  >
                    刪除
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <PlaceholderIcon />
                  {/* 編輯按鈕 */}
                  <button
                    type="button"
                    className="absolute text-white bottom-[37%] -right-[90%] w-[70%] p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Edit photo"
                    onClick={() => setModalOpen(true)}
                  >
                    新增照片
                  </button>
                </div>
              )}
            </div>
            {modalOpen && (
              <Modal
                setAvatarUrl={setAvatarUrl}
                closeModal={() => setModalOpen(false)}
              />
            )}

            {/* 確認 */}
            <button
              type="submit"
              className={`filled-button-l w-full mb-3 ${
                Object.keys(errors).length > 0 || posting
                  ? "bg-Neutral-90 hover:bg-Neutral-90"
                  : ""
              }`}
            >
              {posting ? (
                <>
                  <Spinner
                    aria-label="Spinner button example"
                    size="lg"
                    className="mr-4"
                  />
                  註冊中請稍後...
                </>
              ) : (
                "確認"
              )}
            </button>

            <button className="p-2 text-sans-b-body1" onClick={cancelSignUp}>
              取消
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BasicInfoForm;
