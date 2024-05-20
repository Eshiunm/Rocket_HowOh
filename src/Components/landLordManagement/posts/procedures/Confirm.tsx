import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { mainFeatures, nearByFacilities, houseFeatures, equipments, transportations } from "../../../../constants/featureList";

export default function Confirm() {
  const { formData } = useSelector((state: RootState) => state.basicInformationContent);
  const { photos } = useSelector((state: RootState) => state.photosUpload);
  const { facilities } = useSelector((state: RootState) => state.facilitiesContent);
  const { expenses } = useSelector((state: RootState) => state.expensesContent);
  const description = useSelector((state: RootState) => state.description);
  const restrictionsContent = useSelector((state: RootState) => state.restrictionsContent);
  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);
  const onSubmit = () => {
    // handleProcedureDone(5);
    // handleProcedureClick("限制");
    console.log(formData);
    console.log(photos);
    console.log(facilities);
    console.log(expenses);
    console.log(description);
    console.log(restrictionsContent);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
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
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
        <h3 className="add-new-title">照片</h3>
        <ul className="layout-grid">
          {
            photos.map(({path,isCover}, index) => (
              <li key={"photo-" + index} className="col-span-3 flex flex-col items-start gap-3">
                <img src={path} className="rounded-xl" alt={`房源照片-${index+1}`} />
                <button
                  type="button"
                  className={`text-sans-b-body1 px-4 py-1 rounded-3xl border border-Neutral-50 bg-Neutral-50 text-white ${
                    isCover ? "" : "invisible"
                  }`}
                >
                  首圖
                </button>
              </li>
            ))
          }
        </ul>
      </section>
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
        <h3 className="add-new-title">設備設施</h3>
        <div className="mb-10">
          <h4 className="text-sans-b-h6 mb-6">重點特色</h4>
          <div className="flex gap-6">
            {
              mainFeatures.map(({id, title, icon}) => (
                <button
                  disabled
                  key={id}
                  type="button"
                  className={`flex items-center gap-1 hover:border hover:m-0 ${
                    facilities[id] === true ? "tab-button-m-select" : "tab-button-m"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {icon}
                  </span>
                  <span className="text-sans-b-body1">{title}</span>
                </button>
              ))
            }
          </div>
        </div>
        <div>
          <h4 className="text-sans-b-h6">其他特色</h4>
          <div className="layout-grid gap-y-3">
            <h5 className="mt-6 col-span-12 text-Landlord-40 text-sans-b-body1">附近機能</h5>
            {
              nearByFacilities.map(({id, title}) => (
                <label
                  key={id} 
                  className="col-span-3 text-sans-body1 flex items-center gap-2"
                >
                  <input
                    disabled
                    type="checkbox"
                    checked={facilities[id]}
                    className="hover:cursor-auto w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">屋源特色</h5>
            {
              houseFeatures.map(({id, title}) => (
                <label
                  key={id} 
                  className="col-span-3 text-sans-body1 flex items-center gap-2"
                >
                  <input
                    disabled
                    type="checkbox"
                    checked={facilities[id]}
                    className="hover:cursor-auto w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">設備</h5>
            {
              equipments.map(({id, title}) => (
                <label
                  key={id}
                  className="col-span-3 text-sans-body1 flex items-center gap-2"
                >
                  <input
                    disabled
                    type="checkbox"
                    checked={facilities[id]}
                    className="hover:cursor-auto w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">交通</h5>
            {
              transportations.map(({id, title, distance}) => (
                <div className="col-span-3" key={id}>
                  <label
                    className="col-span-3 text-sans-body1"
                  >
                    <div className="flex items-cente gap-2">
                      <input
                        disabled
                        type="checkbox"
                        className="hover:cursor-auto w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                        checked={facilities[id]}
                      />
                      {title}
                    </div>
                  </label>
                  <div className={`mt-[10px] ${
                    facilities[id] ? "" : "hidden"
                    }`}>
                    <div className="col-span-3 flex items-center gap-2">
                      <p className="confirm-data flex-1">{facilities[distance] || "\u00A0"}</p>
                      <span className="shrink-0">公尺</span>
                    </div>
                  </div>
                </div>
              ))
            }
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
