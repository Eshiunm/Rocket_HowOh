import "../components/singleHousePage/mainPicture_carousel.css"; //客製化上一張、下一張箭頭的樣式
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "flowbite-react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { apiHouseCommonSingleInfo } from "../apis/apis";
import { CustomFlowbiteTheme, Modal, Flowbite } from "flowbite-react";
import { apiUserInfoGet, apiUserInfoCompare } from "../apis/apis";
import BigLoading from "../components/loading/BigLoading";
import HousePicturesModal from "../components/singleHousePage/HousePicturesModal";
import SeeMoreHousePicturesModal from "../components/singleHousePage/SeeMoreHousePicturesModal";
import handShakeIcon from "../assets/imgs/SingleHousePage/handShakeIcon.svg";
import homeAndGardenIcon from "../assets/imgs/SingleHousePage/homeAndGardenIcon.svg";
import grandMoneyIcon from "../assets/imgs/SingleHousePage/grandMoney.svg";
import reviewsIcon from "../assets/imgs/SingleHousePage/reviewsIcon.svg";
import houseFeatureCheckIcon from "../assets/imgs/SingleHousePage/houseFeatureCheckIcon.svg";
import ratingStarIcon from "../assets/imgs/SingleHousePage/ratingStarIcon.svg";
import rightIcon_white from "../assets/imgs/icons/rightIcon_white.svg";
import landLordIcon from "../assets/imgs/SingleHousePage/landLordIcon.svg";
import Footer from "../components/footer/Footer";
import close from "../assets/imgs/icons/close.svg";

