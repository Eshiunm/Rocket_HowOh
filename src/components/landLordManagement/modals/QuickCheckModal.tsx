import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ForcedChangeReload } from "../index/HouseList";
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import close from "../../../assets/imgs/icons/close.svg";
import alertTriangle from "../../../assets/imgs/icons/alertTriangle.svg";
import messageCloud from "../../../assets/imgs/icons/messageCloud.svg";
import smileWink from "../../../assets/imgs/icons/smileWink.svg";
import ForcedChangeModal from "./ForcedChangeModal";
import { apiHouseLandlordFindUser, apiOrderLandlordAssignTenant } from "../../../apis/apis";

interface QuickCheckModalPropsType {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}
interface tenantInfoType {
  photo: string;
  name: string;
  userId: number;
}

type FormDataType = {
  tenantPhone: string;
  leaseStartTime: string;
  leaseEndTime: string;
}

type UserInfoType = {
  houseId: string | null; 
  userId?: number;
  leaseStartTime: string;
  leaseEndTime: string;
  tenantTelphone: string;
}

export default function QuickCheckModal(props : QuickCheckModalPropsType) {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = props;
  const [isPhoneFocused,setIsPhoneFocused] = useState(false);
  const [tenantInfo,setTenantInfo] = useState<tenantInfoType | null>(null);
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const [openForceChangeModal, setOpenForceChangeModal] = useState(false);
  const { setReloadHouseList } = useContext(ForcedChangeReload);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormDataType>({
    defaultValues: {
      tenantPhone: "",
      leaseStartTime: "",
      leaseEndTime: ""
    }
  });
  const tenantPhone = watch("tenantPhone");
  const leaseStartTime = watch("leaseStartTime");
  const onSubmit = (data: FormDataType) => {
    const userInfo: UserInfoType = {
      houseId: localStorage.getItem("houseId"),
      leaseStartTime: data.leaseStartTime,
      leaseEndTime: data.leaseEndTime,
      tenantTelphone: data.tenantPhone,
    };
    if (tenantInfo?.userId) {
      userInfo.userId = tenantInfo.userId;
    }
    
    const submitUserInfo = async (userInfo: UserInfoType) => {
      try {
        await apiOrderLandlordAssignTenant(userInfo);
        setOpenModal(false);
        setReloadHouseList(true);
        localStorage.removeItem("houseId");
        navigate("/landlord",{
          state: {
            toastMessage: userInfo.userId ? "租約邀請已送出" : "房源狀態已更改"
          }
        });
      } catch (error: any) {
        if ( error.response.status === 400 ) {
          alert(error.message);
          console.log(error);
        }
      }
    }
    submitUserInfo(userInfo);
  };
  
  // 檢查承租人電話是否為系統用戶
  useEffect(() => {
    const telRegex = /^09\d{8}$/;

    const checkTenantPhone = async (phone: string) => {
      setIsSearchingUser(true);
      try {
        const response = await apiHouseLandlordFindUser(phone);
        setTenantInfo(response.data.data);
      } catch (error: any) {
        if ( error.response.status === 401 ) {
          console.log(error);
        }
      }
      setIsSearchingUser(false);
    }

    if (telRegex.test(tenantPhone)) {
      checkTenantPhone(tenantPhone);
    } else {
      setTenantInfo(null);
    }
  },[tenantPhone]);

  return (
    <div  onClick={(e) => e.stopPropagation()}>
      <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex items-center gap-3 mb-10">
            <h3 className="text-sans-h5">
              立即更改：已出租
            </h3>
            <img
              src={close} alt="close"
              className="ml-auto cursor-pointer"
              onClick={() => {
                localStorage.removeItem("houseId");
                setOpenModal(false)
              }} 
            />
          </div>
          <p className="mb-8 text-sans-body1">請填入承租資訊及合約起迄時間。</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <div
                tabIndex={0}
                className={`relative flex w-full rounded ${
                  errors.tenantPhone ? "border-Alert-50 border"
                  : isPhoneFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              >
                <input
                  type="tel"
                  id="tenantPhone"
                  className="block w-full p-3 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  placeholder=""
                  {...register("tenantPhone", {
                    required: { value: true, message: "請填入承租人手機" }, 
                    pattern: { value: /^09\d{8}$/, message: "請輸入正確手機號碼格式" }
                  })}
                />
                <label
                  htmlFor="tenantPhone"
                  className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  承租人手機
                </label>
              </div>
              {
                errors.tenantPhone?.message && <p className="post-alert">{errors.tenantPhone?.message}</p>
              }
              {isSearchingUser ? (
                <div role="status" className="bg-Landlord-95 rounded-lg p-3 my-3 flex items-center gap-6">
                  <div className="animate-pulse flex items-center justify-center w-16 h-16 bg-gray-300 rounded">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                  </div>
                  <div className="animate-pulse w-3/5">
                    <div className="h-2.5 bg-gray-200 rounded-full w-48 my-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
                ) 
                : tenantInfo ? (
                  <div className="bg-Landlord-95 rounded-lg p-3 my-3 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img src={tenantInfo.photo} alt="" />
                    </div>
                    <h6 className="text-sans-h5">{tenantInfo.name}</h6>
                  </div>
                )
                : null
              }
              {
                tenantInfo === null && tenantPhone.length === 10 && isSearchingUser === false && (
                  <p className="post-alert pl-3">此承租人非租客系統用戶，您們將無法相互評價</p>
                )
              }
            </div>
            <div className="mb-6 flex gap-6 items-center">
              <div className="flex-1 relative">
                <label htmlFor="startTime" className="text-sans-caption px-0.5 bg-white absolute -top-2 left-3">合約起始日</label>
                <input
                  type="date"
                  id="startTime"
                  className={`w-full p-3 rounded focus:ring-0 ${
                    errors.leaseStartTime ? "border-Alert-50 border focus:border-Alert-50"
                    : "border-black focus:border-Brand-30 focus:border-2 focus:-m-px"
                  }`}
                  {...register("leaseStartTime", {
                    required: { value: true, message: "請輸入合約起始日" },
                  })}
                />
                {
                  errors.leaseStartTime?.message ? <p className="post-alert">{errors.leaseStartTime?.message}</p>
                  : errors.leaseEndTime?.message ? <p className="post-alert">{"\u00a0"}</p>
                  : null
                }
              </div>
              至
              <div className="flex-1 relative">
                <label htmlFor="endTime" className="text-sans-caption px-0.5 bg-white absolute -top-2 left-3">合約結束日</label>
                <input
                  type="date"
                  id="endTime"
                  className={`w-full p-3 rounded focus:ring-0 ${
                    errors.leaseEndTime ? "border-Alert-50 border focus:border-Alert-50"
                    : "border-black focus:border-Brand-30 focus:border-2 focus:-m-px"
                  }`}
                  {...register("leaseEndTime", {
                    required: { value: true, message: "請輸入合約結束日" },
                  })}
                  min={leaseStartTime}
                  disabled={!leaseStartTime}
                />
                {
                  errors.leaseEndTime?.message ? <p className="post-alert">{errors.leaseEndTime?.message}</p>
                  : errors.leaseStartTime?.message ? <p className="post-alert">{"\u00a0"}</p>
                  : null
                }
              </div>
            </div>
            {
              tenantInfo && (
                <div className="mb-6 text-sans-body2 flex flex-col gap-2 items-start">
                  <p className="flex gap-2 bg-Alert-90 px-2 py-1 rounded-lg">
                    <img src={alertTriangle} alt="alert_triangle" />
                    請確保此用戶為您的承租客，我們將寄送租約邀請給此用戶
                  </p>
                  <p className="flex gap-2 bg-Brand-95 px-2 py-1 rounded-lg">
                    <img src={messageCloud} alt="message_cloud" />
                    當您填寫承租資訊時，您可以在合約結束後與該租客互相評價
                  </p>
                  <p className="flex gap-2 bg-Landlord-95 px-2 py-1 rounded-lg">
                    <img src={smileWink} alt="smile_wink" />
                    感謝您為友善的租屋環境付出心力，我們將在下次刊登時加強曝光
                  </p>
                </div>
              )
            }
            <div className="mb-10 flex gap-2 text-sans-body1">
              <p>沒有出租資訊嗎？</p>
              <button
                type="button" 
                className="underline underline-offset-2"
                onClick={() => setOpenForceChangeModal(true)}
              >強制更改為已完成</button>
              {/* 點擊強制更改跳出的 Model pop-up */}
              <ForcedChangeModal setOpenQuickCheckModal={setOpenModal} openForceChangeModal={openForceChangeModal} setOpenForceChangeModal={setOpenForceChangeModal} />
            </div>
            <div className="flex justify-end gap-6">
              <button
                type="button" 
                className="outline-button-m"
                onClick={() => {
                  localStorage.removeItem("houseId");
                  setOpenModal(false)
                }}
              >取消</button>
              <button
                type="submit" 
                className="filled-button-m"
              >{
                tenantInfo === null && tenantPhone.length === 10 && isSearchingUser === false ?
                "確認" : "立即更改"
              }</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}