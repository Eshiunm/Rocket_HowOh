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
            <input
              type="text"
              placeholder="請以手機建立帳號"
              className="w-full rounded p-3"
              {...register("phone", { required: false })}
            />
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