function SingleHousePage() {
  const customTheme: CustomFlowbiteTheme = {
    modal: {
      root: {
        base: "z-50 backdrop-blur-md fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
        show: {
          on: "flex bg-black bg-opacity-20",
          off: "hidden",
        },
        sizes: {
          sm: "max-w-sm",
          md: "max-w-md",
          lg: "max-w-lg",
          xl: "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl",
        },
        positions: {
          "top-left": "items-start justify-start",
          "top-center": "items-start justify-center",
          "top-right": "items-start justify-end",
          "center-left": "items-center justify-start",
          center: "items-center justify-center",
          "center-right": "items-center justify-end",
          "bottom-right": "items-end justify-end",
          "bottom-center": "items-end justify-center",
          "bottom-left": "items-end justify-start",
        },
      },
      content: {
        base: "relative h-full w-full p-4 md:h-auto",
        inner:
          "relative flex max-h-[90dvh] flex-col rounded-2xl bg-white shadow dark:bg-gray-700",
      },
      body: {
        base: "flex-1 overflow-auto p-10",
      },
      header: {
        base: "flex items-start justify-between rounded-t border-b",
        popup: "border-b-0 pt-10",
        title: "text-xl font-medium text-gray-900 dark:text-white",
        close: {
          base: "hidden",
          icon: "h-10 w-10",
        },
      },
      footer: {
        base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
        popup: "border-t",
      },
    },
  };
  const navigate = useNavigate();
  const { houseId } = useParams<{ houseId: string }>();
  const introductionRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const usageFeeRef = useRef<HTMLDivElement>(null);
  const evaluateRef = useRef<HTMLDivElement>(null);
  const [singleHouseData, setSingleHouseData] = useState<any>({});
  const [isfilterPhotos, setIsFilterPhotos] = useState<any>([]); //取得去掉首圖url後的array
  const [isAPIProcessing, setIsAPIProcessing] = useState<boolean>(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveModalData, setReserveModalData] = useState<any>({});
  const [isComparePassModalOpen, setIsComparePassModalOpen] = useState(false);
  const [isCompareFalseModalOpen, setIsCompareFalseModalOpen] = useState(false);
  const [isHousePicturesCarouselOpen, setIsHousePicturesCarouselOpen] =
    useState(false);
  const [isSeeMoreHousePicturesOpen, setIsSeeMoreHousePicturesOpen] =
    useState(false);
  const [isConfirmAPIProcessing, setConfirmIsAPIProcessing] =
    useState<boolean>(false);
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

  // 將首圖過濾掉
  const filterPhotos = (photos: any, firstPhotoUrl: any) => {
    if (photos.length > 0) {
      return photos.filter((photo: any) => photo !== firstPhotoUrl);
    }
    return [];
  };

  // 租客提確定提供資訊給房東，並進行條件比對
  const provideTenantInfo = () => {
    const conditionMatching = async () => {
      try {
        const response = await apiUserInfoCompare(houseId as string);
        console.log(response);
        if (response.status === 200) {
          setIsReserveModalOpen(false);
          setIsComparePassModalOpen(true);
        }
        setConfirmIsAPIProcessing(false);
      } catch (errors: any) {
        console.log(errors);
        if (errors.response.data.Message === "使用者不符此房源之租客限制") {
          setIsReserveModalOpen(false);
          setIsCompareFalseModalOpen(true);
        }
        if (errors.response.data.Message === "使用者角色並非租客") {
          alert("使用者角色並非租客，正在導向到登入頁");
          navigate("/login");
        }
        if (errors.response.data.Message === "該房源不存在") {
          alert("該房源不存在，正在導向到房源列表");
          navigate("/houseList");
        }
        setConfirmIsAPIProcessing(false);
      }
    };
    setConfirmIsAPIProcessing(true);
    conditionMatching();
  };

  // 秀租客基本資訊
  const showTenantInfo = () => {
    const getTenantData = async () => {
      try {
        const response = await apiUserInfoGet();
        setReserveModalData(response.data.data);
        console.log(response.data.data);
      } catch (error: any) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          alert(`您尚未登入，或有效期限過期，即將導向到登入頁`);
          setIsReserveModalOpen(false);
          navigate("/signup");
        }
        if (error.response.status === 400) {
          alert(`登入租客帳號後即可使用此功能`);
          setIsReserveModalOpen(false);
        }
      }
    };

    setIsReserveModalOpen(true);
    getTenantData();
  };

  useEffect(() => {
    const getData = async (houseId: any) => {
      try {
        setIsAPIProcessing(true);
        const response = await apiHouseCommonSingleInfo(houseId);
        console.log(response);
        setSingleHouseData(response.data.data);
        setIsFilterPhotos(
          filterPhotos(
            response.data.data.photos.restOfPic,
            response.data.data.photos.firstPic
          )
        );
        setIsAPIProcessing(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData(houseId);
  }, []);

  return (
    <>
      {isAPIProcessing && <BigLoading />}

      {/* 等待 API 抓到資料再渲染資料 */}
      {Object.keys(singleHouseData).length > 0 && (
        <div className="wrap bg-Neutral-99 pb-32">
          {/* 房源圖片 */}
          <div className="container layout-grid pt-6 mb-6">
            {/* 首圖 */}
            <div className="col-span-6 col-start-2 overflow-hidden">
              {/* 首圖位置輪播特效 */}
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mainImgSwiper cursor-pointer"
                onClick={() => setIsHousePicturesCarouselOpen(true)}
              >
                {/* 輪播首圖 */}
                <SwiperSlide>
                  <div className="singleHousePageSwiper w-[648px] h-[425px]">
                    <img src={singleHouseData.photos.firstPic} alt="mainImg" />
                  </div>
                </SwiperSlide>
                {/* 輪播次要圖片 */}
                {filterPhotos(
                  singleHouseData.photos.restOfPic,
                  singleHouseData.photos.firstPic
                ).map((photo: any) => (
                  <SwiperSlide key={photo}>
                    <div className="singleHousePageSwiper w-[648px] h-[425px]">
                      <img src={photo} alt="restImg" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* 次要圖片 */}
            <div className="col-span-4">
              <div className="sideImg">
                <ul className="flex flex-wrap justify-between gap-y-6">
                  {isfilterPhotos[0] ? (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <img
                        src={isfilterPhotos[0]}
                        alt="houseImg"
                        className="h-full w-full hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </li>
                  ) : (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <svg
                        width="200"
                        height="200"
                        viewBox="200 0 200 400"
                        className="object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        <rect width="600" height="400" fill="#E7E7E7" />
                        <path
                          d="M251 197.254L267 184L283 197.254V216H251V197.254Z"
                          fill="#C0C8C9"
                        />
                        <path
                          d="M321.242 198.84V203.627H318.349V206.571C318.349 207.817 318.204 208.739 317.914 209.336C317.623 209.916 316.992 210.334 316.019 210.59C315.063 210.846 313.527 210.974 311.411 210.974C310.609 210.974 309.986 210.966 309.542 210.949C309.577 210.539 309.594 210.232 309.594 210.027C309.594 208.884 309.346 207.646 308.851 206.315L306.061 209.874L305.6 209.49C305.156 209.08 304.73 208.713 304.32 208.389C302.938 209.635 301.18 210.616 299.046 211.333C298.671 210.445 298.261 209.652 297.818 208.952C297.374 208.235 296.777 207.459 296.026 206.622C297.766 206.247 299.166 205.769 300.224 205.189C299.183 204.455 298.185 203.798 297.229 203.218C297.792 201.511 298.202 199.574 298.458 197.406H296.87V193.208H298.816L298.918 191.365H303.834L303.808 191.979C303.808 192.252 303.791 192.662 303.757 193.208H308.621V191.877H319.654L320.832 195.973C320.081 197.082 319.339 198.038 318.605 198.84H321.242ZM310.029 205.675C311.07 205.795 311.727 205.854 312 205.854C312.444 205.854 312.725 205.769 312.845 205.598C312.964 205.411 313.024 205.027 313.024 204.446V203.627H308.954V198.84H313.024V197.406H313.894C314.253 197.133 314.594 196.818 314.918 196.459H308.621C308.518 198.081 308.348 199.54 308.109 200.837C307.87 202.117 307.529 203.294 307.085 204.37L308.851 205.522L310.029 205.675ZM303.296 197.406C303.091 198.806 302.784 200.137 302.374 201.4L303.142 201.861C303.569 200.769 303.876 199.284 304.064 197.406H303.296ZM346.074 203.166H347.507V209.003C347.507 209.583 347.345 210.01 347.021 210.283C346.697 210.556 346.082 210.744 345.178 210.846C344.29 210.949 342.882 211 340.954 211C340.919 210.625 340.877 210.326 340.826 210.104H335.219V210.718H330.099V205.598H341.133V208.107C341.423 208.124 341.602 208.099 341.67 208.03C341.739 207.945 341.773 207.749 341.773 207.442V205.291H329.357V210.898H323.418V203.166H324.774V198.994H327.539C327.061 198.584 326.507 198.217 325.875 197.893C325.261 197.551 324.493 197.21 323.571 196.869C325.892 196.681 327.565 196.451 328.589 196.178H323.955V191.826H332.275V191.211H338.573V191.826H346.893V195.87H341.901V195.384H341.107V196.434C341.107 196.502 341.141 196.553 341.21 196.587C341.278 196.604 341.431 196.613 341.67 196.613C341.841 196.613 341.961 196.596 342.029 196.562C342.097 196.527 342.131 196.459 342.131 196.357C342.131 196.306 342.114 196.212 342.08 196.075C343.565 196.178 345.289 196.246 347.251 196.28C347.251 196.826 347.217 197.193 347.149 197.381C347.098 197.569 346.961 197.765 346.739 197.97C346.5 198.191 346.176 198.337 345.766 198.405C345.374 198.473 344.845 198.524 344.179 198.558C343.906 198.558 343.71 198.567 343.59 198.584C342.839 198.618 342.225 198.635 341.747 198.635L339.443 198.61C339.255 198.593 338.965 198.584 338.573 198.584C337.549 198.567 336.841 198.482 336.448 198.328C336.055 198.174 335.859 197.918 335.859 197.56V195.998C334.938 196.801 333.931 197.398 332.838 197.79C331.763 198.166 330.202 198.567 328.154 198.994H346.074V203.166ZM328.947 195.384V196.075C329.545 195.905 330.014 195.674 330.355 195.384H328.947ZM332.506 195.384L335.859 195.947V195.384H332.506ZM340.083 200.914H330.739V203.166H331.43V201.246H340.083V200.914ZM336.499 203.166H340.083V202.808H336.499V203.166ZM335.219 207.339V208.21H336.32V207.339H335.219Z"
                          fill="#C0C8C9"
                        />
                      </svg>
                    </li>
                  )}
                  {isfilterPhotos[1] ? (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <img
                        src={isfilterPhotos[1]}
                        alt="houseImg"
                        className="h-full w-full hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </li>
                  ) : (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <svg
                        width="200"
                        height="200"
                        viewBox="200 0 200 400"
                        className="object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        <rect width="600" height="400" fill="#E7E7E7" />
                        <path
                          d="M251 197.254L267 184L283 197.254V216H251V197.254Z"
                          fill="#C0C8C9"
                        />
                        <path
                          d="M321.242 198.84V203.627H318.349V206.571C318.349 207.817 318.204 208.739 317.914 209.336C317.623 209.916 316.992 210.334 316.019 210.59C315.063 210.846 313.527 210.974 311.411 210.974C310.609 210.974 309.986 210.966 309.542 210.949C309.577 210.539 309.594 210.232 309.594 210.027C309.594 208.884 309.346 207.646 308.851 206.315L306.061 209.874L305.6 209.49C305.156 209.08 304.73 208.713 304.32 208.389C302.938 209.635 301.18 210.616 299.046 211.333C298.671 210.445 298.261 209.652 297.818 208.952C297.374 208.235 296.777 207.459 296.026 206.622C297.766 206.247 299.166 205.769 300.224 205.189C299.183 204.455 298.185 203.798 297.229 203.218C297.792 201.511 298.202 199.574 298.458 197.406H296.87V193.208H298.816L298.918 191.365H303.834L303.808 191.979C303.808 192.252 303.791 192.662 303.757 193.208H308.621V191.877H319.654L320.832 195.973C320.081 197.082 319.339 198.038 318.605 198.84H321.242ZM310.029 205.675C311.07 205.795 311.727 205.854 312 205.854C312.444 205.854 312.725 205.769 312.845 205.598C312.964 205.411 313.024 205.027 313.024 204.446V203.627H308.954V198.84H313.024V197.406H313.894C314.253 197.133 314.594 196.818 314.918 196.459H308.621C308.518 198.081 308.348 199.54 308.109 200.837C307.87 202.117 307.529 203.294 307.085 204.37L308.851 205.522L310.029 205.675ZM303.296 197.406C303.091 198.806 302.784 200.137 302.374 201.4L303.142 201.861C303.569 200.769 303.876 199.284 304.064 197.406H303.296ZM346.074 203.166H347.507V209.003C347.507 209.583 347.345 210.01 347.021 210.283C346.697 210.556 346.082 210.744 345.178 210.846C344.29 210.949 342.882 211 340.954 211C340.919 210.625 340.877 210.326 340.826 210.104H335.219V210.718H330.099V205.598H341.133V208.107C341.423 208.124 341.602 208.099 341.67 208.03C341.739 207.945 341.773 207.749 341.773 207.442V205.291H329.357V210.898H323.418V203.166H324.774V198.994H327.539C327.061 198.584 326.507 198.217 325.875 197.893C325.261 197.551 324.493 197.21 323.571 196.869C325.892 196.681 327.565 196.451 328.589 196.178H323.955V191.826H332.275V191.211H338.573V191.826H346.893V195.87H341.901V195.384H341.107V196.434C341.107 196.502 341.141 196.553 341.21 196.587C341.278 196.604 341.431 196.613 341.67 196.613C341.841 196.613 341.961 196.596 342.029 196.562C342.097 196.527 342.131 196.459 342.131 196.357C342.131 196.306 342.114 196.212 342.08 196.075C343.565 196.178 345.289 196.246 347.251 196.28C347.251 196.826 347.217 197.193 347.149 197.381C347.098 197.569 346.961 197.765 346.739 197.97C346.5 198.191 346.176 198.337 345.766 198.405C345.374 198.473 344.845 198.524 344.179 198.558C343.906 198.558 343.71 198.567 343.59 198.584C342.839 198.618 342.225 198.635 341.747 198.635L339.443 198.61C339.255 198.593 338.965 198.584 338.573 198.584C337.549 198.567 336.841 198.482 336.448 198.328C336.055 198.174 335.859 197.918 335.859 197.56V195.998C334.938 196.801 333.931 197.398 332.838 197.79C331.763 198.166 330.202 198.567 328.154 198.994H346.074V203.166ZM328.947 195.384V196.075C329.545 195.905 330.014 195.674 330.355 195.384H328.947ZM332.506 195.384L335.859 195.947V195.384H332.506ZM340.083 200.914H330.739V203.166H331.43V201.246H340.083V200.914ZM336.499 203.166H340.083V202.808H336.499V203.166ZM335.219 207.339V208.21H336.32V207.339H335.219Z"
                          fill="#C0C8C9"
                        />
                      </svg>
                    </li>
                  )}
                  {isfilterPhotos[2] ? (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <img
                        src={isfilterPhotos[2]}
                        alt="houseImg"
                        className="h-full w-full hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </li>
                  ) : (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <svg
                        width="200"
                        height="200"
                        viewBox="200 0 200 400"
                        className="object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        <rect width="600" height="400" fill="#E7E7E7" />
                        <path
                          d="M251 197.254L267 184L283 197.254V216H251V197.254Z"
                          fill="#C0C8C9"
                        />
                        <path
                          d="M321.242 198.84V203.627H318.349V206.571C318.349 207.817 318.204 208.739 317.914 209.336C317.623 209.916 316.992 210.334 316.019 210.59C315.063 210.846 313.527 210.974 311.411 210.974C310.609 210.974 309.986 210.966 309.542 210.949C309.577 210.539 309.594 210.232 309.594 210.027C309.594 208.884 309.346 207.646 308.851 206.315L306.061 209.874L305.6 209.49C305.156 209.08 304.73 208.713 304.32 208.389C302.938 209.635 301.18 210.616 299.046 211.333C298.671 210.445 298.261 209.652 297.818 208.952C297.374 208.235 296.777 207.459 296.026 206.622C297.766 206.247 299.166 205.769 300.224 205.189C299.183 204.455 298.185 203.798 297.229 203.218C297.792 201.511 298.202 199.574 298.458 197.406H296.87V193.208H298.816L298.918 191.365H303.834L303.808 191.979C303.808 192.252 303.791 192.662 303.757 193.208H308.621V191.877H319.654L320.832 195.973C320.081 197.082 319.339 198.038 318.605 198.84H321.242ZM310.029 205.675C311.07 205.795 311.727 205.854 312 205.854C312.444 205.854 312.725 205.769 312.845 205.598C312.964 205.411 313.024 205.027 313.024 204.446V203.627H308.954V198.84H313.024V197.406H313.894C314.253 197.133 314.594 196.818 314.918 196.459H308.621C308.518 198.081 308.348 199.54 308.109 200.837C307.87 202.117 307.529 203.294 307.085 204.37L308.851 205.522L310.029 205.675ZM303.296 197.406C303.091 198.806 302.784 200.137 302.374 201.4L303.142 201.861C303.569 200.769 303.876 199.284 304.064 197.406H303.296ZM346.074 203.166H347.507V209.003C347.507 209.583 347.345 210.01 347.021 210.283C346.697 210.556 346.082 210.744 345.178 210.846C344.29 210.949 342.882 211 340.954 211C340.919 210.625 340.877 210.326 340.826 210.104H335.219V210.718H330.099V205.598H341.133V208.107C341.423 208.124 341.602 208.099 341.67 208.03C341.739 207.945 341.773 207.749 341.773 207.442V205.291H329.357V210.898H323.418V203.166H324.774V198.994H327.539C327.061 198.584 326.507 198.217 325.875 197.893C325.261 197.551 324.493 197.21 323.571 196.869C325.892 196.681 327.565 196.451 328.589 196.178H323.955V191.826H332.275V191.211H338.573V191.826H346.893V195.87H341.901V195.384H341.107V196.434C341.107 196.502 341.141 196.553 341.21 196.587C341.278 196.604 341.431 196.613 341.67 196.613C341.841 196.613 341.961 196.596 342.029 196.562C342.097 196.527 342.131 196.459 342.131 196.357C342.131 196.306 342.114 196.212 342.08 196.075C343.565 196.178 345.289 196.246 347.251 196.28C347.251 196.826 347.217 197.193 347.149 197.381C347.098 197.569 346.961 197.765 346.739 197.97C346.5 198.191 346.176 198.337 345.766 198.405C345.374 198.473 344.845 198.524 344.179 198.558C343.906 198.558 343.71 198.567 343.59 198.584C342.839 198.618 342.225 198.635 341.747 198.635L339.443 198.61C339.255 198.593 338.965 198.584 338.573 198.584C337.549 198.567 336.841 198.482 336.448 198.328C336.055 198.174 335.859 197.918 335.859 197.56V195.998C334.938 196.801 333.931 197.398 332.838 197.79C331.763 198.166 330.202 198.567 328.154 198.994H346.074V203.166ZM328.947 195.384V196.075C329.545 195.905 330.014 195.674 330.355 195.384H328.947ZM332.506 195.384L335.859 195.947V195.384H332.506ZM340.083 200.914H330.739V203.166H331.43V201.246H340.083V200.914ZM336.499 203.166H340.083V202.808H336.499V203.166ZM335.219 207.339V208.21H336.32V207.339H335.219Z"
                          fill="#C0C8C9"
                        />
                      </svg>
                    </li>
                  )}
                  {isfilterPhotos[3] ? (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <img
                        src={isfilterPhotos[3]}
                        alt="houseImg"
                        className="h-full w-full hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </li>
                  ) : (
                    <li
                      className="h-[200px] overflow-hidden"
                      onClick={() => setIsHousePicturesCarouselOpen(true)}
                    >
                      <svg
                        width="200"
                        height="200"
                        viewBox="200 0 200 400"
                        className="object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        <rect width="600" height="400" fill="#E7E7E7" />
                        <path
                          d="M251 197.254L267 184L283 197.254V216H251V197.254Z"
                          fill="#C0C8C9"
                        />
                        <path
                          d="M321.242 198.84V203.627H318.349V206.571C318.349 207.817 318.204 208.739 317.914 209.336C317.623 209.916 316.992 210.334 316.019 210.59C315.063 210.846 313.527 210.974 311.411 210.974C310.609 210.974 309.986 210.966 309.542 210.949C309.577 210.539 309.594 210.232 309.594 210.027C309.594 208.884 309.346 207.646 308.851 206.315L306.061 209.874L305.6 209.49C305.156 209.08 304.73 208.713 304.32 208.389C302.938 209.635 301.18 210.616 299.046 211.333C298.671 210.445 298.261 209.652 297.818 208.952C297.374 208.235 296.777 207.459 296.026 206.622C297.766 206.247 299.166 205.769 300.224 205.189C299.183 204.455 298.185 203.798 297.229 203.218C297.792 201.511 298.202 199.574 298.458 197.406H296.87V193.208H298.816L298.918 191.365H303.834L303.808 191.979C303.808 192.252 303.791 192.662 303.757 193.208H308.621V191.877H319.654L320.832 195.973C320.081 197.082 319.339 198.038 318.605 198.84H321.242ZM310.029 205.675C311.07 205.795 311.727 205.854 312 205.854C312.444 205.854 312.725 205.769 312.845 205.598C312.964 205.411 313.024 205.027 313.024 204.446V203.627H308.954V198.84H313.024V197.406H313.894C314.253 197.133 314.594 196.818 314.918 196.459H308.621C308.518 198.081 308.348 199.54 308.109 200.837C307.87 202.117 307.529 203.294 307.085 204.37L308.851 205.522L310.029 205.675ZM303.296 197.406C303.091 198.806 302.784 200.137 302.374 201.4L303.142 201.861C303.569 200.769 303.876 199.284 304.064 197.406H303.296ZM346.074 203.166H347.507V209.003C347.507 209.583 347.345 210.01 347.021 210.283C346.697 210.556 346.082 210.744 345.178 210.846C344.29 210.949 342.882 211 340.954 211C340.919 210.625 340.877 210.326 340.826 210.104H335.219V210.718H330.099V205.598H341.133V208.107C341.423 208.124 341.602 208.099 341.67 208.03C341.739 207.945 341.773 207.749 341.773 207.442V205.291H329.357V210.898H323.418V203.166H324.774V198.994H327.539C327.061 198.584 326.507 198.217 325.875 197.893C325.261 197.551 324.493 197.21 323.571 196.869C325.892 196.681 327.565 196.451 328.589 196.178H323.955V191.826H332.275V191.211H338.573V191.826H346.893V195.87H341.901V195.384H341.107V196.434C341.107 196.502 341.141 196.553 341.21 196.587C341.278 196.604 341.431 196.613 341.67 196.613C341.841 196.613 341.961 196.596 342.029 196.562C342.097 196.527 342.131 196.459 342.131 196.357C342.131 196.306 342.114 196.212 342.08 196.075C343.565 196.178 345.289 196.246 347.251 196.28C347.251 196.826 347.217 197.193 347.149 197.381C347.098 197.569 346.961 197.765 346.739 197.97C346.5 198.191 346.176 198.337 345.766 198.405C345.374 198.473 344.845 198.524 344.179 198.558C343.906 198.558 343.71 198.567 343.59 198.584C342.839 198.618 342.225 198.635 341.747 198.635L339.443 198.61C339.255 198.593 338.965 198.584 338.573 198.584C337.549 198.567 336.841 198.482 336.448 198.328C336.055 198.174 335.859 197.918 335.859 197.56V195.998C334.938 196.801 333.931 197.398 332.838 197.79C331.763 198.166 330.202 198.567 328.154 198.994H346.074V203.166ZM328.947 195.384V196.075C329.545 195.905 330.014 195.674 330.355 195.384H328.947ZM332.506 195.384L335.859 195.947V195.384H332.506ZM340.083 200.914H330.739V203.166H331.43V201.246H340.083V200.914ZM336.499 203.166H340.083V202.808H336.499V203.166ZM335.219 207.339V208.21H336.32V207.339H335.219Z"
                          fill="#C0C8C9"
                        />
                      </svg>
                    </li>
                  )}
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
                        <span className="material-symbols-outlined">
                          pet_supplies
                        </span>
                      </span>
                      <span className="text-sans-b-body1">可養寵</span>
                    </li>
                  )}
                  {singleHouseData.features.isCookAllowed && (
                    <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                      <span className="material-symbols-outlined mr-1">
                        skillet
                      </span>
                      <span className="text-sans-b-body1">可開伙</span>
                    </li>
                  )}
                  {singleHouseData.features.isSTRAllowed && (
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
                      <button
                        className={`w-full text-sans-b-body1 text-center border-Neutral-90 bg-Brand-90 py-2 rounded-lg shadow-elevation-2 hover:bg-Brand-95 ${
                          singleHouseData.appointmentAvailable === false
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        onClick={showTenantInfo}
                        disabled={
                          singleHouseData.appointmentAvailable === false
                            ? true
                            : false
                        }
                      >
                        {singleHouseData.appointmentAvailable === false
                          ? "已申請預約看房"
                          : "預約看房"}
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
                          <span className="text-sans-b-h3">
                            {singleHouseData.landlord.lastName}
                          </span>{" "}
                          {singleHouseData.landlord.gender === "女"
                            ? "小姐"
                            : "先生"}
                        </p>
                      </div>
                      <div className="w-[116px] h-[116px] rounded-2xl overflow-hidden">
                        {singleHouseData.landlord.photo && (
                          <img
                            src={singleHouseData.landlord.photo}
                            alt="landLordProfile"
                          />
                        )}
                      </div>
                    </li>
                    <li className="flex justify-between gap-x-3">
                      <div className="w-full shadow-elevation-2 rounded-lg p-4">
                        <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                          評價
                        </h5>
                        <p className="flex justify-between items-end">
                          <span className="text-sans-h4">
                            {singleHouseData.landlord.ratingAvg}
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
                            {singleHouseData.landlord.ratingCount}
                          </span>
                          <span>則</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h5 className="text-sans-b-body1 text-Landlord-50 mb-3">
                        自我介紹
                      </h5>
                      <p>{singleHouseData.landlord.description}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 預約看房按鈕 pop-up */}
      <Flowbite theme={{ theme: customTheme }}>
        {Object.keys(reserveModalData).length > 0 ? (
          <Modal
            show={isReserveModalOpen}
            size="xl"
            onClose={() => setIsReserveModalOpen(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sans-h5">您將會提供基本資料與評價</h3>
                <img
                  src={close}
                  alt="close"
                  className="cursor-pointer"
                  onClick={() => setIsReserveModalOpen(false)}
                />
              </div>
              {/* 租客基本資訊 */}
              <div className="bg-Neutral-99 rounded-2xl p-6 mb-3">
                <ul className="flex flex-col gap-y-6">
                  <li className="flex justify-between">
                    <div>
                      <img
                        src={landLordIcon}
                        alt="landLordIcon"
                        className="mb-4"
                      />
                      <h4 className="text-sans-b-body1 text-Landlord-40 mb-4">
                        租客
                      </h4>
                      <span className="inline-block text-sans-b-h3 mb-3">
                        {reserveModalData.lastName + reserveModalData.firstName}
                      </span>
                      <p className="mb-2">
                        <span className="pr-2 border-r border-Tenant-70 mr-2">
                          {reserveModalData.gender}
                        </span>
                        {reserveModalData.job}
                      </p>
                      <p>{reserveModalData.telphone.toLocaleString()}</p>
                    </div>
                    <div className="w-[200px] h-[186px] rounded-2xl overflow-hidden">
                      {reserveModalData.photo && (
                        <img
                          src={reserveModalData.photo}
                          alt="landLordProfile"
                        />
                      )}
                    </div>
                  </li>
                  <li className="flex justify-between gap-x-3">
                    <div className="flex flex-col justify-between w-full bg-Neutral-95 rounded-lg p-4">
                      <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                        評價
                      </h5>
                      <p className="flex justify-between items-end">
                        {reserveModalData.ratingAvg ===
                        "新用戶，尚未被評價過" ? (
                          <span className="">
                            新用戶，
                            <br /> 尚未被評價過
                          </span>
                        ) : (
                          <span className="text-sans-h4">
                            {reserveModalData.ratingAvg}
                          </span>
                        )}
                        <img src={ratingStarIcon} alt="ratingStarIcon" />
                      </p>
                    </div>
                    <div className="flex flex-col justify-between w-full bg-Neutral-95 rounded-lg p-4">
                      <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">
                        則數
                      </h5>
                      <p className="flex justify-between items-end">
                        <span className="text-sans-h4">
                          {reserveModalData.ratingCount}
                        </span>
                        <span>則</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <h5 className="text-sans-b-body1 text-Landlord-50 mb-3">
                      自我介紹
                    </h5>
                    <p>您好，{reserveModalData.userIntro.trim()}</p>
                  </li>
                </ul>
              </div>
              <p className="mb-10">若您的資料有誤，請於帳號管理更新</p>
              <div className="flex justify-end gap-x-6">
                <button
                  type="button"
                  className="outline-button-m"
                  onClick={() => setIsReserveModalOpen(false)}
                >
                  不提供
                </button>
                <button
                  type="button"
                  className="filled-button-m"
                  onClick={provideTenantInfo}
                  disabled={isConfirmAPIProcessing}
                >
                  {isConfirmAPIProcessing ? (
                    <Spinner color="info" size="md" className="mr-4" />
                  ) : (
                    "確認提供"
                  )}
                </button>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          <Modal
            show={isReserveModalOpen}
            size="xl"
            onClose={() => setIsReserveModalOpen(false)}
            popup
          >
            <Modal.Header className="p-0" />
            <Modal.Body className="p-10">
              <div role="status" className="animate-pulse">
                <img
                  src={close}
                  alt="close"
                  className="ml-auto cursor-pointer"
                  onClick={() => setIsReserveModalOpen(false)}
                />
                <h3 className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-10"></h3>
                <div className="w-full flex justify-between p-6 rounded-2xl bg-Neutral-99 mb-4">
                  <div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6  mb-6"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[88px] mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[88px]  mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[109px] mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[109px] mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px] mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px] mb-6"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px] mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px]"></div>
                  </div>
                  <div className="flex items-center justify-center w-[200px] h-[186px] bg-gray-300 rounded">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </Modal.Body>
          </Modal>
        )}

        {/* 租客條件與房東設定的條件匹配失敗時，會跳此 Modal */}
        {
          <Modal
            show={isCompareFalseModalOpen}
            size="xl"
            onClose={() => setIsCompareFalseModalOpen(false)}
            popup
          >
            <Modal.Header className="p-0" />
            <Modal.Body className="p-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sans-h5">很抱歉，房東有設定條件限制</h3>
                <img
                  src={close}
                  alt="close"
                  className=" cursor-pointer"
                  onClick={() => setIsCompareFalseModalOpen(false)}
                />
              </div>
              <p className="mb-10">
                房東因個人考量有設定租客限制，我們不會將您的資料提供給他。
              </p>
              <button
                type="button"
                className="ml-auto filled-button-m"
                onClick={() => setIsCompareFalseModalOpen(false)}
              >
                沒關係，繼續找好房東
              </button>
            </Modal.Body>
          </Modal>
        }

        {/* 租客條件與房東設定的條件匹配成功時，會跳此 Modal */}
        {
          <Modal
            show={isComparePassModalOpen}
            size="xl"
            onClose={() => setIsComparePassModalOpen(false)}
            popup
          >
            <Modal.Header className="p-0" />
            <Modal.Body className="p-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sans-h5">房東聯絡資訊</h3>
                <img
                  src={close}
                  alt="close"
                  className=" cursor-pointer"
                  onClick={() => setIsComparePassModalOpen(false)}
                />
              </div>
              <p className="mb-10">請參考以下範例聯繫房東的方式</p>
              <span className="inline-block mb-1">電話</span>
              <p className="p-3 mb-10 border-b border-Neutral-70">
                0929-239-238
              </p>
              <span className="inline-block mb-1">Line</span>
              <p className="p-3 mb-10 border-b border-Neutral-70">
                Wanginthehouse
              </p>
              <div className="flex justify-end gap-x-6">
                <button
                  type="button"
                  className="outline-button-m"
                  onClick={() =>
                    navigate("/tenant/houseViewingManagement/houseViewingList")
                  }
                >
                  我的預約
                </button>
                <button
                  type="button"
                  className="filled-button-m"
                  onClick={() => setIsComparePassModalOpen(false)}
                >
                  繼續找房
                </button>
              </div>
            </Modal.Body>
          </Modal>
        }
      </Flowbite>

      {isHousePicturesCarouselOpen && (
        <HousePicturesModal
          closeModal={() => setIsHousePicturesCarouselOpen(false)}
          housePicturesData={singleHouseData.photos.restOfPic}
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
