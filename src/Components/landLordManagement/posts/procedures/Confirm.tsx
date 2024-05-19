import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

export default function Confirm() {
  const { formData } = useSelector((state: RootState) => state.basicInformationContent);
  const photosUpload = useSelector((state: RootState) => state.photosUpload);
  const facilitiesContent = useSelector((state: RootState) => state.facilitiesContent);
  const expensesContent = useSelector((state: RootState) => state.expensesContent);
  const description = useSelector((state: RootState) => state.description);
  const restrictionsContent = useSelector((state: RootState) => state.restrictionsContent);
  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);
  const onSubmit = () => {
    // handleProcedureDone(5);
    // handleProcedureClick("限制");
    console.log(formData);
    console.log(photosUpload);
    console.log(facilitiesContent);
    console.log(expensesContent);
    console.log(description);
    console.log(restrictionsContent);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="bg-Landlord-99 p-5 rounded-lg">
        <h3 className="add-new-title">基本資訊</h3>
        <div className="layout-grid">
          <div className="col-span-12">
            <h5 className="add-new-small-title">房源名稱</h5>
            <p className="confirm-data">{formData.name || "\u00A0"}</p>
          </div>
          <div className="col-span-4">
            <h5 className="add-new-small-title">縣市</h5>
            <p className="confirm-data">{formData.city || "\u00A0"}</p>
          </div>
          <div className="col-span-4">
            <h5 className="add-new-small-title">區域</h5>
            <p className="confirm-data">{formData.district || "\u00A0"}</p>
          </div>
          <div className="col-span-4">
            <h5 className="add-new-small-title">路街</h5>
            <p className="confirm-data">{formData.road || "\u00A0"}</p>
          </div>
          <div className="col-span-12 mt-2.5 flex gap-6">
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.lane || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                巷
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.alley || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                弄
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.number || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                號
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.floor || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                樓層
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.floorTotal || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                總樓數
              </h5>
            </div>
          </div>
          <div className="col-span-6">
            <h5 className="add-new-small-title">類型</h5>
            <p className="confirm-data">{formData.type || "\u00A0"}</p>
          </div>
          <div className="col-span-6 flex items-center gap-2 mt-[22px]">
            <p className="confirm-data flex-1">{formData.ping || "\u00A0"}</p>
            <h5 className="text-sans-body1 shrink-0">
              可使用坪數
            </h5>
          </div>
          <h4 className="text-sans-body1 col-span-12 -mb-6">格局</h4>
          <div className="col-span-12 mt-2.5 flex gap-6">
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.roomNumbers || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                房
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.livingRoomNumbers || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                廳
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.bathRoomNumbers || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                衛浴
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.balconyNumbers || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                陽台
              </h5>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <p className="confirm-data flex-1">{formData.parkingSpaceNumbers || "\u00A0"}</p>
              <h5 className="text-sans-body1 shrink-0">
                車位
              </h5>
            </div>
          </div>
        </div>
      </section>
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
  );
}
