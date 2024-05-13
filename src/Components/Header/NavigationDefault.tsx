import { Link } from "react-router-dom";

function NavigationDefault() {
  return (
    <>
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="text-sans-b-body1 p-2">
            我是房東
          </Link>
        </li>
        <li>
          <Link to="/" className="text-sans-b-body1 p-2">
            我是房客
          </Link>
        </li>
        <li>
          <Link to="/signup" className="text-sans-b-body1 p-2">
            建立帳號
          </Link>
        </li>
      </ul>
    </>
  );
}
export default NavigationDefault;
