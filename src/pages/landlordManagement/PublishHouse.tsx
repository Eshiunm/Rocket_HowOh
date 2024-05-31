import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";
import { apiHouseLandlordSingleInfo } from "../../apis/apis";

export default function PublishHouse() {
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
      isNearByDepartmentStore: true, 
      isNearBySchool: true, 
      isNearByMorningMarket: true, 
      isNearByNightMarket: true, 
      isNearByConvenientStore: true, 
      isNearByPark: true, 
      hasGarbageDisposal: true, 
      hasWindowInBathroom: true, 
      hasElevator: true, 
      hasAirConditioner: true, 
      hasWashingMachine: true, 
      hasRefrigerator: true, 
      hasCloset: true, 
      hasTableAndChair: true, 
      hasWaterHeater: true, 
      hasInternet: true, 
      hasBed: true, 
      hasTV: true,
    },
    expenses:{
      rent: "10393",
      securityDeposit: "一個月",
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
  console.log(houseId);
  
  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await apiHouseLandlordSingleInfo(houseId);
        const { data } = response.data;
        console.log(data);
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
            isNearByDepartmentStore: true, 
            isNearBySchool: true, 
            isNearByMorningMarket: true, 
            isNearByNightMarket: true, 
            isNearByConvenientStore: true, 
            isNearByPark: true, 
            hasGarbageDisposal: true, 
            hasWindowInBathroom: true, 
            hasElevator: true, 
            hasAirConditioner: true, 
            hasWashingMachine: true, 
            hasRefrigerator: true, 
            hasCloset: true, 
            hasTableAndChair: true, 
            hasWaterHeater: true, 
            hasInternet: true, 
            hasBed: true, 
            hasTV: true,
          },
          expenses:{
            rent: "10393",
            securityDeposit: "一個月",
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
            jobRestriction: "",
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
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Landlord-90">刊登中</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">信義國小套房 捷運3分鐘</h2>
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
    </>
  );
}