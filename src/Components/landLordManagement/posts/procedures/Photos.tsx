import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

export default function Photos() {
  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(1);
    handleProcedureClick("設備設施");
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title">照片</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex items-center justify-center w-full mb-8">
          <label htmlFor="dropzone-file" className="p-20 flex flex-col items-center justify-center w-full h-64 border-2 border-Neutral-30 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="outline-button-s">瀏覽檔案</span>
              <p className="text-sans-body2 text-black text-center">最多上傳8張照片<br />支援PNG,  JPG </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/jpeg, image/png"
              multiple
            />
          </label>
        </section> 

      </form>
      {/* <form
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
        <h3 className="add-new-title">照片</h3>
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
      </form> */}
    </div>
  );
}
