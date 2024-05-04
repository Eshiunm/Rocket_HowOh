import BasicInformation from "./Posts/BasicInformation";
import Photos from "./Posts/Photos";
import Features from "./Posts/Features";
import Equipments from "./Posts/Equipments";
import OtherExpenses from "./Posts/OtherExpenses";
import DepositAndRent from "./Posts/DepositAndRent";
import Introduction from "./Posts/Introduction";
import Restrictions from "./Posts/Restrictions";

export default function AddNewData() {

  return (
    <main className="p-6 grow">
      <div className="p-6">
        <BasicInformation />
        <Photos />
        <Features />
        <Equipments />
        <OtherExpenses />
        <DepositAndRent />
        <Introduction />
        <Restrictions />
        {
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
        }
        
      </div>
    </main>
  );
}