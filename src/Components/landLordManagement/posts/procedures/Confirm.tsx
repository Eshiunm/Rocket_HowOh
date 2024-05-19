import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

export default function Confirm() {
  const basicInformationContent = useSelector((state: RootState) => state.basicInformationContent);
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
    console.log(basicInformationContent);
    console.log(photosUpload);
    console.log(facilitiesContent);
    console.log(expensesContent);
    console.log(description);
    console.log(restrictionsContent);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
