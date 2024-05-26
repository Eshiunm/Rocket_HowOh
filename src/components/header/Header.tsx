import { Link, useLocation } from "react-router-dom";
import NavigationDefault from "./NavigationDefault";
import NavigationLogin from "./NavigationLogin";
import logo from "../../assets/imgs/howohLogo_whiteMode.svg";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [currentIdentity, setCurrentIdentity] = useState("");
  const isSignupPage = location.pathname.includes("/signup");
  const isLoginPage = location.pathname.includes("/login");
  const atLandLordPage = location.pathname.includes("/landlord");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const currentIdentity = localStorage.getItem("currentIdentity")?.toString() || "";
    setCurrentIdentity(currentIdentity);
    // 如果有 token 也有 currentIdentity，代表有登入，將 isLogin 設為 true
    setIsLogin(!!authToken && !!currentIdentity);
    window.scrollTo(0, 0);
  });

  return (
    <nav
      className={`${
        currentIdentity === "tenant" || !isLogin
          ? " bg-white"
          : "bg-Landlord-95"
      } sticky top-0 z-50`}
    >
      <div
        className={`container flex justify-between items-center py-2 ${
          currentIdentity === "tenant" || !isLogin
            ? " bg-white"
            : "bg-LandLord-95"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} alt="howoh logo" className="mr-3" />
          <h1 className="logo font-Dela-Gothic-One text-dela-display4">好窩</h1>
        </Link>
        {/* 
            如果現在註冊頁或是在登入頁，此區塊不顯示，
            如果現在是登入狀態，且身分是房東，则顯示房東好窩、評價管理
        */}
        {isSignupPage || isLoginPage ? null : isLogin &&
          currentIdentity !== "tenant" ? (
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/landlord" className={`text-sans-b-body1 ${atLandLordPage ? "border-b border-black" : ""}`}>
                房東好窩
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sans-b-body1">
                評價管理
              </Link>
            </li>
          </ul>
        ) : null}
        {/* 
            如果現在註冊頁或是在登入頁，此區塊不顯示，
            如果現在是登入狀態，则顯示登入後的nav
        */}
        {isSignupPage || isLoginPage ? null : isLogin ? (
          <NavigationLogin />
        ) : (
          <NavigationDefault />
        )}
      </div>
    </nav>
  );
}

export default Header;
