import { useContext } from "react";
import { ProcedureContext } from "../../pages/landlordManagement/LandlordManagementAddNew";

export default function AddNewProcedure() {
  const { handleProcedureClick, procedure } = useContext(ProcedureContext);

  return (
    <div className="p-10 border-r border-gray-400 min-w-[205px]">
      <div className="relative after:content-[''] after:w-[1px] after:h-full after:bg-gray-400 after:absolute after:left-4 after:-z-10 after:top-0">
        {procedure.map((item, index: number) => {
          const { title, isActive, isDone } = item;
          return (
            <button
              disabled={!isDone}
              key={title}
              className="flex gap-3 mb-8"
              onClick={() => handleProcedureClick(title)}
            >
              <div
                className={
                  isActive ? "add-new-step-index-active" : "add-new-step-index"
                }
              >
                {isDone ? "✓" : index + 1}
              </div>
              <div
                className={
                  isActive ? "black leading-8" : "text-gray-400 leading-8"
                }
              >
                {title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
