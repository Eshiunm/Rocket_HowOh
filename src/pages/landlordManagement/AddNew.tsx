import { createContext, useState } from "react";
import Post from "../../components/landLordManagement/posts/Post";
import AddNewData from "../../components/landLordManagement/posts/AddNewData";
import AddNewProcedure from "../../components/landLordManagement/posts/AddNewProcedure";
import { procedureList } from "../../constants/procedureList";
import { procedureListType } from "../../types/procedureList";

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
