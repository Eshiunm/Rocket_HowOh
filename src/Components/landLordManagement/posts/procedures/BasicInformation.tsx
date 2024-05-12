import { useContext } from "react";
import { useForm } from "react-hook-form";
import cities from "../../../../constants/locations/cities";
import houseTypes from "../../../../constants/houseTypes";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";

export default function BasicInformation() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      city: "高雄市",
      district: "",
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
    handleProcedureClick("房源照片");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="add-new-title">基本資訊</h3>
      <div className="add-new-input-block">
        <label htmlFor="name" className="text-sm">
          名稱
        </label>
        <input
          type="text"
          id="name"
          className="add-new-input"
          placeholder="信義國小套房 捷運3分鐘"
          {...register("name", { required: true, maxLength: 12 })}
        />
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block">
          <label htmlFor="city" className="text-sm">
            縣市
          </label>
          <select
            id="city"
            className="add-new-input"
            {...register("city", { required: true })}
          >
            {cities.map(({ city }) => (
                <option value={city} key={city}>
                  {city}
                </option>
              )
            )}
          </select>
        </div>
        <div className="add-new-input-block">
          <label htmlFor="district" className="text-sm">
            區域
          </label>
          <select
            id="district"
            className="add-new-input"
            {...register("district", { required: true })}
          >
            {cities
              .find((item) => item.city === selectedCity) 
              ?.districts.map((district) => (
              <option value={district} key={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="add-new-input-block">
          <label htmlFor="road" className="text-sm">
            路街
          </label>
          <input
            type="text"
            id="road"
            className="add-new-input"
            placeholder="中正三路"
            {...register("road", { required: true })}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block after:content-['巷'] add-new-input-unit">
          <label htmlFor="lane" className="text-sm">
            巷
          </label>
          <input
            type="number"
            id="lane"
            className="add-new-input"
            placeholder="選填"
            {...register("lane",{ min : 1 })}
          />
        </div>
        <div className="add-new-input-block after:content-['弄'] add-new-input-unit">
          <label htmlFor="alley" className="text-sm">
            弄
          </label>
          <input
            type="number"
            id="alley"
            className="add-new-input"
            placeholder="選填"
            {...register("alley",{ min : 1 })}
          />
        </div>
        <div className="add-new-input-block after:content-['號'] add-new-input-unit">
          <label htmlFor="number" className="text-sm">
            號
          </label>
          <input
            type="number"
            id="number"
            className="add-new-input"
            placeholder="23"
            {...register("number",{ min : 1 })}
          />
        </div>
        <div className="add-new-input-block">
          <label htmlFor="floor" className="text-sm">
            樓層
          </label>
          <input
            type="number"
            id="floor"
            className="add-new-input"
            {...register("floor", { min: 1 })}
          />
        </div>
        <div className="add-new-input-block">
          <label htmlFor="floorTotal" className="text-sm">
            總樓數
          </label>
          <input
            type="number"
            id="floorTotal"
            className="add-new-input"
            {...register("floorTotal", { min: 1 })}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block">
          <label htmlFor="type" className="text-sm">
            類型
          </label>
          <select
            id="type"
            className="add-new-input"
            {...register("type", { required: true })}
          >
            {houseTypes.map(type => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="add-new-input-block after:content-['可使用坪數'] add-new-input-unit">
          <label htmlFor="ping" className="text-sm">
            承租坪數
          </label>
          <input
            type="number"
            id="ping"
            className="add-new-input"
            placeholder="承租坪數"
            {...register("ping", { required: true, min: 1 })}
          />
        </div>
      </div>
      <div className="add-new-input-block">
        <label htmlFor="houseLayout" className="text-sm">
          格局
        </label>
        <div id="houseLayout" className="flex gap-6">
          <div className="w-full after:content-['房'] add-new-input-unit">
            <input
              type="number"
              id="roomNumbers"
              className="w-full add-new-input"
              {...register("roomNumbers")}
            />
          </div>
          <div className="w-full after:content-['廳'] add-new-input-unit">
            <input
              type="number"
              id="livingRoomNumbers"
              className="w-full add-new-input"
              {...register("livingRoomNumbers")}
            />
          </div>
          <div className="w-full after:content-['衛浴'] add-new-input-unit">
            <input
              type="number"
              id="bathRoomNumbers"
              className="w-full add-new-input"
              {...register("bathRoomNumbers")}
            />
          </div>
          <div className="w-full after:content-['陽台'] add-new-input-unit">
            <input
              type="number"
              id="balconyNumbers"
              className="w-full add-new-input"
              {...register("balconyNumbers")}
            />
          </div>
          <div className="w-full after:content-['車位'] add-new-input-unit">
            <input
              type="number"
              id="parkingSpaceNumbers"
              className="w-full add-new-input"
              {...register("parkingSpaceNumbers")}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="add-new-btn add-new-next-btn">
        下一步
      </button>
    </form>
  );
}
