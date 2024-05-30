import { useContext, useEffect } from "react";
import { ProcedureContext } from "../../../pages/landlordManagement/AddNew";
// 所有步驟的 components
import BasicInformation from "./procedures/BasicInformation";
import Photos from "./procedures/Photos";
import Facilities from "./procedures/Facilities";
import Expenses from "./procedures/Expenses";
import Description from "./procedures/Description";
import Restrictions from "./procedures/Restrictions";
import Confirm from "./procedures/Confirm";

export default function AddNewData() {
  const { procedure } = useContext(ProcedureContext);
  console.log(procedure)
  // 確認目前所在步驟標題
  const { title } = procedure.filter(item => item.isActive)[0];

  // 只要跳轉步驟就回到畫面頂端
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="col-span-10 col-start-2 bg-white p-5 rounded-2xl">
      {/* 依所在步驟標題呈現相對應的 component */}
      {title === "基本資訊" && <BasicInformation />}
      {title === "照片" && <Photos />}
      {title === "設備設施" && <Facilities />}
      {title === "費用" && <Expenses />}
      {title === "介紹" && <Description />}
      {title === "限制" && <Restrictions />}
      {title === "確認" && <Confirm />}
    </div>
  );
}
