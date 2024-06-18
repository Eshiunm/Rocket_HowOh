import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomFlowbiteTheme, Flowbite, Drawer } from "flowbite-react";
import { apiAppointmentTenantHistoryList } from "../../../apis/apis";
import landLordProfile from "../../../assets/imgs/SingleHousePage/landLordProfile.jpg";
import ratingStarIcon from "../../../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import landLordIcon from "../../../assets/imgs/SingleHousePage/landLordIcon.svg";
import NoResults from "./NoResults";
import close from "../../../assets/imgs/icons/close.svg";
function RentalHistoryList() {
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [historyListTotalCounts, setHistoryListTotalCounts] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}年${month}月${day}日`;
    return formattedDate;
  };
  const getFormatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
  };
  const getHistoryList = async (pageNumber:number) => {
    try {
      const response = await apiAppointmentTenantHistoryList(pageNumber);
      const historyList = response.data.data.orderList;
      const historyListTotalCounts = response.data.data.totalCount;
      const currentPageNumber = response.data.data.page;
      setHistoryList(historyList);
      setHistoryListTotalCounts(historyListTotalCounts);
      setCurrentPageNumber(currentPageNumber);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextPage = () =>{
    getHistoryList(currentPageNumber+1);
  }

  const handlePrevPage = () =>{
    getHistoryList(currentPageNumber-1);
  }
  const handleDrawerOpen = (e:MouseEvent<HTMLLIElement>) => {
    const orderId = e.currentTarget.dataset.orderid;
    console.log(orderId);
    setIsDrawerOpen(true);
  }
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }
  
  useEffect(() => {
    const defaultPageNumber = 1;
    getHistoryList(defaultPageNumber);
  }, []);
  return (
    <>
      {/* offCanvas */}
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer
          className="bg-Neutral-99"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          position="right"
        >
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-12 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <img src={close} alt="close" />
                </button>
                <div className="flex justify-between">
                  <span></span>
                  <Link
                    to="/tenant/feedbackManagement/feedbackPendingList"
                    className="flex items-center gap-x-2 filled-button-m fill-white"
                  >
                    前往評價
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.9999 2.5C13.9999 2.36739 13.9472 2.24021 13.8535 2.14645C13.7597 2.05268 13.6325 2 13.4999 2H7.4999C7.36729 2 7.24011 2.05268 7.14635 2.14645C7.05258 2.24021 6.9999 2.36739 6.9999 2.5C6.9999 2.63261 7.05258 2.75979 7.14635 2.85355C7.24011 2.94732 7.36729 3 7.4999 3H12.2929L2.1459 13.146C2.09941 13.1925 2.06254 13.2477 2.03738 13.3084C2.01222 13.3692 1.99927 13.4343 1.99927 13.5C1.99927 13.5657 2.01222 13.6308 2.03738 13.6916C2.06254 13.7523 2.09941 13.8075 2.1459 13.854C2.19239 13.9005 2.24758 13.9374 2.30832 13.9625C2.36906 13.9877 2.43416 14.0006 2.4999 14.0006C2.56564 14.0006 2.63074 13.9877 2.69148 13.9625C2.75222 13.9374 2.80741 13.9005 2.8539 13.854L12.9999 3.707V8.5C12.9999 8.63261 13.0526 8.75979 13.1463 8.85355C13.2401 8.94732 13.3673 9 13.4999 9C13.6325 9 13.7597 8.94732 13.8535 8.85355C13.9472 8.75979 13.9999 8.63261 13.9999 8.5V2.5Z"
                      />
                    </svg>
                  </Link>
                </div>
                {/* 承租資訊 */}
                <div className="flex flex-col gap-y-6 bg-white rounded-2xl p-6">
                  <h3 className="text-sans-b-h5">承租資訊</h3>
                  <h4 className="text-sans-b-h6">費用</h4>
                  <div className="flex gap-x-6">
                    <div className="w-full">
                      <span className="text-sans-body1">租金</span>
                      <p className="p-3 text-sans-body1 border-b border-Neutral-70">
                        15,000
                      </p>
                    </div>
                    <div className="w-full">
                      <span className="text-sans-body1">押金</span>
                      <p className="p-3 text-sans-body1 border-b border-Neutral-70">
                        2個月
                      </p>
                    </div>
                  </div>
                  <h4 className="text-sans-b-h6">租約起迄時間</h4>
                  <div className="flex gap-x-6">
                    <div className="w-full">
                      <span className="text-sans-body1">合約起始日</span>
                      <p className="p-3 text-sans-body1 border-b border-Neutral-70">
                        2024年4月23日
                      </p>
                    </div>
                    <div className="w-full">
                      <span className="text-sans-body1">合約終止日</span>
                      <p className="p-3 text-sans-body1 border-b border-Neutral-70">
                        2025年4月21日
                      </p>
                    </div>
                  </div>
                </div>
                {/* 房東基本資訊 */}
                <div className="bg-white rounded-2xl p-6">
                  <ul className="flex flex-col gap-y-6">
                    <li className="flex justify-between">
                      <div>
                        <img
                          src={landLordIcon}
                          alt="landLordIcon"
                          className="mb-4"
                        />
                        <h4 className="text-sans-b-body1 text-Landlord-40 mb-4">
                          房東
                        </h4>
                        <p>
                          <span className="text-sans-b-h3">王</span> 太太
                        </p>
                      </div>
                      <img
                        src={landLordProfile}
                        alt="landLordProfile"
                        className="rounded-2xl"
                      />
                    </li>
                    <li className="flex justify-between gap-x-3">
                      <div className="w-full shadow-elevation-2 rounded-lg p-4">
                        <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                          評價
                        </h5>
                        <p className="flex justify-between items-end">
                          <span className="text-sans-h4">4.8</span>
                          <img src={ratingStarIcon} alt="ratingStarIcon" />
                        </p>
                      </div>
                      <div className="w-full shadow-elevation-2 rounded-lg p-4">
                        <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                          則數
                        </h5>
                        <p className="flex justify-between items-end">
                          <span className="text-sans-h4">4</span>
                          <span>則</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h5 className="text-sans-b-body1 text-Landlord-50 mb-3">
                        自我介紹
                      </h5>
                      <p>
                        租客您好，我平日是一名忙碌的菜販，在高雄有一間出租套房。雖然房源不華美，但非常乾淨。若房間有問題，會即時修理，不用擔心。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
      <section className="flex-grow bg-Neutral-99 pt-8 pb-28">
        <div className="container layout-grid">
          <div className="col-span-7">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mt-2 pb-3 border-b border-Neutral-95 mb-6">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    {`${
                      historyListTotalCounts > 0
                        ? `顯示 1 至 ${historyListTotalCounts} 筆 共 ${historyListTotalCounts} 筆`
                        : ""
                    }`}
                    {`${
                      historyListTotalCounts > 12
                        ? `顯示 1 至 12 筆 共 ${historyListTotalCounts} 筆`
                        : ""
                    }`}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      disabled={
                        currentPageNumber === 1 || historyListTotalCounts === 0
                      }
                      className="flex gap-x-[10px] rounded-r-none items-center filled-button-s"
                      onClick={handlePrevPage}
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
                      disabled={
                        currentPageNumber ===
                          Math.floor(historyListTotalCounts / 12) ||
                        historyListTotalCounts <= 12
                      }
                      className="flex gap-x-[10px] rounded-l-none items-center filled-button-s"
                      onClick={handleNextPage}
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
              {historyList.length > 0 ? (
                <ul>
                  {historyList.map((houseData, index) => (
                    <li
                      key={index}
                      tabIndex={0}
                      className={`p-3 cursor-pointer hover:bg-Neutral-99 rounded-xl focus:bg-Neutral-95`}
                      data-orderid={houseData.orderInfo.orderId}
                      onClick={handleDrawerOpen}
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-x-4">
                          <div className="h-[124px] w-[136px] rounded-2xl overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={houseData.houseInfo.photo}
                              alt="picture"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <h3 className="text-sans-b-h6">
                              {houseData.houseInfo.name}
                            </h3>
                            <p className="flex gap-x-2">
                              <span className="pr-2 border-r border-Tenant-70">
                                合約起迄
                              </span>
                              <span>
                                {getFormattedDate(
                                  houseData.orderInfo.leaseStartTime
                                )}{" "}
                                至{" "}
                                {getFormattedDate(
                                  houseData.orderInfo.leaseEndTime
                                )}
                              </span>
                            </p>
                            <div className="flex gap-x-6">
                              <p className="flex gap-x-2">
                                <span className="pr-2 border-r border-Tenant-70">
                                  房東
                                </span>
                                <span>{houseData.landlordInfo.lastName}{houseData.landlordInfo.firstName
                                }</span>
                              </p>
                              <p className="flex gap-x-2">
                                <span className="pr-2 border-r border-Tenant-70">
                                  租金
                                </span>
                                <span>
                                  {parseInt(
                                    houseData.houseInfo.rent
                                  ).toLocaleString()}
                                </span>
                              </p>
                            </div>
                            <p className="flex gap-x-2">
                              <span className="pr-2 border-r border-Tenant-70">
                                電話
                              </span>
                              <span>
                                {getFormatPhoneNumber(
                                  houseData.landlordInfo.tel.toString()
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <ul className="flex justify-end">
                            <li>
                              <span
                                className={` rounded-lg px-2 py-1 
                                ${
                                  houseData.orderInfo.orderStatus ===
                                    "已承租" && "bg-Brand-90"
                                }
                                ${
                                  houseData.orderInfo.orderStatus ===
                                    "待評價" && "bg-Neutral-50 text-white"
                                }
                                ${
                                  houseData.orderInfo.orderStatus ===
                                    "已完成" && "bg-Neutral-99 text-Neutral-80"
                                }
                                `}
                              >
                                {houseData.orderInfo.orderStatus}
                              </span>
                            </li>
                          </ul>
                          <div className="flex justify-between">
                            <Link
                              to="/tenant/feedbackManagement/feedbackPendingList"
                              className={`flex items-center gap-x-2 filled-button-m fill-white ${
                                houseData.orderInfo.orderStatus !== "待評價"
                                  ? "hidden"
                                  : ""
                              }`}
                            >
                              前往評價
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.9999 2.5C13.9999 2.36739 13.9472 2.24021 13.8535 2.14645C13.7597 2.05268 13.6325 2 13.4999 2H7.4999C7.36729 2 7.24011 2.05268 7.14635 2.14645C7.05258 2.24021 6.9999 2.36739 6.9999 2.5C6.9999 2.63261 7.05258 2.75979 7.14635 2.85355C7.24011 2.94732 7.36729 3 7.4999 3H12.2929L2.1459 13.146C2.09941 13.1925 2.06254 13.2477 2.03738 13.3084C2.01222 13.3692 1.99927 13.4343 1.99927 13.5C1.99927 13.5657 2.01222 13.6308 2.03738 13.6916C2.06254 13.7523 2.09941 13.8075 2.1459 13.854C2.19239 13.9005 2.24758 13.9374 2.30832 13.9625C2.36906 13.9877 2.43416 14.0006 2.4999 14.0006C2.56564 14.0006 2.63074 13.9877 2.69148 13.9625C2.75222 13.9374 2.80741 13.9005 2.8539 13.854L12.9999 3.707V8.5C12.9999 8.63261 13.0526 8.75979 13.1463 8.85355C13.2401 8.94732 13.3673 9 13.4999 9C13.6325 9 13.7597 8.94732 13.8535 8.85355C13.9472 8.75979 13.9999 8.63261 13.9999 8.5V2.5Z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <NoResults />
              )}
              <div className="flex justify-between mt-4 pt-3 border-t border-Neutral-95">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    {`${
                      historyListTotalCounts > 0
                        ? `顯示 1 至 ${historyListTotalCounts} 筆 共 ${historyListTotalCounts} 筆`
                        : ""
                    }`}
                    {`${
                      historyListTotalCounts > 12
                        ? `顯示 1 至 12 筆 共 ${historyListTotalCounts} 筆`
                        : ""
                    }`}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      disabled={
                        currentPageNumber === 1 || historyListTotalCounts === 0
                      }
                      className="flex gap-x-[10px] rounded-r-none items-center filled-button-s"
                      onClick={handlePrevPage}
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
                      disabled={
                        currentPageNumber ===
                          Math.floor(historyListTotalCounts / 12) ||
                        historyListTotalCounts <= 12
                      }
                      className="flex gap-x-[10px] rounded-l-none items-center filled-button-s"
                      onClick={handleNextPage}
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

export default RentalHistoryList;
