import { useContext } from "react";
import { ProcedureContext } from "../../pages/landlordManagement/AddNew";
import BasicInformation from "./posts/BasicInformation";
import Photos from "./posts/Photos";
import Features from "./posts/Features";
import Equipments from "./posts/Equipments";
import OtherExpenses from "./posts/OtherExpenses";
import DepositAndRent from "./posts/DepositAndRent";
import Introduction from "./posts/Introduction";
import Restrictions from "./posts/Restrictions";

export default function AddNewData() {
  const { procedure } = useContext(ProcedureContext);
  const { title } = procedure.filter(item => item.isActive)[0];

  return (
    <main className="p-6 grow">
      <div className="p-6">
        {title === "基本資訊" && <BasicInformation />}
        {title === "房源照片" && <Photos />}
        {title === "特色" && <Features />}
        {title === "設備" && <Equipments />}
        {title === "雜支" && <OtherExpenses />}
        {title === "訂金與租金" && <DepositAndRent />}
        {title === "房源介紹" && <Introduction />}
        {title === "租客限制" && <Restrictions />}
      </div>
    </main>
  );
}
