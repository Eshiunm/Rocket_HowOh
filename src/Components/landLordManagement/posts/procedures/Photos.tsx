import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import houseImg from "../../../../assets/imgs/homePage/recommendation_picture_2.svg";
import deleteImg from "../../../../assets/imgs/icons/deleteImg.svg"

function UploadPhoto() {
  return (
    <div className="col-span-3 flex flex-col gap-3">
      <img src={houseImg} className="rounded-xl" alt="房源圖片" />
      <div className="flex justify-between">
        <button type="button" className="text-sans-b-body1 px-4 py-1 rounded-3xl border border-Neutral-50 hover:border-2 hover:-m-[1px]">設為首圖</button>
        <button type="button">
          <img src={deleteImg} alt="delete-img" />
        </button>
      </div>
    </div>
  );
}

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
        <section>
          <h4 className="text-sans-b-h6 mb-6">上傳照片</h4>
          <div className="layout-grid gap-6 mb-6">
            <UploadPhoto />
            <UploadPhoto />
            <UploadPhoto />
            <UploadPhoto />
            <UploadPhoto />
            <UploadPhoto />
            <UploadPhoto />
          </div>
        </section>
        <div className="col-span-12 pt-10 flex justify-between">
          <button 
            type="button"
            onClick={() => handleProcedureClick("基本資訊")}
            className="outline-button-m pr-3 flex items-center"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            <span>上一步</span>
          </button>
          <button 
            type="submit"
            className="filled-button-m pl-3 flex items-center"
          >
            <span>下一步</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </form>
    </div>
  );
}
