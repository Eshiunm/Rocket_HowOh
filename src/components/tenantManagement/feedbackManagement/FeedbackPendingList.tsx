import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Flowbite, Drawer } from "flowbite-react";
import NoResults from "../houseViewingManagement/NoResults";
import close from "../../../assets/imgs/icons/close.svg";
import ratingStarIcon from "../../../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import HouseViewingListSkeleton from "../houseViewingManagement/HouseViewingListSkeleton";
import houseImg from "../../../assets/imgs/tenantManagement/Rectangle 17.jpg";
import RefreshBtn from "../../../components/buttons/RefreshBtn";
function FeedbackPendingList() {
  // offCanvas 樣式
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      root: {
        base: "fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
        backdrop: "fixed inset-0 z-30 bg-transparent",
        edge: "bottom-16",
        position: {
          right: {
            on: "shadow-elevation-3 right-0 top-[64px] bottom-0 w-5/12 transform-none scrollbar-hide",
            off: "right-0 top-[152px] h-screen w-5/12 translate-x-full",
          },
        },
      },
      header: {
        inner: {
          closeButton:
            "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          closeIcon: "h-4 w-4",
          titleIcon: "me-2.5 h-4 w-4",
          titleText:
            "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
        },
        collapsed: {
          on: "hidden",
          off: "block",
        },
      },
      items: {
        base: "",
      },
    },
  };
  const [isHouseOffCanvasOpen, setIsHouseOffCanvasOpen] = useState(false);
  const [isAPIProcessing, setIsAPIProcessing] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any>([]);

  const handleOffCanvasOpen = () => {
    setIsHouseOffCanvasOpen(true);
  };
  const handleOffCanvasClose = () => {
    setIsHouseOffCanvasOpen(false);
  };

  useEffect(() => {
    setIsAPIProcessing(false);
    setFeedbackList(["1"]);
  }, []);
  return (
    <>
      {/* offCanvas */}
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer
          className="bg-Neutral-99"
          open={isHouseOffCanvasOpen}
          onClose={handleOffCanvasClose}
          position="right"
        >
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-12 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={handleOffCanvasClose}
                >
                  <img src={close} alt="close" />
                </button>

                {/* 評價 */}
                <div className="bg-white p-5 border-b border-Neutral-95">
                  {/* 評價列表 */}
                  <ul className="flex flex-col gap-y-4">
                    <li className="p-4 rounded-lg bg-Neutral-99">
                      {/* card title */}
                      <div className="flex flex-col gap-y-2 mb-4">
                        <h4 className="text-sans-b-body1 text-Tenant-50">
                          李先生
                        </h4>
                        <h5 className="text-sans-b-body1">
                          信義國小套房 捷運3分鐘
                        </h5>
                        <span className="block">
                          2023年4月22日
                          <span className="inline-block h-full bg-Tenant-70 w-[1px] text-white mx-2">
                            |
                          </span>
                          2024年4月22日
                        </span>
                        {/* 評價的星星數 */}
                        <ul className="flex gap-x-2">
                          <li>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </li>
                          <li>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </li>
                          <li>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </li>
                          <li>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </li>
                          <li>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </li>
                        </ul>
                      </div>
                      {/* card body */}
                      <p className="mb-4">
                        王媽媽如同我高雄的媽媽，非常親切友善。
                        <br />
                        房源很讚，雖然不大，但住起來很舒適！
                      </p>
                      <div className="pt-6 border-t-2">
                        <h4 className="text-sans-b-body1 text-Landlord-50 mb-4">
                          房東回覆
                        </h4>
                        <p>謝謝你，回來高雄隨時歡迎來找我。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
      <section className={`${isAPIProcessing ? "" : "pb-[130px]"}`}>
        <div className="container layout-grid">
          <div className="col-span-7 ">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mb-6 pb-[26px] border-b border-Neutral-95">
                <RefreshBtn></RefreshBtn>
              </div>
              {/* 列表 */}
              {isAPIProcessing ? (
                <HouseViewingListSkeleton />
              ) : feedbackList.length > 0 ? (
                <ul>
                  {/* 租客未評、房東未評 */}
                  <li
                    tabIndex={0}
                    data-houseid="1"
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99 focus:bg-Tenant-95`}
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2">
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Neutral-60 rounded-lg">
                              待評價
                            </span>
                          </li>
                        </ul>
                        <div>
                          <button
                            type="button"
                            className="flex items-center gap-x-[10px] filled-button-m ml-auto"
                          >
                            <span className="text-sans-b-body1 text-white">
                              評價
                            </span>
                            <svg
                              className="fill-white"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 租客未評、房東已評 */}
                  <li
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99`}
                    data-houseid="1"
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2">
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Neutral-60 rounded-lg">
                              待評價
                            </span>
                          </li>
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Landlord-60 rounded-lg">
                              房東已評價
                            </span>
                          </li>
                        </ul>
                        <div>
                          <button
                            type="button"
                            className="flex items-center gap-x-[10px] filled-button-m ml-auto"
                          >
                            <span className="text-sans-b-body1 text-white">
                              我要評價
                            </span>
                            <svg
                              className="fill-white"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 租客已評、房東已評 */}
                  <li
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99`}
                    data-houseid="1"
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2">
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Brand-60 rounded-lg">
                              您已評價
                            </span>
                          </li>
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Landlord-60 rounded-lg">
                              房東已評價
                            </span>
                          </li>
                        </ul>
                        <div>
                          <button
                            type="button"
                            className="flex items-center gap-x-[10px] outline-button-m ml-auto fill-black  hover:fill-white"
                          >
                            <span className="text-sans-b-body1 ">查看評價</span>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 租客已評、房東未評or房東無法評 */}
                  <li
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99`}
                    data-houseid="1"
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2">
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Brand-60 rounded-lg">
                              您已評價
                            </span>
                          </li>
                        </ul>
                        <div>
                          <button
                            type="button"
                            className="flex items-center gap-x-[10px] outline-button-m ml-auto fill-black  hover:fill-white"
                          >
                            <span className="text-sans-b-body1 ">查看評價</span>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 租客無法評、房東已評 */}
                  <li
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99`}
                    data-houseid="1"
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2">
                          <li>
                            <span className="inline-block py-1 px-2 text-sans-body1 text-white bg-Landlord-60 rounded-lg">
                              房東已評價
                            </span>
                          </li>
                        </ul>
                        <div>
                          <button
                            type="button"
                            className="flex items-center gap-x-[10px] outline-button-m ml-auto fill-black  hover:fill-white"
                          >
                            <span className="text-sans-b-body1 ">查看評價</span>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* 雙方都沒評價 */}
                  <li
                    className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99`}
                    data-houseid="1"
                    onClick={handleOffCanvasOpen}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-x-4">
                        <div className="w-[136px] h-[92px] rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={houseImg}
                            alt="picture"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <h3 className="text-sans-b-h6">
                            信義國小套房 捷運3分鐘
                          </h3>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              房東
                            </span>
                            <span>王雅涵</span>
                          </p>
                          <p className="flex gap-x-2">
                            <span className="pr-2 border-r border-Tenant-70">
                              合約起迄
                            </span>
                            <span>2024年4月23日</span>至
                            <span>2025年4月22日</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <ul className="flex justify-end gap-x-2"></ul>
                        <div>
                          <button
                            type="button"
                            disabled={true}
                            className="flex items-center gap-x-[10px] outline-button-m ml-auto fill-black  hover:fill-white"
                          >
                            <span className="text-sans-b-body1 ">無評價</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* {feedbackList.map(({ description, appointmentCreateTime }: any) => (
                <li
                  key={appointmentCreateTime}
                  className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99 ${
                    isCardSelected[`cardId${description.detail[0].houseId}`] &&
                    "bg-Neutral-95"
                  }`}
                  data-houseid={description.detail[0].houseId}
                  onClick={handleOffcanvasOpen}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <div className="w-[136px] rounded-xl overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={
                            description.detail[0].houseImage[0].houseImagePath
                          }
                          alt="picture"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          {description.detail[0].houseTitle}
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>
                            {description.detail[0].landlordInfo.lastName +
                              description.detail[0].landlordInfo.firstName}
                          </span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>
                            {parseInt(
                              description.detail[0].houseRent
                            ).toLocaleString()}
                          </span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>
                            {description.detail[0].landlordInfo.phoneNumber}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          {getFormattedDate(appointmentCreateTime)}
                        </span>
                        <span>{getFormattedTime(appointmentCreateTime)}</span>
                      </p>
                      
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))} */}
                </ul>
              ) : (
                <NoResults />
              )}
              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    {feedbackList.length > 0
                      ? feedbackList.length >= 12
                        ? `顯示 1 至 12 筆 共 ${feedbackList.length} 筆`
                        : `顯示 1 至 ${feedbackList.length} 筆 共 ${feedbackList.length} 筆`
                      : "顯示 0 至 0 筆 共 0 筆"}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <svg
                        className="fill-white"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3539 2.14689C11.4005 2.19334 11.4374 2.24852 11.4626 2.30926C11.4878 2.37001 11.5008 2.43513 11.5008 2.50089C11.5008 2.56666 11.4878 2.63178 11.4626 2.69253C11.4374 2.75327 11.4005 2.80845 11.3539 2.85489L5.70692 8.50089L11.3539 14.1469C11.4478 14.2408 11.5006 14.3681 11.5006 14.5009C11.5006 14.6337 11.4478 14.761 11.3539 14.8549C11.26 14.9488 11.1327 15.0015 10.9999 15.0015C10.8671 15.0015 10.7398 14.9488 10.6459 14.8549L4.64592 8.85489C4.59935 8.80845 4.56241 8.75327 4.5372 8.69253C4.512 8.63178 4.49902 8.56666 4.49902 8.50089C4.49902 8.43513 4.512 8.37001 4.5372 8.30926C4.56241 8.24852 4.59935 8.19334 4.64592 8.14689L10.6459 2.14689C10.6924 2.10033 10.7475 2.06339 10.8083 2.03818C10.869 2.01297 10.9342 2 10.9999 2C11.0657 2 11.1308 2.01297 11.1916 2.03818C11.2523 2.06339 11.3075 2.10033 11.3539 2.14689Z"
                        />
                      </svg>
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <svg
                        className="fill-white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeedbackPendingList;
