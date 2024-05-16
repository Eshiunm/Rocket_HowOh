import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import CheckBox from "../CheckBox";
import {
  houseFeatures,
  mainFeatures,
  nearByFacilities,
  transportations,
  equipments
} from "../../../../constants/featureList";
import CheckToShowInput from "../CheckToShowInput";

export default function Facilities() {
  const [selectedMainFeatures, setSelectedMainFeatures] = useState({
    isRentSubsidy: false,
    isCookAllowed: false,
    isPetAllowed: false,
    isSTRAllowed: false,
    
  });
  const [selectedTransportations, setSelectedTransportations] = useState({
    isNearMRT: false,
    isNearLRT: false,
    isNearBusStation: false,
    isNearTrainStation: false,
    isNearHSR: false,
  });
  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(2);
    handleProcedureClick("費用");
  };

  const handleButtonClick = (id) => {
    setSelectedMainFeatures((prev) => {
      return {...prev, [id]: !prev[id]}
    });
  };
  const handleTransportationsClick = (id) => {
    setSelectedTransportations((prev) => {
      return {...prev, [id]: !prev[id]}
    });
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title mb-10">設備設施</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <h4 className="text-sans-b-h6 mb-6">重點特色</h4>
          <div className="flex gap-6">
            {
              mainFeatures.map(({id, title, icon}) => (
                <button
                  key={id}
                  type="button"
                  className={`flex items-center gap-1 ${
                    selectedMainFeatures[id] === true ? "tab-button-m-select" : "tab-button-m"
                  }`}
                  onClick={() =>handleButtonClick(id)}
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
        <div className="mb-10">
          <h4 className="text-sans-b-h6">其他特色</h4>
          <div className="layout-grid gap-y-3">
            <h5 className="mt-6 col-span-12 text-sans-b-body1">附近機能</h5>
            {
              nearByFacilities.map(({id, title}) => (
                <label
                  key={id} 
                  htmlFor={id}
                  className="col-span-3 text-sans-body1 flex items-center cursor-pointer gap-2"
                >
                  <input
                    type="checkbox"
                    id={id}
                    className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-sans-b-body1">屋源特色</h5>
            {
              houseFeatures.map(({id, title}) => (
                <label
                  key={id} 
                  htmlFor={id}
                  className="col-span-3 text-sans-body1 flex items-center cursor-pointer gap-2"
                >
                  <input
                    type="checkbox"
                    id={id}
                    className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-sans-b-body1">設備</h5>
            {
              equipments.map(({id, title}) => (
                <label
                  key={id} 
                  htmlFor={id}
                  className="col-span-3 text-sans-body1 flex items-center cursor-pointer gap-2"
                >
                  <input
                    type="checkbox"
                    id={id}
                    className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-sans-b-body1">交通</h5>
            {
              transportations.map(({id, title}) => (
                <label
                  key={id} 
                  htmlFor={id}
                  className="col-span-3 text-sans-body1 cursor-pointer"
                >
                  <div className="flex items-center cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      id={id}
                      className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                      checked={selectedTransportations[id]}
                      onChange={() => handleTransportationsClick(id)}
                    />
                    {title}
                  </div>
                  {
                    selectedTransportations[id] && (
                      <label htmlFor={id+"number"} className="flex items-center gap-2 mt-[10px]">
                        <input type="number" id={id+"number"} className="add-new-input" />
                        <span className="shrink-0">公尺</span>
                      </label>
                    )
                  }
                </label>
              ))
            }
          </div>
        </div>
        <div className="pt-10 flex justify-between">
          <button type="button" className="outline-button-m pr-3 flex items-center">
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
    // <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
    //   <button
    //     type="button"
    //     className="self-start add-new-back-btn"
    //     onClick={() => handleProcedureClick("照片")}
    //   >
    //     上一步
    //   </button>
    //   <h3 className="add-new-title">重點特色</h3>
    //   <div>
    //     {mainFeatures.map(({ id, title }) => (
    //       <CheckBox id={id} title={title} register={register} key={id} />
    //     ))}
    //   </div>
    //   <h3 className="add-new-title">其他特色</h3>
    //   <div>
    //     <div>
    //       <h4 className="add-new-small-title">附近機能</h4>
    //       <div>
    //         {nearByFacilities.map(({ id, title }) => (
    //           <CheckBox id={id} title={title} register={register} key={id} />
    //         ))}
    //       </div>
    //     </div>
    //     <div>
    //       <h4 className="add-new-small-title">屋源特色</h4>
    //       <div>
    //         {houseFeatures.map(({ id, title }) => (
    //           <CheckBox id={id} title={title} register={register} key={id} />
    //         ))}
    //       </div>
    //     </div>
    //     <div>
    //       <h4 className="add-new-small-title">交通</h4>
    //       <div className="flex gap-6">
    //         {transportations.map(({ id, title }) => (
    //           <CheckToShowInput
    //             id={id}
    //             title={title}
    //             register={register}
    //             key={id}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <h3 className="add-new-title">設備</h3>
    //   <div>
    //     {equipments.map(({ id, title }) => (
    //       <CheckBox id={id} title={title} register={register} key={id} />
    //     ))}
    //   </div>
    //   <button type="submit" className="add-new-btn add-new-next-btn">
    //     下一步
    //   </button>
    // </form>
  );
}
