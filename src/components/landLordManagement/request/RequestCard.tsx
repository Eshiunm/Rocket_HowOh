import { useState } from "react";
import { Tooltip, Drawer } from "flowbite-react";
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";
import close from "../../../assets/imgs/icons/close.svg";
import photo from "../../../assets/imgs/homePage/recommendation_picture_1.svg"
import star from "../../../assets/imgs/icons/star.svg";

export default function RequestCard({status = "none"}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <li
        className={`p-3 mb-4 flex gap-4 rounded-xl hover:bg-Landlord-99 ${isOpen && "bg-Landlord-95"}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="w-36 h-24 rounded-2xl bg-Landlord-60">

        </div>
        <div>
          <div className="flex gap-3 mb-4">
            <h3 className="text-sans-b-h6">詹小美</h3>
            {
              status === "send" && (
                <div className="badge-s bg-Tenant-90">
                  <h5 className="pr-2 mr-2 border-r border-Tenant-70">租約邀請已送出</h5>
                  <time>2024年5月24日</time>
                </div>
              )
            }
            {
              status === "reject" && (
                <div className="badge-s bg-Alert-95">
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
            className="mt-auto mb-1 mr-2 letter-button-light border-b border-black hover:border-Neutral-30"
          >
            查看更多
            <img src={rightIcon_black} alt="rightIcon" />
          </button>
        </div>
      </li>
      <Drawer className="bg-Landlord-95" open={isOpen} onClose={handleClose} position="right">
        <Drawer.Items>
          <div className="layout-grid gap-4 mb-32">
            <div className="col-span-10 flex flex-col gap-6 items-end">
              <button
                type="button"
                onClick={handleClose}
              >
                <img src={close} alt="close" />
              </button>
              <button
                type="button"
                className="outline-button-m flex items-center gap-2"
              >
                隱藏租客
                <span className="material-symbols-outlined text-base">visibility_off</span>
              </button>
              <div className="w-full p-6 rounded-2xl bg-white">
                <div className="flex justify-between mb-3.5">
                  <div>
                    <span className="material-symbols-outlined text-Tenant-50 mb-6">face</span>
                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">租客</h4>
                    <h3 className="text-sans-b-h4 mb-3">詹小美</h3>
                    <div className="text-sans-body1 flex mb-2">
                      <h4 className="pr-2 mr-2 border-r border-Tenant-70">女</h4>
                      <h4>文教類</h4>
                    </div>
                    <a href="tel:+886-958-230-1239" className="text-sans-body1">0958-230-1239</a>
                  </div>
                  <div className="w-[186px] rounded-lg overflow-hidden">
                    <img src={photo} alt="tenant" className="w-full aspect-square block object-cover" />
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                    <h5 className="w-full text-Tenant-50 text-sans-b-body1">評價</h5>
                    <h4 className="text-sans-h4">4.8</h4>
                    <img src={star} alt="star" className="self-end" />
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                    <h5 className="w-full text-Tenant-50 text-sans-b-body1">則數</h5>
                    <h4 className="text-sans-h4">3</h4>
                    <h6 className="self-end">則</h6>
                  </div>
                </div>
                <div>
                  <h4 className="text-Landlord-40 text-sans-b-body1 mb-3">自我介紹</h4>
                  <p className="text-sans-body1">我是來自台中的補習班老師。最近決定轉職成為前端工程師，於是報名參加了高雄六角的培訓營！我希望能在開課前找到便宜、便利，而且能申請租屋補助的房源，同時也希望能遇到一位優質的房東。</p>
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-sans-b-h6 mb-4">房東評價</h4>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex flex-col gap-2">
                    <h5 className="text-sans-b-body1 text-Landlord-50">王太太</h5>
                    <time className="text-sans-body1">2023年4月22日</time>
                    <div className="flex gap-2">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                    </div>
                    <p className="mt-2 text-sans-body1">黃同學乾淨有禮貌，好租客！</p>
                  </div>
                  <div className="mt-4 pt-6 border-t border-Neutral-95">
                    <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">租客回覆</h5>
                    <p className="mt-2 text-sans-body1">謝謝王媽媽照顧！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}