import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import doneImg_tenant from "../../assets/imgs/icons/createAccount_done_tenant.svg";
import doneImg_landLord from "../../assets/imgs/icons/createAccount_done_landLord.svg";
import EnterPhoneForm from "../../components/signUp/step/EnterPhoneForm";
import PhoneValidationForm from "../../components/signUp/step/PhoneValidationForm";
import BasicInfoForm from "../../components/signUp/step/BasicInfoForm";
import CreateCompleted from "../../components/signUp/step/CreateCompleted";
import { RootState } from "../../../redux/store";

function CreateAccountPage() {
  const dispatch = useDispatch();
  const currentStepState = useSelector(
    (store: RootState) => store.signUpStepState.currentStepState
  );
  const registerIdentityState = useSelector(
    (store: RootState) => store.registerIdentityState.registerIdentity
  );

  /*
    使用者若按到重新載入，一律回到步驟一
  */
  useEffect(() => {
    dispatch(setCurrentStepState(1));
    window.scrollTo(0, 0);
  }, []);

  /* 當此頁面載入時，將畫面滾到最上方*/
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch, currentStepState]);
  return (
    <>
      {/* 註冊進度條 */}
      <div
        className={`pt-6 pb-[50px] ${
          registerIdentityState === "tenant" ? "bg-Tenant-90" : "bg-Landlord-90"
        } `}
      >
        <div className="container layout-grid">
          <div className="col-span-8 col-start-3">
            <ul className="flex justify-between items-center">
              <li className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    registerIdentityState === "tenant"
                      ? "bg-Brand-90"
                      : "bg-Landlord-80"
                  } `}
                >
                  {currentStepState === 1 ? (
                    <span
                      className={`text-sans-body1 ${
                        registerIdentityState === "tenant"
                          ? "text-Brand-60"
                          : "text-Landlord-50"
                      }`}
                    >
                      1
                    </span>
                  ) : (
                    <img
                      src={
                        registerIdentityState === "tenant"
                          ? doneImg_tenant
                          : doneImg_landLord
                      }
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  )}
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  輸入手機
                </span>
              </li>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <li className="relative">
                <div
                  className={
                    currentStepState >= 2
                      ? `w-8 h-8 rounded-full ${
                          registerIdentityState === "tenant"
                            ? "bg-Brand-90"
                            : "bg-Landlord-80"
                        } flex items-center justify-center`
                      : `w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center`
                  }
                >
                  {currentStepState === 2 ? (
                    <span
                      className={`text-sans-body1 ${
                        registerIdentityState === "tenant"
                          ? "text-Brand-60"
                          : "text-Landlord-50"
                      }`}
                    >
                      2
                    </span>
                  ) : currentStepState > 2 ? (
                    <img
                      src={
                        registerIdentityState === "tenant"
                          ? doneImg_tenant
                          : doneImg_landLord
                      }
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">2</span>
                  )}
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  手機驗證
                </span>
              </li>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <li className="relative">
                <div
                  className={
                    currentStepState >= 3
                      ? `w-8 h-8 rounded-full flex items-center justify-center ${
                          registerIdentityState === "tenant"
                            ? "bg-Brand-90"
                            : "bg-Landlord-80"
                        }`
                      : `w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center`
                  }
                >
                  {currentStepState === 3 ? (
                    <span
                      className={`text-sans-body1 ${
                        registerIdentityState === "tenant"
                          ? "text-Brand-60"
                          : "text-Landlord-50"
                      }`}
                    >
                      3
                    </span>
                  ) : currentStepState > 3 ? (
                    <img
                      src={
                        registerIdentityState === "tenant"
                          ? doneImg_tenant
                          : doneImg_landLord
                      }
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">3</span>
                  )}
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  基本資訊
                </span>
              </li>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <li className="relative">
                <div
                  className={
                    currentStepState >= 4
                      ? `w-8 h-8 rounded-full flex items-center justify-center ${
                          registerIdentityState === "tenant"
                            ? "bg-Brand-90"
                            : "bg-Landlord-80"
                        }`
                      : `w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center`
                  }
                >
                  {currentStepState === 4 ? (
                    <img
                      src={
                        registerIdentityState === "tenant"
                          ? doneImg_tenant
                          : doneImg_landLord
                      }
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">4</span>
                  )}
                </div>
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  完成註冊
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {currentStepState === 1 && <EnterPhoneForm />}
      {currentStepState === 2 && <PhoneValidationForm />}
      {currentStepState === 3 && <BasicInfoForm />}
      {currentStepState === 4 && <CreateCompleted />}
    </>
  );
}

export default CreateAccountPage;
