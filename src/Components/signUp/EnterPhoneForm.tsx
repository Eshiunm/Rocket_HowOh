import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";

interface formDataType {
  phone: string;
}

function EnterPhoneForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm<formDataType>();
  const currentStepState = useSelector(
    store => store.signUpStepState.currentStepState
  );
  const identityState = useSelector(store => store.identityState.identity);

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
            <h2 className="text-sans-h5 mb-[50px]">
              {identityState === "tenant" ? "建立租客帳號" : "建立房東帳號"}
            </h2>
            <div className="relative w-full">
              <input
                type="text"
                id="floating_outlined"
                className="block p-3 w-full text-sans-body1 text-Neutral-50 rounded-[4px] border-1 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-2 focus:border-Brand-30 peer"
                placeholder=""
                {...register("phone", { required: false })}
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sans-body1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white pl-3 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
              >
                請以手機建立帳號
              </label>
            </div>
            {/* <input
              type="text"
              placeholder="請以手機建立帳號"
              className="w-full rounded p-3"
              {...register("phone", { required: false })}
             />*/}
            <span className="inline-block pl-3 text-sans-caption mb-10">
              請填入真實手機，我們將驗證您的手機
            </span>
            <button type="submit" className="filled-button-l w-full mb-3">
              進行驗證
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
