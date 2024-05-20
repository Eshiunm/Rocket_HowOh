import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  houseFeatures,
  mainFeatures,
  nearByFacilities,
  transportations,
  equipments
} from "../../../../constants/featureList";
import { useDispatch } from "react-redux";
import { setFacilities } from "../../../../../redux/post/facilitiesSlice";

interface formDataType {
  isNearByDepartmentStore: boolean, 
	isNearBySchool: boolean, 
	isNearByMorningMarket: boolean, 
	isNearByNightMarket: boolean, 
	isNearByConvenientStore: boolean, 
	isNearByPark: boolean, 
	hasGarbageDisposal: boolean, 
	hasWindowInBathroom: boolean, 
	hasElevator: boolean, 
	hasAirConditioner: boolean, 
	hasWashingMachine: boolean, 
	hasRefrigerator: boolean, 
	hasCloset: boolean, 
	hasTableAndChair: boolean, 
	hasWaterHeater: boolean, 
	hasInternet: boolean, 
	hasBed: boolean, 
	hasTV: boolean, 
}

interface selectedMainFeaturesType {
  isRentSubsidy: boolean;
  isCookAllowed: boolean;
  isPetAllowed: boolean;
  isSTRAllowed: boolean;
}

interface selectedTransportationsType {
  isNearMRT: boolean;
  isNearLRT: boolean;
  isNearBusStation: boolean;
  isNearTrainStation: boolean;
  isNearHSR: boolean;
}

export default function Facilities() {
  const dispatch = useDispatch();
  // const content = useSelector( (store: RootState) => store.facilitiesContent);

  const [selectedMainFeatures, setSelectedMainFeatures] = useState<selectedMainFeaturesType>({
    isRentSubsidy: false,
    isCookAllowed: false,
    isPetAllowed: false,
    isSTRAllowed: false,
  });
  const [selectedTransportations, setSelectedTransportations] = useState<selectedTransportationsType>({
    isNearMRT: false,
    isNearLRT: false,
    isNearBusStation: false,
    isNearTrainStation: false,
    isNearHSR: false,
  });
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);

  const { register, handleSubmit, formState: { errors } } = useForm<formDataType>();
  const onSubmit: SubmitHandler<formDataType> = (data : formDataType) => {
    const formData = {
      ...selectedMainFeatures,
      ...selectedTransportations,
      ...data,
    }
    dispatch(setFacilities(formData));
    handleProcedureDone(2);
    handleProcedureClick("費用");
  };

  const handleButtonClick = (id: keyof selectedMainFeaturesType) : void => {
    setSelectedMainFeatures((prev) => {
      return {...prev, [id]: !prev[id]}
    });
  };
  const handleTransportationsClick = (id: keyof selectedTransportationsType) : void => {
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
                    selectedMainFeatures[id as keyof selectedMainFeaturesType]? "tab-button-m-select" : "tab-button-m"
                  }`}
                  onClick={() =>handleButtonClick(id as keyof selectedMainFeaturesType)}
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
            <h5 className="mt-6 col-span-12 text-Landlord-40 text-sans-b-body1">附近機能</h5>
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
                    {...register(id as keyof formDataType)}
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">屋源特色</h5>
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
                    {...register(id as keyof formDataType)}
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">設備</h5>
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
                    {...register(id as keyof formDataType)}
                  />
                  {title}
                </label>
              ))
            }
            <h5 className="mt-3 col-span-12 text-Landlord-40 text-sans-b-body1">交通</h5>
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
                        checked={selectedTransportations[id as keyof selectedTransportationsType]}
                        onChange={() => handleTransportationsClick(id as keyof selectedTransportationsType)}
                      />
                      {title}
                    </div>
                  </label>
                  <label htmlFor={distance} className={`mt-[10px] ${
                    selectedTransportations[id as keyof selectedTransportationsType] ? "" : "hidden"
                    }`}>
                    <div className="col-span-3 flex items-center gap-2">
                      <input
                        type="number"
                        id={distance}
                        className={`add-new-input ${
                          errors[distance as keyof formDataType] && "border-Alert-50 border focus:border-Alert-50 focus:border"
                        }`}
                        {...register(distance as keyof formDataType,{
                          required: { value: selectedTransportations[id as keyof selectedTransportationsType], message: "必填欄位" }
                        })}
                      />
                      <span className="shrink-0">公尺</span>
                    </div>
                    {
                      errors[distance as keyof formDataType] && selectedTransportations[id as keyof selectedTransportationsType] && (
                        <p className="post-alert">{errors[distance as keyof formDataType]?.message}</p>
                      )
                    }
                  </label>
                </div>
              ))
            }
          </div>
        </div>
        <div className="pt-10 flex justify-between">
          <button
            type="button"
            onClick={() => handleProcedureClick("照片")}
            className="outline-button-m pr-3 flex items-center">
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
