import { useState } from "react";
import AddNewData from "../Components/AddNewData";
import AddNewProcedure from "../Components/AddNewProcedure";
{/* <Route path="/landlord-management-add-new" element={<LandlordManagementAddNew />}></Route> */}

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

  return (
    <div className="container max-w-5xl mx-auto">
      <div className="flex">
        <AddNewProcedure procedure={procedure} setProcedure={setProcedure} />
        <AddNewData />
      </div>
    </div>
  );
}