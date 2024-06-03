import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Flowbite, CustomFlowbiteTheme } from "flowbite-react";
import photo from "../../assets/imgs/homePage/recommendation_picture_1.svg"
import star from "../../assets/imgs/icons/star.svg";
import close from "../../assets/imgs/icons/close.svg";
import HouseDatas from "../../components/landLordManagement/HouseDatas";

export default function RentedHouse() {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "bg-Landlord-95 fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
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

  const navigate = useNavigate();
  const [isHouseDetailOpen, setIsHouseDetailOpen] = useState(false);
  const handleHouseDetailClose = () => setIsHouseDetailOpen(false);
  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false);
  const handleCreateContractClose = () => setIsCreateContractOpen(false);

  const [houseDatas, ] = useState({
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

  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Landlord-90">已承租</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">房源名稱</h2>
          <div className="flex gap-6 pt-7">
            <button
              type="button"
              className="outline-button-m"
              onClick={() => setIsHouseDetailOpen(true)}
            >查看房源資訊</button>
            <button
              type="button"
              className="outline-button-m ml-auto"
              onClick={() => navigate("/landlord")}
            >返回房源管理頁面</button>
            <button
              type="button"
              className="filled-button-m h-full"
              onClick={() => setIsCreateContractOpen(true)}
            >建立合約</button>
          </div>
        </div>
      </header>
      <main className="container layout-grid pt-6 pb-52">
        <section className="col-span-7 rounded-lg bg-Landlord-99 p-5 mb-6">
          <h3 className="text-sans-h5 mb-6">承租資訊</h3>
          <h4 className="text-sans-b-h6 mb-6">租約起迄時間</h4>
          <div className="flex gap-6">
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約開始</h6>
              <time dateTime="2022-01-01" className="block p-3">2024年4月23日</time>
            </div>
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約結束</h6>
              <time dateTime="2022-01-01" className="block p-3">2025年4月23日</time>
            </div>
          </div>
        </section>
        <section className="col-span-7 rounded-lg bg-Landlord-99 p-5 mb-6">
          <h3 className="text-sans-h5 mb-6">租客</h3>
          <div className="w-7/12 p-6 rounded-2xl bg-white">
            <div className="flex justify-between mb-3.5">
              <div>
                <span className="material-symbols-outlined text-Tenant-50 mb-6">face</span>
                <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">租客</h4>
                <h3 className="text-sans-b-h4 mb-3">詹小美</h3>
                <div className="text-sans-body1 flex mb-2">
                  <h4 className="pr-2 mr-2 border-r border-Tenant-70">女</h4>
                  <h4>文教類</h4>
                </div>
                <a href="tel:+886-958-230-1239" className="text-sans-body1">0958-230-1239</a>
              </div>
              <div className="w-[186px] rounded-lg overflow-hidden">
                <img src={photo} alt="tenant" className="w-full aspect-square block object-cover" />
              </div>
            </div>
            <div className="flex gap-3 mb-6">
              <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                <h5 className="w-full text-Tenant-50 text-sans-b-body1">評價</h5>
                <h4 className="text-sans-h4">4.8</h4>
                <img src={star} alt="star" className="self-end" />
              </div>
              <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                <h5 className="w-full text-Tenant-50 text-sans-b-body1">則數</h5>
                <h4 className="text-sans-h4">3</h4>
                <h6 className="self-end">則</h6>
              </div>
            </div>
            <div>
              <h4 className="text-Landlord-40 text-sans-b-body1 mb-3">自我介紹</h4>
              <p className="text-sans-body1">我是來自台中的補習班老師。最近決定轉職成為前端工程師，於是報名參加了高雄六角的培訓營！我希望能在開課前找到便宜、便利，而且能申請租屋補助的房源，同時也希望能遇到一位優質的房東。</p>
            </div>
          </div>
        </section>
      </main>
      <Flowbite theme={{ theme: customTheme }}>
      <Drawer className="w-7/12" open={isHouseDetailOpen} onClose={handleHouseDetailClose} position="right">
        <Drawer.Items>
          <div className="layout-grid gap-4 mb-32">
            <div className="col-span-12 flex flex-col gap-6">
              <button
                type="button"
                className="self-end"
                onClick={handleHouseDetailClose}
              >
                <img src={close} alt="close" />
              </button>
              <HouseDatas houseDatas={houseDatas}/>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      <Drawer className="w-5/12" open={isCreateContractOpen} onClose={handleCreateContractClose} position="right">
        <Drawer.Items>
          <div className="layout-grid gap-4 mb-32">
            <div className="col-span-12 flex flex-col gap-6">
              <button
                type="button"
                className="self-end"
                onClick={handleCreateContractClose}
              >
                <img src={close} alt="close" />
              </button>
              {/* <HouseDatas houseDatas={houseDatas}/> */}
              <p>建立合約 offcanvas</p>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      </Flowbite>
    </>
  );
}