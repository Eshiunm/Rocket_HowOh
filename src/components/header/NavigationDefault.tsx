import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdentityState } from "../../../redux/common/identitySlice";

function NavigationDefault() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directToLandLordLogin = () => {
    navigate("/login");
    dispatch(setIdentityState("landLord"));
  };
  const directToTenantLogin = () => {
    navigate("/login");
    dispatch(setIdentityState("tenant"));
  };
  const directToCreateAccount = () => {
    navigate("/signUp");
  };
  return (
    <ul className="flex gap-6">
      <li>
        <button
          className="text-sans-b-body1 p-2 hover:opacity-70"
          onClick={directToLandLordLogin}
        >
          我是房東
        </button>
      </li>
      <li>
        <button
          className="text-sans-b-body1 p-2 hover:opacity-70"
          onClick={directToTenantLogin}
        >
          我是租客
        </button>
      </li>
      <li>
        <button
          className="text-sans-b-body1 p-2 hover:opacity-70"
          onClick={directToCreateAccount}
        >
          建立帳號
        </button>
      </li>
    </ul>
  );
}
export default NavigationDefault;
