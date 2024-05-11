import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../pages/landlordManagement/LandlordManagementAddNew";
import CheckBox from "../CheckBox";
import { equipments } from "../../../constants/featureList";

export default function Equipments() {
  const { register, handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(3);
    handleProcedureClick("雜支");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        className="self-start add-new-back-btn"
        onClick={() => handleProcedureClick("特色")}
      >
        上一步
      </button>
      <h3 className="add-new-title">設備</h3>
      <div>
        {equipments.map(({ id, title }) => (
          <CheckBox id={id} title={title} register={register} key={id} />
        ))}
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
