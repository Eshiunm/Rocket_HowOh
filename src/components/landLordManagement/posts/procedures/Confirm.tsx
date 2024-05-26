import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import HouseDatas from "../../HouseDatas";
import BigLoading from "../../../loading/BigLoading";
import { apiHouseLandlordPostStep } from "../../../../apis/apis";
// slices 還原至預設值
import { resetBasicInformation } from "../../../../../redux/post/basicInformationSlice";
import { resetPhotos } from "../../../../../redux/post/photosSlice";
import { resetFacilities } from "../../../../../redux/post/facilitiesSlice";
import { resetExpenses } from "../../../../../redux/post/expensesSlice";
import { resetIntroduction } from "../../../../../redux/post/introductionSlice";
import { resetRestrictions } from "../../../../../redux/post/restrictionsSlice";

export default function Confirm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);
  // 匯入前面步驟之 redux 資料
  const dispatch = useDispatch();
  const { formData } = useSelector((store: RootState) => store.basicInformationContent);
  const { photos } = useSelector((store: RootState) => store.photosUpload);
  const { facilities } = useSelector((store: RootState) => store.facilitiesContent);
  const { expenses } = useSelector((store: RootState) => store.expensesContent);
  const { introduction } = useSelector((store: RootState) => store.description);
  const { restrictions } = useSelector((store: RootState) => store.restrictionsContent);

  const houseDatas = {
    formData, photos, facilities, expenses, introduction, restrictions
  };

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    setLoading(true);
    const patchData = async () => {
      try {
        const houseId = localStorage.getItem("houseId");
        const newData = {
          status: "刊登中",
        }
        const response = await apiHouseLandlordPostStep(newData, houseId);
        if (response.data.Status === false) {
          throw new Error(response.data.Message);
        }
        localStorage.removeItem("houseId");
        dispatch(resetBasicInformation());
        dispatch(resetPhotos());
        dispatch(resetFacilities());
        dispatch(resetExpenses());
        dispatch(resetIntroduction());
        dispatch(resetRestrictions());
        setLoading(false);
        handleProcedureDone(5);
        navigate("/landlord");
        // 完成刊登後跳轉回房源管理頁面
      } catch (error: any) {
        localStorage.clear();
        if (error.response.status === 401) {
          alert(`錯誤回報：401\n請洽 howoh好窩網路管理員`);
        } else {
          alert(error);
        }
        navigate("/");
      }
    }
    patchData();
    
  };

  return (
    <>
      {
        loading && <BigLoading />
      }
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
    </>
  );
}
