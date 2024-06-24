import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegisterIdentityState } from "../../../redux/common/registerIdentitySlice";
import { useState } from "react";

function NavigationDefault() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directToLandLordLogin = () => {
    navigate("/login");
    dispatch(setRegisterIdentityState("landLord"));
  };
  const directToTenantLogin = () => {
    navigate("/login");
    dispatch(setRegisterIdentityState("tenant"));
  };
  const directToCreateAccount = () => {
    navigate("/signup");
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* Hamburger menu */}
      <button
        type="button"
        className="space-y-[6px] group sm:hidden"
        onClick={handleMenuToggle}
      >
        <div className="w-7 h-[2px] rounded-full bg-black"></div>
        <div className="w-7 h-[2px] rounded-full bg-black"></div>
        <div className="w-7 h-[2px] rounded-full bg-black"></div>
        {/* menu */}
        <ul
          className={`bg-white w-screen absolute right-0 duration-150 flex flex-col justify-end ${
            isMenuOpen ? "top-0" : "-top-[425%]"
          }`}
        >
          <div
            className="px-10 py-8 relative ml-auto"
            onClick={handleMenuToggle}
          >
            <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
            <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
          </div>
          <li className="flex justify-center w-full hover:bg-Neutral-95 border-b border-Neutral-95">
            <div
              className="text-sans-b-body1 py-6 w-full hover:opacity-70"
              onClick={directToLandLordLogin}
            >
              我是房東
            </div>
          </li>
          <li className="flex justify-center w-full hover:bg-Neutral-95 border-b border-Neutral-95">
            <div
              className="text-sans-b-body1 py-6 w-full hover:opacity-70"
              onClick={directToTenantLogin}
            >
              我是租客
            </div>
          </li>
          <li className="flex justify-center hover:bg-Neutral-95">
            <div
              className="text-sans-b-body1 py-6 w-full hover:opacity-70"
              onClick={directToCreateAccount}
            >
              建立帳號
            </div>
          </li>
        </ul>
      </button>
      <ul className="hidden sm:flex gap-6">
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
    </>
  );
}
export default NavigationDefault;
