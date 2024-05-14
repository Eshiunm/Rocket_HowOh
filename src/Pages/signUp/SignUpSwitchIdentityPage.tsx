import { Link } from "react-router-dom";
import tenant_bgImg from "../../assets/imgs/signUp/signUp_tenant_bgImg.svg";
import lendLord_bgImg from "../../assets/imgs/signUp/signUp_lendLord_bgImg.svg";

function SignUpSwitchIdentityPage() {
  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("sign up");
  };

  return (
    <div className="wrap h-screen pt-[170px] bg-Neutral-99 ">
      <div className="container layout-grid">
        <Link
          to="/signUp/createAccount/tenant-enterPhone"
          className="col-span-4 col-start-3 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative"
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是租客</h2>
          <p>
            已經有帳號？
            <span
              className="text-sans-b-body1 hover:opacity-50"
              id="tenantSignUp"
              onClick={handleSignUp}
            >
              登入
            </span>
          </p>
          <img
            src={tenant_bgImg}
            alt="tenant_bgImg"
            className="absolute right-0 bottom-0"
          />
        </Link>
        <Link
          to="/signUp/createAccount/landLord-enterPhone"
          className="col-span-4 col-start-7 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10 relative"
        >
          <h2 className="text-sans-b-h5 mb-[168px]">我是房東</h2>
          <p>
            已經有帳號？
            <span
              className="text-sans-b-body1 hover:opacity-50"
              id="landLordSignUp"
              onClick={handleSignUp}
            >
              登入
            </span>
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

export default SignUpSwitchIdentityPage;
