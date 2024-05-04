import { useContext } from "react";
import { useForm } from "react-hook-form";
import cities from "../../constants/locations/cities";
import houseTypes from "../../constants/houseTypes";
import { ProcedureContext } from "../../Pages/LandlordManagementAddNew";

export default function BasicInformation() {
  const { register, handleSubmit, formState: {errors}, watch } = useForm();
  // const houseLoate = watch("houseLoate");
  const handleProcedure = useContext(ProcedureContext);
  const onSubmit = (data) => {
    handleProcedure("房源照片")
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-3xl mb-6">基本資訊</h3>
      <div className="add-new-input-block">
        <label htmlFor="houseTitle" className="text-sm">名稱</label>
        <input type="text" id="houseTitle" className="add-new-input" placeholder="信義國小套房 捷運3分鐘" {...register("houseTitle", { required: true })} />
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block">
          <label htmlFor="houseLoate" className="text-sm">縣市</label>
          <select id="houseLoate" className="add-new-input" {...register("houseLoate", { required: true })}>
            {
              cities.map(({city}) => {
                let isSelected;
                if (city === "高雄市") {
                  isSelected = true;
                }
                return <option value={city} key={city} selected={isSelected}>{city}</option>
              })
            }
          </select>
        </div>
        <div className="add-new-input-block">
          <label htmlFor="houseDistrict" className="text-sm">區域</label>
          <select id="houseDistrict" className="add-new-input" {...register("houseDistrict", { required: true })}>
            {
              cities.filter(({city}) => city === "高雄市")[0].districts.map((district) => <option value={district} key={district} >{district}</option>)
            }
          </select>
        </div>
        <div className="add-new-input-block">
          <label htmlFor="houseStreet" className="text-sm">路街</label>
          <input type="text" id="houseStreet" className="add-new-input" placeholder="中正三路" {...register("houseStreet", { required: true })} />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block after:content-['巷'] add-new-input-unit">
          <label htmlFor="houseLane" className="text-sm">巷</label>
          <input type="text" id="houseLane" className="add-new-input" placeholder="選填" {...register("houseLane")} />
        </div>
        <div className="add-new-input-block after:content-['弄'] add-new-input-unit">
          <label htmlFor="houseAlley" className="text-sm">弄</label>
          <input type="text" id="houseAlley" className="add-new-input" placeholder="選填" {...register("houseAlley")} />
        </div>
        <div className="add-new-input-block after:content-['號'] add-new-input-unit">
          <label htmlFor="houseNumber" className="text-sm">號</label>
          <input type="text" id="houseNumber" className="add-new-input" placeholder="23" {...register("houseNumber")} />
        </div>
        <div className="add-new-input-block">
          <label htmlFor="houseFloor" className="text-sm">樓層</label>
          <input type="number" id="houseFloor" className="add-new-input" placeholder="23" {...register("houseFloor", { min: 1})} />
        </div>
        <div className="add-new-input-block">
          <label htmlFor="houseTotalFloors" className="text-sm">總樓數</label>
          <input type="number" id="houseTotalFloors" className="add-new-input" placeholder="23" {...register("houseTotalFloors", { min: 1})} />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="add-new-input-block">
          <label htmlFor="houseType" className="text-sm">類型</label>
          <select id="houseType" className="add-new-input" {...register("houseType", { required: true })}>
            {
              houseTypes.map((type) => <option value={type} key={type} >{type}</option>)
            }
          </select>
        </div>
        <div className="add-new-input-block after:content-['坪'] add-new-input-unit">
          <label htmlFor="houseArea" className="text-sm">承租坪數</label>
          <input type="number" id="houseArea" className="add-new-input" placeholder="承租坪數" {...register("houseArea", { required: true, min: 1 })} />
        </div>
      </div>
      <div className="add-new-input-block">
        <label htmlFor="houseLayout" className="text-sm">格局</label>
        <div id="houseLayout" className="flex gap-6">
          <div className="w-full after:content-['房'] add-new-input-unit after:right-11">
            <select id="houseRoom" className="w-full add-new-input" {...register("houseRoom", { required: true })}>
            {
              [1,2,3,4,5].map((amount) => <option value={amount} key={amount} >{amount}</option>)
            }
            </select>
          </div>
          <div className="w-full after:content-['廳'] add-new-input-unit after:right-11">
            <select id="houseRoom" className="w-full add-new-input" {...register("houseRoom", { required: true })}>
            {
              [1,2,3,4,5].map((amount) => <option value={amount} key={amount} >{amount}</option>)
            }
            </select>
          </div>
          <div className="w-full after:content-['衛浴'] add-new-input-unit after:right-11">
            <select id="houseRoom" className="w-full add-new-input" {...register("houseRoom", { required: true })}>
            {
              [1,2,3,4,5].map((amount) => <option value={amount} key={amount} >{amount}</option>)
            }
            </select>
          </div>
          <div className="w-full after:content-['陽台'] add-new-input-unit after:right-11">
            <select id="houseRoom" className="w-full add-new-input" {...register("houseRoom", { required: true })}>
            {
              [1,2,3,4,5].map((amount) => <option value={amount} key={amount} >{amount}</option>)
            }
            </select>
          </div>
          <div className="w-full after:content-['車位'] add-new-input-unit after:right-11">
            <select id="houseRoom" className="w-full add-new-input" {...register("houseRoom", { required: true })}>
            {
              [1,2,3,4,5].map((amount) => <option value={amount} key={amount} >{amount}</option>)
            }
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className="add-new-btn">下一步</button>
    </form>
  );
}