import { Link } from "react-router-dom";
import { procedureListType } from "../../../types/procedureList";

export default function Post({procedure}:{procedure:procedureListType[]}) {
  return (
    <div className="col-span-10 col-start-2 flex justify-between">
      <h2 className="text-sans-b-h5">新增房源</h2>
      <div className="flex gap-6">
        <Link to="/landlord-management" className="outline-button-m">返回房源列表</Link>
        <button
          className={`${procedure[0].isActive ? "outline-button-m-disable" : "outline-button-m"} px-4`}
          disabled={procedure[0].isActive ? true : false}
          // 在基本資訊頁面時不可點擊刪除房源
          >刪除房源</button>
      </div>
    </div>
  );
}