import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  electricBill,
  managementFee,
  waterBill,
} from "../../../../constants/forPay";
import { useDispatch } from "react-redux";
import { setExpenses } from "../../../../../redux/post/expensesSlice";
// import { RootState } from "../../../../../redux/store";

// 定義費用資料的型別
interface expensesType {
  rent: string;
  securityDeposit: string;
  paymentMethodOfWaterBill: string;
  waterBillPerMonth: string;
  electricBill: string;
  electricBillPerDegree: string;
  paymentMethodOfElectricBill: string;
  paymentMethodOfManagementFee: string;
  managementFeePerMonth: string;
}

export default function Expenses() {
  const dispatch = useDispatch();
  // const content = useSelector( (store: RootState) => store.expensesContent);
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      rent: "",
      securityDeposit: "兩個月",
      paymentMethodOfWaterBill: "包含於房租",
      waterBillPerMonth: "",
      electricBill: "依台電計價",
      electricBillPerDegree: "",
      paymentMethodOfElectricBill: "自行繳納",
      paymentMethodOfManagementFee: "無管理費",
      managementFeePerMonth: "",
    }
  });
  const paymentMethodOfWaterBill = watch("paymentMethodOfWaterBill");
  const electricBillChoose = watch("electricBill");
  const paymentMethodOfManagementFee = watch("paymentMethodOfManagementFee");

  const onSubmit = (data: expensesType) => {
    if (data.electricBill === "自訂") {
      data.paymentMethodOfElectricBill = "隨房租繳納"
    }
    dispatch(setExpenses(data));
    handleProcedureDone(3);
    handleProcedureClick("介紹");
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title mb-10">費用</h3>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="layout-grid mb-10">
          <h4 className="col-span-12 text-sans-b-h6">房租與押金</h4>
          <div className="col-span-6">
            <label htmlFor="rent" className="flex items-center gap-2 pt-2">
              <input
                type="number"
                className={`add-new-input ${
                  errors.rent ? "border-Alert-50 focus:border-Alert-50" : ""
                }`}
                id="rent"
                placeholder="房租"
                {...register("rent",{
                  required: { value: true, message: "請輸入房租" },
                })}
              />
              <span className="shrink-0">元/月</span>
            </label>
            { errors.rent && <p className="post-alert col-span-12">{errors.rent.message}</p> }
          </div>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">押金</h5>
          <fieldset className="col-span-12 layout-grid">
            <label htmlFor="oneMonth" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="oneMonth"
                value="一個月"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                {...register("securityDeposit",{
                  required: true
                })}
              />
              <span>1個月</span>
            </label>
            <label htmlFor="twoMonth" className="col-span-3 flex items-center gap-2">
              <input
                type="radio"
                id="twoMonth"
                value="兩個月"
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                {...register("securityDeposit",{
                  required: true
                })}
              />
              <span>2個月</span>
            </label>
          </fieldset>
        </div>
        <div className="layout-grid gap-y-3 mb-10">
          <h4 className="col-span-12 text-sans-b-h6">雜支</h4>
          <h5 className="col-span-12 text-sans-b-body1 text-Landlord-40">水費</h5>
          <fieldset className="col-span-12 layout-grid">
            {
              waterBill.map(({id, title, value}) => (
                <label key={id} htmlFor={id} className="col-span-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={id}
                      value={value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                      {...register("paymentMethodOfWaterBill",{
                        required: true
                      })}
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    paymentMethodOfWaterBill === "自訂" && id === "customWater" && (
                      <>
                      {/* 當水費為自訂時，自訂欄位可輸入收費金額 */}
                        <div className="flex items-center gap-2 mt-3">
                          <input
                            type="number"
                            className={`add-new-input ${
                              errors.waterBillPerMonth && "border-Alert-50 border focus:border-Alert-50 focus:border"
                            }`}
                            {...register("waterBillPerMonth",{
                              required: { value: true, message: "必填欄位" },
                            })}
                          />
                          <span className="text-sans-body1 shrink-0">元/人</span>
                        </div>
                        <>
                          {
                            errors.waterBillPerMonth && <p className="post-alert">{errors.waterBillPerMonth.message}</p>
                          }
                        </>
                      </>
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
                <label key={id} htmlFor={id} className="col-span-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={id}
                      value={value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                      {...register("electricBill",{
                        required: true
                      })}
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    electricBillChoose === "自訂" && id === "customElectric" && (
                      <>
                      {/* 當電費為自訂時，自訂欄位可輸入收費金額 */}
                        <div className="flex items-center gap-2 mt-5">
                          <input
                            type="number"
                            className={`add-new-input ${
                              errors.electricBillPerDegree && "border-Alert-50 border focus:border-Alert-50 focus:border"
                            }`}
                            {...register("electricBillPerDegree",{
                              required: { value: true, message: "必填欄位" },
                            })}
                          />
                          <span className="text-sans-body1 shrink-0">元/度</span>
                        </div>
                        <>
                          {
                            errors.electricBillPerDegree && <p className="post-alert">{errors.electricBillPerDegree.message}</p>
                          }
                        </>
                      </>
                    )
                  }
                </label>
              ))
            }
          </fieldset>
          {
            // 當電費為依台電計價時，可選取繳納方式
            electricBillChoose === "依台電計價" && (
              <>
                <h6 className="col-span-12 text-sans-body2 mt-[1px]">繳納方式</h6>
                <fieldset className="col-span-12 layout-grid">
                  <label htmlFor="electricInRent" className="col-span-3 flex items-center gap-2">
                    <input
                      type="radio"
                      id="electricInRent"
                      value="隨房租繳納"
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                      {...register("paymentMethodOfElectricBill",{
                        required: { value: true, message: "必填欄位" },
                      })}
                    />
                    <span className="text-sans-body1">隨房租繳納</span>
                  </label>
                  <label htmlFor="electricPaySelf" className="col-span-3 flex items-center gap-2">
                    <input
                      type="radio"
                      id="electricPaySelf"
                      value="自行繳納"
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                      {...register("paymentMethodOfElectricBill",{
                        required: { value: true, message: "必填欄位" },
                      })}
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
                      type="radio"
                      id={id}
                      value={value}
                      className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                      {...register("paymentMethodOfManagementFee",{
                        required: true
                      })}
                    />
                    <span className="text-sans-body1">{title}</span>
                  </div>
                  {
                    // 當管理費為隨房租繳納或自行繳納時，其欄位可輸入收費金額
                    (( paymentMethodOfManagementFee === "隨房租繳納"  && id === "managementFeePayWithRent" )
                    || ( paymentMethodOfManagementFee === "自行繳納" && id === "managementFeePaySelf" ))
                    && (
                      <>
                        <div className="flex items-center gap-2 mt-3">
                          <input
                            type="number"
                            className={`add-new-input ${
                              errors.managementFeePerMonth && "border-Alert-50 border focus:border-Alert-50 focus:border"
                            }`}
                            {...register("managementFeePerMonth",{
                              required: { value: true, message: "必填欄位" },
                            })}
                          />
                          <span className="text-sans-body1 shrink-0">元/月</span>
                        </div>
                        <>
                          {
                            errors.managementFeePerMonth && <p className="post-alert">{errors.managementFeePerMonth.message}</p>
                          }
                        </>
                      </>
                    )
                  }
                </label>
              ))
            }
          </fieldset>
        </div>
        <div className="pt-10 flex justify-between">
          <button 
            type="button"
            onClick={() => handleProcedureClick("設備設施")}
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
  );
}
