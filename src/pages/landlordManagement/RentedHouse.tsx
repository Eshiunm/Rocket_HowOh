import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Drawer, Flowbite, CustomFlowbiteTheme } from "flowbite-react";
import moment from 'moment-timezone';
import tenantNoPhoto from "../../assets/imgs/landlord-management/tenantNoPhoto.svg";
import star from "../../assets/imgs/icons/star.svg";
import close from "../../assets/imgs/icons/close.svg";
import messageCloud from "../../assets/imgs/icons/messageCloud.svg";
import HouseDatas from "../../components/landLordManagement/HouseDatas";
import { apiHouseLandlordSingleInfo } from "../../apis/apis";
import CreateContract from "../../components/landLordManagement/offcanvases/CreateContract";

type TenantDataType = {
  orderId: number;
  leaseStartTime: string;
  leaseEndTime: string;
  name: string | null;
  gender: string | null; 
  job: string | null; 
  tel: string;
  photo: string | null;
  description: string | null;
  ratingCount: number | null;
  ratingAvg: number | null;
}

type PhotosDataType = {
  path: string;
  isCover: boolean;
}

type HouseDataType = {
  formData:{
    name: string;
    city: string;
    district: string;
    road: string;
    lane: string;
    alley: string;
    number: string;
    floor: string;
    floorTotal: string;
    type: string;
    ping: string;
    roomNumbers: string;
    livingRoomNumbers: string;
    bathRoomNumbers: string;
    balconyNumbers: string;
    parkingSpaceNumbers: string;
  },
  photos: PhotosDataType[],
  facilities:{
    isRentSubsidy: boolean;
    isCookAllowed: boolean;
    isPetAllowed: boolean;
    isSTRAllowed: boolean;
    isNearByDepartmentStore: boolean;
    isNearBySchool: boolean;
    isNearByMorningMarket: boolean;
    isNearByNightMarket: boolean;
    isNearByConvenientStore: boolean;
    isNearByPark: boolean;
    hasGarbageDisposal: boolean;
    hasWindowInBathroom: boolean;
    hasElevator: boolean;
    hasAirConditioner: boolean;
    hasWashingMachine: boolean;
    hasRefrigerator: boolean;
    hasCloset: boolean;
    hasTableAndChair: boolean;
    hasWaterHeater: boolean;
    hasInternet: boolean;
    hasBed: boolean;
    hasTV: boolean;
    isNearMRT: boolean;
    kmAwayMRT: string; 
    isNearLRT: boolean; 
    kmAwayLRT: string; 
    isNearBusStation: boolean; 
    kmAwayBusStation: string; 
    isNearHSR: boolean; 
    kmAwayHSR: string; 
    isNearTrainStation: boolean; 
    kmAwayTrainStation: string;
  },
  expenses:{
    rent: string;
    securityDeposit: string;
    paymentMethodOfWaterBill: string;
    waterBillPerMonth: string;
    electricBill: string;
    electricBillPerDegree: string;
    paymentMethodOfElectricBill: string;
    paymentMethodOfManagementFee: string;
    managementFeePerMonth: string;
  },
  description: string;
  restrictions:{
    hasTenantRestrictions: string;
    genderRestriction: string;
    jobRestriction: string;
  },
}

