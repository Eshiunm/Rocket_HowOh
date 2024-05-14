import { useContext } from "react";
import { ProcedureContext } from "../../../pages/landlordManagement/AddNew";
import done from "../../../assets/imgs/icons/done.svg";

export default function AddNewProcedure() {
  const { handleProcedureClick, procedure } = useContext(ProcedureContext);
  return (
    <div className="col-span-10 col-start-2">
      <div className="flex justify-between px-2">
        {procedure.map((item, index: number) => {
          const { title, isActive, isDone } = item;
          return (
            <div key={title} className={`flex justify-between ${
              index !== procedure.length - 1 ? "w-full" : ""
            }`}>
              <button
                disabled={!isDone}
                key={title}
                className="flex flex-col gap-2 items-center"
                onClick={() => handleProcedureClick(title)}
              >
                <div
                  className={
                    isDone || isActive ? "add-new-step-index-active" : "add-new-step-index"
                  }
                >
                  {isDone ? <img src={done} alt="done" /> : index + 1}
                </div>
                <div
                  className={
                    isDone || isActive ? "text-black text-sans-caption whitespace-nowrap -mx-2" : "text-Neutral-70 text-sans-caption whitespace-nowrap -mx-2"
                  }
                >
                  {title}
                </div>
              </button>
              {
                index !== procedure.length -1 && <div className="w-full h-[1px] bg-Neutral-80 mt-4"/>
              }
            </div>
          )}
        )}
      </div>
    </div>
  );
}
