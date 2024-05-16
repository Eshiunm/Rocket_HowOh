import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  electricBill,
  managementFee,
  waterBill,
} from "../../../../constants/forPay";
import RadioSelect from "../RadioSelect";

export default function Expenses() {
  const { register, handleSubmit } = useForm();
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
            <input type="number" className="add-new-input" id="rent" placeholder="房租" />
            <span className="shrink-0">元/月</span>
          </label>
          <h5 className="col-span-12 text-sans-b-body1">押金</h5>
          <fieldset className="col-span-12 layout-grid">
            <label htmlFor="one" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                name="securityDeposit"
                id="one"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>1個月</span>
            </label>
            <label htmlFor="two" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                name="securityDeposit"
                id="two"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>2個月</span>
            </label>
          </fieldset>
        </div>
      </form>
    </div>
    // <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
    //   <button
    //     type="button"
    //     className="self-start add-new-back-btn"
    //     onClick={() => handleProcedureClick("設備設施")}
    //   >
    //     上一步
    //   </button>
    //   <h3 className="add-new-title">費用</h3>
    //   <div className="add-new-input-block">
    //     <label htmlFor="rent" className="text-sm">
    //       每月租金
    //     </label>
    //     <input
    //       type="text"
    //       id="rent"
    //       className="add-new-input w-1/3"
    //       placeholder="租金"
    //       {...register("rent", { required: true })}
    //     />
    //   </div>
    //   <div className="add-new-input-block">
    //     <label htmlFor="deposit" className="text-sm">
    //       押金
    //     </label>
    //     <select
    //       id="deposit"
    //       className="add-new-input w-1/3"
    //       {...register("deposit", { required: true })}
    //     >
    //       <option value="免押金">免押金</option>
    //       <option value="1個月">1個月</option>
    //       <option value="2個月">2個月</option>
    //     </select>
    //   </div>
    //   <div className="border-b pb-12 mb-12">
    //     <h4 className="add-new-small-title">水費</h4>
    //     <fieldset className="flex gap-6">
    //       {waterBill.map(option => (
    //         <RadioSelect
    //           option={option}
    //           register={register}
    //           key={option.id + option.type}
    //         />
    //       ))}
    //     </fieldset>
    //     <div className="after:content-['元'] add-new-input-unit">
    //       <label htmlFor="waterForEachMonth" className="py-1">
    //         每月
    //       </label>
    //       <input
    //         type="number"
    //         id="waterForEachMonth"
    //         className="add-new-input"
    //       />
    //     </div>
    //   </div>
    //   <div className="border-b pb-12 mb-12">
    //     <h4 className="add-new-small-title">電費</h4>
    //     <fieldset className="flex gap-6">
    //       {electricBill.map(option => (
    //         <RadioSelect
    //           option={option}
    //           register={register}
    //           key={option.id + option.type}
    //         />
    //       ))}
    //     </fieldset>
    //     <div className="after:content-['元'] add-new-input-unit">
    //       <label htmlFor="electricForEachDegree" className="py-1">
    //         每度
    //       </label>
    //       <input
    //         type="number"
    //         id="electricForEachDegree"
    //         className="add-new-input"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="electricPay" className="py-1">
    //         繳納方式
    //       </label>
    //       <fieldset id="electricPay" className="flex gap-6">
    //         <RadioSelect
    //           option={{
    //             id: "payWithRent",
    //             title: "隨房租繳納",
    //             type: "electric",
    //           }}
    //           register={register}
    //           key="electricPayWithRent"
    //         />
    //         <RadioSelect
    //           option={{ id: "paySelf", title: "自行繳納", type: "electric" }}
    //           register={register}
    //           key="electricPaySelf"
    //         />
    //       </fieldset>
    //     </div>
    //   </div>
    //   <div>
    //     <h4 className="add-new-small-title">管理費</h4>
    //     <fieldset className="flex gap-6">
    //       {managementFee.map(option => (
    //         <RadioSelect
    //           option={option}
    //           register={register}
    //           key={option.id + option.type}
    //         />
    //       ))}
    //     </fieldset>
    //     <div className="after:content-['元'] add-new-input-unit">
    //       <p className="py-1">每月</p>
    //       <input type="number" className="add-new-input" />
    //     </div>
    //   </div>
    //   <button type="submit" className="add-new-btn add-new-next-btn">
    //     下一步
    //   </button>
    // </form>
  );
}
