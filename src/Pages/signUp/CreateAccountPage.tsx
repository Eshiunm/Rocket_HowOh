import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

function CreateAccountPage() {
  const [identity, setIdentity] = useState("");
  const [currentStep, setCurrentStep] = useState("enterPhone");
  const params = useParams();
  console.log(currentStep);

  /*
    當步驟的網址改變時，更新 currentStep 值
    輸入手機 -> currentStep = "enterPhone"
    手機驗證 -> currentStep = "phoneValidation"
    基本資訊 -> currentStep = "basicInfo"
    註冊完成 -> currentStep = "completed"
  */
  useEffect(() => {
    params.currentStep?.includes("enterPhone")
      ? setCurrentStep("enterPhone")
      : params.currentStep?.includes("phoneValidation")
      ? setCurrentStep("phoneValidation")
      : params.currentStep?.includes("basicInfo")
      ? setCurrentStep("basicInfo")
      : setCurrentStep("completed");
  }, [params.currentStep]);

  /*
     進到註冊頁面先判斷對方想註冊的身分是租客還是房東
     租客 -> identity = "tenant"
     房東 -> identity = "landLord"
  */
  useEffect(() => {
    params.currentStep?.includes("tenant")
      ? setIdentity("tenant")
      : setIdentity("landLord");
  }, []);

  return (
    <>
      {/* 註冊頁 nav */}
      <div className="pt-6 pb-[50px] bg-Tenant-90">
        <div className="container layout-grid">
          <div className="col-span-8 col-start-3">
            <div className="flex justify-between items-center">
              <NavLink
                to={`/signUp/createAccount/${identity}-enterPhone`}
                className="relative"
              >
                <div className="w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center">
                  <span className="text-sans-body1 text-Brand-60">1</span>
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  輸入手機
                </span>
              </NavLink>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <NavLink
                to={`/signUp/createAccount/${identity}-phoneValidation`}
                className="relative"
              >
                <div
                  className={
                    currentStep === "phoneValidation"
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  <span
                    className={
                      currentStep === "phoneValidation"
                        ? "text-sans-body1 text-Brand-60"
                        : "text-sans-body1 text-Tenant-50"
                    }
                  >
                    2
                  </span>
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  手機驗證
                </span>
              </NavLink>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <NavLink
                to={`/signUp/createAccount/${identity}-basicInfo`}
                className="relative"
              >
                <div
                  className={
                    currentStep === "basicInfo"
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  <span
                    className={
                      currentStep === "basicInfo"
                        ? "text-sans-body1 text-Brand-60"
                        : "text-sans-body1 text-Tenant-50"
                    }
                  >
                    3
                  </span>
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  基本資訊
                </span>
              </NavLink>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <NavLink
                to={`/signUp/createAccount/${identity}-completed`}
                className="relative"
              >
                <div
                  className={
                    currentStep === "completed"
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  <span
                    className={
                      currentStep === "completed"
                        ? "text-sans-body1 text-Brand-60"
                        : "text-sans-body1 text-Tenant-50"
                    }
                  >
                    4
                  </span>
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  完成註冊
                </span>
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
