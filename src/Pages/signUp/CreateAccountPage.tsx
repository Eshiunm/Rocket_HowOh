import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

function CreateAccountPage() {
  const [currentStepPath, setCurrentStepPath] = useState("");
  const params = useParams();

  /*
     進到註冊頁面先判斷對方想註冊的身分是租客還是房東
     租客 -> currentStepPath = "tenant"
     房東 -> currentStepPath = "landLord"
  */
  useEffect(() => {
    params.currentStep?.includes("tenant")
      ? setCurrentStepPath("tenant")
      : setCurrentStepPath("landLord");
  }, []);
  return (
    <>
      {/* 註冊頁 nav */}
      <div className="py-6 bg-Tenant-90 mb-[60px]">
        <div className="container layout-grid">
          <div className="col-span-8 col-start-3">
            <div className="">
              <NavLink
                to={`/signUp/createAccount/${currentStepPath}-enterPhone`}
                className=""
              >
                輸入手機
              </NavLink>
              <NavLink
                to={`/signUp/createAccount/${currentStepPath}-phoneValidation`}
                className=""
              >
                手機驗證
              </NavLink>
              <NavLink
                to={`/signUp/createAccount/${currentStepPath}-basicInfo`}
                className=""
              >
                基本資訊
              </NavLink>
              <NavLink
                to={`/signUp/createAccount/${currentStepPath}-completed`}
                className=""
              >
                註冊完成
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default CreateAccountPage;
