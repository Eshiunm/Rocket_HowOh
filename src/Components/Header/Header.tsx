import { Link } from "react-router-dom";
import NavigationDefault from "./NavigationDefault";
import NavigationLogin from "./NavigationLogin";
import howohLogo from "../../assets/imgs/howohLogo.svg";

function Header() {
  const isLogin = true;
  return (
    <>
      <nav className="h-16 bg-white">
        <div className="container">
          <div className="container flex justify-between items-center py-2 bg-white fixed z-20">
            <Link to="/" className="flex items-center">
              <img
                src={howohLogo}
                alt="howoh logo"
                className="mr-3"
              />
              <h1 className="logo font-Dela-Gothic-One text-dela-display4">
                好窩
              </h1>
            </Link>
            {isLogin ? <NavigationLogin /> : <NavigationDefault />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
