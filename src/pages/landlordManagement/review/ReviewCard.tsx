import photo from "../../../assets/imgs/homePage/recommendation_picture_1.svg"

export default function ReviewCard () {
  return (
    <li className="p-3 rounded-xl hover:bg-Landlord-99 flex gap-4">
      <div className="w-[136px] h-[92px] rounded-2xl overflow-hidden">
        <img src={photo} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-sans-b-h6">房源名稱</h3>
        <div className="flex text-sans-body1">
          <h4 className="pr-2 mr-2 border-r border-Tenant-70">租客</h4>
          <span>租客姓名</span>
        </div>
        <div className="flex text-sans-body1">
          <h4 className="pr-2 mr-2 border-r border-Tenant-70">合約起迄</h4>
          <div className="flex gap-2">
            <time>2024年4月23日</time>
            至
            <time>2024年4月23日</time>
          </div>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        <div className="flex gap-2">
          <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Neutral-60">未評價</span>
          <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Landlord-60">您已評價</span>
          <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Brand-60">租客已評價</span>
        </div>
        <button type="button" className="filled-button-m flex gap-2 items-center">
          我要評價<span className="material-symbols-outlined text-base">arrow_forward_ios</span>
        </button>
      </div>
    </li>
  )
}