import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../pages/landlordManagement/LandlordManagementAddNew";
import CheckBox from "../CheckBox";
import {
  houseFeatures,
  mainFeatures,
  nearByFacilities,
  transportations,
} from "../../../constants/featureList";
import CheckToShowInput from "../CheckToShowInput";

export default function Features() {
  const { register, handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(2);
    handleProcedureClick("設備");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("房源照片")}
      >
        上一步
      </button>
      <h3 className="add-new-title">重點特色</h3>
      <div>
        {mainFeatures.map(({ id, title }) => (
          <CheckBox id={id} title={title} register={register} key={id} />
        ))}
      </div>
      <h3 className="add-new-title">其他特色</h3>
      <div>
        <div>
          <h4 className="add-new-small-title">附近機能</h4>
          <div>
            {nearByFacilities.map(({ id, title }) => (
              <CheckBox id={id} title={title} register={register} key={id} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="add-new-small-title">屋源特色</h4>
          <div>
            {houseFeatures.map(({ id, title }) => (
              <CheckBox id={id} title={title} register={register} key={id} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="add-new-small-title">交通</h4>
          <div className="flex gap-6">
            {transportations.map(({ id, title }) => (
              <CheckToShowInput
                id={id}
                title={title}
                register={register}
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
