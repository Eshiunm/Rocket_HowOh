import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { setDescription } from "../../../../../redux/post/descriptionSlice";
import { RootState } from "../../../../../redux/store";
import BigLoading from "../../../loading/BigLoading";
import { apiHouseLandlordPostStep } from "../../../../apis/apis";

// 定義介紹資料的型別
interface descriptionType {
  description: string
}

export default function Description() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { description } = useSelector( (store: RootState) => store.description);
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues : {
      description: description,
    }
  });
  const onSubmit = (data: descriptionType) => {
    setLoading(true);
    dispatch(setDescription(data.description));

    const patchData = async () => {
      const houseId = localStorage.getItem("houseId");
      const newData = {
        ...data,
        status: "完成步驟5" 
      };
      try {
        const response = await apiHouseLandlordPostStep(newData, houseId);
        if (response.data.Status === false) {
          throw new Error(response.data.Message);
        }
        setLoading(false);
        handleProcedureDone(4);
        handleProcedureClick("限制");
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
      <div className="p-5">
        <form className="layout-grid gap-y-10" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="col-span-12 add-new-title mb-0">介紹</h3>
          <label className="col-span-6" htmlFor="description">
            <textarea
              id="description"
              rows={8}
              placeholder="房源介紹"
              maxLength={500}
              className={`w-full p-3 rounded text-sans-body1 placeholder:text-Neutral-50 border focus:border-2 focus:-m-[1px] focus:ring-0 ${
                errors.description
                ? "border-Alert-50 focus:border-Alert-50"
                : "border-black focus:border-Brand-30"
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
    </>
  );
}
