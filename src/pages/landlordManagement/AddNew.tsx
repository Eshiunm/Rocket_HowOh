import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Post from "../../components/landLordManagement/posts/Post";
import AddNewData from "../../components/landLordManagement/posts/AddNewData";
import AddNewProcedure from "../../components/landLordManagement/posts/AddNewProcedure";
import { procedureList } from "../../constants/procedureList";
import { procedureListType } from "../../types/procedureList";
import { setFormData } from "../../../redux/post/basicInformationSlice";


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
      const { data, page: nextPage} = location.state;
      console.log(location.state);
      const step1Data = {
        // 基本資訊欄位預設值
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
  },[location.state, procedure, isInitialLoad]);

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
