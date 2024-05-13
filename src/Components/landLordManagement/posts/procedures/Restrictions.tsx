import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import RadioSelect from "../RadioSelect";
import { occupations } from "../../../../constants/occupations";

export default function Restrictions() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(5);
    handleProcedureClick("完成");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("介紹")}
      >
        上一步
      </button>
      <h3 className="add-new-title">限制</h3>
      <p>您若設定租客限制，不符合條件的用戶將不會得到您的聯絡資訊。</p>
      <div>
        <h4 className="add-new-small-title">是否設定條件</h4>
        <fieldset className="flex gap-6">
          <RadioSelect
            option={{ id: "yes", title: "是", type: "isRestricted" }}
            register={register}
          />
          <RadioSelect
            option={{
              id: "no",
              title: "否，開放所有租客",
              type: "isRestricted",
            }}
            register={register}
          />
        </fieldset>
      </div>
      <div>
        <h4 className="add-new-small-title">性別</h4>
        <fieldset className="flex gap-6">
          <RadioSelect
            option={{ id: "male", title: "男", type: "sexRestriction" }}
            register={register}
          />
          <RadioSelect
            option={{ id: "female", title: "女", type: "sexRestriction" }}
            register={register}
          />
          <RadioSelect
            option={{
              id: "noLimit",
              title: "性別友善",
              type: "sexRestriction",
            }}
            register={register}
          />
        </fieldset>
      </div>
      <div>
        <h4 className="add-new-small-title">排除職業</h4>
        <div className="mb-3">
          <label htmlFor="occupationRestriction" className="mb-2 text-sm">
            職業1
          </label>
          <select
            name="occupationRestriction"
            id="occupationRestriction"
            className="add-new-input "
          >
            {occupations.map(occupation => (
              <option key={occupation.id} value={occupation.id}>
                {occupation.title}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="add-new-back-btn">
          新增職業
        </button>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
