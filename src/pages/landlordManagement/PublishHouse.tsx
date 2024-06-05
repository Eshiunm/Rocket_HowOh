import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CustomFlowbiteTheme, Flowbite, Tooltip, Drawer } from "flowbite-react";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";
import { apiHouseLandlordFindUser, apiHouseLandlordSingleInfo } from "../../apis/apis";
import close from "../../assets/imgs/icons/close.svg";
import alertTriangle from "../../assets/imgs/icons/alertTriangle.svg";
import messageCloud from "../../assets/imgs/icons/messageCloud.svg";
import smileWink from "../../assets/imgs/icons/smileWink.svg";
import ForcedChangeModal from "../../components/landLordManagement/modals/ForcedChangeModal";

interface tenantInfoType {
  photo: string;
  name: string;
  userId: number;
}

export default function PublishHouse() {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
        "backdrop": "fixed inset-0 z-30 bg-transparent",
        "edge": "bottom-16",
        "position": {
          "right": {
            "on": "shadow-elevation-3 right-0 top-[64px] bottom-0 w-5/12 transform-none scrollbar-hide",
            "off": "right-0 top-[152px] h-screen w-5/12 translate-x-full"
          },
        }
      },
      "header": {
        "inner": {
          "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          "closeIcon": "h-4 w-4",
          "titleIcon": "me-2.5 h-4 w-4",
          "titleText": "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        },
        "collapsed": {
          "on": "hidden",
          "off": "block"
        }
      },
      "items": {
        "base": ""
      }
    }
  };

  const [isRentedOpen, setIsRentedOpen] = useState(false);
  const handleRentedCanvas = (bool: boolean) => setIsRentedOpen(bool);
  const [isPhoneFocused,setIsPhoneFocused] = useState(false);
  const [tenantInfo,setTenantInfo] = useState<tenantInfoType | null>(null);// 是否正在打 API
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const [openForceChangeModal, setOpenForceChangeModal] = useState(false);

  const navigate = useNavigate();
  const { houseId } = useParams();
  const [houseDatas, setHouseDatas] = useState({
    appointmentCount: 0,
    formData:{
      name: "房源名稱",
      city: "縣市",
      district: "區域",
      road: "路街",
      lane: "巷",
      alley: "弄",
      number: "號",
      floor: "樓層",
      floorTotal: "總樓層",
      type: "房源類別",
      ping: "可使用坪數",
      roomNumbers: "房",
      livingRoomNumbers: "廳",
      bathRoomNumbers: "衛浴",
      balconyNumbers: "陽台",
      parkingSpaceNumbers: "車位",
    },
    photos:[
      {
        "path": "https://res.cloudinary.com/dstruxyyk/image/upload/v1716560016/Howoh%20house%20photos/n0ficydjjhpyl50jcr9t.jpg",
        "isCover": true
      },
      {
        "path": "https://res.cloudinary.com/dstruxyyk/image/upload/v1716560016/Howoh%20house%20photos/nox5cqpr4kkzwlyjgjn1.jpg",
        "isCover": false
      },
    ],
    facilities:{
      isRentSubsidy: false,
      isCookAllowed: false,
      isPetAllowed: false,
      isSTRAllowed: false,
      isNearByDepartmentStore: false,
      isNearBySchool: false, 
      isNearByMorningMarket: false, 
      isNearByNightMarket: false, 
      isNearByConvenientStore: false, 
      isNearByPark: false, 
      hasGarbageDisposal: false, 
      hasWindowInBathroom: false, 
      hasElevator: false, 
      hasAirConditioner: false, 
      hasWashingMachine: false, 
      hasRefrigerator: false, 
      hasCloset: false, 
      hasTableAndChair: false, 
      hasWaterHeater: false, 
      hasInternet: false, 
      hasBed: false, 
      hasTV: false, 
      isNearMRT: false, 
      kmAwayMRT: "", 
      isNearLRT: false, 
      kmAwayLRT: "", 
      isNearBusStation: false, 
      kmAwayBusStation: "", 
      isNearHSR: false, 
      kmAwayHSR: "", 
      isNearTrainStation: false, 
      kmAwayTrainStation: "",
    },
    expenses:{
      rent: "1000",
      securityDeposit: "兩個月",
      paymentMethodOfWaterBill: "包含於房租",
      waterBillPerMonth: "string",
      electricBill: "自訂",
      electricBillPerDegree: "5",
      paymentMethodOfElectricBill: "string",
      paymentMethodOfManagementFee: "隨房租繳納",
      managementFeePerMonth: "1000",
    },
    description: "2132132edccf",
    restrictions:{
      hasTenantRestrictions: "true",
      genderRestriction: "排除女性",
      jobRestriction: "123c,sdfd",
    },
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      tenantPhone: "",
      leaseStartTime: "",
      leaseEndTime: ""
    }
  });
  const tenantPhone = watch("tenantPhone");
  const leaseStartTime = watch("leaseStartTime");
  const onSubmit = (data: any) => console.log(data);
  
  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await apiHouseLandlordSingleInfo(houseId);
        const { data } = response.data;
        
        const coverPhoto = {
          path: data.pictures?.firstPic || "",
          isCover: true
        };
        const otherPhoto = data.pictures.restOfPic.map( (photoPath: string) => (
          {
            path: photoPath,
            isCover: false
          }
        ));
        const photos = [
          coverPhoto,
          ...otherPhoto
        ];
        setHouseDatas({
          appointmentCount:data.appointmentCount,
          formData:{
            name: data.name,
            city: data.city,
            district: data.district,
            road: data.road,
            lane: data.lane,
            alley: data.alley,
            number: data.number,
            floor: data.floor,
            floorTotal: data.floorTotal,
            type: data.type,
            ping: data.ping,
            roomNumbers: data.roomNumbers,
            livingRoomNumbers: data.livingRoomNumbers,
            bathRoomNumbers: data.bathRoomNumbers,
            balconyNumbers: data.balconyNumbers,
            parkingSpaceNumbers: data.parkingSpaceNumbers,
          },
          photos,
          facilities:{
            isRentSubsidy: data.isRentSubsidy,
            isCookAllowed: data.isCookAllowed,
            isPetAllowed: data.isPetAllowed,
            isSTRAllowed: data.isSTRAllowed,
            isNearByDepartmentStore: data.isNearByDepartmentStore,
            isNearBySchool: data.isNearBySchool, 
            isNearByMorningMarket: data.isNearByMorningMarket, 
            isNearByNightMarket: data.isNearByNightMarket, 
            isNearByConvenientStore: data.isNearByConvenientStore, 
            isNearByPark: data.isNearByPark, 
            hasGarbageDisposal: data.hasGarbageDisposal, 
            hasWindowInBathroom: data.hasWindowInBathroom, 
            hasElevator: data.hasElevator, 
            hasAirConditioner: data.hasAirConditioner, 
            hasWashingMachine: data.hasWashingMachine, 
            hasRefrigerator: data.hasRefrigerator, 
            hasCloset: data.hasCloset, 
            hasTableAndChair: data.hasTableAndChair, 
            hasWaterHeater: data.hasWaterHeater, 
            hasInternet: data.hasInternet, 
            hasBed: data.hasBed, 
            hasTV: data.hasTV, 
            isNearMRT: data.isNearMRT, 
            kmAwayMRT: data.kmAwayMRT, 
            isNearLRT: data.isNearLRT, 
            kmAwayLRT: data.kmAwayLRT, 
            isNearBusStation: data.isNearBusStation, 
            kmAwayBusStation: data.kmAwayBusStation, 
            isNearHSR: data.isNearHSR, 
            kmAwayHSR: data.kmAwayHSR, 
            isNearTrainStation: data.isNearTrainStation, 
            kmAwayTrainStation: data.kmAwayTrainStation,
          },
          expenses:{
            rent: data.rent,
            securityDeposit: data.securityDeposit,
            paymentMethodOfWaterBill: data.paymentMethodOfWaterBill,
            waterBillPerMonth: data.waterBillPerMonth,
            electricBill: data.electricBill,
            electricBillPerDegree: data.electricBillPerDegree,
            paymentMethodOfElectricBill: data.paymentMethodOfElectricBill,
            paymentMethodOfManagementFee: data.paymentMethodOfManagementFee,
            managementFeePerMonth: data.managementFeePerMonth,
          },
          description: data.description,
          restrictions:{
            hasTenantRestrictions: data.hasTenantRestrictions,
            genderRestriction: data.genderRestriction,
            jobRestriction: data.jobRestriction,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchHouseData();
  },[houseId]);

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
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Alert-90">刊登中</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">{houseDatas.formData.name}</h2>
          <div className="flex justify-between items-end">
            <div>
              <h6 className="mb-2 text-sans-body2">變更狀態</h6>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="outline-button-m"
                  onClick={() => handleRentedCanvas(true)}
                >更改為已承租</button>
                <button
                  type="button"
                  className="outline-button-m"
                  onClick={() => setOpenForceChangeModal(true)}
                >更改為已完成</button>
              </div>
            </div>
            <div className="flex gap-6">
              <button
                type="button"
                className="outline-button-m"
                onClick={() => {
                  localStorage.removeItem("houseId");
                  navigate("/landlord")
                }}
              >返回房源管理頁面</button>
              <button type="button" className="outline-button-m">查看合約</button>
              <Tooltip
                className={`bg-Landlord-30 text-sans-body2 rounded-lg py-1 px-11 text-white text-center whitespace-pre-line ${
                  houseDatas.appointmentCount > 0 && "hidden"
                }`}
                content={"目前尚無預約租客"}
              >
                <button
                  type="button"
                  className="filled-button-m h-full"
                  onClick={() => navigate(`/landlord/publish/${houseId}/request`)}
                  disabled={houseDatas.appointmentCount === 0}
                >查看租客預約請求</button>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
      <ForcedChangeModal setOpenQuickCheckModal={null} openForceChangeModal={openForceChangeModal} setOpenForceChangeModal={setOpenForceChangeModal} />
      <main className="container layout-grid">
        <div className="col-span-7 pt-6 pb-52">
          <HouseDatas houseDatas={houseDatas}/>
        </div>
      </main>
      <Footer />
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer className="bg-Neutral-99" open={isRentedOpen} onClose={() => handleRentedCanvas(false)} position="right">
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-10 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => handleRentedCanvas(false)}
                >
                  <img src={close} alt="close" />
                </button>
                <h3 className="text-sans-h5 mb-4">
                  更改：已承租
                </h3>
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
                        className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-Neutral-99 px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
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
                            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
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
                      <label htmlFor="startTime" className="text-sans-caption px-0.5 bg-Neutral-99 absolute -top-2 left-3">合約起始日</label>
                      <input
                        type="date"
                        id="startTime"
                        className={`w-full bg-Neutral-99 p-3 rounded focus:ring-0 ${
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
                      <label htmlFor="endTime" className="text-sans-caption px-0.5 bg-Neutral-99 absolute -top-2 left-3">合約結束日</label>
                      <input
                        type="date"
                        id="endTime"
                        className={`w-full bg-Neutral-99 p-3 rounded focus:ring-0 ${
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
                    <p>沒有承租資訊嗎？</p>
                    <button
                      type="button" 
                      className="underline underline-offset-2"
                      onClick={() => setOpenForceChangeModal(true)}
                    >強制更改為已完成</button>
                    {/* 點擊強制更改跳出的 Model pop-up */}
                    <ForcedChangeModal setOpenQuickCheckModal={null} openForceChangeModal={openForceChangeModal} setOpenForceChangeModal={setOpenForceChangeModal} />
                  </div>
                  <div className="flex justify-end gap-6">
                    <button
                      type="button" 
                      className="outline-button-m"
                      onClick={() => handleRentedCanvas(false)}
                    >取消</button>
                    <button
                      type="submit" 
                      className="filled-button-m"
                    >立即更改</button>
                  </div>
                </form>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
    </>
  );
}