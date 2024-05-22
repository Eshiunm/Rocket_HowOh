import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdentityState } from "../../../redux/common/identitySlice";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "flowbite-react";

function TenantLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  // 是否正在打 API
  const [posting, setPosting] = useState(false);

  const turnToSignUp = () => {
    dispatch(setIdentityState("tenant"));
    navigate("/signUp/createAccount");
  };

  // const onSubmit = async formData => {
  //   setPosting(true);
  //   try {
  //     const resopnse = await axios.post(
  //       "http://98.70.102.116/api/login",
  //       formData
  //     );
  //     alert(resopnse.data.message);
  //     navigate("/");
  //   } catch (errors) {
  //     console.log(errors);
  //   }
  //   setPosting(false);
  // };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-10"
    >
      <h2 className="text-sans-h5 mb-10">租客登入</h2>
      {/* 帳號 */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          id="telphone"
          className="block p-3 w-full text-sans-body1 text-Neutral-50 rounded-[4px] border-1 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-2 focus:border-Brand-30 peer"
          placeholder=""
          {...register("telphone", {
            required: { value: true, message: "必填" },
          })}
        />
        <label
          htmlFor="telphone"
          className="absolute text-sans-body1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white pl-3 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
        >
          手機
        </label>
      </div>

      {/* 密碼 */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          id="password"
          className="block p-3 w-full text-sans-body1 text-Neutral-50 rounded-[4px] border-1 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-2 focus:border-Brand-30 peer"
          placeholder=""
          {...register("password", {
            required: { value: true, message: "必填" },
          })}
        />
        <label
          htmlFor="password"
          className="absolute text-sans-body1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white pl-3 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
        >
          密碼
        </label>
      </div>

      <button
        type="submit"
        className="filled-button-l w-full mb-3"
        disabled={posting}
      >
        {posting ? (
          <>
            <Spinner
              aria-label="Spinner button example"
              size="lg"
              className="mr-4"
            />
            登入中請稍後...
          </>
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
          建立帳號
        </span>
      </p>
    </form>
  );
}
export default TenantLogin;
