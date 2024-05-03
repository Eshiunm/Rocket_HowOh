import { useForm } from "react-hook-form";
import cities from "../constants/locations/cities";

export default function AddNewData() {
  const { register, handleSubmit, formState: {errors}, watch } = useForm();
  const houseLoate = watch("houseLoate");
  const onSubmit = (data) => console.log(data);

  return (
    <main className="p-6 grow">
      <div className="p-6">
        <form className="flex flex-col  gap-6" onSubmit={handleSubmit(onSubmit)}>
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
              <input type="text" id="houseFloor" className="add-new-input" placeholder="23" {...register("houseFloor")} />
            </div>
            <div className="add-new-input-block">
              <label htmlFor="houseTotalFloors" className="text-sm">總樓數</label>
              <input type="text" id="houseTotalFloors" className="add-new-input" placeholder="23" {...register("houseTotalFloors")} />
            </div>
          </div>
          <button type="submit" className="self-start px-4 py-2 bg-slate-700 rounded-3xl text-white">下一步</button>
        </form>
        {
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
          // switch === step1 &&  <基本資料的form/>
        }
        
      </div>
    </main>
  );
}