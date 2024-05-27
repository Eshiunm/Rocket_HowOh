import { Tooltip } from "flowbite-react";
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";

export default function RequestCard({status = "none"}) {
  return (
    <li className="p-3 mb-4 flex gap-4 rounded-xl hover:bg-Landlord-95">
      <input
        type="checkbox"
        name=""
        id=""
        className="checkBox-black self-center"
      />
      <div className="w-36 h-24 rounded-2xl bg-Landlord-60">

      </div>
      <div>
        <div className="flex gap-3 mb-4">
          <h3 className="text-sans-b-h6">詹小美</h3>
          {
            status === "send" && (
              <div className="text-sans-caption flex bg-Tenant-90 px-2 py-0.5 rounded">
                <h5 className="pr-2 mr-2 border-r border-Tenant-70">租約邀請已送出</h5>
                <time>2024年5月24日</time>
              </div>
            )
          }
          {
            status === "reject" && (
              <div className="text-sans-caption flex bg-Alert-95 px-2 py-0.5 rounded">
                <h5 className="pr-2 mr-2 border-r border-Tenant-70">租約邀請已拒絕</h5>
                <time>2024年5月24日</time>
              </div>
            )
          }
          {
            status === "none" && false
          }
        </div>
        <div className="text-sans-body1 flex mb-2">
          <h4 className="pr-2 mr-2 border-r border-Tenant-70">女</h4>
          <h4>文教類</h4>
        </div>
        <a href="tel:+886-958-230-1239" className="text-sans-body1">0958-230-1239</a>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <Tooltip
          className="bg-Landlord-30 text-sans-body2 rounded-lg py-1 px-11 text-white text-center whitespace-pre-line"
          content={"租客申請預約時間"}
        >
          <time className="cursor-pointer">
            <span className="pr-2 mr-2 border-r border-Tenant-70">2024年5月18日</span>
            <span>12:00</span>
          </time>
        </Tooltip>
        <button
          type="button"
          className="mt-auto letter-button-light border-b border-black hover:border-Neutral-30"
        >
          查看更多
          <img src={rightIcon_black} alt="rightIcon" />
        </button>
      </div>
      
    </li>
  );
}