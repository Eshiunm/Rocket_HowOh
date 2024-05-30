import { useNavigate } from "react-router-dom";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";

export default function PublishHouse() {
  const navigate = useNavigate();
  const houseDatas = {
    formData:{
      name: "信義國小",
      city: "高雄市",
      district: "新興區",
      road: "五福六路",
      lane: "6",
      alley: "3",
      number: "5",
      floor: "2",
      floorTotal: "5",
      type: "整層住家",
      ping: "20",
      roomNumbers: "5",
      livingRoomNumbers: "",
      bathRoomNumbers: "",
      balconyNumbers: "",
      parkingSpaceNumbers: "",
    },
    photos:[
      {
        "path": "https://res.cloudinary.com/dstruxyyk/image/upload/v1716470077/Howoh%20house%20photos/nnmf64wcit02jhikxhpr.jpg",
        "isCover": true
      },
      {
        "path": "https://res.cloudinary.com/dstruxyyk/image/upload/v1716470077/Howoh%20house%20photos/nnmf64wcit02jhikxhpr.jpg",
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
      genderRestriction: "女",
      jobRestriction: "123c,sdfd",
    },
  };
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
              <button type="button" className="filled-button-m">查看租客預約請求</button>
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