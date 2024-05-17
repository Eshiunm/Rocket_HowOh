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
    <div className="p-5">
      <form className="layout-grid gap-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="col-span-12 add-new-title">介紹</h3>
        <label className="col-span-6" htmlFor="description">
          <textarea
            name="description"
            id="description"
            rows={8}
            placeholder="房源介紹"
            maxLength={500}
            className="resize-none w-full p-3 rounded text-sans-body1 placeholder:text-Neutral-50 focus:border-2 focus:border-Brand-30 focus:-m-[1px] focus:ring-0"
          ></textarea>
          <p className="text-sans-caption mt-1 px-3">最多500字</p>
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
    // <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
    //   <button
    //     type="button"
    //     className="self-start add-new-back-btn"
    //     onClick={() => handleProcedureClick("費用")}
    //   >
    //     上一步
    //   </button>
    //   <h3 className="add-new-title">介紹</h3>
    //   <div className="add-new-input-block">
    //     <label htmlFor="introduce" className="text-sm">
    //       請簡述您的房源
    //     </label>
    //     <textarea
    //       className="add-new-input w-1/3"
    //       id="introduce"
    //       cols={30}
    //       rows={10}
    //       {...register("introduce", { required: true, maxLength: 100 })}
    //     />
    //   </div>
    //   <button type="submit" className="add-new-btn add-new-next-btn">
    //     下一步
    //   </button>
    // </form>
  );
}
