import { useForm } from "react-hook-form";

export default function AddNewData() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <main className="p-6 grow">
      <div className="p-6">
        <h3 className="text-3xl mb-6">基本資訊</h3>
        <form className="flex flex-col  gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-new-input-block">
            <label htmlFor="houseTitle" className="text-sm">名稱</label>
            <input type="text" id="houseTitle" className="add-new-input" placeholder="信義國小套房 捷運3分鐘" {...register("houseTitle", { required: true })} />
          </div>
          <button type="submit" className="self-start px-4 py-2 bg-slate-700 rounded-3xl text-white">下一步</button>
        </form>
      </div>
    </main>
  );
}