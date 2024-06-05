import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/singleHousePage/mainPicture_carousel.css"; //客製化上一張、下一張箭頭的樣式
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { apiHouseCommonSingleInfo } from "../apis/apis";
import HousePicturesModal from "../components/singleHousePage/HousePicturesModal";
import SeeMoreHousePicturesModal from "../components/singleHousePage/SeeMoreHousePicturesModal";
import singleHousePage_MainPicture from "../assets/imgs/SingleHousePage/singleHousePage_MainPicture.jpg";
import singleHousePage_secondaryPicture1 from "../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture1.jpg";
import singleHousePage_secondaryPicture2 from "../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture2.jpg";
import singleHousePage_secondaryPicture3 from "../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture3.jpg";
import singleHousePage_secondaryPicture4 from "../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture4.jpg";
import handShakeIcon from "../assets/imgs/SingleHousePage/handShakeIcon.svg";
import homeAndGardenIcon from "../assets/imgs/SingleHousePage/homeAndGardenIcon.svg";
import grandMoneyIcon from "../assets/imgs/SingleHousePage/grandMoney.svg";
import reviewsIcon from "../assets/imgs/SingleHousePage/reviewsIcon.svg";
import houseFeatureCheckIcon from "../assets/imgs/SingleHousePage/houseFeatureCheckIcon.svg";
import ratingStarIcon from "../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import rightIcon_white from "../assets/imgs/icons/rightIcon_white.svg";
import landLordIcon from "../assets/imgs/SingleHousePage/landLordIcon.svg";
import landLordProfile from "../assets/imgs/SingleHousePage/landLordProfile.jpg";
import Footer from "../components/footer/Footer";