export default function RentedHouse() {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "bg-white fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
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
  const location =  useLocation();
  const [isHouseDetailOpen, setIsHouseDetailOpen] = useState(false);
  const handleHouseDetailClose = () => setIsHouseDetailOpen(false);

  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false);
  const handleCreateContractClose = () => setIsCreateContractOpen(false);

  const [houseData, setHouseData] = useState<HouseDataType | null>(null);
  const [tenantData, setTenantData] = useState<TenantDataType | null>(null);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await apiHouseLandlordSingleInfo(houseId);
        const { houseInfo, tenantInfo } = response.data.data;

        const coverPhoto = {
          path: houseInfo.pictures?.firstPic || "",
          isCover: true
        };
        const otherPhoto = houseInfo.pictures.restOfPic.map( (photoPath: string) => (
          {
            path: photoPath,
            isCover: false
          }
        ));
        const photos = [
          coverPhoto,
          ...otherPhoto
        ];
        setHouseData({
          formData:{
            name: houseInfo.name,
            city: houseInfo.city,
            district: houseInfo.district,
            road: houseInfo.road,
            lane: houseInfo.lane,
            alley: houseInfo.alley,
            number: houseInfo.number,
            floor: houseInfo.floor,
            floorTotal: houseInfo.floorTotal,
            type: houseInfo.type,
            ping: houseInfo.ping,
            roomNumbers: houseInfo.roomNumbers,
            livingRoomNumbers: houseInfo.livingRoomNumbers,
            bathRoomNumbers: houseInfo.bathRoomNumbers,
            balconyNumbers: houseInfo.balconyNumbers,
            parkingSpaceNumbers: houseInfo.parkingSpaceNumbers,
          },
          photos,
          facilities:{
            isRentSubsidy: houseInfo.isRentSubsidy,
            isCookAllowed: houseInfo.isCookAllowed,
            isPetAllowed: houseInfo.isPetAllowed,
            isSTRAllowed: houseInfo.isSTRAllowed,
            isNearByDepartmentStore: houseInfo.isNearByDepartmentStore,
            isNearBySchool: houseInfo.isNearBySchool, 
            isNearByMorningMarket: houseInfo.isNearByMorningMarket, 
            isNearByNightMarket: houseInfo.isNearByNightMarket, 
            isNearByConvenientStore: houseInfo.isNearByConvenientStore, 
            isNearByPark: houseInfo.isNearByPark, 
            hasGarbageDisposal: houseInfo.hasGarbageDisposal, 
            hasWindowInBathroom: houseInfo.hasWindowInBathroom, 
            hasElevator: houseInfo.hasElevator, 
            hasAirConditioner: houseInfo.hasAirConditioner, 
            hasWashingMachine: houseInfo.hasWashingMachine, 
            hasRefrigerator: houseInfo.hasRefrigerator, 
            hasCloset: houseInfo.hasCloset, 
            hasTableAndChair: houseInfo.hasTableAndChair, 
            hasWaterHeater: houseInfo.hasWaterHeater, 
            hasInternet: houseInfo.hasInternet, 
            hasBed: houseInfo.hasBed, 
            hasTV: houseInfo.hasTV, 
            isNearMRT: houseInfo.isNearMRT, 
            kmAwayMRT: houseInfo.kmAwayMRT, 
            isNearLRT: houseInfo.isNearLRT, 
            kmAwayLRT: houseInfo.kmAwayLRT, 
            isNearBusStation: houseInfo.isNearBusStation, 
            kmAwayBusStation: houseInfo.kmAwayBusStation, 
            isNearHSR: houseInfo.isNearHSR, 
            kmAwayHSR: houseInfo.kmAwayHSR, 
            isNearTrainStation: houseInfo.isNearTrainStation, 
            kmAwayTrainStation: houseInfo.kmAwayTrainStation,
          },
          expenses:{
            rent: houseInfo.rent,
            securityDeposit: houseInfo.securityDeposit,
            paymentMethodOfWaterBill: houseInfo.paymentMethodOfWaterBill,
            waterBillPerMonth: houseInfo.waterBillPerMonth,
            electricBill: houseInfo.electricBill,
            electricBillPerDegree: houseInfo.electricBillPerDegree,
            paymentMethodOfElectricBill: houseInfo.paymentMethodOfElectricBill,
            paymentMethodOfManagementFee: houseInfo.paymentMethodOfManagementFee,
            managementFeePerMonth: houseInfo.managementFeePerMonth,
          },
          description: houseInfo.description,
          restrictions:{
            hasTenantRestrictions: houseInfo.hasTenantRestrictions,
            genderRestriction: houseInfo.genderRestriction,
            jobRestriction: houseInfo.jobRestriction,
          },
        });
        setTenantData(tenantInfo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHouseData();
  },[houseId]);

  useEffect(() => {
    if(location.state && location.state.openOffcanvas) {
      setIsCreateContractOpen(true);
    }
  },[location])

  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Landlord-90">已出租</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">{houseData?.formData.name}</h2>
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
          <h3 className="text-sans-h5 mb-6">出租資訊</h3>
          <h4 className="text-sans-b-h6 mb-6">租約起迄時間</h4>
          <div className="flex gap-6">
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約開始</h6>
              <time
                dateTime={moment(tenantData?.leaseStartTime).tz('Asia/Taipei').format('YYYY-MM-DD')}
                className="block p-3">
                  {moment(tenantData?.leaseStartTime).tz('Asia/Taipei').format('YYYY年MM月DD日')}
              </time>
            </div>
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約結束</h6>
              <time
                dateTime={moment(tenantData?.leaseEndTime).tz('Asia/Taipei').format('YYYY-MM-DD')}
                className="block p-3">
                  {moment(tenantData?.leaseEndTime).tz('Asia/Taipei').format('YYYY年MM月DD日')}
              </time>
            </div>
          </div>
        </section>
        <section className="col-span-7 rounded-lg bg-Landlord-99 p-5 mb-6">
          <h3 className="text-sans-h5 mb-6">租客</h3>
          {
            tenantData?.name ? (
              <div className="w-7/12 p-6 rounded-2xl bg-white">
                <div className="flex justify-between mb-3.5">
                  <div>
                    <span className="material-symbols-outlined text-Tenant-50 mb-6">face</span>
                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">租客</h4>
                    <h3 className="text-sans-b-h4 mb-3">{tenantData?.name || "您的租客"}</h3>
                    <div className="text-sans-body1 flex mb-2">
                      <h4 className="pr-2 mr-2 border-r border-Tenant-70">{tenantData?.gender || "租客性別"}</h4>
                      <h4>{tenantData?.job || "租客職業"}</h4>
                    </div>
                    <a
                      href={`+886-${tenantData?.tel.replace(/^0/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`}
                      className="text-sans-body1">
                      {tenantData?.tel.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
                    </a>
                  </div>
                  <div className="w-[186px] rounded-lg overflow-hidden">
                    <img src={tenantData?.photo || tenantNoPhoto} alt="tenant" className="w-full aspect-square block object-cover" />
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                    <h5 className="w-full text-Tenant-50 text-sans-b-body1">評價</h5>
                    <h4 className="text-sans-h4">{tenantData?.ratingAvg || 0}</h4>
                    <img src={star} alt="star" className="self-end" />
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                    <h5 className="w-full text-Tenant-50 text-sans-b-body1">則數</h5>
                    <h4 className="text-sans-h4">{tenantData?.ratingCount || 0}</h4>
                    <h6 className="self-end">則</h6>
                  </div>
                </div>
                <div>
                  <h4 className="text-Landlord-40 text-sans-b-body1 mb-3">自我介紹</h4>
                  <p className="text-sans-body1">{tenantData?.description || "租客的自我介紹"}</p>
                </div>
              </div>
            ) : (
              <div className="w-7/12 p-6 rounded-2xl bg-white">
                <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">租客</h4>
                <div className="text-sans-body1 flex mb-2">
                  <h4 className="pr-2 mr-2 border-r border-Tenant-70">租客電話</h4>
                  <a
                    href={`+886-${tenantData?.tel.replace(/^0/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`}
                    className="text-sans-body1">
                    {tenantData?.tel.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
                  </a>
                </div>
                <p className="flex gap-2 bg-Brand-95 px-2 py-1 rounded-lg">
                  <img src={messageCloud} alt="message_cloud" />
                  此承租人非系統用戶，您們將無法相互評價
                </p>
              </div>
            )
          }
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
              {
                houseData && <HouseDatas houseDatas={houseData}/>
              }
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      <Drawer className="w-5/12 bg-white" open={isCreateContractOpen} onClose={handleCreateContractClose} position="right">
        <Drawer.Items>
          <CreateContract handleCreateContractClose={handleCreateContractClose} orderId={tenantData?.orderId}/>
        </Drawer.Items>
      </Drawer>
      </Flowbite>
    </>
  );
}