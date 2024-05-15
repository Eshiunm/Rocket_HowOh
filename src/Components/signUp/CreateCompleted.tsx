import { useDispatch } from "react-redux";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import { useNavigate } from "react-router-dom";

function CreateCompleted() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(setCurrentStepState(0));
    navigate("/signUp");
  };
  return (
    <div className="wrap h-screen bg-Neutral-99 pt-[60px]">
      <div className="container layout-grid">
        <div className="col-span-6 col-start-4 ">
          <div className="p-10 bg-white">
            <h2 className="text-sans-h5 mb-10">完成</h2>
            <p className="text-sans-body1 mb-10">
              您已註冊好窩會員，感謝您為安全透明的租賃環境做出貢獻！
            </p>
            <button
              onClick={handleLogin}
              type="submit"
              className="filled-button-l w-full"
            >
              登入系統
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateCompleted;
