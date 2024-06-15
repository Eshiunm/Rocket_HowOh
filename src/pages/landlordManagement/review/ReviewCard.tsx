import { useState } from "react";
import { CustomFlowbiteTheme, Drawer, Flowbite } from "flowbite-react";
import moment from 'moment-timezone';
import close from "../../../assets/imgs/icons/close.svg";
import MyReview from "../../../components/reviews/MyReview";
import HasReview from "../../../components/reviews/HasReview";
import HiddenReview from "../../../components/reviews/HiddenReview";
import { ReviewListType } from "./index";

export default function ReviewCard ({data}: {data: ReviewListType}) {
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

  const {orderInfo, commentInfo} = data;
  const canClick: boolean | null = (commentInfo.canComment || commentInfo.myComment || commentInfo.tenantComment) && true;
  console.log(orderInfo);
  console.log(commentInfo);

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const handleOffcanvasCanvas = (bool: boolean) => setIsOffcanvasOpen(bool);

  return (
    <>
      <li
        className={`p-3 rounded-xl flex gap-4 ${
          canClick && "cursor-pointer hover:bg-Landlord-99"
        }`}
        onClick={() => canClick && handleOffcanvasCanvas(true)}
      >
        <div className="w-[136px] h-[92px] rounded-2xl overflow-hidden">
          <img src={orderInfo.photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="text-sans-b-h6">{orderInfo.name}</h3>
          <div className="flex text-sans-body1">
            <h4 className="pr-2 mr-2 border-r border-Tenant-70">租客</h4>
            <span>{orderInfo.tenant || "非系統用戶"}</span>
          </div>
          <div className="flex text-sans-body1">
            <h4 className="pr-2 mr-2 border-r border-Tenant-70">合約起迄</h4>
            <div className="flex gap-2">
              <time>{moment(orderInfo.leaseStartTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
              至
              <time>{moment(orderInfo.leaseEndTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
            </div>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-between items-end">
          <div className="flex gap-2">
            {commentInfo.canComment && (
              <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Neutral-60">未評價</span>
            )}
            {!commentInfo.canComment && commentInfo.myComment && (
              <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Landlord-60">您已評價</span>
            )}
            {commentInfo.tenantComment && (
              <span className="px-1 py-0.5 rounded text-sans-caption text-white bg-Brand-60">租客已評價</span>
            )}
          </div>
          <button
            type="button"
            className={`flex gap-2 items-center ${
              canClick && !commentInfo.canComment ? "outline-button-m" : "filled-button-m"
            }`}
            disabled={!canClick}  
          >
            {
              commentInfo.canComment ? "我要評價"
              : !canClick ? "無評價"
              : "查看評價"
            }
            {
              canClick && <span className="material-symbols-outlined text-base">arrow_forward_ios</span>
            }
          </button>
        </div>
      </li>
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer className="bg-white" open={isOffcanvasOpen} onClose={() => handleOffcanvasCanvas(false)} position="right">
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-10 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => handleOffcanvasCanvas(false)}
                >
                  <img src={close} alt="close" />
                </button>
                <h3 className="text-sans-h5 mb-4">
                  評價
                </h3>
                <p className="text-sans-body2">請避免人身攻擊和謾罵字詞</p>
                <MyReview role="landlord" />
                <HasReview role="landlord" reviewRole="landlord" />
                <HasReview role="landlord" reviewRole="tenant" />
                <HiddenReview reviewRole="tenant" />
                {/* <MyReview role="tenant" />
                <HasReview role="tenant" reviewRole="tenant" />
                <HasReview role="tenant" reviewRole="landlord" />
                <HiddenReview reviewRole="landlord" /> */}
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
    </>
  )
}