import { useSelector } from "react-redux";
import TenantLogin from "../../components/login/tenantLogin";
import LandLordLogin from "../../components/login/landLordLogin";
import { RootState } from "../../../redux/store";

function LoginPage() {
  const identityState = useSelector((store: RootState) => store.identityState.identity);
  console.log(identityState);
  return (
    <div
      className={
        identityState === "tenant"
          ? "wrap h-screen bg-Neutral-99 bg-tenantLoginImg bg-contain bg-no-repeat"
          : "wrap h-screen bg-Neutral-99 bg-landLordLoginImg bg-contain bg-no-repeat"
      }
    >
      <div className="container layout-grid pt-[170px]">
        <div className="col-span-5 col-start-7">
          {identityState === "tenant" ? <TenantLogin /> : <LandLordLogin />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
