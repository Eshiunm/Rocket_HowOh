import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../Pages/LandlordManagementAddNew";
import { waterBill } from "../../constants/forPay";
import RadioSelect from "../RadioSelect";

export default function OtherExpenses() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);
  const onSubmit = (data) => {
    console.log(data);
    handleProcedureDone(4);
    handleProcedureClick("訂金與租金");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button type="button" className="self-start add-new-back-btn"  onClick={() => handleProcedureClick("設備")}>上一步</button>
      <h3 className="add-new-title">雜支</h3>
      <div>
        <h4 className="add-new-small-title">水費</h4>
        <fieldset className="flex gap-6" >
          {
            waterBill.map((option) => <RadioSelect option={option} register={register} key={option.id} />)
          }
        </fieldset>
        {/* 還需要補特定狀況出現輸入框 */}
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">下一步</button>
    </form>
  );
}