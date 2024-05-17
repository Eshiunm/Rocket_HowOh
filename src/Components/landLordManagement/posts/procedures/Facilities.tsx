import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  houseFeatures,
  mainFeatures,
  nearByFacilities,
  transportations,
  equipments
} from "../../../../constants/featureList";

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = (data) => {
    const formData = {
      ...selectedMainFeatures,
      ...selectedTransportations,
      ...data,
    }
    console.log(formData)
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
                    {...register(id)}
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
                    {...register(id)}
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
                    {...register(id)}
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-sans-b-body1">交通</h5>
            {
              transportations.map(({id, title, distance}) => (
                <div className="col-span-3" key={id}>
                  <label
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
                  </label>
                  <label htmlFor={distance} className={`mt-[10px] ${
                    selectedTransportations[id] ? "" : "hidden"
                    }`}>
                    <div className="col-span-3 flex items-center gap-2">
                      <input
                        type="number"
                        id={distance}
                        className={`add-new-input ${
                          errors[distance] && "border-Alert-50 border focus:border-Alert-50 focus:border"
                        }`}
                        {...register(distance,{
                          required: { value: selectedTransportations[id], message: "必填欄位" }
                        })}
                      />
                      <span className="shrink-0">公尺</span>
                    </div>
                    {
                      errors[distance] && selectedTransportations[id] && (
                        <p className="post-alert">{errors[distance]?.message}</p>
                      )
                    }
                  </label>
                  {/* {
                    selectedTransportations[id] && (
                      <label htmlFor={distance} className="flex items-center gap-2 mt-[10px]">
                        <input
                          type="number"
                          id={distance}
                          className="add-new-input" />
                        <span className="shrink-0">公尺</span>
                      </label>
                    )
                  } */}
                </div>
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
  );
}
