import { useForm } from "react-hook-form";
import cities from "../constants/locations/cities";

export default function AddNewData() {
  const { register, handleSubmit, formState: {errors} } = useForm();
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
              <label htmlFor="houseCity" className="text-sm">縣市</label>
              <select id="houseCity" className="add-new-input" {...register("houseCity", { required: true })}>
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
              <input type="text" id="houseDistrict" className="add-new-input" placeholder="新興區" {...register("houseDistrict", { required: true })} />
            </div>
            <div className="add-new-input-block">
              <label htmlFor="houseStreet" className="text-sm">路街</label>
              <input type="text" id="houseStreet" className="add-new-input" placeholder="中正三路" {...register("houseStreet", { required: true })} />
            </div>
          </div>
          {/* <div className="flex gap-6">
            <div className="add-new-input-block">
              <label htmlFor="houseLane" className="text-sm">巷</label>
              <input type="text" id="houseLane" className="add-new-input" placeholder="選填" {...register("houseLane", { required: true })} />
            </div>
            <div className="add-new-input-block">
              <label htmlFor="houseAlley" className="text-sm">弄</label>
              <input type="text" id="houseAlley" className="add-new-input" placeholder="選填" {...register("houseAlley", { required: true })} />
            </div>
            <div className="add-new-input-block">
              <label htmlFor="houseNumber" className="text-sm">號</label>
              <input type="text" id="houseNumber" className="add-new-input" placeholder="23" {...register("houseNumber", { required: true })} />
            </div>
          </div> */}
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