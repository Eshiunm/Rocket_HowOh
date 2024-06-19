import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import tenant_bgImg from "../../assets/imgs/signUp/signUp_tenant_bgImg.png";
import lendLord_bgImg from "../../assets/imgs/signUp/signUp_lendLord_bgImg.png";
import { setRegisterIdentityState } from "../../../redux/common/registerIdentitySlice";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import { RootState } from "../../../redux/store";

function SwitchIdentityPage() {
  const dispatch = useDispatch();
  const registerIdentityState = useSelector(
    (store: RootState) => store.registerIdentityState.registerIdentity
  );
  console.log(registerIdentityState);
  const navigate = useNavigate();
  const handleLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    const targetId = (e.target as HTMLSpanElement)?.id; // 取得 id 屬性
    if (targetId && targetId.includes("tenant")) {
      dispatch(setRegisterIdentityState("tenant"));
    } else {
      dispatch(setRegisterIdentityState("landLord"));
    }
    navigate("/login");
  };

  const handleTenantSignUp = () => {
    dispatch(setRegisterIdentityState("tenant"));
    dispatch(setCurrentStepState(1));
    navigate("/signup/createAccount");
  };

  const handleLendLordSignUp = () => {
    dispatch(setRegisterIdentityState("landLord"));
    dispatch(setCurrentStepState(1));
    navigate("/signup/createAccount");
  };

  return (
    <div className="wrap flex-grow pt-[170px] bg-Neutral-99 ">
      <div className="container layout-grid">
        <div
          className="col-span-4 col-start-3 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative cursor-pointer overflow-hidden"
          onClick={handleTenantSignUp}
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是租客</h2>
          <p>
            已經有帳號？
            <span
              className="text-sans-b-body1 hover:opacity-50"
              id="tenantSignUp"
              onClick={handleLogin}
            >
              登入
            </span>
          </p>
          <img
            src={tenant_bgImg}
            alt="tenant_bgImg"
            className="absolute right-0 bottom-0 w-[200px]"
          />
        </div>
        <div
          className="col-span-4 col-start-7 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative cursor-pointer overflow-hidden"
          onClick={handleLendLordSignUp}
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是房東</h2>
          <p>
            已經有帳號？
            <span
              className="text-sans-b-body1 hover:opacity-50"
              id="landLordSignUp"
              onClick={handleLogin}
            >
              登入
            </span>
          </p>
          <img
            src={lendLord_bgImg}
            alt="tenant_bgImg"
            className="absolute right-0 bottom-0 w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SwitchIdentityPage;
