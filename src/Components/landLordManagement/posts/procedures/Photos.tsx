import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

export default function Photos() {
  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(1);
    handleProcedureClick("特色");
  };

  return (
    <form
      className="flex flex-col items-start gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="button"
        className="add-new-back-btn"
        onClick={() => handleProcedureClick("基本資訊")}
      >
        上一步
      </button>
      <h3 className="add-new-title">房源照片</h3>
      <button
        type="button"
        className="border border-black w-80 h-80 flex flex-col justify-center items-center gap-6"
      >
        <h4>上傳圖片</h4>
        <div className="add-new-btn">瀏覽檔案</div>
      </button>
      <div className="flex flex-wrap gap-3">
        <div className="w-80 h-80 border-8 border-gray-500"></div>
        <div className="w-80 h-80 border-8 border-gray-500"></div>
        <div className="w-80 h-80 border-8 border-gray-500"></div>
        <div className="w-80 h-80 border-8 border-gray-500"></div>
        <div className="w-80 h-80 border-8 border-gray-500"></div>
        <div className="w-80 h-80 border-8 border-gray-500"></div>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
