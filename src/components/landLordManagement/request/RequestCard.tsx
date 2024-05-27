import { useState } from "react";
import { Tooltip, Drawer, Sidebar, TextInput } from "flowbite-react";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";
import close from "../../../assets/imgs/icons/close.svg";

export default function RequestCard({status = "none"}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "fixed z-40 overflow-y-auto bg-Landlord-95 px-10 pt-10 transition-transform",
        "backdrop": "fixed inset-0 z-30 bg-transparent",
        "edge": "bottom-16",
        "position": {
          "right": {
            "on": "shadow-elevation-3 right-0 top-[152px] h-screen w-5/12 transform-none",
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

  return (
    <li className="p-3 mb-4 flex gap-4 rounded-xl hover:bg-Landlord-95">
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
          onClick={() => setIsOpen(true)}
        >
          查看更多
          <img src={rightIcon_black} alt="rightIcon" />
        </button>
        <Flowbite theme={{ theme: customTheme }}>
          <Drawer open={isOpen} onClose={handleClose} position="right">
            <Drawer.Items>
              <div className="layout-grid gap-5">
                <div className="col-span-7 flex flex-col items-end">
                  <button
                    onClick={handleClose}
                  >
                    <img src={close} alt="close" />
                  </button>
                </div>
              </div>
            </Drawer.Items>
          </Drawer>
        </Flowbite>
      </div>
      
    </li>
  );
}