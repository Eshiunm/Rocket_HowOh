import { Link } from "react-router-dom";
import tentant_bgImg from "../../assets/imgs/signUp/signUp_tenant_bgImg.svg";
import lendLord_bgImg from "../../assets/imgs/signUp/signUp_lendLord_bgImg.svg";

function SignUpPage() {
  return (
    <div className="wrap h-screen pt-[170px] bg-Neutral-99 ">
      <div className="container layout-grid">
        <Link
          to="/"
          className="col-span-4 col-start-3 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative"
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是租客</h2>
          <p>
            已經有帳號？
            <Link to="/login" className="text-sans-b-body1 hover:opacity-50">
              登入
            </Link>
          </p>
          <img
            src={tentant_bgImg}
            alt="tentant_bgImg"
            className="absolute right-0 bottom-0"
          />
        </Link>
        <Link
          to="/"
          className="col-span-4 col-start-7 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative"
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是房東</h2>
          <p>
            已經有帳號？
            <Link to="/login" className="text-sans-b-body1 hover:opacity-50">
              登入
            </Link>
          </p>
          <img
            src={lendLord_bgImg}
            alt="tentant_bgImg"
            className="absolute right-0 bottom-0"
          />
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
