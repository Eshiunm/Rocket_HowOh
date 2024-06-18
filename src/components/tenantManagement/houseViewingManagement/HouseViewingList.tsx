import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Flowbite, Drawer } from "flowbite-react";
import {
  apiAppointmentCommonList,
  apiAppointmentTenantHouseDetail,
  apiAppointmentCommonTotalNumber,
} from "../../../apis/apis";
import close from "../../../assets/imgs/icons/close.svg";
import houseFeatureCheckIcon from "../../../assets/imgs/SingleHousePage/houseFeatureCheckIcon.svg";
import ratingStarIcon from "../../../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import landLordIcon from "../../../assets/imgs/SingleHousePage/landLordIcon.svg";
import NoResults from "./NoResults";
import HouseViewingListSkeleton from "./HouseViewingListSkeleton";
import { Link } from "react-router-dom";

function HouseViewingList() {
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
  const [isAPIProcessing, setIsAPIProcessing] = useState(false);
  const [currentCardSelectedId, setCurrentCardSelectedId] = useState("");
  const [isHouseOffCanvasOpen, setIsHouseOffCanvasOpen] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState<any>({});
  const [rentalListTypeState, setRentalListTypeState] = useState("unrented"); // 預設渲染未出租清單
  const [rentalList, setRentalList] = useState<any>([]);
  const [rentalListTotalNumbers, setRentalListTotalNumbers] = useState(0);
  const [houseViewingDetail, setHouseViewingDetail] = useState<any>({});

  // 初始化出租清單(預設渲染未出租)
  useEffect(() => {
    const getRentalListData = async () => {
      try {
        setIsAPIProcessing(true);
        const userId = localStorage.getItem("userId");
        const response = await apiAppointmentCommonList(userId as string);
        setRentalList(response.data.result);
        // 某個卡片被點擊，開啟offCanvas後，卡片要有 selected 效果
        const isCardSelected = response.data.result.reduce(
          (acc: any, { description }: any) => {
            acc[`cardId${description.detail[0].houseId}`] = false;
            return acc;
          },
          {}
        );
        setIsCardSelected(isCardSelected);
        setIsAPIProcessing(false);
      } catch (errors) {
        console.log(errors);
      }
    };
    getRentalListData();
  }, []);
  // 取得出租清單總筆數
  useEffect(() => {
    const getRentalListTotalNumbers = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await apiAppointmentCommonTotalNumber(
          userId as string
        );
        setRentalListTotalNumbers(response.data.totalNumber);
      } catch (error) {
        console.log(error);
      }
    };
    getRentalListTotalNumbers();
  }, [rentalListTotalNumbers]);

  // 切換出租清單類型，有未出租和已出租兩種
  const handleRentalListType = (e: any) => {
    const rentalType = e.currentTarget.dataset.rentaltype;
    if (rentalType === "rented") {
      setRentalListTypeState("rented");
    } else if (rentalType === "unrented") {
      setRentalListTypeState("unrented");
    }
  };

  const handleOffCanvasOpen = (e: any) => {
    const houseId = e.currentTarget.dataset.houseid;
    const appointmentId = e.currentTarget.dataset.appointmentid;
    setCurrentCardSelectedId(houseId);
    setIsCardSelected({ ...isCardSelected, [`cardId${houseId}`]: true });
    setIsHouseOffCanvasOpen(true);

    const getHouseDetailInfo = async (appointmentId: string) => {
      try {
        const response = await apiAppointmentTenantHouseDetail(appointmentId);
        console.log(response.data[0]);
        setHouseViewingDetail(response.data[0]);
      } catch (errors) {
        console.log(errors);
      }
    };

    getHouseDetailInfo(appointmentId.toString());
  };

  const handleOffCanvasClose = () => {
    setIsCardSelected({
      ...isCardSelected,
      [`cardId${currentCardSelectedId}`]: false,
    });
    setIsHouseOffCanvasOpen(false);
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);

    // 將日期轉換為 "xxxx年xx月xx日" 的格式
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() 返回的月份是 0-11，所以需要加 1
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
            {Object.keys(houseViewingDetail).length > 0 && (
              <div className="layout-grid mb-32">
                <div className="col-span-12 flex flex-col gap-6">
                  <button
                    type="button"
                    className="self-end"
                    onClick={handleOffCanvasClose}
                  >
                    <img src={close} alt="close" />
                  </button>
                  <div className="flex justify-end gap-x-6">
                    <button
                      type="button"
                      className="flex items-center gap-x-2 px-2 rounded-lg border border-black hover:bg-black hover:text-white hover:fill-white"
                    >
                      <span className="text-sans-b-body1">刪除預約紀錄</span>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M5.5 5.5C5.63261 5.5 5.75979 5.55268 5.85355 5.64645C5.94732 5.74021 6 5.86739 6 6V12C6 12.1326 5.94732 12.2598 5.85355 12.3536C5.75979 12.4473 5.63261 12.5 5.5 12.5C5.36739 12.5 5.24021 12.4473 5.14645 12.3536C5.05268 12.2598 5 12.1326 5 12V6C5 5.86739 5.05268 5.74021 5.14645 5.64645C5.24021 5.55268 5.36739 5.5 5.5 5.5ZM8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5ZM11 6C11 5.86739 10.9473 5.74021 10.8536 5.64645C10.7598 5.55268 10.6326 5.5 10.5 5.5C10.3674 5.5 10.2402 5.55268 10.1464 5.64645C10.0527 5.74021 10 5.86739 10 6V12C10 12.1326 10.0527 12.2598 10.1464 12.3536C10.2402 12.4473 10.3674 12.5 10.5 12.5C10.6326 12.5 10.7598 12.4473 10.8536 12.3536C10.9473 12.2598 11 12.1326 11 12V6Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.5 3C14.5 3.26522 14.3946 3.51957 14.2071 3.70711C14.0196 3.89464 13.7652 4 13.5 4H13V13C13 13.5304 12.7893 14.0391 12.4142 14.4142C12.0391 14.7893 11.5304 15 11 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H6C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1H13.5C13.7652 1 14.0196 1.10536 14.2071 1.29289C14.3946 1.48043 14.5 1.73478 14.5 2V3ZM4.118 4L4 4.059V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V4.059L11.882 4H4.118ZM2.5 3V2H13.5V3H2.5Z"
                        />
                      </svg>
                    </button>
                    <Link
                      to={`/houseList/${houseViewingDetail.houseId}`}
                      className="flex items-center gap-x-2 p-2 rounded-lg border border-black text-sans-b-body1 hover:bg-black hover:text-white hover:fill-white"
                    >
                      <span className="text-sans-b-body1">前往房源</span>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14 2.5C14 2.36739 13.9473 2.24021 13.8535 2.14645C13.7597 2.05268 13.6326 2 13.5 2H7.49996C7.36735 2 7.24018 2.05268 7.14641 2.14645C7.05264 2.24021 6.99996 2.36739 6.99996 2.5C6.99996 2.63261 7.05264 2.75979 7.14641 2.85355C7.24018 2.94732 7.36735 3 7.49996 3H12.293L2.14596 13.146C2.09947 13.1925 2.0626 13.2477 2.03744 13.3084C2.01228 13.3692 1.99933 13.4343 1.99933 13.5C1.99933 13.5657 2.01228 13.6308 2.03744 13.6916C2.0626 13.7523 2.09947 13.8075 2.14596 13.854C2.19245 13.9005 2.24764 13.9374 2.30838 13.9625C2.36912 13.9877 2.43422 14.0006 2.49996 14.0006C2.5657 14.0006 2.6308 13.9877 2.69154 13.9625C2.75228 13.9374 2.80747 13.9005 2.85396 13.854L13 3.707V8.5C13 8.63261 13.0526 8.75979 13.1464 8.85355C13.2402 8.94732 13.3674 9 13.5 9C13.6326 9 13.7597 8.94732 13.8535 8.85355C13.9473 8.75979 14 8.63261 14 8.5V2.5Z"
                        />
                      </svg>
                    </Link>
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
                            <span className="text-sans-b-h3">
                              {houseViewingDetail.info.info[0].lastName}
                            </span>{" "}
                            {houseViewingDetail.info.info[0].firstName}
                          </p>
                        </div>
                        {houseViewingDetail.info.info[0].image.length > 0 && (
                          <div className="w-[116px] h-[116px] overflow-hidden rounded-2xl">
                            <img
                              src={houseViewingDetail.info.info[0].image}
                              alt="landLordProfile"
                              className=""
                            />
                          </div>
                        )}
                      </li>
                      <li className="flex justify-between gap-x-3">
                        <div className="w-full shadow-elevation-2 rounded-lg p-4">
                          <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                            評價
                          </h5>
                          <p className="flex justify-between items-end">
                            <span className="text-sans-h4">
                              {
                                houseViewingDetail.info.landlordRatingInfo
                                  .Average
                              }
                            </span>
                            <img src={ratingStarIcon} alt="ratingStarIcon" />
                          </p>
                        </div>
                        <div className="w-full shadow-elevation-2 rounded-lg p-4">
                          <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                            則數
                          </h5>
                          <p className="flex justify-between items-end">
                            <span className="text-sans-h4">
                              {
                                houseViewingDetail.info.landlordRatingInfo
                                  .Average
                              }
                            </span>
                            <span>則</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <h5 className="text-sans-b-body1 text-Landlord-50 mb-3">
                          自我介紹
                        </h5>
                        <p>{houseViewingDetail.info.info[0].intro}</p>
                      </li>
                    </ul>
                  </div>
                  {/* 房源特色、基本資訊 */}
                  <div className="bg-white p-5 border-b border-Neutral-95">
                    <h2 className="text-sans-b-h3 mb-6">
                      {houseViewingDetail.info.title}
                    </h2>
                    <div className="mb-10">
                      <ul className="flex flex-wrap gap-4">
                        {houseViewingDetail.info.tagList.rentSubsidy && (
                          <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                            <span className="material-symbols-outlined mr-1">
                              savings
                            </span>
                            <span className="text-sans-b-body1">
                              可申請租屋補助
                            </span>
                          </li>
                        )}
                        {houseViewingDetail.info.tagList.petAllowed && (
                          <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                            <span className="material-symbols-outlined mr-1">
                              pet_supplies
                            </span>
                            <span className="text-sans-b-body1">可養寵</span>
                          </li>
                        )}
                        {houseViewingDetail.info.tagList.cookAllowed && (
                          <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                            <span className="material-symbols-outlined mr-1">
                              skillet
                            </span>
                            <span className="text-sans-b-body1">可開伙</span>
                          </li>
                        )}
                        {houseViewingDetail.info.tagList.STRAllowed && (
                          <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                            <span className="material-symbols-outlined mr-1">
                              event
                            </span>
                            <span className="text-sans-b-body1">可短租</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* 基本資訊 */}
                    <div>
                      <h3 className="text-sans-b-h6 mb-5">
                        <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                          <span className="relative text-black px-3">
                            基本資訊
                          </span>
                        </span>
                      </h3>
                      <span>
                        <span className="inline-block mb-3">
                          {houseViewingDetail.info.basicInfo.district}
                          {houseViewingDetail.info.basicInfo.road}
                        </span>
                        <ul className="flex gap-x-2 mb-3">
                          <li className="border-r border-Tenant-70 pr-2">
                            {houseViewingDetail.info.basicInfo.ping}坪
                          </li>
                          <li>
                            {houseViewingDetail.info.basicInfo.floor}/
                            {houseViewingDetail.info.basicInfo.floorTotal}樓
                          </li>
                        </ul>
                        <ul className="flex gap-x-2">
                          <li className="border-r border-Tenant-70 pr-2">
                            {houseViewingDetail.info.basicInfo.type}
                          </li>
                          <li>{`${
                            houseViewingDetail.info.basicInfo.roomNumbers &&
                            houseViewingDetail.info.basicInfo.roomNumbers + "房"
                          } ${
                            houseViewingDetail.info.basicInfo
                              .livingRoomNumbers &&
                            houseViewingDetail.info.basicInfo
                              .livingRoomNumbers + "廳"
                          } ${
                            houseViewingDetail.info.basicInfo.bathroomNumbers &&
                            houseViewingDetail.info.basicInfo.bathroomNumbers +
                              "衛"
                          } ${
                            houseViewingDetail.info.basicInfo.balconyNumbers &&
                            houseViewingDetail.info.basicInfo.balconyNumbers +
                              "陽台"
                          } ${
                            houseViewingDetail.info.basicInfo
                              .parkingSpaceNumbers &&
                            houseViewingDetail.info.basicInfo
                              .parkingSpaceNumbers + "車位"
                          }`}</li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  {/* 房源介紹 */}
                  <div className="bg-white p-5 border-b border-Neutral-95">
                    <h3 className="text-sans-b-h6 mb-5">
                      <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                        <span className="relative text-black px-3">
                          房源介紹
                        </span>
                      </span>
                    </h3>
                    <p className="whitespace-break-spaces pb-6">
                      {houseViewingDetail.info.basicInfo.description}
                    </p>
                  </div>
                  {/* 設備設施 */}
                  <div className="bg-white p-5 border-b border-Neutral-95">
                    <h3 className="text-sans-b-h6 mb-5">
                      <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                        <span className="relative text-black px-3">
                          設備設施
                        </span>
                      </span>
                    </h3>
                    {/* 附近機能 */}
                    <div className="mb-10">
                      <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                        附近機能
                      </h4>
                      <ul className="flex flex-wrap gap-y-6 gap-x-10">
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearDepartmentStore && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">百貨商場</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearMorningMarket && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">早市</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearNightMarket && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">夜市</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearPark && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">公園綠地</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearSchool && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">學校</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.nearFacilty
                                .nearConvenientStore && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">超商</span>
                        </li>
                      </ul>
                    </div>
                    {/* 屋源特色 */}
                    <div className="mb-10">
                      <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                        屋源特色
                      </h4>
                      <ul className="flex flex-wrap gap-y-6 gap-x-10">
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.houseFeature
                                .hasGarbageDisposal && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">垃圾集中處理</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.houseFeature
                                .hasWindowBathroom && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">浴室開窗</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.houseFeature
                                .hasElevator && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">有電梯</span>
                        </li>
                      </ul>
                    </div>
                    {/* 設備 */}
                    <div className="mb-10">
                      <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                        設備
                      </h4>
                      <ul className="flex flex-wrap gap-y-3 gap-x-10">
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasAirConditioner && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">冷氣</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasWashingMachine && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">洗衣機</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasRefrigerator && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">冰箱</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasCloset && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">衣櫃</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasTableAndChair && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">桌椅</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasWaterHeater && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">熱水器</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasInternet && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">網路</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasBed && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">床</span>
                        </li>
                        <li className="w-[30.86%] flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              houseViewingDetail.info.facility.equipment
                                .hasTV && "bg-black"
                            }`}
                          >
                            <img
                              src={houseFeatureCheckIcon}
                              alt="houseFeatureCheckIcon"
                              className="w-[10px] h-2"
                            />
                          </div>
                          <span className="text-sans-body1">電視</span>
                        </li>
                      </ul>
                    </div>
                    {/* 交通 */}
                    <div className="mb-10">
                      <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                        交通
                      </h4>
                      <ul className="flex flex-wrap gap-y-6 gap-x-10">
                        <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                          <div className="flex items-center gap-x-2">
                            <div
                              className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                                houseViewingDetail.info.facility.commute
                                  .nearMRT && "bg-black"
                              }`}
                            >
                              <img
                                src={houseFeatureCheckIcon}
                                alt="houseFeatureCheckIcon"
                                className="w-[10px] h-2"
                              />
                            </div>
                            <span className="text-sans-body1">捷運</span>
                          </div>
                          {houseViewingDetail.info.facility.commute.nearMRT && (
                            <div className="w-full flex">
                              <div className="p-3 w-full border-b border-Neutral-70">
                                <p className="">
                                  {
                                    houseViewingDetail.info.facility.commute
                                      .kmAwayMRT
                                  }
                                </p>
                              </div>
                              <p className="whitespace-nowrap py-3">公尺</p>
                            </div>
                          )}
                        </li>
                        <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                          <div className="flex items-center gap-x-2">
                            <div
                              className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                                houseViewingDetail.info.facility.commute
                                  .nearLRT && "bg-black"
                              }`}
                            >
                              <img
                                src={houseFeatureCheckIcon}
                                alt="houseFeatureCheckIcon"
                                className="w-[10px] h-2"
                              />
                            </div>
                            <span className="text-sans-body1">輕軌</span>
                          </div>
                          {houseViewingDetail.info.facility.commute.nearLRT && (
                            <div className="w-full flex">
                              <div className="p-3 w-full border-b border-Neutral-70">
                                <p className="">
                                  {
                                    houseViewingDetail.info.facility.commute
                                      .kmAwayLRT
                                  }
                                </p>
                              </div>
                              <p className="whitespace-nowrap py-3">公尺</p>
                            </div>
                          )}
                        </li>
                        <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                          <div className="flex items-center gap-x-2">
                            <div
                              className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                                houseViewingDetail.info.facility.commute
                                  .nearBusStation && "bg-black"
                              }`}
                            >
                              <img
                                src={houseFeatureCheckIcon}
                                alt="houseFeatureCheckIcon"
                                className="w-[10px] h-2"
                              />
                            </div>
                            <span className="text-sans-body1">公車</span>
                          </div>
                          {houseViewingDetail.info.facility.commute
                            .nearBusStation && (
                            <div className="w-full flex">
                              <div className="p-3 w-full border-b border-Neutral-70">
                                <p className="">
                                  {
                                    houseViewingDetail.info.facility.commute
                                      .kmAwayBusStation
                                  }
                                </p>
                              </div>
                              <p className="whitespace-nowrap py-3">公尺</p>
                            </div>
                          )}
                        </li>
                        <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                          <div className="flex items-center gap-x-2">
                            <div
                              className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                                houseViewingDetail.info.facility.commute
                                  .nearTrainStation && "bg-black"
                              }`}
                            >
                              <img
                                src={houseFeatureCheckIcon}
                                alt="houseFeatureCheckIcon"
                                className="w-[10px] h-2"
                              />
                            </div>
                            <span className="text-sans-body1">火車</span>
                          </div>
                          {houseViewingDetail.info.facility.commute
                            .nearTrainStation && (
                            <div className="w-full flex">
                              <div className="p-3 w-full border-b border-Neutral-70">
                                <p className="">
                                  {
                                    houseViewingDetail.info.facility.commute
                                      .kmAwayTrainStation
                                  }
                                </p>
                              </div>
                              <p className="whitespace-nowrap py-3">公尺</p>
                            </div>
                          )}
                        </li>
                        <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                          <div className="flex items-center gap-x-2">
                            <div
                              className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                                houseViewingDetail.info.facility.commute
                                  .nearHSR && "bg-black"
                              }`}
                            >
                              <img
                                src={houseFeatureCheckIcon}
                                alt="houseFeatureCheckIcon"
                                className="w-[10px] h-2"
                              />
                            </div>
                            <span className="text-sans-body1">高鐵</span>
                          </div>
                          {houseViewingDetail.info.facility.commute.nearHSR && (
                            <div className="w-full flex">
                              <div className="p-3 w-full border-b border-Neutral-70">
                                <p className="">
                                  {
                                    houseViewingDetail.info.facility.commute
                                      .kmAwayHSR
                                  }
                                </p>
                              </div>
                              <p className="whitespace-nowrap py-3">公尺</p>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* 雜支 */}
                  <div className="bg-white p-5 border-b border-Neutral-95">
                    <h3 className="text-sans-b-h6 mb-5">
                      <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                        <span className="relative text-black px-3">雜支</span>
                      </span>
                    </h3>
                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                      水費
                    </h4>
                    <p className="mb-6">
                      {houseViewingDetail.info.facility.payment
                        .waterBillPayment === "自訂"
                        ? `每人每月 ${houseViewingDetail.info.facility.payment.waterBillPerMonth} 元`
                        : houseViewingDetail.info.facility.payment
                            .waterBillPayment}
                    </p>

                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                      電費
                    </h4>
                    <p className="mb-3">
                      {houseViewingDetail.info.facility.payment
                        .eletricPaymentType === "依台電計價" &&
                        houseViewingDetail.info.facility.payment
                          .eletricPaymentType}
                      {houseViewingDetail.info.facility.payment
                        .eletricPaymentType === "自訂" &&
                        `隨房租繳納，每度 ${houseViewingDetail.info.facility.payment.electricBillPerMonth} 元`}
                    </p>
                    {houseViewingDetail.info.facility.payment
                      .eletricPaymentType === "依台電計價" && (
                      <>
                        <span className="inline-block text-sans-b-body1 mb-3">
                          繳納方式
                        </span>
                        <p className="mb-6">
                          {
                            houseViewingDetail.info.facility.payment
                              .electricPaymentMethod
                          }
                        </p>
                      </>
                    )}

                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                      管理費
                    </h4>
                    <p className="mb-6">
                      {houseViewingDetail.info.facility.payment
                        .managementFeePayment === "無管理費" &&
                        houseViewingDetail.info.facility.payment
                          .managementFeePayment}
                      {houseViewingDetail.info.facility.payment
                        .managementFeePayment === "包含於租金" &&
                        houseViewingDetail.info.facility.payment
                          .managementFeePayment}
                      {houseViewingDetail.info.facility.payment
                        .managementFeePayment === "自行繳納" &&
                        `自行繳納，每月 ${houseViewingDetail.info.facility.payment.managementFeePerMonth} 元`}
                      {houseViewingDetail.info.facility.payment
                        .managementFeePayment === "隨房租繳納" &&
                        `隨房租繳納，每月 ${houseViewingDetail.info.facility.payment.managementFeePerMonth} 元`}
                    </p>
                  </div>
                  {/* 評價 */}
                  <div className="bg-white p-5 border-b border-Neutral-95">
                    <h3 className="text-sans-b-h6 mb-5">
                      <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                        <span className="relative text-black px-3">評價</span>
                      </span>
                    </h3>
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
            )}
          </Drawer.Items>
        </Drawer>
      </Flowbite>
      <section
        className={`flex-grow bg-Neutral-99 pt-8 pb-28 `}
      >
        <div className="container layout-grid">
          <div className="col-span-7">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mb-6 pb-3 border-b border-Neutral-95">
                <div className="flex gap-x-3 items-center ml-3">
                  <button
                    type="button"
                    className={`border text-sans-b-body1 py-1 px-4 rounded-[24px] ${
                      rentalListTypeState === "unrented"
                        ? " bg-Tenant-50 text-white "
                        : "bg-white text-black"
                    }`}
                    data-rentaltype="unrented"
                    onClick={handleRentalListType}
                  >
                    未出租
                  </button>
                  <button
                    type="button"
                    className={`py-1 border border-Tenant-50 text-sans-b-body1 px-4 rounded-[24px] ${
                      rentalListTypeState === "rented"
                        ? " bg-Tenant-50 text-white"
                        : "bg-white text-black"
                    }`}
                    data-rentaltype="rented"
                    onClick={handleRentalListType}
                  >
                    已出租
                  </button>
                </div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    {rentalList.length > 0
                      ? rentalList.length > 12
                        ? `顯示 1 至 12 筆 共 ${rentalListTotalNumbers} 筆`
                        : `顯示 1 至 ${rentalList.length} 筆 共 ${rentalList.length} 筆`
                      : "顯示 0 至 0 筆 共 0 筆"}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      disabled={rentalListTotalNumbers > 12 ? false : true}
                      type="button"
                      className="flex gap-x-[10px] items-center filled-button-s rounded-r-none"
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
                      disabled={rentalListTotalNumbers > 12 ? false : true}
                      type="button"
                      className="flex gap-x-[10px] items-center filled-button-s rounded-l-none"
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
              {/* 列表 */}
              {isAPIProcessing ? (
                <HouseViewingListSkeleton />
              ) : rentalList.length > 0 ? (
                <ul>
                  {rentalList.map(
                    ({
                      description,
                      appointmentCreateTime,
                      appointmentId,
                    }: any) => (
                      <li
                        key={appointmentCreateTime}
                        className={`p-3 rounded-xl cursor-pointer hover:bg-Neutral-99 ${
                          isCardSelected[
                            `cardId${description.detail[0].houseId}`
                          ] && "bg-Neutral-95"
                        }`}
                        data-houseid={description.detail[0].houseId}
                        data-appointmentid={appointmentId}
                        onClick={handleOffCanvasOpen}
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-x-4">
                            <div className="w-[136px] rounded-xl overflow-hidden">
                              <img
                                className="w-full h-full"
                                src={
                                  description.detail[0].houseImage[0]
                                    .houseImagePath
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
                                    description.detail[0].landlordInfo
                                      .firstName}
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
                                  {
                                    description.detail[0].landlordInfo
                                      .phoneNumber
                                  }
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
                              <span>
                                {getFormattedTime(appointmentCreateTime)}
                              </span>
                            </p>
                            {/* tooltip */}
                            <div
                              id="tooltip-default-1"
                              role="tooltip"
                              className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                            >
                              申請預約的時間
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                            {/* 查看更多 */}
                            <div className="flex justify-between hover:opacity-75">
                              <span></span>
                              <button
                                type="button"
                                className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                              >
                                <span className="text-sans-b-body1">
                                  查看更多
                                </span>
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
                    {rentalList.length > 0
                      ? rentalList.length > 12
                        ? `顯示 1 至 12 筆 共 ${rentalListTotalNumbers} 筆`
                        : `顯示 1 至 ${rentalList.length} 筆 共 ${rentalList.length} 筆`
                      : "顯示 0 至 0 筆 共 0 筆"}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      disabled={rentalListTotalNumbers > 12 ? false : true}
                      type="button"
                      className="flex gap-x-[10px] items-center filled-button-s rounded-r-none"
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
                      disabled={rentalListTotalNumbers > 12 ? false : true}
                      type="button"
                      className="flex gap-x-[10px] items-center filled-button-s rounded-l-none"
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

export default HouseViewingList;
