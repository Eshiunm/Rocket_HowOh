import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import {
  houseFeatures,
  mainFeatures,
  nearByFacilities,
  transportations,
  equipments
} from "../../../../constants/featureList";
import { useDispatch, useSelector } from "react-redux";
import { setFacilities } from "../../../../../redux/post/facilitiesSlice";
import { RootState } from "../../../../../redux/store";
import { apiHouseLandlordPostStep } from "../../../../apis/apis";
import BigLoading from "../../../loading/BigLoading";

// 定義設備設施頁面資料的型別
export interface formDataType {
  isNearByDepartmentStore: boolean; 
	isNearBySchool: boolean; 
	isNearByMorningMarket: boolean; 
	isNearByNightMarket: boolean; 
	isNearByConvenientStore: boolean; 
	isNearByPark: boolean; 
	hasGarbageDisposal: boolean; 
	hasWindowInBathroom: boolean; 
	hasElevator: boolean; 
	hasAirConditioner: boolean; 
	hasWashingMachine: boolean; 
	hasRefrigerator: boolean; 
	hasCloset: boolean; 
	hasTableAndChair: boolean; 
	hasWaterHeater: boolean; 
	hasInternet: boolean; 
	hasBed: boolean; 
	hasTV: boolean; 
  kmAwayMRT?: string;  
  kmAwayLRT?: string;  
  kmAwayBusStation?: string;  
  kmAwayHSR?: string;  
  kmAwayTrainStation?: string; 
}

// 定義重點特色資料的型別
interface selectedMainFeaturesType {
  isRentSubsidy: boolean;
  isCookAllowed: boolean;
  isPetAllowed: boolean;
  isSTRAllowed: boolean;
}

// 定義交通資料的型別
interface selectedTransportationsType {
  isNearMRT: boolean;
  isNearLRT: boolean;
  isNearBusStation: boolean;
  isNearTrainStation: boolean;
  isNearHSR: boolean;
}

export default function Facilities() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { facilities } = useSelector( (store: RootState) => store.facilitiesContent);
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);

  // 狀態控制重點特色按鈕點擊情況
  const [selectedMainFeatures, setSelectedMainFeatures] = useState<selectedMainFeaturesType>({
    isRentSubsidy: facilities.isRentSubsidy,
    isCookAllowed: facilities.isCookAllowed,
    isPetAllowed: facilities.isPetAllowed,
    isSTRAllowed: facilities.isSTRAllowed,
  });
  // 狀態控制交通資料按鈕點擊情況
  const [selectedTransportations, setSelectedTransportations] = useState<selectedTransportationsType>({
    isNearMRT: facilities.isNearMRT,
    isNearLRT: facilities.isNearLRT,
    isNearBusStation: facilities.isNearBusStation,
    isNearTrainStation: facilities.isNearTrainStation,
    isNearHSR: facilities.isNearHSR,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<formDataType>({
    defaultValues: {
      isNearByDepartmentStore: facilities.isNearByDepartmentStore,
      isNearBySchool: facilities.isNearBySchool , 
      isNearByMorningMarket: facilities.isNearByMorningMarket, 
      isNearByNightMarket: facilities.isNearByNightMarket, 
      isNearByConvenientStore: facilities.isNearByConvenientStore,
      isNearByPark: facilities.isNearByPark,
      hasGarbageDisposal: facilities.hasGarbageDisposal,
      hasWindowInBathroom: facilities.hasWindowInBathroom,
      hasElevator: facilities.hasElevator,
      hasAirConditioner: facilities.hasAirConditioner,
      hasWashingMachine: facilities.hasWashingMachine,
      hasRefrigerator: facilities.hasRefrigerator,
      hasCloset: facilities.hasCloset,
      hasTableAndChair: facilities.hasTableAndChair,
      hasWaterHeater: facilities.hasWaterHeater,
      hasInternet: facilities.hasInternet,
      hasBed: facilities.hasBed,
      hasTV: facilities.hasTV,
      kmAwayMRT: facilities.kmAwayMRT, 
      kmAwayLRT: facilities.kmAwayLRT, 
      kmAwayBusStation: facilities.kmAwayBusStation, 
      kmAwayHSR: facilities.kmAwayHSR, 
      kmAwayTrainStation: facilities.kmAwayTrainStation,
    }
  });
  const onSubmit: SubmitHandler<formDataType> = (data : formDataType) => {
    setLoading(true);
    // 重組資料後送出
    const formData = {
      ...selectedMainFeatures,
      ...selectedTransportations,
      ...data,
    }
    dispatch(setFacilities(formData));
    const patchData = async () => {
      const houseId = localStorage.getItem("houseId");
      const newData = {
        ...formData,
        status: "完成步驟3"
      }
      try {
        const response = await apiHouseLandlordPostStep(newData, houseId);
        if (response.data.Status === false) {
          throw new Error(response.data.Message);
        }
        setLoading(false);
        handleProcedureDone(2);
        handleProcedureClick("費用");
      } catch (error: any) {
        localStorage.clear();
        if (error.response.status === 401) {
          alert(`錯誤回報：401\n請洽 howoh好窩網路管理員`);
        } else {
          alert(error);
        }
        navigate('/');
      }
    }
    patchData();
  };

  // 重點特色按鈕點擊狀態切換
  const handleButtonClick = (id: keyof selectedMainFeaturesType) : void => {
    setSelectedMainFeatures((prev) => {
      return {...prev, [id]: !prev[id]}
    });
  };

  // 點擊交通狀態切換
  const handleTransportationsClick = (id: keyof selectedTransportationsType) : void => {
    setSelectedTransportations((prev) => {
      return {...prev, [id]: !prev[id]}
    });
  };

  return (
    <>
      {
        loading && <BigLoading />
      }
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
                      {/* 被選到之交通出現距離輸入框 */}
                      <div className="col-span-3 flex items-center gap-2">
                        <input
                          type="number"
                          id={distance}
                          placeholder="距離"
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
    </>
  );
}
