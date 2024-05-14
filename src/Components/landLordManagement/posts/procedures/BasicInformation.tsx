import { useContext,  useState } from "react";
import { useForm } from "react-hook-form";
import cities from "../../../../constants/locations/cities";
import houseTypes from "../../../../constants/houseTypes";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

export default function BasicInformation() {
  const [isNameFocused, setIsNameFocused] = useState(false); 
  const [isCityFocused, setIsCityFocused] = useState(false); 
  const [isDistrictFocused, setIsDistrictFocused] = useState(false); 
  const [isRoadFocused, setIsRoadFocused] = useState(false); 
  const [isTypeFocused, setIsTypeFocused] = useState(false); 
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      city: "高雄市",
      district: "新興區",
      road: "",
      lane: "",
      alley: "",
      number: "",
      floor: "",
      floorTotal: "",
      type: "",
      ping: "",
      roomNumbers: "",
      livingRoomNumbers: "",
      bathRoomNumbers: "",
      balconyNumbers: "",
      parkingSpaceNumbers: ""
    }
  });
  const selectedCity = watch("city");
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);
  const onSubmit = () => {
    handleProcedureDone(0);
    handleProcedureClick("照片");
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title">基本資訊</h3>
      <form className="layout-grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 mt-2.5">
          <div
            tabIndex={0}
            className={`relative flex w-full p-3 rounded-[4px] ${
              isNameFocused ? "border-Brand-30 border-2" : "border-black border"
            }`}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
          >
            <input
              type="text"
              id="name"
              className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
              placeholder=""
              maxLength={12}
            />
            <label
              htmlFor="name"
              className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              房源名稱
            </label>
          </div>
          <p className="text-sans-caption pt-1 pl-5">最多12中文字元</p>
        </div>
        <div className="col-span-4 mt-2.5">
          <div
            tabIndex={0}
            className={`relative flex w-full p-3 rounded-[4px] ${
              isCityFocused ? "border-Brand-30 border-2" : "border-black border"
            }`}
            onFocus={() => setIsCityFocused(true)}
            onBlur={() => setIsCityFocused(false)}
          >
            <select
              id="city"
              className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
              {...register("city")}
            >
              {cities.map(({ city }) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                )
              )}
            </select>
            <label
              htmlFor="city"
              className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              縣市
            </label>
          </div>
        </div>
        <div className="col-span-4 mt-2.5">
          <div
            tabIndex={0}
            className={`relative flex w-full p-3 rounded-[4px] ${
              isDistrictFocused ? "border-Brand-30 border-2" : "border-black border"
            }`}
            onFocus={() => setIsDistrictFocused(true)}
            onBlur={() => setIsDistrictFocused(false)}
          >
            <select
              id="district"
              className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
            >
              {cities
                .find((item) => item.city === selectedCity) 
                ?.districts.map((district) => (
                <option value={district} key={district}>
                  {district}
                </option>
              ))}
            </select>
            <label
              htmlFor="district"
              className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              區域
            </label>
          </div>
        </div>
        <div className="col-span-4 mt-2.5">
          <div
            tabIndex={0}
            className={`relative flex w-full p-3 rounded-[4px] ${
              isRoadFocused ? "border-Brand-30 border-2" : "border-black border"
            }`}
            onFocus={() => setIsRoadFocused(true)}
            onBlur={() => setIsRoadFocused(false)}
          >
            <input
              type="text"
              id="road"
              className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
              placeholder=""
            />
            <label
              htmlFor="road"
              className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              路街
            </label>
          </div>
        </div>
        <div className="col-span-12 mt-2.5 flex gap-6">
          <div className="add-new-input-block">
            <input
              type="number"
              id="lane"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="lane" className="text-sans-body1 shrink-0">
              巷
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="alley"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="alley" className="text-sans-body1 shrink-0">
              弄
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="number"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="number" className="text-sans-body1 shrink-0">
              號
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="text"
              id="floor"
              className="add-new-input"
              placeholder="2、1、B1 ..."
            />
            <label htmlFor="floor" className="text-sans-body1 shrink-0">
              樓層
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="floorTotal"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="floorTotal" className="text-sans-body1 shrink-0">
              總樓數
            </label>
          </div>
        </div>
        <div className="col-span-6 mt-2.5">
          <div
            tabIndex={0}
            className={`relative flex w-full p-3 rounded-[4px] ${
              isTypeFocused ? "border-Brand-30 border-2" : "border-black border"
            }`}
            onFocus={() => setIsTypeFocused(true)}
            onBlur={() => setIsTypeFocused(false)}
          >
            <select
              id="type"
              className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
            >
              {houseTypes.map(type => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
            <label
              htmlFor="type"
              className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              類型
            </label>
          </div>
        </div>
        <div className="col-span-6 mt-2.5">
          <div className="add-new-input-block">
            <input
              type="number"
              id="ping"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="ping" className="text-sans-body1 shrink-0">
              可使用坪數
            </label>
          </div>
        </div>
        <p className=" col-span-12 text-sans-body1">格局</p>
        <div className="col-span-12 -mt-1.5 flex gap-6">
          <div className="add-new-input-block">
            <input
              type="number"
              id="roomNumbers"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="roomNumbers" className="text-sans-body1 shrink-0">
              房
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="livingRoomNumbers"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="livingRoomNumbers" className="text-sans-body1 shrink-0">
              廳
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="bathRoomNumbers"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="bathRoomNumbers" className="text-sans-body1 shrink-0">
              衛浴
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="balconyNumbers"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="balconyNumbers" className="text-sans-body1 shrink-0">
              陽台
            </label>
          </div>
          <div className="add-new-input-block">
            <input
              type="number"
              id="parkingSpaceNumbers"
              className="add-new-input"
              placeholder="數字"
            />
            <label htmlFor="parkingSpaceNumbers" className="text-sans-body1 shrink-0">
              車位
            </label>
          </div>
        </div>
        <div className="col-span-12 pt-10 flex justify-between">
          <button disabled type="button" className="filled-button-m-disable pr-3">
            <span className="material-symbols-outlined">chevron_left</span>
            <span>上一步</span>
          </button>
          <button type="submit" className="filled-button-m pl-3">
            <span>下一步</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </form>
    </div>
  );
}
