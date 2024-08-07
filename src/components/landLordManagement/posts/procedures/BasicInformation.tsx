import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import { apiHouseLandlordPostStep } from "../../../../apis/apis";
import BigLoading from "../../../loading/BigLoading";
// 欄位所需之靜態資料
import cities from "../../../../constants/locations/cities";
import houseTypes from "../../../../constants/searchFormCondition/houseTypes";
import { setFormData } from "../../../../../redux/post/basicInformationSlice";
// 地址轉換經緯度
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api"

// 定義送出基本資料的型別
export type basicInformationDataType = {
  name: string;
  city: string;
  district: string;
  road: string;
  lane: string;
  alley: string;
  number: string;
  floor: string;
  floorTotal: string;
  type: string;
  ping: string;
  roomNumbers: string;
  livingRoomNumbers: string;
  bathRoomNumbers: string;
  balconyNumbers: string;
  parkingSpaceNumbers: string;
}

export default function BasicInformation() {
  // 判斷是否載入成功
  useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector(
    (store: RootState) => store.basicInformationContent
  );

  // 控制欄位focus的狀態
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const [isDistrictFocused, setIsDistrictFocused] = useState(false);
  const [isRoadFocused, setIsRoadFocused] = useState(false);
  const [isTypeFocused, setIsTypeFocused] = useState(false);
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<basicInformationDataType>({
    defaultValues: {
      // 基本資訊欄位預設值
      name: formData.name,
      city: formData.city,
      district: formData.district,
      road: formData.road,
      lane: formData.lane,
      alley: formData.alley,
      number: formData.number,
      floor: formData.floor,
      floorTotal: formData.floorTotal,
      type: formData.type,
      ping: formData.ping,
      roomNumbers: formData.roomNumbers,
      livingRoomNumbers: formData.livingRoomNumbers,
      bathRoomNumbers: formData.bathRoomNumbers,
      balconyNumbers: formData.balconyNumbers,
      parkingSpaceNumbers: formData.parkingSpaceNumbers,
    },
  });
  const selectedCity = watch("city");

  // 將地址轉成經緯度
  const getAbsolutePosition = async (address: string) => {
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    const absolutePosition = {
      longitude: lng.toString(),
      latitude: lat.toString(),
    }
    return absolutePosition;
  }

  const onSubmit = (data: basicInformationDataType) => {
    setLoading(true);
    dispatch(setFormData(data));
    
    // 打 API 送出基本資訊（ALO-3)
    const patchData = async () => {
      const houseId = localStorage.getItem("houseId");
      try {
        const address = `${data.city + data.district + data.road + data.lane}巷${data.alley}弄${data.number}號`;
        const position = await getAbsolutePosition(address);
        const newData = {
          ...data,
          longitude: position.longitude, // 經度
          latitude: position.latitude, // 緯度
          status: "完成步驟1",
        };
        const res = await apiHouseLandlordPostStep(newData, houseId);
        if (res.data.Status === false) {
          throw new Error(res.data.Message);
        }
        setLoading(false);
        handleProcedureDone(0);
        handleProcedureClick("照片");
      } catch (error: any) {
        localStorage.clear();
        if (error.response.status === 401) {
          alert(`錯誤回報：401\n請洽 howoh好窩網路管理員`);
        } else {
          alert(error);
        }
        navigate("/");
      }
    };
    patchData();
  };
  return (
    <>
      {loading && <BigLoading />}
      <div className="p-5">
        <h3 className="add-new-title">基本資訊</h3>
        <form className="layout-grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-12 mt-2.5">
            <div
              tabIndex={0}
              className={`relative flex w-full p-3 rounded ${
                errors.name
                  ? "border-Alert-50 border"
                  : isNameFocused
                  ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
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
                {...register("name", {
                  required: { value: true, message: "必填欄位" },
                  maxLength: { value: 12, message: "最多12中文字元" },
                })}
              />
              <label
                htmlFor="name"
                className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
              >
                房源名稱
              </label>
            </div>
            {errors.name ? (
              <p className="post-alert">{errors.name?.message}</p>
            ) : (
              <p className="text-sans-caption pt-1 pl-5">最多12中文字元</p>
            )}
          </div>
          <div className="col-span-4 mt-2.5">
            <div
              tabIndex={0}
              className={`relative flex w-full p-3 rounded ${
                errors.city
                  ? "border-Alert-50 border"
                  : isCityFocused
                  ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
              }`}
              onFocus={() => setIsCityFocused(true)}
              onBlur={() => setIsCityFocused(false)}
            >
              <select
                id="city"
                className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                {...register("city", {
                  required: { value: true, message: "必填欄位" },
                })}
              >
                {cities.map(({ city }) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label
                htmlFor="city"
                className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
              >
                縣市
              </label>
            </div>
            {errors.city ? (
              <p className="post-alert">{errors.city?.message}</p>
            ) : null}
          </div>
          <div className="col-span-4 mt-2.5">
            <div
              tabIndex={0}
              className={`relative flex w-full p-3 rounded ${
                errors.district
                  ? "border-Alert-50 border"
                  : isDistrictFocused
                  ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
              }`}
              onFocus={() => setIsDistrictFocused(true)}
              onBlur={() => setIsDistrictFocused(false)}
            >
              <select
                id="district"
                className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                {...register("district", {
                  required: { value: true, message: "必填欄位" },
                })}
              >
                {
                  /* 監聽所在縣市，並顯示該縣市的區域 */
                  cities
                    .find(item => item.city === selectedCity)
                    ?.districts.map(district => (
                      <option value={district} key={district}>
                        {district}
                      </option>
                    ))
                }
              </select>
              <label
                htmlFor="district"
                className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
              >
                區域
              </label>
            </div>
            {errors.district ? (
              <p className="post-alert">{errors.district?.message}</p>
            ) : null}
          </div>
          <div className="col-span-4 mt-2.5">
            <div
              tabIndex={0}
              className={`relative flex roun w-full p-3 rounded ${
                errors.road
                  ? "border-Alert-50 border"
                  : isRoadFocused
                  ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
              }`}
              onFocus={() => setIsRoadFocused(true)}
              onBlur={() => setIsRoadFocused(false)}
            >
              <input
                type="text"
                id="road"
                className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                placeholder=""
                {...register("road", {
                  required: { value: true, message: "必填欄位" },
                })}
              />
              <label
                htmlFor="road"
                className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
              >
                路街
              </label>
            </div>
            {errors.road ? (
              <p className="post-alert">{errors.road?.message}</p>
            ) : null}
          </div>
          <div className="col-span-12 mt-2.5 flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="lane"
                  className={`add-new-input ${
                    errors.lane ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("lane", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label htmlFor="lane" className="text-sans-body1 shrink-0">
                  巷
                </label>
              </div>
              {errors.lane ? (
                <p className="post-alert">{errors.lane?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="alley"
                  className={`add-new-input ${
                    errors.alley ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("alley", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label htmlFor="alley" className="text-sans-body1 shrink-0">
                  弄
                </label>
              </div>
              {errors.alley ? (
                <p className="post-alert">{errors.alley?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="number"
                  className={`add-new-input ${
                    errors.number ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("number", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label htmlFor="number" className="text-sans-body1 shrink-0">
                  號
                </label>
              </div>
              {errors.number ? (
                <p className="post-alert">{errors.number?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="floor"
                  className={`add-new-input ${
                    errors.floor ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="2、1、B1 ..."
                  {...register("floor", {
                    pattern: {
                      value: /^[0-9a-zA-Z]*$/,
                      message: "請輸入數字或英文",
                    },
                  })}
                />
                <label htmlFor="floor" className="text-sans-body1 shrink-0">
                  樓層
                </label>
              </div>
              {errors.floor ? (
                <p className="post-alert">{errors.floor?.message}</p>
              ) : (
                <p className="text-sans-caption pt-1 pl-5">
                  地下樓層填B1、B2...
                </p>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="floorTotal"
                  className={`add-new-input ${
                    errors.floorTotal ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("floorTotal", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="floorTotal"
                  className="text-sans-body1 shrink-0"
                >
                  總樓數
                </label>
              </div>
              {errors.floorTotal ? (
                <p className="post-alert">{errors.floorTotal?.message}</p>
              ) : null}
            </div>
          </div>
          <div className="col-span-6 mt-2.5">
            <div
              tabIndex={0}
              className={`relative flex roun w-full p-3 rounded ${
                errors.type
                  ? "border-Alert-50 border"
                  : isTypeFocused
                  ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
              }`}
              onFocus={() => setIsTypeFocused(true)}
              onBlur={() => setIsTypeFocused(false)}
            >
              <select
                id="type"
                className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                {...register("type", {
                  required: { value: true, message: "必填欄位" },
                })}
              >
                {houseTypes.map(house => (
                  <option value={house.content} key={house.typeNumber}>
                    {house.content}
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
            {errors.type ? (
              <p className="post-alert">{errors.type?.message}</p>
            ) : null}
          </div>
          <div className="col-span-6 mt-2.5">
            <div className="add-new-input-block">
              <input
                type="number"
                id="ping"
                className={`add-new-input ${
                  errors.ping ? "border-Alert-50 border" : ""
                }`}
                placeholder="數字"
                {...register("ping", {
                  required: { value: true, message: "必填欄位" },
                  min: { value: 0, message: "請輸入大於 0 的數字" },
                  pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                })}
              />
              <label htmlFor="ping" className="text-sans-body1 shrink-0">
                可使用坪數
              </label>
            </div>
            {errors.ping ? (
              <p className="post-alert">{errors.ping?.message}</p>
            ) : null}
          </div>
          <p className=" col-span-12 text-sans-body1">格局</p>
          <div className="col-span-12 -mt-1.5 flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="roomNumbers"
                  className={`add-new-input ${
                    errors.roomNumbers ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("roomNumbers", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="roomNumbers"
                  className="text-sans-body1 shrink-0"
                >
                  房
                </label>
              </div>
              {errors.roomNumbers ? (
                <p className="post-alert">{errors.roomNumbers?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="livingRoomNumbers"
                  className={`add-new-input ${
                    errors.livingRoomNumbers ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("livingRoomNumbers", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="livingRoomNumbers"
                  className="text-sans-body1 shrink-0"
                >
                  廳
                </label>
              </div>
              {errors.livingRoomNumbers ? (
                <p className="post-alert">
                  {errors.livingRoomNumbers?.message}
                </p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathRoomNumbers"
                  className={`add-new-input ${
                    errors.bathRoomNumbers ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("bathRoomNumbers", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="bathRoomNumbers"
                  className="text-sans-body1 shrink-0"
                >
                  衛浴
                </label>
              </div>
              {errors.bathRoomNumbers ? (
                <p className="post-alert">{errors.bathRoomNumbers?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="balconyNumbers"
                  className={`add-new-input ${
                    errors.balconyNumbers ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("balconyNumbers", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="balconyNumbers"
                  className="text-sans-body1 shrink-0"
                >
                  陽台
                </label>
              </div>
              {errors.balconyNumbers ? (
                <p className="post-alert">{errors.balconyNumbers?.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="parkingSpaceNumbers"
                  className={`add-new-input ${
                    errors.parkingSpaceNumbers ? "border-Alert-50 border" : ""
                  }`}
                  placeholder="數字"
                  {...register("parkingSpaceNumbers", {
                    min: { value: 0, message: "請輸入大於 0 的數字" },
                    pattern: { value: /^[0-9]*$/, message: "請輸入數字" },
                  })}
                />
                <label
                  htmlFor="parkingSpaceNumbers"
                  className="text-sans-body1 shrink-0"
                >
                  車位
                </label>
              </div>
              {errors.parkingSpaceNumbers ? (
                <p className="post-alert">
                  {errors.parkingSpaceNumbers?.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-span-12 pt-10 flex justify-between">
            <button
              disabled
              type="button"
              className="outline-button-m-disable pr-3 flex items-center"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              <span>上一步</span>
            </button>
            <button
              type="submit"
              className="filled-button-m pl-3 flex items-center"
            >
              <span>下一步</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
