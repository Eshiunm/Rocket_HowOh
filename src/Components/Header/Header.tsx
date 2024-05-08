import { Link } from "react-router-dom";
import NavigationDefault from "./NavigationDefault";
import NavigationLogin from "./NavigationLogin";

function Header() {
  const isLogin = false;
  return (
    <>
      <div className="container flex justify-between items-center py-2">
        <Link to="/" className="flex items-center">
          <img
            src="../public/imgs/howohLogo.svg"
            alt="howoh logo"
            className="mr-3"
          />
          <h1 className="logo font-Dela-Gothic-One text-dela-display4">好窩</h1>
        </Link>
        {isLogin ? <NavigationLogin /> : <NavigationDefault />}
      </div>
    </>
  );
}

export default Header;
