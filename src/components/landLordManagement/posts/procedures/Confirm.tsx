import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import HouseDatas from "../../HouseDatas";

export default function Confirm() {
  const navigate = useNavigate();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);
  // 匯入前面步驟之 redux 資料
  const { formData } = useSelector((store: RootState) => store.basicInformationContent);
  const { photos } = useSelector((store: RootState) => store.photosUpload);
  const { facilities } = useSelector((store: RootState) => store.facilitiesContent);
  const { expenses } = useSelector((store: RootState) => store.expensesContent);
  const { introduction } = useSelector((store: RootState) => store.description);
  const { restrictions } = useSelector((store: RootState) => store.restrictionsContent);

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    handleProcedureDone(5);
    navigate("/landlord");
    // 完成刊登後跳轉回房源管理頁面
  };

  const houseDatas = {
    formData, photos, facilities, expenses, introduction, restrictions
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 預覽資訊 */}
      <HouseDatas houseDatas={houseDatas} />
      <div className="col-span-12 pt-10 flex justify-between">
        <button 
          type="button"
          onClick={() => handleProcedureClick("限制")}
          className="outline-button-m pr-3 flex items-center"
        >
          <span className="material-symbols-outlined">chevron_left</span>
          <span>上一步</span>
        </button>
        <button type="submit" className="filled-button-m pl-3 flex items-center">
          <span className="mr-1">完成</span>
          <span className="material-symbols-outlined">check</span>
        </button>
      </div>
    </form>
  );
}
