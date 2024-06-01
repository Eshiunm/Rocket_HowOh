import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";
import { apiHouseLandlordSingleInfo } from "../../apis/apis";

export default function PublishHouse() {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "fixed z-40 overflow-y-auto bg-Landlord-95 px-10 pt-10 transition-transform",
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

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Alert-90">刊登中</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">{houseDatas.formData.name}</h2>
          <div className="flex justify-between items-end">
            <div>
              <h6 className="mb-2 text-sans-body2">變更狀態</h6>
              <div className="flex gap-3">
                <button type="button" className="outline-button-m">更改為已承租</button>
                <button type="button" className="outline-button-m">更改為已完成</button>
              </div>
            </div>
            <div className="flex gap-6">
              <button
                type="button"
                className="outline-button-m"
                onClick={() => navigate("/landlord")}
              >返回房源管理頁面</button>
              <button type="button" className="outline-button-m">查看合約</button>
              <button
                type="button"
                className="filled-button-m"
                onClick={() => navigate(`/landlord/publish/${houseId}/request`)}
                disabled={houseDatas.appointmentCount === 0}
              >查看租客預約請求</button>
            </div>
          </div>
        </div>
      </header>
      <main className="container layout-grid">
        <div className="col-span-7 pt-6 pb-52">
          <HouseDatas houseDatas={houseDatas}/>
        </div>
      </main>
      <Footer />
      </Flowbite>
    </>
  );
}