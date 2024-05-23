import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
// 顯示欄位所需之靜態資料
import { mainFeatures, nearByFacilities, houseFeatures, equipments, transportations } from "../../../../constants/featureList";
import { waterBill, electricBill, managementFee } from "../../../../constants/forPay";
import { formDataType } from "../procedures/Facilities";

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
                  className={`cursor-default text-sans-b-body1 px-4 py-1 rounded-3xl border border-Neutral-50 bg-Neutral-50 text-white ${
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
                    facilities[id as keyof formDataType] === true ? "tab-button-m-select" : "tab-button-m"
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
                    checked={facilities[id as keyof formDataType]}
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
                    checked={facilities[id as keyof formDataType]}
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
                    checked={facilities[id as keyof formDataType]}
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
                        checked={facilities[id as keyof formDataType]}
                      />
                      {title}
                    </div>
                  </label>
                  <div className={`mt-[10px] ${
                    facilities[id as keyof formDataType] ? "" : "hidden"
                    }`}>
                    <div className="col-span-3 flex items-center gap-2">
                      <p className="confirm-data flex-1">{facilities[distance as keyof formDataType] || "\u00A0"}</p>
                      <span className="shrink-0">公尺</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
        <h3 className="add-new-title">費用</h3>
        <div className="layout-grid mb-10">
          <h4 className="col-span-12 text-sans-b-h6">房租與押金</h4>
          <div className="col-span-6">
            <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">房租</h5>
            <div className="flex items-center gap-2">
              <p className="confirm-data flex-1">{ expenses.rent || "\u00A0" }</p>
              <span className="shrink-0">元/月</span>
            </div>
          </div>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">押金</h5>
          <fieldset className="col-span-12 layout-grid">
            <label htmlFor="oneMonth" className="col-span-3 flex items-center gap-2">
              <input
                disabled
                type="radio"
                id="oneMonth"
                value="一個月"
                checked={expenses.securityDeposit === "一個月"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>1個月</span>
            </label>
            <label htmlFor="twoMonth" className="col-span-3 flex items-center gap-2">
              <input
                disabled
                type="radio"
                id="twoMonth"
                value="兩個月"
                checked={expenses.securityDeposit === "兩個月"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              <span>2個月</span>
            </label>
          </fieldset>
        </div>
        <div className="layout-grid gap-y-3 mb-10">
          <h4 className="col-span-12 text-sans-b-h6 mb-6">雜支</h4>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">水費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              waterBill.map(({id, title, value}) => (
                <label key={id} className="col-span-3">
                  <div className="flex items-center gap-2">
                    <input
                      disabled
                      type="radio"
                      value={value}
                      checked={expenses.paymentMethodOfWaterBill === value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    expenses.paymentMethodOfWaterBill === "自訂" && id === "customWater" && (
                      <div className="flex items-center gap-2 mt-3">
                        <p className="confirm-data flex-1">{ expenses.waterBillPerMonth || "\u00A0" }</p>
                        <span className="text-sans-body1 shrink-0">元/人</span>
                      </div>
                    )
                  }
                </label>
              ))
            }
          </fieldset>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40 mt-3">電費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              electricBill.map(({id, title, value}) => (
                <label key={id} className="col-span-3">
                  <div className="flex items-center gap-2">
                    <input
                      disabled
                      type="radio"
                      value={value}
                      checked={expenses.electricBill === value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    expenses.electricBill === "自訂" && id === "customElectric" && (
                      <div className="flex items-center gap-2 mt-3">
                        <p className="confirm-data flex-1">{ expenses.electricBillPerDegree || "\u00A0" }</p>
                        <span className="text-sans-body1 shrink-0">元/度</span>
                      </div>
                    )
                  }
                </label>
              ))
            }
          </fieldset>
          {
            expenses.electricBill === "依台電計價" && (
              <>
                <h6 className="col-span-12 text-sans-body2 mt-[1px]">繳納方式</h6>
                <fieldset className="col-span-12 layout-grid">
                  <label htmlFor="electricInRent" className="col-span-3 flex items-center gap-2">
                    <input
                      disabled
                      type="radio"
                      id="electricInRent"
                      value="隨房租繳納"
                      checked={expenses.paymentMethodOfElectricBill === "隨房租繳納"}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    />
                    <span className="text-sans-body1">隨房租繳納</span>
                  </label>
                  <label htmlFor="electricPaySelf" className="col-span-3 flex items-center gap-2">
                    <input
                      disabled
                      type="radio"
                      id="electricPaySelf"
                      value="自行繳納"
                      checked={expenses.paymentMethodOfElectricBill === "自行繳納"}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    />
                    <span className="text-sans-body1">自行繳納</span>
                  </label>
                </fieldset>
              </>
            )
          }
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40 mt-3">管理費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              managementFee.map(({id, title, value}) => (
                <label key={id} htmlFor={id} className="col-span-3">
                  <div className="flex items-center gap-2">
                    <input
                      disabled
                      type="radio"
                      id={id}
                      value={value}
                      checked={expenses.paymentMethodOfManagementFee === value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    (( expenses.paymentMethodOfManagementFee === "隨房租繳納"  && id === "managementFeePayWithRent" )
                    || ( expenses.paymentMethodOfManagementFee === "自行繳納" && id === "managementFeePaySelf" ))
                    && (
                      <div className="flex items-center gap-2 mt-3">
                        <p className="confirm-data flex-1">{ expenses.managementFeePerMonth || "\u00A0" }</p>
                        <span className="text-sans-body1 shrink-0">元/月</span>
                      </div>
                    )
                  }
                </label>
              ))
            }
          </fieldset>
        </div>
      </section>
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
        <h3 className="add-new-title">介紹</h3>
        <div className="layout-grid">
          <p className="col-span-6 whitespace-pre-line text-sans-body1">{ introduction }</p>
        </div>
      </section>
      <section className="bg-Landlord-99 p-5 rounded-lg mb-5">
        <h3 className="add-new-title">租客限制</h3>
        <div className="flex flex-col gap-6 mb-6">
          <h4 className="text-sans-b-h6">是否設定條件？</h4>
          <fieldset className="layout-grid">
            <label htmlFor="hasRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
              <input
                disabled
                type="radio"
                id="hasRestriction"
                value={"true"}
                checked={restrictions.hasTenantRestrictions === "true"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              是
            </label>
            <label htmlFor="noRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
              <input
                disabled
                type="radio"
                id="noRestriction"
                value={"false"}
                checked={restrictions.hasTenantRestrictions === "false"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
              />
              否
            </label>
          </fieldset>
        </div>
        {
          restrictions.hasTenantRestrictions === "true" && (
            <div className="flex flex-col gap-3">
              <h5 className="text-sans-b-body1 text-Landlord-40">排除性別</h5>
              <fieldset className="layout-grid">
                <label htmlFor="maleRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    disabled
                    type="radio"
                    id="maleRestriction"
                    value="僅限男性"
                    checked={restrictions.genderRestriction === "僅限男性"}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  男
                </label>
                <label htmlFor="femaleRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    disabled
                    type="radio"
                    id="femaleRestriction"
                    value="僅限女性"
                    checked={restrictions.genderRestriction === "僅限女性"}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  女
                </label>
                <label htmlFor="noGenderRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    disabled
                    type="radio"
                    id="noGenderRestriction"
                    value="性別友善"
                    checked={restrictions.genderRestriction === "性別友善"}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  不限
                </label>
              </fieldset>
              <h5 className="text-sans-b-body1 text-Landlord-40 mt-3">排除職業</h5>
              <fieldset className="layout-grid">
                <label htmlFor="hasJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    disabled
                    type="radio"
                    id="hasJobRestriction"
                    value="hasJobRestriction"
                    checked={restrictions.jobRestriction.length > 0}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  限制
                </label>
                <label htmlFor="noJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    disabled
                    type="radio"
                    id="noJobRestriction"
                    value="noJobRestriction"
                    checked={restrictions.jobRestriction.length === 0}
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                  />
                  不限
                </label>
              </fieldset>
              {
                restrictions.jobRestriction.length > 0 && (
                  <>
                    <h6 className="text-sans-caption -mb-2">職業類別</h6>
                    <div className="layout-grid">
                      <div className="col-span-3">
                        {
                          restrictions.jobRestriction.map((restriction, index) => (
                            <p key={restriction+index} className={`confirm-data flex-1 ${
                              index+1 === restrictions.jobRestriction.length ? "" : "mb-3"
                            }`}>{ restriction || "\u00A0" }</p>
                          ))
                        }
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          )
        }
      </section>
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
