import { useContext } from "react";
import { ProcedureContext } from "../Pages/LandlordManagementAddNew";
import BasicInformation from "./Posts/BasicInformation";
import Photos from "./Posts/Photos";
import Features from "./Posts/Features";
import Equipments from "./Posts/Equipments";
import OtherExpenses from "./Posts/OtherExpenses";
import DepositAndRent from "./Posts/DepositAndRent";
import Introduction from "./Posts/Introduction";
import Restrictions from "./Posts/Restrictions";

export default function AddNewData() {
  const { procedure } = useContext(ProcedureContext);
  const { title } = procedure.filter( (item) => item.isActive)[0];

  return (
    <main className="p-6 grow">
      <div className="p-6">
        {
          title === "基本資訊" && <BasicInformation />
        }
        {
          title === "房源照片" && <Photos />
        }
        {
          title === "特色" && <Features />
        }
        {
          title === "設備" && <Equipments />
        }
        {
          title === "雜支" && <OtherExpenses />
        }
        {
          title === "訂金與租金" && <DepositAndRent />
        }
        {
          title === "房源介紹" && <Introduction />
        }
        {
          title === "租客限制" && <Restrictions />
        }        
      </div>
    </main>
  );
}