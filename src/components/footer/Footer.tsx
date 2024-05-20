import { Link } from "react-router-dom";
import logoImg from "../../assets/imgs/howohLogo_blackMode.svg";
function Footer() {
  return (
    <footer className="py-6 bg-black">
      <div className="container flex justify-between items-center text-white">
        <div className=" flex items-center gap-x-6">
          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="howohLogo_blackMode"
              className="mr-[13px]"
            />
            <h2 className="text-white font-Dela-Gothic-One text-dela-display4">
              好窩
            </h2>
          </Link>
          <div className="text-sans-caption">
            <p className="">© 2024 好窩 Inc. Howoh Inc. </p>
            <p>© All Rights Reserved</p>
          </div>
        </div>
        {/* 暫時不顯示 */}
        {/* <ul className="flex gap-6">
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
            <Link to="/" className="text-sans-b-body1 p-2">
              建立帳號
            </Link>
          </li>
        </ul> */}
      </div>
    </footer>
  );
}

export default Footer;
