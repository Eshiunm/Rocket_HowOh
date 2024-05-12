import { createContext, useState } from "react";
import Post from "../../components/landLordManagement/posts/Post";
import AddNewData from "../../components/landLordManagement/AddNewData";
import AddNewProcedure from "../../components/landLordManagement/AddNewProcedure";
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

export default function LandlordManagementAddNew() {
  const [procedure, setProcedure] = useState(procedureList);

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
      <Post />
      <AddNewProcedure />
      <AddNewData />
    </ProcedureContext.Provider>
  );
}
