import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { setSignUpForm } from "../../../../redux/signUp/signupFormSlice";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useState } from "react";

interface formDataType {
  telphone: string;
}

function EnterPhoneForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 是否正在打 API
  const [posting, setPosting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formDataType>();
  const currentStepState = useSelector(
    (store: RootState) => store.signUpStepState.currentStepState
  );
  const identityState = useSelector(
    (store: RootState) => store.identityState.identity
  );

  const cancelSignUp = () => {
    dispatch(setCurrentStepState(0));
    navigate("/signUp");
  };

  const onSubmit = async (data: formDataType) => {
    setPosting(true);
    try {
      await axios.post("http://98.70.102.116/api/phoneNumberVerifi", data);
      dispatch(setCurrentStepState(currentStepState + 1));
      dispatch(setSignUpForm(data));
    } catch (error) {
      console.log(error);
      alert("該手機號碼已註冊過");
    }
    setPosting(false);
  };

  return (
    <div className="wrap h-screen bg-Neutral-99 pt-[60px] ">
      <div className="container layout-grid">
        <div className="col-span-6 col-start-4 ">
          <form
            className="bg-white rounded-2xl p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-sans-h5 mb-[50px]">
              {identityState === "tenant" ? "建立租客帳號" : "建立房東帳號"}
            </h2>
            {/* 輸入手機號碼 */}
            <div className="relative w-full">
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
                請以手機建立帳號
              </label>
            </div>
            {/* 提示字 */}
            <span
              className={`${
                errors.telphone ? "text-Alert-50" : "text-black"
              } inline-block pl-3 text-sans-caption mb-10`}
            >
              {errors.telphone
                ? errors.telphone.message
                : "請填入真實手機，我們將驗證您的手機"}
            </span>

            <button
              type="submit"
              className={`filled-button-l w-full mb-3 ${
                Object.keys(errors).length > 0
                  ? "bg-Neutral-90 hover:bg-Neutral-90"
                  : ""
              }`}
              disabled={Object.keys(errors).length > 0 || posting}
            >
              {posting ? (
                <>
                  <Spinner
                    aria-label="Spinner button example"
                    size="lg"
                    className="mr-4"
                  />
                  驗證中請稍後...
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

export default EnterPhoneForm;
