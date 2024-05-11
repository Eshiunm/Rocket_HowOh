import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../pages/landlordManagement/LandlordManagementAddNew";

export default function DepositAndRent() {
  const { register, handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(5);
    handleProcedureClick("房源介紹");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("雜支")}
      >
        上一步
      </button>
      <h3 className="add-new-title">訂金與租金</h3>
      <div className="add-new-input-block">
        <label htmlFor="rent" className="text-sm">
          每月租金
        </label>
        <input
          type="text"
          id="rent"
          className="add-new-input w-1/3"
          placeholder="租金"
          {...register("rent", { required: true })}
        />
      </div>
      <div className="add-new-input-block">
        <label htmlFor="deposit" className="text-sm">
          押金
        </label>
        <select
          id="deposit"
          className="add-new-input w-1/3"
          {...register("deposit", { required: true })}
        >
          <option value="免押金">免押金</option>
          <option value="1個月">1個月</option>
          <option value="2個月">2個月</option>
        </select>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
