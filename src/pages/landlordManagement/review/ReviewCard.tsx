import { useState } from "react";
import { CustomFlowbiteTheme, Drawer, Flowbite } from "flowbite-react";
import photo from "../../../assets/imgs/homePage/recommendation_picture_1.svg"
import close from "../../../assets/imgs/icons/close.svg";

export default function ReviewCard () {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
        "backdrop": "fixed inset-0 z-30 bg-transparent",
        "edge": "bottom-16",
        "position": {
          "right": {
            "on": "shadow-elevation-3 right-0 top-[64px] bottom-0 w-5/12 transform-none scrollbar-hide",
            "off": "right-0 top-[152px] h-screen w-5/12 translate-x-full"
          },
        }
      },
      "header": {
        "inner": {
          "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          "closeIcon": "h-4 w-4",
          "titleIcon": "me-2.5 h-4 w-4",
          "titleText": "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        },
        "collapsed": {
          "on": "hidden",
          "off": "block"
        }
      },
      "items": {
        "base": ""
      }
    }
  };

  const [isRentedOpen, setIsRentedOpen] = useState(false);
  const handleRentedCanvas = (bool: boolean) => setIsRentedOpen(bool);

  return (
    <>
      <li
        className="p-3 rounded-xl hover:bg-Landlord-99 flex gap-4"
        onClick={() => handleRentedCanvas(true)}
      >
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
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer className="bg-Neutral-99" open={isRentedOpen} onClose={() => handleRentedCanvas(false)} position="right">
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-10 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => handleRentedCanvas(false)}
                >
                  <img src={close} alt="close" />
                </button>
                <h3 className="text-sans-h5 mb-4">
                  評價
                </h3>
                <p className="text-sans-body2">請避免人身攻擊和謾罵字詞</p>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
    </>
  )
}