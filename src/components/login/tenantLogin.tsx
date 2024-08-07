import { apiLogin } from "../../apis/apis";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegisterIdentityState } from "../../../redux/common/registerIdentitySlice";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import eyeOpen from "../../assets/imgs/icons/eyeOpen.svg";

interface formDataType {
  telphone: string;
  password: string;
}

function TenantLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formDataType>();
  // 打API後跳出的錯誤訊息
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  // 顯示密碼
  const [showPassword, setShowPassword] = useState(false);
  // 是否正在打 API
  const [isPosting, setPosting] = useState(false);
  const handleMouseDown = () => {
    setShowPassword(true);
  };
  const handleMouseUp = () => {
    setShowPassword(false);
  };
  const turnToSignUp = () => {
    dispatch(setRegisterIdentityState("tenant"));
    navigate("/signup/createAccount");
  };

  const onSubmit = async (formData: formDataType) => {
    const newFormData = {
      ...formData,
      role: "租客", // 補上身分，告知後端目前使用者選擇什麼身分登入
    };
    setApiErrorMessage("");
    setPosting(true);
    try {
      const response = await apiLogin(newFormData);
      const token = response.data.token;
      const userId = response.data.data.userId;
      localStorage.setItem("authToken", token);
      localStorage.setItem("currentIdentity", "tenant");
      localStorage.setItem("userId", userId);
      localStorage.setItem("userProfile", response.data.data.photo);
      navigate("/");
    } catch (errors: any) {
      let errorMessage = errors.response.data;
      if (errorMessage === "尚未註冊手機號碼") {
        errorMessage = "手機號碼尚未註冊，請點擊下方建立帳號";
      } else if (errorMessage === "錯誤身分") {
        errorMessage = "身份錯誤，請換身份登入";
      } else if (errorMessage === "密碼錯誤") {
        errorMessage = "密碼錯誤，請重新輸入密碼";
      } else {
        errorMessage = "伺服器錯誤，請刷新頁面後再試一次";
      }
      setApiErrorMessage(errorMessage);
    }
    setPosting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-10 shadow-elevation-3"
    >
      <h2 className="text-sans-h5 mb-10">租客登入</h2>
      {/* 帳號 */}
      <div className="w-full mb-5">
        <div className="relative">
          <input
            type="text"
            id="telphone"
            className={`block p-3 w-full text-sans-body1 text-black rounded-[4px] border-1 appearance-none focus:outline-none focus:ring-0  ${
              errors.telphone
                ? "focus:border-Alert-50 border-Alert-50"
                : "focus:border-Brand-30 focus:border-2 focus:m-[-2px] border-black"
            } peer`}
            placeholder=""
            {...register("telphone", {
              required: { value: true, message: "必填" },
              pattern: {
                value: /^09\d{8}$/,
                message: "手機號碼格式不正確",
              },
            })}
          />
          <label
            htmlFor="telphone"
            className={`absolute text-sans-body1 duration-300 transform peer-focus:text-black text-gray-500 -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3`}
          >
            手機
          </label>
        </div>
        {/* 錯誤提示字 */}
        <span
          className={`${
            errors.telphone ? "text-Alert-50" : "text-black"
          } inline-block pl-3 text-sans-caption`}
        >
          {errors.telphone && errors.telphone.message}
        </span>
      </div>

      {/* 密碼 */}
      <div className="w-full mb-3">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
          {/* 顯示密碼按鈕 */}
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center px-2"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img src={eyeOpen} alt="eyeOpen" />
          </button>
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
      {/* 打 API 後產生的錯誤訊息放這 */}
      {apiErrorMessage && (
        <p className="text-Alert-50 mb-7">{apiErrorMessage}</p>
      )}

      <button
        type="submit"
        className="filled-button-l w-full mb-3"
        disabled={isPosting}
      >
        {isPosting ? (
          <Spinner color="info" size="md" className="mr-4" />
        ) : (
          "登入"
        )}
      </button>
      <p>
        沒有帳號嗎？
        <span
          className="text-sans-b-body1 hover:opacity-50 cursor-pointer"
          id="tenantSignUp"
          onClick={turnToSignUp}
        >
          {" "}
          建立帳號
        </span>
      </p>
    </form>
  );
}
export default TenantLogin;
