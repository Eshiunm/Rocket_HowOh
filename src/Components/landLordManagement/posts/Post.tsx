import { Link } from "react-router-dom";
export default function Post() {
  return (
    <div className="col-span-10 col-start-2 flex justify-between">
      <h2 className="text-sans-b-h5">新增房源</h2>
      <div className="flex gap-6">
        <Link to="/landlord-management" className="text-sans-b-body2 border border-black rounded-lg py-[8.5px] px-2">返回房源列表</Link>
        <button className="text-sans-b-body2 border border-black rounded-lg py-[8.5px] px-[13.5px]">刪除房源</button>
      </div>
    </div>
  );
}