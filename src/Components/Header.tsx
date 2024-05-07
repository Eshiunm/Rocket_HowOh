import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container py-2">
        <Link to="/" className="flex items-center">
          <img
            src="../public/imgs/howohLogo.svg"
            alt="howoh logo"
            className="mr-3"
          />
          <h1 className="logo font-Dela-Gothic-One text-dela-display4">好窩</h1>
        </Link>
      </div>
    </>
  );
}

export default Header;
