import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Flowbite, Drawer } from "flowbite-react";
import NoResults from "../houseViewingManagement/NoResults";
import close from "../../../assets/imgs/icons/close.svg";
import ratingStarIcon from "../../../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import HouseViewingListSkeleton from "../houseViewingManagement/HouseViewingListSkeleton";
import houseImg from "../../../assets/imgs/tenantManagement/Rectangle 17.jpg";
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
    // const houseId = e.currentTarget.dataset.houseid;
    // setCurrentCardSelectedId(houseId);
    // setIsCardSelected({ ...isCardSelected, [`cardId${houseId}`]: true });
    setIsHouseOffCanvasOpen(true);
  };
  const handleOffCanvasClose = () => {
    // setIsCardSelected({
    //   ...isCardSelected,
    //   [`cardId${currentCardSelectedId}`]: false,
    // });
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
      <section className={`flex-grow ${isAPIProcessing ? "" : "pb-[130px]"}`}>
        <div className="container layout-grid">
          <div className="col-span-7 ">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mb-6 pb-[26px] border-b border-Neutral-95">
                <button
                  type="button"
                  className="flex items-center gap-x-2 outline-button-m"
                >
                  重新整理
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="hover:fill-white"
                  >
                    <path
                      d="M11.5312 7.00051H15.4632C15.5107 7.00053 15.5572 7.01408 15.5973 7.03958C15.6373 7.06508 15.6693 7.10147 15.6895 7.14449C15.7096 7.18751 15.7171 7.23538 15.711 7.28249C15.7049 7.32961 15.6856 7.37401 15.6552 7.41051L13.6892 9.77051C13.6657 9.79865 13.6363 9.82128 13.6032 9.83682C13.57 9.85235 13.5338 9.8604 13.4972 9.8604C13.4605 9.8604 13.4243 9.85235 13.3912 9.83682C13.358 9.82128 13.3286 9.79865 13.3052 9.77051L11.3392 7.41051C11.3088 7.37401 11.2894 7.32961 11.2833 7.28249C11.2772 7.23538 11.2847 7.18751 11.3048 7.14449C11.325 7.10147 11.357 7.06508 11.3971 7.03958C11.4371 7.01408 11.4837 7.00053 11.5312 7.00051ZM0.531156 9.00051H4.46316C4.51066 9.0005 4.55718 8.98694 4.59726 8.96144C4.63734 8.93595 4.66932 8.89956 4.68947 8.85654C4.70961 8.81352 4.71709 8.76565 4.71101 8.71853C4.70493 8.67142 4.68556 8.62701 4.65516 8.59051L2.68916 6.23051C2.66569 6.20238 2.63633 6.17974 2.60316 6.16421C2.56998 6.14868 2.53379 6.14062 2.49716 6.14062C2.46052 6.14062 2.42434 6.14868 2.39116 6.16421C2.35798 6.17974 2.32862 6.20238 2.30516 6.23051L0.339156 8.59051C0.308754 8.62701 0.28938 8.67142 0.283304 8.71853C0.277227 8.76565 0.2847 8.81352 0.304846 8.85654C0.324992 8.89956 0.356977 8.93595 0.397058 8.96144C0.437138 8.98694 0.483653 9.0005 0.531156 9.00051Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.00294 2.99974C6.45094 2.99974 5.06294 3.70674 4.14594 4.81774C4.10499 4.87082 4.05379 4.91512 3.99538 4.948C3.93697 4.98089 3.87254 5.0017 3.80593 5.00919C3.73931 5.01668 3.67187 5.0107 3.60762 4.9916C3.54336 4.9725 3.48361 4.94068 3.4319 4.89803C3.38019 4.85537 3.33758 4.80275 3.30661 4.7433C3.27565 4.68385 3.25695 4.61878 3.25164 4.55195C3.24632 4.48513 3.2545 4.41792 3.27568 4.35432C3.29686 4.29073 3.33062 4.23204 3.37494 4.18174C4.10713 3.29527 5.07853 2.63776 6.1736 2.2874C7.26867 1.93704 8.44134 1.90859 9.55211 2.20543C10.6629 2.50227 11.665 3.11191 12.4393 3.96183C13.2137 4.81175 13.7276 5.8662 13.9199 6.99974H12.9029C12.6721 5.87055 12.0583 4.85574 11.1655 4.12689C10.2726 3.39804 9.15549 2.99989 8.00294 2.99974ZM3.10294 8.99974C3.29225 9.92437 3.73929 10.7766 4.39241 11.4579C5.04554 12.1392 5.8781 12.6218 6.7939 12.85C7.7097 13.0782 8.67138 13.0427 9.56783 12.7475C10.4643 12.4522 11.2589 11.9094 11.8599 11.1817C11.9009 11.1287 11.9521 11.0844 12.0105 11.0515C12.0689 11.0186 12.1333 10.9978 12.1999 10.9903C12.2666 10.9828 12.334 10.9888 12.3983 11.0079C12.4625 11.027 12.5223 11.0588 12.574 11.1015C12.6257 11.1441 12.6683 11.1967 12.6993 11.2562C12.7302 11.3156 12.7489 11.3807 12.7542 11.4475C12.7596 11.5144 12.7514 11.5816 12.7302 11.6452C12.709 11.7088 12.6753 11.7675 12.6309 11.8177C11.8987 12.7042 10.9273 13.3617 9.83227 13.7121C8.7372 14.0624 7.56454 14.0909 6.45376 13.7941C5.34299 13.4972 4.34084 12.8876 3.56653 12.0377C2.79221 11.1877 2.27831 10.1333 2.08594 8.99974H3.10294Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              {/* 列表 */}
              {isAPIProcessing ? (
                <HouseViewingListSkeleton />
              ) : feedbackList.length > 0 ? (
                <ul>
                  {/* 租客未評、房東未評 */}
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
