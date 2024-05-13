import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

export default function Introduction() {
  const { register, handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(4);
    handleProcedureClick("限制");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("費用")}
      >
        上一步
      </button>
      <h3 className="add-new-title">介紹</h3>
      <div className="add-new-input-block">
        <label htmlFor="introduce" className="text-sm">
          請簡述您的房源
        </label>
        <textarea
          className="add-new-input w-1/3"
          id="introduce"
          cols={30}
          rows={10}
          {...register("introduce", { required: true, maxLength: 100 })}
        />
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
