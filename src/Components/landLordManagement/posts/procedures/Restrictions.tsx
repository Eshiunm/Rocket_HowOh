import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { occupations } from "../../../../constants/occupations";

export default function Restrictions() {
  const [jobRestrictionAmount,setJobRestrictionAmount] = useState(0)
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  console.log(selectedJobs);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      hasTenantRestrictions: "false",
      genderRestriction: "性別友善",
      job: "noJobRestriction"
    },
  });
  const hasTenantRestrictions = watch("hasTenantRestrictions");
  const job = watch("job");
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(5);
    handleProcedureClick("完成");
  };

  const handleSelectChange = (index: number, value: string) => {
    const newSelectedJobs = [...selectedJobs];
    newSelectedJobs[index] = value;
    setSelectedJobs(newSelectedJobs);
  };

  useEffect(() => {
    if (job === "hasJobRestriction") {
      setJobRestrictionAmount(1);
      setSelectedJobs(["一般職員"]);
    } else {
      setJobRestrictionAmount(0);
      setSelectedJobs([]);
    }
    console.log("執行useEffect");
  }, [job]);

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
          hasTenantRestrictions === "true" && (
            <div className="flex flex-col gap-3 mb-10">
              <h5 className="text-sans-b-body1 text-Landlord-40">性別</h5>
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
              <h5 className="text-sans-b-body1 text-Landlord-40">職業</h5>
              <fieldset className="layout-grid">
                <label htmlFor="hasJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="hasJobRestriction"
                    value="hasJobRestriction"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("job", { required: true })}
                  />
                  限制
                </label>
                <label htmlFor="noJobRestriction" className="col-span-6 flex items-center gap-2 text-sans-body1">
                  <input
                    type="radio"
                    id="noJobRestriction"
                    value="noJobRestriction"
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    {...register("job", { required: true })}
                  />
                  不限
                </label>
              </fieldset>
              {
                job === "hasJobRestriction" && (
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
                                onChange={(e) => handleSelectChange(index, e.target.value)}
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