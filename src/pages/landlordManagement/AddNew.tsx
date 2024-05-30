import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Post from "../../components/landLordManagement/posts/Post";
import AddNewData from "../../components/landLordManagement/posts/AddNewData";
import AddNewProcedure from "../../components/landLordManagement/posts/AddNewProcedure";
import { procedureList } from "../../constants/procedureList";
import { procedureListType } from "../../types/procedureList";
import { setFormData } from "../../../redux/post/basicInformationSlice";
import { setPhotos } from "../../../redux/post/photosSlice";
import { setFacilities } from "../../../redux/post/facilitiesSlice";
import { setExpenses } from "../../../redux/post/expensesSlice";

// 定義 ProcedureContext 的型別
interface contextValueType {
  procedure: procedureListType[];
  handleProcedureDone: (num: number) => void;
  handleProcedureClick: (title: string) => void;
}

export const ProcedureContext = createContext<contextValueType>(
  {} as contextValueType
);

export default function AddNew() {
  // 狀態控制刊登房源步驟目前狀況
  const location = useLocation();
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 新增初始加載狀態
  const [procedure, setProcedure] = useState<procedureListType[]>(procedureList as procedureListType[]);

  // 狀態控制刊登房源步驟目前所在位置
  const handleProcedureClick = (title: string) => {
    const newProcedure = procedure.map(item => {
      if (item.title === title) {
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });
    setProcedure(newProcedure);
  };

  // 狀態控制刊登房源已完成步驟
  const handleProcedureDone = (num: number) => {
    const newProcedure = [...procedure];
    newProcedure[num].isDone = true;
    setProcedure(newProcedure);
  };

  const contextValue = {
    procedure,
    handleProcedureDone,
    handleProcedureClick,
  };

  useEffect(() => {
    // 狀態控制刊登房源步驟目前所在位置
    if (isInitialLoad && location.state && location.state.page) {
      localStorage.setItem("houseId", location.state.houseId);
      const { data, page: nextPage } = location.state;
      console.log(location.state);
      // 基本資料復原至 redux
      const step1Data = {  
        name: data.name || "",
        city: data.city || "高雄市",
        district: data.district || "新興區",
        road: data.road || "",
        lane: data.lane || "",
        alley: data.alley || "",
        number: data.number || "",
        floor: data.floor || "",
        floorTotal: data.floorTotal || "",
        type: data.type || "整層住家",
        ping: data.ping || "",
        roomNumbers: data.roomNumbers || "",
        livingRoomNumbers: data.livingRoomNumbers || "",
        bathRoomNumbers: data.bathRoomNumbers || "",
        balconyNumbers: data.balconyNumbers || "",
        parkingSpaceNumbers: data.parkingSpaceNumbers || "",
      };
      dispatch(setFormData(step1Data));
      // 照片復原至 redux
      if ( nextPage !== "照片") {
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
        const step2Data = [
          coverPhoto,
          ...otherPhoto
        ];
        dispatch(setPhotos(step2Data));
      }
      // 設備設施復原至 redux
      const step3Data = {
        isRentSubsidy: data.isRentSubsidy || false,
        isPetAllowed: data.isPetAllowed || false,
        isCookAllowed: data.isCookAllowed || false,
        isSTRAllowed: data.isSTRAllowed || false,
        isNearByDepartmentStore: data.isNearByDepartmentStore || false,
        isNearBySchool: data.isNearBySchool || false,
        isNearByMorningMarket: data.isNearByMorningMarket || false,
        isNearByNightMarket: data.isNearByNightMarket || false,
        isNearByConvenientStore: data.isNearByConvenientStore || false,
        isNearByPark: data.isNearByPark || false,
        hasGarbageDisposal: data.hasGarbageDisposal || false,
        hasWindowInBathroom: data.hasWindowInBathroom || false,
        hasElevator: data.hasElevator || false,
        hasAirConditioner: data.hasAirConditioner || false,
        hasWashingMachine: data.hasWashingMachine || false,
        hasRefrigerator: data.hasRefrigerator || false,
        hasCloset: data.hasCloset || false,
        hasTableAndChair: data.hasTableAndChair || false,
        hasWaterHeater: data.hasWaterHeater || false,
        hasInternet: data.hasInternet || false,
        hasBed: data.hasBed || false,
        hasTV: data.hasTV || false,
        isNearMRT: data.isNearMRT || false,
        kmAwayMRT: data.kmAwayMRT || "",
        isNearLRT: data.isNearLRT || false,
        kmAwayLRT: data.kmAwayLRT || "",
        isNearBusStation: data.isNearBusStation || false,
        kmAwayBusStation: data.kmAwayBusStation || "",
        isNearHSR: data.isNearHSR || false,
        kmAwayHSR: data.kmAwayHSR || "",
        isNearTrainStation: data.isNearTrainStation || false,
        kmAwayTrainStation: data.kmAwayTrainStation || "",
      }
      dispatch(setFacilities(step3Data));
      // 費用復原至 redux
      const step4Data = {
        rent: data.rent || "",
        securityDeposit: data.securityDeposit || "兩個月",
        paymentMethodOfWaterBill: data.paymentMethodOfWaterBill || "包含於房租",
        waterBillPerMonth: data.waterBillPerMonth || "",
        electricBill: data.electricBill || "依台電計價",
        electricBillPerDegree: data.electricBillPerDegree || "",
        paymentMethodOfElectricBill: data.paymentMethodOfElectricBill || "自行繳納",
        paymentMethodOfManagementFee: data.paymentMethodOfManagementFee || "無管理費",
        managementFeePerMonth: data.managementFeePerMonth || "",
      }
      dispatch(setExpenses(step4Data));
      let continuePageIndex = 7;
      const newProcedure = procedure.map((item, pageIndex) => {
        if(item.title === nextPage) {
          continuePageIndex = pageIndex;
          return {
            title: nextPage,
            isActive: true,
            isDone: false
          }
        } else {
          return {
            ...item,
            isActive: false,
            isDone: pageIndex < continuePageIndex
          }
        }
      });
      setProcedure(newProcedure);
      setIsInitialLoad(false); // 更新初始加載狀態
    }
  },[location.state, procedure, isInitialLoad, dispatch]);

  return (
    <ProcedureContext.Provider value={contextValue}>
      <section className="bg-Landlord-99">
        {/* 刊登房源頁面表頭區域 */}
        <div className="container layout-grid py-6">
          <Post procedure={procedure} />
          <AddNewProcedure />
        </div>
      </section>
      <main className="bg-Neutral-99 pt-7 pb-32">
        {/* 刊登房源頁面填寫資料區域 */}
        <div className="container layout-grid">
          <AddNewData />
        </div>
      </main>
    </ProcedureContext.Provider>
  );
}
