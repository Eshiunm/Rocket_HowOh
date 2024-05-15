import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentStepState } from "../../../redux/signUp/stepSlice";
import doneImg from "../../assets/imgs/icons/createAccount_done.svg";
import EnterPhoneForm from "../../components/signUp/EnterPhoneForm";
import PhoneValidationForm from "../../components/signUp/PhoneValidationForm";
import BasicInfoForm from "../../components/signUp/BasicInfoForm";
import CreateCompleted from "../../components/signUp/CreateCompleted";

function CreateAccountPage() {
  const dispatch = useDispatch();
  const currentStepState = useSelector(
    store => store.signUpStepState.currentStepState
  );
  const identityState = useSelector(store => store.identityState.identity);
  console.log(currentStepState);
  console.log(identityState);
  /*
    使用者若按到重新載入，一律回到第一步
  */
  useEffect(() => {
    dispatch(setCurrentStepState(1));
  }, []);
  return (
    <>
      {/* 註冊進度條 */}
      <div className="pt-6 pb-[50px] bg-Tenant-90">
        <div className="container layout-grid">
          <div className="col-span-8 col-start-3">
            <ul className="flex justify-between items-center">
              <li className="relative">
                <div className="w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center">
                  {currentStepState === 1 ? (
                    <span className="text-sans-body1 text-Brand-60">1</span>
                  ) : (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  )}
                  {/* {signUpStepState.enterPhoneStepIsDone ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Brand-60">1</span>
                  )} */}
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
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  {currentStepState === 2 ? (
                    <span className="text-sans-body1 text-Brand-60">2</span>
                  ) : currentStepState > 2 ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">2</span>
                  )}
                </div>
                {/* <div
                  className={
                    currentStep === "phoneValidation"
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : signUpStepState.enterPhoneStepIsDone &&
                        signUpStepState.phoneValidationIsDone
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  {signUpStepState.phoneValidationIsDone ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span
                      className={
                        currentStep === "phoneValidation"
                          ? "text-sans-body1 text-Brand-60"
                          : "text-sans-body1 text-Tenant-50"
                      }
                    >
                      2
                    </span>
                  )}
                </div> */}
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  手機驗證
                </span>
              </li>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <li className="relative">
                <div
                  className={
                    currentStepState >= 3
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  {currentStepState === 3 ? (
                    <span className="text-sans-body1 text-Brand-60">3</span>
                  ) : currentStepState > 3 ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">3</span>
                  )}
                </div>
                {/* <div
                  className={
                    currentStep === "basicInfo"
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  {signUpStepState.basicInfoIsDone ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span
                      className={
                        currentStep === "basicInfo"
                          ? "text-sans-body1 text-Brand-60"
                          : "text-sans-body1 text-Tenant-50"
                      }
                    >
                      3
                    </span>
                  )}
                </div> */}
                <span className="absolute bottom-[-100%] left-[-50%] whitespace-nowrap">
                  基本資訊
                </span>
              </li>
              <div className="w-full h-[1px] bg-Neutral-80"></div>
              <li className="relative">
                <div
                  className={
                    currentStepState >= 4
                      ? "w-8 h-8 rounded-full bg-Brand-90 flex items-center justify-center"
                      : "w-8 h-8 rounded-full bg-Neutral-80 flex items-center justify-center"
                  }
                >
                  {currentStepState === 4 ? (
                    <img
                      src={doneImg}
                      alt="domeImg"
                      className="w-4 h-4 scale-150"
                    />
                  ) : (
                    <span className="text-sans-body1 text-Tenant-50">4</span>
                  )}
                </div>
                {/* <div
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
                </div> */}
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
