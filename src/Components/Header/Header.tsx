import { Link, useLocation } from "react-router-dom";
import NavigationDefault from "./NavigationDefault";
import NavigationLogin from "./NavigationLogin";
import logo from "../../assets/imgs/howohLogo_whiteMode.svg";

function Header() {
  const location = useLocation();
  const isLogin = true;
  const identity = "landLord";
  const isSignupPage = location.pathname.includes("/signUp");
  const isLoginPage = location.pathname.includes("/login");

  return (
    <nav
      className={`${
        identity === "tenant" || !isLogin ? " bg-white" : "bg-Landlord-95"
      } sticky top-0 z-50`}
    >
      <div
        className={`container flex justify-between items-center py-2 ${
          identity === "tenant" || !isLogin ? " bg-white" : "bg-LandLord-95"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} alt="howoh logo" className="mr-3" />
          <h1 className="logo font-Dela-Gothic-One text-dela-display4">好窩</h1>
        </Link>

        {isSignupPage || isLoginPage ? null : isLogin &&
          identity !== "tenant" ? (
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-sans-b-body1">
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
