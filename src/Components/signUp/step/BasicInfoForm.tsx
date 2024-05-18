import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { useRef, useState } from "react";
import Modal from "../imgUpload/Modal";
import PencilIcon from "../imgUpload/PencilIcon";
import PlaceholderIcon from "../imgUpload/PlaceholderIcon";
interface formDataType {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function BasicInfoForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 控制 modal state
  const [modalOpen, setModalOpen] = useState(false);
  // react hook form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<formDataType>();
  // 頭貼
  const avatarUrl = useRef(""); //"https://avatarfiles.alphacoders.com/161/161002.jpg"
  console.log(avatarUrl);
  const updateAvatar = imgSrc => {
    avatarUrl.current = imgSrc;
  };

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

  const uploadImage = async () => {};
  const onSubmit = (formData: formDataType) => {
    //dispatch(setCurrentStepState(currentStepState + 1));
    uploadImage();
    console.log(formData);
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
                  value=""
                  name="gender-radio"
                  className="w-4 h-4 text-black focus:ring-transparent border-black focus:border-black"
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
                  value=""
                  name="gender-radio"
                  className="w-4 h-4 text-black focus:ring-transparent border-black focus:border-black"
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
            <div className="relative w-full mb-6">
              <input
                type="text"
                id="floating_outlined"
                className="block p-3 w-full text-sans-body1 text-Neutral-50 rounded-[4px] border-1 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-2 focus:border-Brand-30 peer"
                placeholder=""
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sans-body1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white pl-3 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
              >
                職業
              </label>
            </div>
            {/* 上傳大頭貼區塊 */}
            <span className="block text-sans-caption mb-3">上傳大頭貼</span>
            <div className="flex flex-col justify-center items-center py-10 border border-dashed border-black rounded-lg mb-10">
              {/* <input type="file" id="userProfile" onChange={onSelectFile} /> */}
              <button
                type="button"
                title="Change photo"
                className="filled-button-m mb-2"
                onClick={() => setModalOpen(true)}
              >
                選擇檔案
              </button>
              <span className="text-sans-body2">支援PNG, JPG (Max 5MB)</span>
            </div>
            {/* Profile */}
            <div className="flex flex-col items-center mb-20">
              {avatarUrl.current ? (
                <div className="relative">
                  <img
                    src={avatarUrl.current}
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
                  />
                  {/* 編輯按鈕 */}
                  <button
                    type="button"
                    className="absolute bottom-10 -right-20 w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Change photo"
                    onClick={() => setModalOpen(true)}
                  >
                    <PencilIcon />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <PlaceholderIcon />
                  {/* 編輯按鈕 */}
                  <button
                    type="button"
                    className="absolute bottom-10 -right-20 w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Edit photo"
                    onClick={() => setModalOpen(true)}
                  >
                    <PencilIcon />
                  </button>
                </div>
              )}
            </div>
            {modalOpen && <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />}

            {/* 確認 */}
            <button
              type="submit"
              className={`filled-button-l w-full mb-3 ${
                Object.keys(errors).length > 0
                  ? "bg-Neutral-90 hover:bg-Neutral-90"
                  : ""
              }`}
            >
              確認
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
