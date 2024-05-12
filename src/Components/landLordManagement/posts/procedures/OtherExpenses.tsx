import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  electricBill,
  managementFee,
  waterBill,
} from "../../../../constants/forPay";
import RadioSelect from "../RadioSelect";

export default function OtherExpenses() {
  const { register, handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(4);
    handleProcedureClick("訂金與租金");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("設備")}
      >
        上一步
      </button>
      <h3 className="add-new-title">雜支</h3>
      <div className="border-b pb-12 mb-12">
        <h4 className="add-new-small-title">水費</h4>
        <fieldset className="flex gap-6">
          {waterBill.map(option => (
            <RadioSelect
              option={option}
              register={register}
              key={option.id + option.type}
            />
          ))}
        </fieldset>
        <div className="after:content-['元'] add-new-input-unit">
          <label htmlFor="waterForEachMonth" className="py-1">
            每月
          </label>
          <input
            type="number"
            id="waterForEachMonth"
            className="add-new-input"
          />
        </div>
      </div>
      <div className="border-b pb-12 mb-12">
        <h4 className="add-new-small-title">電費</h4>
        <fieldset className="flex gap-6">
          {electricBill.map(option => (
            <RadioSelect
              option={option}
              register={register}
              key={option.id + option.type}
            />
          ))}
        </fieldset>
        <div className="after:content-['元'] add-new-input-unit">
          <label htmlFor="electricForEachDegree" className="py-1">
            每度
          </label>
          <input
            type="number"
            id="electricForEachDegree"
            className="add-new-input"
          />
        </div>
        <div>
          <label htmlFor="electricPay" className="py-1">
            繳納方式
          </label>
          <fieldset id="electricPay" className="flex gap-6">
            <RadioSelect
              option={{
                id: "payWithRent",
                title: "隨房租繳納",
                type: "electric",
              }}
              register={register}
              key="electricPayWithRent"
            />
            <RadioSelect
              option={{ id: "paySelf", title: "自行繳納", type: "electric" }}
              register={register}
              key="electricPaySelf"
            />
          </fieldset>
        </div>
      </div>
      <div>
        <h4 className="add-new-small-title">管理費</h4>
        <fieldset className="flex gap-6">
          {managementFee.map(option => (
            <RadioSelect
              option={option}
              register={register}
              key={option.id + option.type}
            />
          ))}
        </fieldset>
        <div className="after:content-['元'] add-new-input-unit">
          <p className="py-1">每月</p>
          <input type="number" className="add-new-input" />
        </div>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
