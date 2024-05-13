import { Link, useLocation } from "react-router-dom";
import NavigationDefault from "./NavigationDefault";
import NavigationLogin from "./NavigationLogin";
import logo from "../../assets/imgs/howohLogo.svg";

function Header() {
  const location = useLocation();
  console.log(location.pathname);
  const isLogin = false;
  return (
    <>
      <nav className="bg-white sticky top-0 z-50">
        <div className="container flex justify-between items-center py-2 bg-white">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="howoh logo" className="mr-3" />
            <h1 className="logo font-Dela-Gothic-One text-dela-display4">
              好窩
            </h1>
          </Link>
          { location.pathname === "/signup" ? null 
            : isLogin ? (<NavigationLogin />) : (<NavigationDefault />)}
        </div>
      </nav>
    </>
  );
}

export default Header;
