import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Flowbite, Drawer } from "flowbite-react";
import NoResults from "./NoResults";
import { apiAppointmentTenantInvitedList } from "../../../apis/apis";
import landLordProfile from "../../../assets/imgs/SingleHousePage/landLordProfile.jpg";
import ratingStarIcon from "../../../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import landLordIcon from "../../../assets/imgs/SingleHousePage/landLordIcon.svg";
import messageIcon from "../../../assets/imgs/tenantManagement/messageIcon.svg";
import close from "../../../assets/imgs/icons/close.svg";
function RentalInviteList() {
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
  const [isDrawdOpen, setIsDrawdOpen] = useState(false);
  const [inviteList, setInviteList] = useState<any>([]);
  const [currentCardSelectedId, setCurrentCardSelectedId] = useState("");
  const [isCardSelected, setIsCardSelected] = useState<any>({});
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    // 將日期轉換為 "xxxx年xx月xx日" 的格式
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() 返回的月份是 0-11，所以加 1
    const day = date.getDate();
    const formattedDate = `${year}年${month}月${day}日`;
    return formattedDate;
  };
  const getFormattedTime = (timeString: string) => {
    const time = new Date(timeString);
    // 將時間轉換為 24 小時制的格式
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  const handleDrawerOpen = (e: any) => {
    const houseId = e.currentTarget.dataset.houseid;
    const orderId = e.currentTarget.dataset.orderid;
    setCurrentCardSelectedId(houseId);
    setIsCardSelected({ ...isCardSelected, [`cardId${houseId}`]: true });
    setIsDrawdOpen(true);
  };
  const handleDrawerClose = () => {
    setIsCardSelected({
      ...isCardSelected,
      [`cardId${currentCardSelectedId}`]: false,
    });
    setIsDrawdOpen(false);
  };
  // 初始化租屋邀請清單
  useEffect(() => {
    const getInviteList = async () => {
      try {
        const defaultPageNumber = "1";
        const response = await apiAppointmentTenantInvitedList(
          defaultPageNumber
        );
        // 某個卡片被點擊，開啟offCanvas後，卡片要有 selected 效果
        const isCardSelected = response.data.reduce(
          (acc: any, { houseId }: any) => {
            acc[`cardId${houseId}`] = false;
            return acc;
          },
          {}
        );
        setIsCardSelected(isCardSelected);
        setInviteList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInviteList();
  }, []);
  return (
    <>
      {/* offCanvas */}
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer
          className="bg-Neutral-99"
          open={isDrawdOpen}
          onClose={handleDrawerClose}
          position="right"
        >
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-12 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => setIsDrawdOpen(false)}
                >
                  <img src={close} alt="close" />
                </button>
                <div className="flex justify-end gap-x-6">
                  <button className="flex items-center gap-x-2 outline-button-m hover:fill-white">
                    前往房源
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.9999 2.5C13.9999 2.36739 13.9472 2.24021 13.8535 2.14645C13.7597 2.05268 13.6325 2 13.4999 2H7.4999C7.36729 2 7.24011 2.05268 7.14635 2.14645C7.05258 2.24021 6.9999 2.36739 6.9999 2.5C6.9999 2.63261 7.05258 2.75979 7.14635 2.85355C7.24011 2.94732 7.36729 3 7.4999 3H12.2929L2.1459 13.146C2.09941 13.1925 2.06254 13.2477 2.03738 13.3084C2.01222 13.3692 1.99927 13.4343 1.99927 13.5C1.99927 13.5657 2.01222 13.6308 2.03738 13.6916C2.06254 13.7523 2.09941 13.8075 2.1459 13.854C2.19239 13.9005 2.24758 13.9374 2.30832 13.9625C2.36906 13.9877 2.43416 14.0006 2.4999 14.0006C2.56564 14.0006 2.63074 13.9877 2.69148 13.9625C2.75222 13.9374 2.80741 13.9005 2.8539 13.854L12.9999 3.707V8.5C12.9999 8.63261 13.0526 8.75979 13.1463 8.85355C13.2401 8.94732 13.3673 9 13.4999 9C13.6325 9 13.7597 8.94732 13.8535 8.85355C13.9472 8.75979 13.9999 8.63261 13.9999 8.5V2.5Z"
                      />
                    </svg>
                  </button>
                  <button className="flex items-center gap-x-2 outline-button-m hover:fill-white">
                    拒絕
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path d="M4.64689 4.64592C4.69334 4.59935 4.74851 4.56241 4.80926 4.5372C4.87001 4.512 4.93513 4.49902 5.00089 4.49902C5.06666 4.49902 5.13178 4.512 5.19253 4.5372C5.25327 4.56241 5.30845 4.59935 5.35489 4.64592L8.00089 7.29292L10.6469 4.64592C10.6934 4.59943 10.7486 4.56255 10.8093 4.53739C10.87 4.51223 10.9351 4.49929 11.0009 4.49929C11.0666 4.49929 11.1317 4.51223 11.1925 4.53739C11.2532 4.56255 11.3084 4.59943 11.3549 4.64592C11.4014 4.6924 11.4383 4.74759 11.4634 4.80833C11.4886 4.86907 11.5015 4.93417 11.5015 4.99992C11.5015 5.06566 11.4886 5.13076 11.4634 5.1915C11.4383 5.25224 11.4014 5.30743 11.3549 5.35392L8.70789 7.99992L11.3549 10.6459C11.4014 10.6924 11.4383 10.7476 11.4634 10.8083C11.4886 10.8691 11.5015 10.9342 11.5015 10.9999C11.5015 11.0657 11.4886 11.1308 11.4634 11.1915C11.4383 11.2522 11.4014 11.3074 11.3549 11.3539C11.3084 11.4004 11.2532 11.4373 11.1925 11.4624C11.1317 11.4876 11.0666 11.5005 11.0009 11.5005C10.9351 11.5005 10.87 11.4876 10.8093 11.4624C10.7486 11.4373 10.6934 11.4004 10.6469 11.3539L8.00089 8.70692L5.35489 11.3539C5.30841 11.4004 5.25322 11.4373 5.19248 11.4624C5.13174 11.4876 5.06664 11.5005 5.00089 11.5005C4.93515 11.5005 4.87005 11.4876 4.80931 11.4624C4.74857 11.4373 4.69338 11.4004 4.64689 11.3539C4.60041 11.3074 4.56353 11.2522 4.53837 11.1915C4.51321 11.1308 4.50026 11.0657 4.50026 10.9999C4.50026 10.9342 4.51321 10.8691 4.53837 10.8083C4.56353 10.7476 4.60041 10.6924 4.64689 10.6459L7.29389 7.99992L4.64689 5.35392C4.60033 5.30747 4.56339 5.2523 4.53818 5.19155C4.51297 5.13081 4.5 5.06568 4.5 4.99992C4.5 4.93415 4.51297 4.86903 4.53818 4.80828C4.56339 4.74754 4.60033 4.69236 4.64689 4.64592Z" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-x-2 filled-button-m fill-white">
                    接受
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path d="M12.7355 3.96993C12.8037 3.9003 12.8852 3.84498 12.9751 3.80722C13.065 3.76945 13.1615 3.75 13.259 3.75C13.3565 3.75 13.453 3.76945 13.5429 3.80722C13.6328 3.84498 13.7142 3.9003 13.7825 3.96993C14.0685 4.25893 14.0725 4.72593 13.7925 5.01993L7.87949 12.0099C7.81236 12.0837 7.73089 12.1429 7.64007 12.1841C7.54925 12.2252 7.45099 12.2474 7.3513 12.2493C7.25161 12.2511 7.15258 12.2327 7.06028 12.1949C6.96798 12.1572 6.88435 12.1011 6.81449 12.0299L3.21649 8.38393C3.07773 8.24242 3 8.05213 3 7.85393C3 7.65574 3.07773 7.46545 3.21649 7.32393C3.28474 7.2543 3.36619 7.19898 3.45608 7.16122C3.54597 7.12345 3.64249 7.104 3.73999 7.104C3.83749 7.104 3.93401 7.12345 4.0239 7.16122C4.11379 7.19898 4.19525 7.2543 4.26349 7.32393L7.31549 10.4169L12.7155 3.99193C12.7217 3.98421 12.7284 3.97686 12.7355 3.96993Z" />
                    </svg>
                  </button>
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
      <section className="bg-Neutral-99 pt-8 pb-28">
        <div className="container layout-grid">
          <div className="col-span-7">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mb-6 pl-3 pt-[14px] pb-[26px] border-b border-Neutral-95">
                <p className="flex gap-x-2 p-2 bg-Alert-95 rounded-lg">
                  <img src={messageIcon} alt="messageIcon" />
                  當您填寫承租資訊時，您可以在合約結束後與該租客互相評價
                </p>
              </div>
              {inviteList.length > 0 ? (
                <ul>
                  {inviteList.map(
                    ({
                      houseInfo,
                      houseId,
                      orderId,
                      leaseStartTime,
                      leaseEndTime,
                      orderCreateTime,
                    }: any) => (
                      <li
                        key={orderCreateTime}
                        className={`p-3 cursor-pointer hover:bg-Neutral-99 rounded-xl ${
                          isCardSelected[`cardId${houseId}`] && "bg-Neutral-95"
                        }`}
                        data-houseid={houseId}
                        data-orderid={orderId}
                        onClick={handleDrawerOpen}
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-x-4">
                            <div className="w-[136px] h-[124px] rounded-2xl overflow-hidden">
                              <img
                                src={
                                  houseInfo.houseDetail.housePhoto[0].photoPath
                                }
                                alt="previewPicture"
                              />
                            </div>
                            <div className="flex flex-col justify-between">
                              <h3 className="text-sans-b-h6">
                                {houseInfo.houseDetail.title}
                              </h3>
                              <p className="flex gap-x-2">
                                <span className="pr-2 border-r border-Tenant-70">
                                  合約起迄
                                </span>
                                <span>
                                  {getFormattedDate(leaseStartTime)} 至{" "}
                                  {getFormattedDate(leaseEndTime)}
                                </span>
                              </p>
                              <div className="flex gap-x-6">
                                <p className="flex gap-x-2">
                                  <span className="pr-2 border-r border-Tenant-70">
                                    房東
                                  </span>
                                  <span>王太太</span>
                                </p>
                                <p className="flex gap-x-2">
                                  <span className="pr-2 border-r border-Tenant-70">
                                    租金
                                  </span>
                                  <span>
                                    {parseInt(
                                      houseInfo.houseDetail.rent
                                    ).toLocaleString()}
                                  </span>
                                </p>
                              </div>
                              <p className="flex gap-x-2">
                                <span className="pr-2 border-r border-Tenant-70">
                                  電話
                                </span>
                                <span>
                                  {
                                    houseInfo.houseDetail.landlordInfo
                                      .phoneNumber
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <p
                              className="flex gap-x-2 cursor-pointer"
                              data-tooltip-target="tooltip-default"
                            >
                              <span className="pr-2 border-r border-Tenant-70">
                                {getFormattedDate(orderCreateTime)}
                              </span>
                              <span>{getFormattedTime(orderCreateTime)}</span>
                            </p>
                            {/* tooltip */}
                            <div
                              id="tooltip-default"
                              role="tooltip"
                              className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                            >
                              房東發送邀請的時間
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                            {/* 拒絕、接受 */}
                            <div className="flex justify-between">
                              <span></span>
                              <div className="flex gap-x-4">
                                <button className="flex items-center gap-x-2 outline-button-m hover:fill-white">
                                  拒絕
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4.64689 4.64592C4.69334 4.59935 4.74851 4.56241 4.80926 4.5372C4.87001 4.512 4.93513 4.49902 5.00089 4.49902C5.06666 4.49902 5.13178 4.512 5.19253 4.5372C5.25327 4.56241 5.30845 4.59935 5.35489 4.64592L8.00089 7.29292L10.6469 4.64592C10.6934 4.59943 10.7486 4.56255 10.8093 4.53739C10.87 4.51223 10.9351 4.49929 11.0009 4.49929C11.0666 4.49929 11.1317 4.51223 11.1925 4.53739C11.2532 4.56255 11.3084 4.59943 11.3549 4.64592C11.4014 4.6924 11.4383 4.74759 11.4634 4.80833C11.4886 4.86907 11.5015 4.93417 11.5015 4.99992C11.5015 5.06566 11.4886 5.13076 11.4634 5.1915C11.4383 5.25224 11.4014 5.30743 11.3549 5.35392L8.70789 7.99992L11.3549 10.6459C11.4014 10.6924 11.4383 10.7476 11.4634 10.8083C11.4886 10.8691 11.5015 10.9342 11.5015 10.9999C11.5015 11.0657 11.4886 11.1308 11.4634 11.1915C11.4383 11.2522 11.4014 11.3074 11.3549 11.3539C11.3084 11.4004 11.2532 11.4373 11.1925 11.4624C11.1317 11.4876 11.0666 11.5005 11.0009 11.5005C10.9351 11.5005 10.87 11.4876 10.8093 11.4624C10.7486 11.4373 10.6934 11.4004 10.6469 11.3539L8.00089 8.70692L5.35489 11.3539C5.30841 11.4004 5.25322 11.4373 5.19248 11.4624C5.13174 11.4876 5.06664 11.5005 5.00089 11.5005C4.93515 11.5005 4.87005 11.4876 4.80931 11.4624C4.74857 11.4373 4.69338 11.4004 4.64689 11.3539C4.60041 11.3074 4.56353 11.2522 4.53837 11.1915C4.51321 11.1308 4.50026 11.0657 4.50026 10.9999C4.50026 10.9342 4.51321 10.8691 4.53837 10.8083C4.56353 10.7476 4.60041 10.6924 4.64689 10.6459L7.29389 7.99992L4.64689 5.35392C4.60033 5.30747 4.56339 5.2523 4.53818 5.19155C4.51297 5.13081 4.5 5.06568 4.5 4.99992C4.5 4.93415 4.51297 4.86903 4.53818 4.80828C4.56339 4.74754 4.60033 4.69236 4.64689 4.64592Z" />
                                  </svg>
                                </button>
                                <button className="flex items-center gap-x-2 filled-button-m fill-white">
                                  接受
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.7355 3.96993C12.8037 3.9003 12.8852 3.84498 12.9751 3.80722C13.065 3.76945 13.1615 3.75 13.259 3.75C13.3565 3.75 13.453 3.76945 13.5429 3.80722C13.6328 3.84498 13.7142 3.9003 13.7825 3.96993C14.0685 4.25893 14.0725 4.72593 13.7925 5.01993L7.87949 12.0099C7.81236 12.0837 7.73089 12.1429 7.64007 12.1841C7.54925 12.2252 7.45099 12.2474 7.3513 12.2493C7.25161 12.2511 7.15258 12.2327 7.06028 12.1949C6.96798 12.1572 6.88435 12.1011 6.81449 12.0299L3.21649 8.38393C3.07773 8.24242 3 8.05213 3 7.85393C3 7.65574 3.07773 7.46545 3.21649 7.32393C3.28474 7.2543 3.36619 7.19898 3.45608 7.16122C3.54597 7.12345 3.64249 7.104 3.73999 7.104C3.83749 7.104 3.93401 7.12345 4.0239 7.16122C4.11379 7.19898 4.19525 7.2543 4.26349 7.32393L7.31549 10.4169L12.7155 3.99193C12.7217 3.98421 12.7284 3.97686 12.7355 3.96993Z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <NoResults />
              )}

              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 59 筆
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

export default RentalInviteList;
