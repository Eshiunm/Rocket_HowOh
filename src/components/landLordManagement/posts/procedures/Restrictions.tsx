import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { occupations } from "../../../../constants/occupations";
import { useDispatch } from "react-redux";
import { setRestrictions } from "../../../../../redux/post/restrictionsSlice";
// import { RootState } from "../../../../../redux/store";

// 定義限制資料的型別
interface restrictionType {
  hasTenantRestrictions: string;
  genderRestriction: string;
  jobRestriction: string | string[];
}

export default function Restrictions() {
  const dispatch = useDispatch();
  // const content = useSelector(( store: RootState ) => store.restrictionsContent);
  
  const [jobRestrictionAmount,setJobRestrictionAmount] = useState<number>(0);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);

  const { register, handleSubmit, watch, reset } = useForm<restrictionType>({
    defaultValues: {
      hasTenantRestrictions: "false",
      genderRestriction: "性別友善",
      jobRestriction: "noJobRestriction"
    },
  });
  const hasTenantRestrictions: string = watch("hasTenantRestrictions");
  const jobRestriction: string|string[] = watch("jobRestriction");

  const onSubmit = (data: restrictionType):void => {
    // 重組jobRestriction資料後送出
    const formData = {...data};
    formData.jobRestriction = selectedJobs;
    dispatch(setRestrictions(formData));
    handleProcedureDone(5);
    handleProcedureClick("確認");
  };

  // 控制排除職業選擇的狀態
  const handleSelectChange = (index: number, value: string):void => {
    const newSelectedJobs = [...selectedJobs];
    newSelectedJobs[index] = value;
    setSelectedJobs(newSelectedJobs);
  };

  useEffect(() => {
    if (hasTenantRestrictions === "false") {
      // 當無租客限制時還原預設資料
      reset();
      setSelectedJobs([]);
    }
  }, [hasTenantRestrictions, reset]);

  useEffect(() => {
    // 控制租客職業限制資料
    if (jobRestriction === "hasJobRestriction") {
      setJobRestrictionAmount(1);
      setSelectedJobs(["一般職員"]);
    } else {
      setJobRestrictionAmount(0);
      setSelectedJobs([]);
    }
  }, [jobRestriction]);

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="add-new-title mb-10">租客限制</h3>
        <div className="flex flex-col gap-3 mb-6">
          <h4 className="text-sans-b-h6">是否設定條件？</h4>
          <p className="text-sans-body1">若選擇是，不符合條件的用戶將不會得到您的聯絡資訊。</p>
          <fieldset className="layout-grid">
            <label htmlFor="hasRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
              <input
                type="radio"
                id="hasRestriction"
                value={"true"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                {...register("hasTenantRestrictions", { required: true })}
              />
              是
            </label>
            <label htmlFor="noRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
              <input
                type="radio"
                id="noRestriction"
                value={"false"}
                className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                {...register("hasTenantRestrictions", { required: true })}
              />
              否
            </label>
          </fieldset>
        </div>
        {
          // 有租客限制時才顯示
          hasTenantRestrictions === "true" && (
            <div className="flex flex-col gap-3 mb-10">
              <h5 className="text-sans-b-body1 text-Landlord-40">排除性別</h5>
              <fieldset className="layout-grid">
                <label htmlFor="maleRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="maleRestriction"
                    value="僅限男性"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("genderRestriction", { required: true })}
                  />
                  男
                </label>
                <label htmlFor="femaleRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="femaleRestriction"
                    value="僅限女性"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("genderRestriction", { required: true })}
                  />
                  女
                </label>
                <label htmlFor="noGenderRestriction" className="col-span-3 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="noGenderRestriction"
                    value="性別友善"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("genderRestriction", { required: true })}
                  />
                  不限
                </label>
              </fieldset>
              <h5 className="text-sans-b-body1 text-Landlord-40">排除職業</h5>
              <fieldset className="layout-grid">
                <label htmlFor="hasJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="hasJobRestriction"
                    value="hasJobRestriction"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("jobRestriction", { required: true })}
                  />
                  限制
                </label>
                <label htmlFor="noJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="noJobRestriction"
                    value="noJobRestriction"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("jobRestriction", { required: true })}
                  />
                  不限
                </label>
              </fieldset>
              {
                // 有職業限制時才顯示
                jobRestriction === "hasJobRestriction" && (
                  <div className="layout-grid">
                    <div className="col-span-6">
                      {
                        [...Array(jobRestrictionAmount)].map((_, index) => (
                          <div className={
                            index === 0 ? "mt-3" : "mt-6"
                          } key={index}>
                            <div
                              tabIndex={0}
                              className="relative flex w-full rounded border-black border"
                            >
                              <select
                                id={`occupations-${index}`}
                                className="block w-full p-3 pl-5 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0"
                                onChange={(e:ChangeEvent<HTMLSelectElement>) => handleSelectChange(index, e.target.value)}
                              >
                                {occupations.map(({ id, title: occupation }) => (
                                    <option value={occupation} key={index+id}>
                                      {occupation}
                                    </option>
                                  )
                                )}
                              </select>
                              <label
                                htmlFor={`occupations-${index}`}
                                className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2  start-3"
                              >
                                職業類別
                              </label>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="col-span-12">
                      <button type="button" className="letter-button-light"
                        onClick={() => {
                          setJobRestrictionAmount(prev => prev + 1)
                          setSelectedJobs(prev => [...prev, "一般職員"])
                          // 點擊後新增一個欄位
                        }}
                      >
                        <span>新增職業</span>
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
        <div className="pt-10 flex justify-between">
          <button 
            type="button"
            onClick={() => handleProcedureClick("介紹")}
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