function SingleHousePage() {
  const { houseId } = useParams<{ houseId: string }>();
  const introductionRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const usageFeeRef = useRef<HTMLDivElement>(null);
  const evaluateRef = useRef<HTMLDivElement>(null);
  const [singleHouseData, setSingleHouseData] = useState<any>({});

  const goIntroductionRef = () => {
    window.scrollTo({
      top: introductionRef.current!.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const goEquipmentRef = () => {
    window.scrollTo({
      top: equipmentRef.current!.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const goUsageFeeRef = () => {
    window.scrollTo({
      top: usageFeeRef.current!.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const goEvaluateRef = () => {
    window.scrollTo({
      top: evaluateRef.current!.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const [isHousePicturesCarouselOpen, setIsHousePicturesCarouselOpen] =
    useState(false);
  const [isSeeMoreHousePicturesOpen, setIsSeeMoreHousePicturesOpen] =
    useState(false);

  useEffect(() => {
    const getData = async (houseId: any) => {
      try {
        const response = await apiHouseCommonSingleInfo(houseId);
        setSingleHouseData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData(houseId);
  }, []);

  return (
    <>
      {Object.keys(singleHouseData).length > 0 && (
        <div className="wrap bg-Neutral-99 pb-32">
          {/* 房源圖片 */}
          <div className="container layout-grid pt-6 mb-6">
            {/* 首圖 */}
            <div className="col-span-6 col-start-2 overflow-hidden">
              {/* 首圖輪播 */}
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mainImgSwiper cursor-pointer"
                onClick={() => setIsHousePicturesCarouselOpen(true)}
              >
                <SwiperSlide>
                  <img
                    src={singleHousePage_MainPicture}
                    alt="mainImg"
                    className="w-full h-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={singleHousePage_MainPicture}
                    alt="mainImg"
                    className="w-full h-full"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            {/* 次要圖片 */}
            <div className="col-span-4">
              <div className="sideImg flex">
                <ul className="flex flex-wrap justify-between gap-y-6">
                  <li
                    className="w-[48%] h-[200px] overflow-hidden"
                    onClick={() => setIsHousePicturesCarouselOpen(true)}
                  >
                    <img
                      src={singleHousePage_secondaryPicture1}
                      alt="houseImg"
                      className="h-full hover:scale-110 transition-all duration-300 cursor-pointer"
                    />
                  </li>
                  <li
                    className="w-[48%] h-[200px] overflow-hidden"
                    onClick={() => setIsHousePicturesCarouselOpen(true)}
                  >
                    <img
                      src={singleHousePage_secondaryPicture2}
                      alt="houseImg"
                      className="h-full hover:scale-110 transition-all duration-300 cursor-pointer"
                    />
                  </li>
                  <li
                    className="w-[48%] h-[200px] overflow-hidden"
                    onClick={() => setIsHousePicturesCarouselOpen(true)}
                  >
                    <img
                      src={singleHousePage_secondaryPicture3}
                      alt="houseImg"
                      className="h-full hover:scale-110 transition-all duration-300 cursor-pointer"
                    />
                  </li>
                  <li
                    className="w-[48%] h-[200px] overflow-hidden"
                    onClick={() => setIsHousePicturesCarouselOpen(true)}
                  >
                    <img
                      src={singleHousePage_secondaryPicture4}
                      alt="houseImg"
                      className="h-full hover:scale-110 transition-all duration-300 cursor-pointer"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 房源細項內容 */}
          <div className="container layout-grid">
            {/* 房源描述 */}
            <div className="col-span-6 col-start-2">
              <h2 className="text-sans-b-h3 mb-6">{singleHouseData.name}</h2>
              {/* 房源特色：可短租、可養寵、可開火等等 */}
              <div className="mb-10">
                <ul className="flex flex-wrap gap-x-4 gap-y-4">
                  {singleHouseData.features.isRentSubsidy && (
                    <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                      <span className="material-symbols-outlined mr-1">
                        savings
                      </span>
                      <span className="text-sans-b-body1">可申請租屋補助</span>
                    </li>
                  )}
                  {singleHouseData.features.isPetAllowed && (
                    <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                      <span className="material-symbols-outlined mr-1">
                        savings
                      </span>
                      <span className="text-sans-b-body1">可養寵</span>
                    </li>
                  )}
                  {singleHouseData.features.isCookAllowed && (
                    <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                      <span className="material-symbols-outlined mr-1">
                        savings
                      </span>
                      <span className="text-sans-b-body1">可開伙</span>
                    </li>
                  )}
                  {singleHouseData.features.isSTRAllowed && (
                    <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                      <span className="material-symbols-outlined mr-1">
                        savings
                      </span>
                      <span className="text-sans-b-body1">可短租</span>
                    </li>
                  )}
                </ul>
              </div>
              {/* 基本資訊 */}
              <div className="pb-6 border-b border-Neutral-95 mb-10">
                <h3 className="text-sans-b-h6 mb-5">
                  <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                    <span className="relative text-black px-3">基本資訊</span>
                  </span>
                </h3>
                <span>
                  <span className="inline-block mb-3">
                    {singleHouseData.basicInfo.address}
                  </span>
                  <ul className="flex gap-x-2 mb-3">
                    <li className="border-r border-Tenant-70 pr-2">
                      {singleHouseData.basicInfo.ping}坪
                    </li>
                    <li>{`${
                      singleHouseData.basicInfo.floor === "/"
                        ? ""
                        : singleHouseData.basicInfo.floor + "樓"
                    }`}</li>
                  </ul>
                  <ul className="flex gap-x-2">
                    <li className="border-r border-Tenant-70 pr-2">
                      {singleHouseData.basicInfo.type}
                    </li>
                    <li>{`${
                      singleHouseData.basicInfo.roomNumbers &&
                      singleHouseData.basicInfo.roomNumbers + "房"
                    } ${
                      singleHouseData.basicInfo.livingRoomNumbers &&
                      singleHouseData.basicInfo.livingRoomNumbers + "廳"
                    } ${
                      singleHouseData.basicInfo.bathRoomNumbers &&
                      singleHouseData.basicInfo.bathRoomNumbers + "衛"
                    } ${
                      singleHouseData.basicInfo.balconyNumbers &&
                      singleHouseData.basicInfo.balconyNumbers + "陽台"
                    } ${
                      singleHouseData.basicInfo.parkingSpaceNumbers &&
                      singleHouseData.basicInfo.parkingSpaceNumbers + "車位"
                    }`}</li>
                  </ul>
                </span>
              </div>
              {/* 介紹、設備、雜支、評價 */}
              <div>
                {/* 快捷按鈕 */}
                <ul className="flex gap-x-3 mb-10">
                  <li className="">
                    <button
                      className="w-[153px] flex justify-start items-center gap-x-2 py-3 pl-3 rounded-lg bg-Neutral-95"
                      onClick={goIntroductionRef}
                    >
                      <img src={handShakeIcon} alt="handShakeIcon" />
                      <span className="text-sans-b-body1">房源介紹</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className="w-[153px] flex justify-start items-center gap-x-2 py-3 pl-3 rounded-lg bg-Neutral-95"
                      onClick={goEquipmentRef}
                    >
                      <img src={homeAndGardenIcon} alt="homeAndGardenIcon" />
                      <span className="text-sans-b-body1">設備設施</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className="w-[153px] flex justify-start items-center gap-x-2 py-3 pl-3 rounded-lg bg-Neutral-95"
                      onClick={goUsageFeeRef}
                    >
                      <img src={grandMoneyIcon} alt="handShakeIcon" />
                      <span className="text-sans-b-body1">雜支</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className="w-[153px] flex justify-start items-center gap-x-2 py-3 pl-3 rounded-lg bg-Neutral-95"
                      onClick={goEvaluateRef}
                    >
                      <img src={reviewsIcon} alt="handShakeIcon" />
                      <span className="text-sans-b-body1">評價</span>
                    </button>
                  </li>
                </ul>

                {/* 房源介紹 */}
                <div
                  className="mb-10 border-b border-Neutral-95"
                  ref={introductionRef}
                >
                  <h3 className="text-sans-b-h6 mb-5">
                    <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                      <span className="relative text-black px-3">房源介紹</span>
                    </span>
                  </h3>
                  <p className="whitespace-break-spaces pb-6">
                    {singleHouseData.description}
                  </p>
                </div>

                {/* 設備設施 */}
                <div
                  className="mb-10 border-b border-Neutral-95"
                  ref={equipmentRef}
                >
                  <h3 className="text-sans-b-h6 mb-5">
                    <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                      <span className="relative text-black px-3">設備設施</span>
                    </span>
                  </h3>
                  {/* 附近機能 */}
                  <div className="mb-10">
                    <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                      附近機能
                    </h4>
                    <ul className="flex flex-wrap gap-y-6 gap-x-6">
                      <li className="w-[30.86%] flex items-center gap-x-2">
                        <div
                          className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                            singleHouseData.facilities.lifeFunctions
                              .isNearByDepartmentStore && "bg-black"
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
                            singleHouseData.facilities.lifeFunctions
                              .isNearByMorningMarket && "bg-black"
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
                            singleHouseData.facilities.lifeFunctions
                              .isNearByNightMarket && "bg-black"
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
                            singleHouseData.facilities.lifeFunctions
                              .isNearByPark && "bg-black"
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
                            singleHouseData.facilities.lifeFunctions
                              .isNearBySchool && "bg-black"
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
                            singleHouseData.facilities.lifeFunctions
                              .isNearByConvenientStore && "bg-black"
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
                    <ul className="flex flex-wrap gap-y-6 gap-x-6">
                      <li className="w-[30.86%] flex items-center gap-x-2">
                        <div
                          className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                            singleHouseData.facilities.otherFeatures
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
                            singleHouseData.facilities.otherFeatures
                              .hasWindowInBathroom && "bg-black"
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
                            singleHouseData.facilities.otherFeatures
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
                    <ul className="flex flex-wrap gap-y-3 gap-x-6">
                      <li className="w-[30.86%] flex items-center gap-x-2">
                        <div
                          className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                            singleHouseData.facilities.furnitures
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
                            singleHouseData.facilities.furnitures
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
                            singleHouseData.facilities.furnitures
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
                            singleHouseData.facilities.furnitures.hasCloset &&
                            "bg-black"
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
                            singleHouseData.facilities.furnitures
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
                            singleHouseData.facilities.furnitures
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
                            singleHouseData.facilities.furnitures.hasInternet &&
                            "bg-black"
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
                            singleHouseData.facilities.furnitures.hasBed &&
                            "bg-black"
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
                            singleHouseData.facilities.furnitures.hasTV &&
                            "bg-black"
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
                    <ul className="flex flex-wrap gap-y-6 gap-x-6">
                      <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                        <div className="flex items-center gap-x-2">
                          <div
                            className={`flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ${
                              singleHouseData.facilities.transportation
                                .isNearMRT && "bg-black"
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
                        {singleHouseData.facilities.transportation
                          .isNearMRT && (
                          <div className="w-full flex">
                            <div className="p-3 w-full border-b border-Neutral-70">
                              <p className="">
                                {
                                  singleHouseData.facilities.transportation
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
                              singleHouseData.facilities.transportation
                                .isNearLRT && "bg-black"
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
                        {singleHouseData.facilities.transportation
                          .isNearLRT && (
                          <div className="w-full flex">
                            <div className="p-3 w-full border-b border-Neutral-70">
                              <p className="">
                                {
                                  singleHouseData.facilities.transportation
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
                              singleHouseData.facilities.transportation
                                .isNearBusStation && "bg-black"
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
                        {singleHouseData.facilities.transportation
                          .isNearBusStation && (
                          <div className="w-full flex">
                            <div className="p-3 w-full border-b border-Neutral-70">
                              <p className="">
                                {
                                  singleHouseData.facilities.transportation
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
                              singleHouseData.facilities.transportation
                                .isNearTrainStation && "bg-black"
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
                        {singleHouseData.facilities.transportation
                          .isNearTrainStation && (
                          <div className="w-full flex">
                            <div className="p-3 w-full border-b border-Neutral-70">
                              <p className="">
                                {
                                  singleHouseData.facilities.transportation
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
                              singleHouseData.facilities.transportation
                                .isNearHSR && "bg-black"
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
                        {singleHouseData.facilities.transportation
                          .isNearHSR && (
                          <div className="w-full flex">
                            <div className="p-3 w-full border-b border-Neutral-70">
                              <p className="">
                                {
                                  singleHouseData.facilities.transportation
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
                <div
                  className="mb-10 border-b border-Neutral-95"
                  ref={usageFeeRef}
                >
                  <h3 className="text-sans-b-h6 mb-5">
                    <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                      <span className="relative text-black px-3">雜支</span>
                    </span>
                  </h3>
                  <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                    水費
                  </h4>
                  <p className="mb-3">
                    {singleHouseData.cost.waterBill.paymentMethodOfWaterBill ===
                    "自訂"
                      ? `自訂，每人每月${singleHouseData.cost.waterBill.waterBillPerMonth}`
                      : singleHouseData.cost.waterBill.paymentMethodOfWaterBill}
                  </p>

                  <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                    電費
                  </h4>
                  <p className="mb-3">
                    {singleHouseData.cost.electricBill.electricBill ===
                      "依台電計價" &&
                      singleHouseData.cost.electricBill.electricBill}
                    {singleHouseData.cost.electricBill.electricBill ===
                      "自訂" &&
                      `隨房租繳納，每度 ${singleHouseData.cost.electricBill.electricBillPerDegree} 元`}
                  </p>
                  {singleHouseData.cost.electricBill
                    .paymentMethodOfElectricBill === "依台電計價" && (
                    <>
                      <span className="inline-block text-sans-b-body1 mb-3">
                        繳納方式
                      </span>
                      <p className="mb-6">
                        {
                          singleHouseData.cost.electricBill
                            .paymentMethodOfElectricBill
                        }
                      </p>
                    </>
                  )}

                  <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                    管理費
                  </h4>
                  <p className="mb-6">
                    {singleHouseData.cost.managementFee
                      .paymentMethodOfManagementFee === "無管理費" &&
                      singleHouseData.cost.managementFee
                        .paymentMethodOfManagementFee}
                    {singleHouseData.cost.managementFee
                      .paymentMethodOfManagementFee === "包含於租金" &&
                      singleHouseData.cost.managementFee
                        .paymentMethodOfManagementFee}
                    {singleHouseData.cost.managementFee
                      .paymentMethodOfManagementFee === "自行繳納" &&
                      `自行繳納，每月 ${singleHouseData.cost.managementFee.managementFeePerMonth} 元`}
                    {singleHouseData.cost.managementFee
                      .paymentMethodOfManagementFee === "隨房租繳納" &&
                      `隨房租繳納，每月 ${singleHouseData.cost.managementFee.managementFeePerMonth} 元`}
                  </p>
                </div>

                {/* 評價 */}
                <div
                  className="mb-10 border-b border-Neutral-95"
                  ref={evaluateRef}
                >
                  <h3 className="text-sans-b-h6 mb-5">
                    <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                      <span className="relative text-black px-3">評價</span>
                    </span>
                  </h3>
                  {/* 評價列表(API 待補上) */}
                  <ul className="flex flex-col gap-y-4">
                    <li className="p-4 rounded-lg shadow-elevation-3">
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
                    <li className="p-4 rounded-lg shadow-elevation-3">
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
                    <li className="p-4 rounded-lg shadow-elevation-3">
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
                    <li className="p-4 rounded-lg shadow-elevation-3">
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

            {/* 房東基本資訊 */}
            <div className="col-span-3 col-start-9 ">
              {/* 查看更多照片 */}
              <div className="flex justify-between">
                <span></span>
                <button
                  className="flex items-center mb-7 filled-button-s"
                  onClick={() => setIsSeeMoreHousePicturesOpen(true)}
                >
                  查看更多照片{" "}
                  <img src={rightIcon_white} alt="rightIcon_white" />
                </button>
              </div>

              <div className="sticky top-[80px]">
                {/* 預約看房 */}
                <div className=" shadow-elevation-3 rounded-2xl p-6 mb-[14px]">
                  <ul className="flex flex-col gap-y-[34px]">
                    <li>
                      <h5 className="text-center">
                        <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                          <span className="relative text-sans-b-h1 mr-2">
                            {parseInt(
                              singleHouseData.price.rent
                            ).toLocaleString()}
                          </span>
                        </span>
                        <span className="text-sans-caption font-normal">
                          元/月
                        </span>
                      </h5>
                    </li>
                    <li>
                      <span className="block text-center">
                        押金
                        <span className="inline-block h-full bg-Tenant-70 w-[1px] text-white mx-2">
                          |
                        </span>
                        {singleHouseData.price.securityDeposit}個月
                      </span>
                    </li>
                    <li>
                      <button className="w-full text-sans-b-body1 text-center border-Neutral-90 bg-Brand-90 py-2 rounded-lg shadow-elevation-2 hover:bg-Brand-95">
                        預約看房
                      </button>
                    </li>
                  </ul>
                </div>
                {/* 房東基本資訊 */}
                <div className="shadow-elevation-3 rounded-2xl p-6">
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
                          <span className="text-sans-b-h3">王</span>{" "}
                          {singleHouseData.landlord.gender === "女"
                            ? "小姐"
                            : "先生"}
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
          </div>
        </div>
      )}

      {isHousePicturesCarouselOpen && (
        <HousePicturesModal
          closeModal={() => setIsHousePicturesCarouselOpen(false)}
        />
      )}
      {isSeeMoreHousePicturesOpen && (
        <SeeMoreHousePicturesModal
          closeModal={() => setIsSeeMoreHousePicturesOpen(false)}
        />
      )}
      <Footer></Footer>
    </>
  );
}

export default SingleHousePage;
