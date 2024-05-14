import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface formDataType {
  phone: string;
}

function PhoneValidation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm<formDataType>();
  const currentStepState = useSelector(
    store => store.signUpStepState.currentStepState
  );

  const cancelSignUp = () => {
    dispatch(setCurrentStepState(0));
    navigate("/signUp");
  };

  const onSubmit = () => {
    dispatch(setCurrentStepState(currentStepState + 1));
  };
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 記錄搜尋框是否被 focused
  return (
    <div className="wrap h-screen bg-Neutral-99 pt-[60px]">
      <div className="container layout-grid">
        <div className="col-span-6 col-start-4 ">
          <form
            className="bg-white rounded-2xl p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-sans-h5 mb-10">手機驗證</h2>
            <span className="inline-block text-sans-body1 mb-[34px]">
              6位數驗證碼已傳送到0912123451
            </span>
            <div
              tabIndex={0}
              className={`relative flex w-full border p-3 rounded-[4px] mb-10 ${
                isSearchInputFocused ? "border-Brand-30 " : "border-black"
              }`}
            >
              <input
                type="text"
                id="floating_outlined"
                className="block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                placeholder=""
                defaultValue="349304"
                onFocus={() => setIsSearchInputFocused(true)}
                onBlur={() => setIsSearchInputFocused(false)}
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sans-body1 text-black duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
              >
                驗證碼
              </label>
            </div>
            <button type="button" className="outline-button-l w-full mb-3">
              重新寄送驗證碼
            </button>
            <button type="submit" className="filled-button-l w-full mb-3">
              驗證
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

export default PhoneValidation;
