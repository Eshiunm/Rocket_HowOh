import { Tooltip } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";

export default function FinishHouse() {
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

  const navigate = useNavigate();

  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Tenant-80">已完成</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">{houseDatas.formData.name}</h2>
          <div className="flex justify-between items-end">
            <div>
              <h6 className="mb-2 text-sans-body2">變更狀態</h6>
              <Tooltip
                className="bg-Landlord-30 text-sans-body2 rounded-lg py-1 px-11 text-white text-center whitespace-pre-line"
                content={"重新上架功能尚未啟動"}
              >
                <button
                  type="button"
                  className="outline-button-m"
                  disabled
                >重新上架</button>
              </Tooltip>
            </div>
            <div className="flex gap-6">
              <button
                type="button"
                className="outline-button-m"
                onClick={() => navigate("/landlord")}
                >返回房源管理頁面</button>
              <button
                type="button"
                className="filled-button-m h-full"
                onClick={() => navigate("/landlord/history")}
              >前往承租歷史</button>
            </div>
          </div>
        </div>
      </header>
      <main className="container layout-grid">
        <div className="col-span-7 pt-6 pb-32">
          <HouseDatas houseDatas={houseDatas}/>
        </div>
      </main>
      <Footer />
    </>
  );
}