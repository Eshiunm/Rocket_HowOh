import { useContext, useEffect } from "react";
import { ProcedureContext } from "../../../pages/landlordManagement/AddNew";
import BasicInformation from "./procedures/BasicInformation";
import Photos from "./procedures/Photos";
import Facilities from "./procedures/Facilities";
import Equipments from "./procedures/Equipments";
import Expenses from "./procedures/Expenses";
import DepositAndRent from "./procedures/DepositAndRent";
import Introduction from "./procedures/Introduction";
import Restrictions from "./procedures/Restrictions";

export default function AddNewData() {
  const { procedure } = useContext(ProcedureContext);
  const { title } = procedure.filter(item => item.isActive)[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="col-span-10 col-start-2 bg-white p-5 rounded-2xl">
      {title === "基本資訊" && <BasicInformation />}
      {title === "照片" && <Photos />}
      {title === "設備設施" && <Facilities />}
      {title === "費用" && <Expenses />}
      {title === "介紹" && <Introduction />}
      {title === "限制" && <Restrictions />}
      {title === "完成" && <Equipments />}
    </div>
  );
}
