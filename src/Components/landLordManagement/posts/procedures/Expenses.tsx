import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  electricBill,
  managementFee,
  waterBill,
} from "../../../../constants/forPay";

export default function Expenses() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      paymentMethodOfWaterBill: "自訂",
    }
  });
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(3);
    handleProcedureClick("介紹");
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title mb-10">費用</h3>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="layout-grid mb-10">
          <h4 className="col-span-12 text-sans-b-h6">房租與押金</h4>
          <label htmlFor="rent" className="col-span-6 flex items-center gap-2 pt-2">
            <input
              type="number"
              className="add-new-input"
              id="rent"
              placeholder="房租"
            />
            <span className="shrink-0">元/月</span>
          </label>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">押金</h5>
          <fieldset className="col-span-12 layout-grid">
            <label htmlFor="oneMonth" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="oneMonth"
                name="securityDeposit"
                value="一個月"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>1個月</span>
            </label>
            <label htmlFor="twoMonth" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="twoMonth"
                name="securityDeposit"
                value="兩個月"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>2個月</span>
            </label>
          </fieldset>
        </div>
        <div className="layout-grid gap-y-3 mb-10">
          <h4 className="col-span-12 text-sans-b-h6">雜支</h4>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">水費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              waterBill.map(({type, id, title, value}) => (
                <label htmlFor={id} className="col-span-3 flex items-center gap-2">
                  <input
                    type="radio"
                    id={id}
                    name={type}
                    value={value}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  <span className="text-sans-body1">{title}</span>
                </label>
              ))
            }
          </fieldset>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40 mt-3">電費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              electricBill.map(({type, id, title, value}) => (
                <label htmlFor={id} className="col-span-3 flex items-center gap-2">
                  <input
                    type="radio"
                    id={id}
                    name={type}
                    value={value}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  <span className="text-sans-body1">{title}</span>
                </label>
              ))
            }
          </fieldset>
          <h6 className="col-span-12 text-sans-body2">繳納方式</h6>
          <fieldset className="col-span-12 layout-grid">
            <label htmlFor="electricInRent" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="electricInRent"
                name="paymentMethodOfElectricBill"
                value="隨房租繳納"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span className="text-sans-body1">隨房租繳納</span>
            </label>
            <label htmlFor="electricPaySelf" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="electricPaySelf"
                name="paymentMethodOfElectricBill"
                value="自行繳納"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span className="text-sans-body1">自行繳納</span>
            </label>
          </fieldset>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40 mt-3">管理費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              managementFee.map(({type, id, title, value}) => (
                <label htmlFor={id} className="col-span-3 flex items-center gap-2">
                  <input
                    type="radio"
                    id={id}
                    name={type}
                    value={value}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  <span className="text-sans-body1">{title}</span>
                </label>
              ))
            }
          </fieldset>
        </div>
        <div className="pt-10 flex justify-between">
          <button 
            type="button"
            onClick={() => handleProcedureClick("設備設施")}
            className="outline-button-m pr-3 flex items-center"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            <span>上一步</span>
          </button>
          <button type="submit" className="filled-button-m pl-3 flex items-center">
            <span>下一步</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </form>
    </div>
  );
}
