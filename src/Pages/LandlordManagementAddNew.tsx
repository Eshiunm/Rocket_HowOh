import { createContext, useState } from "react";
import AddNewData from "../Components/AddNewData";
import AddNewProcedure from "../Components/AddNewProcedure";

export const ProcedureContext = createContext({});

export default function LandlordManagementAddNew() {
  const procedureList = [
    {
      title: "基本資訊",
      isActive: true,
      isDone: false,
    },
    {
      title: "房源照片",
      isActive: false,
      isDone: false,
    },
    {
      title: "特色",
      isActive: false,
      isDone: false,
    },
    {
      title: "設備",
      isActive: false,
      isDone: false,
    },
    {
      title: "雜支",
      isActive: false,
      isDone: false,
    },
    {
      title: "訂金與租金",
      isActive: false,
      isDone: false,
    },
    {
      title: "房源介紹",
      isActive: false,
      isDone: false,
    },
    {
      title: "租客限制",
      isActive: false,
      isDone: false,
    }
  ];
  const [procedure, setProcedure] = useState(procedureList);

  const handleProcedureClick = (title: string) => {
    const newProcedure = procedure.map((item) => {
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
  }

  const handleProcedureDone = (num: number) => {
    const newProcedure = [...procedure];
    newProcedure[num].isDone = true;
    setProcedure(newProcedure);
  };

  const contextValue = {
    procedure,
    handleProcedureDone,
    handleProcedureClick,
  }

  return (
    <ProcedureContext.Provider value={contextValue}>
    <div className="container mx-auto">
      <div className="flex">
        <AddNewProcedure />
        <AddNewData />
      </div>
    </div>
    </ProcedureContext.Provider>
  );
}