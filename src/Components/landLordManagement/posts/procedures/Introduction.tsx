import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

interface descriptionType {
  description: string
}

export default function Introduction() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues : {
      description: "",
    }
  });
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = (data:descriptionType) => {
    console.log(data)
    handleProcedureDone(4);
    handleProcedureClick("限制");
  };

  return (
    <div className="p-5">
      <form className="layout-grid gap-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="col-span-12 add-new-title mb-0">介紹</h3>
        <label className="col-span-6" htmlFor="description">
          <textarea
            id="description"
            rows={8}
            placeholder="房源介紹"
            maxLength={500}
            className={`w-full p-3 rounded text-sans-body1 placeholder:text-Neutral-50 focus:border-2 focus:border-Brand-30 focus:-m-[1px] focus:ring-0 ${
              errors.description
              ? "border-Alert-50 border focus:border-Alert-50"
              : "border-black border"
            }`}
            {...register("description", {
              required: { value: true, message: "請輸入房源介紹" },
              maxLength: { value: 500, message: "最多500字" }
            })}
          />
          {
            errors.description
            ? <p className="text-red-500 text-sans-caption mt-1 px-3">{errors.description.message}</p>
            : <p className="text-sans-caption mt-1 px-3">最多500字</p>
          }
          
        </label>
        <div className="col-span-12 pt-10 flex justify-between">
          <button 
            type="button"
            onClick={() => handleProcedureClick("費用")}
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
