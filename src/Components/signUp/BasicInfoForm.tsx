import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";

interface formDataType {
  phone: string;
}

function BasicInfoForm() {
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

  return (
    <div className="wrap h-screen bg-Neutral-99 pt-[60px]">
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
              <div className="flex items-center">
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
                  className="ml-3 text-sans-body1 text-black "
                >
                  男
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female-radio"
                  type="radio"
                  value=""
                  name="gender-radio"
                  className="w-4 h-4 text-black focus:ring-transparent border-black focus:border-black"
                />
                <label
                  htmlFor="female-radio"
                  className="ml-3 text-sans-body1 text-black"
                >
                  女
                </label>
              </div>
            </div>
            {/* 姓名 */}
            <div className="flex items-center gap-x-6 mb-6">
              <div className="relative w-full">
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
                  姓
                </label>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block p-3 w-full text-sans-body1 text-Neutral-50 rounded-[4px] border-1 border-black appearance-none focus:outline-none focus:ring-0 focus:border-2 focus:border-Brand-30 peer"
                  placeholder=""
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sans-body1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white pl-3 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                >
                  名
                </label>
              </div>
            </div>
            {/* Email */}
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
                Email
              </label>
            </div>

            {/* 密碼 */}
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
                密碼
              </label>
            </div>

            {/* 再次確認密碼 */}
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
                再次確認密碼
              </label>
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

            {/* 上傳大頭貼 */}
            <span className="block text-sans-caption mb-3">上傳大頭貼</span>
            <div className="flex flex-col justify-center items-center py-10 border border-dashed border-black rounded-lg mb-10">
              <button className="outline-button-s mb-[10px]">瀏覽檔案</button>
              <span className="text-sans-body2">支援PNG, JPG (Max 5MB)</span>
            </div>

            <button type="submit" className="filled-button-l w-full mb-3">
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
