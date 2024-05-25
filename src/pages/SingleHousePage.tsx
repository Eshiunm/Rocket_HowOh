import { useEffect } from "react";
import { useParams } from "react-router-dom";
import houseImg from "../assets/imgs/homePage/recommendation_picture_1.svg";
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

  useEffect(() => {
    // 使用 houseId 進行相關操作，例如獲取數據
    console.log(houseId);
  }, []);
  return (
    <>
      <div className="wrap bg-Neutral-99 pb-32">
        {/* 房源圖片 */}
        <div className="container layout-grid pt-6 mb-6">
          {/* 首圖 */}
          <div className="col-span-6 col-start-2">
            <div className="mainImg h-[425px]">
              <img src={houseImg} alt="mainImg" className="w-full h-full" />
            </div>
          </div>
          {/* 次要圖片 */}
          <div className="col-span-4">
            <div className="sideImg flex">
              <ul className="flex flex-wrap justify-between gap-y-6">
                <li className="w-[48%] h-[200px]">
                  <img src={houseImg} alt="houseImg" className="h-full" />
                </li>
                <li className="w-[48%] h-[200px]">
                  <img src={houseImg} alt="houseImg" className="h-full" />
                </li>
                <li className="w-[48%] h-[200px]">
                  <img src={houseImg} alt="houseImg" className="h-full" />
                </li>
                <li className="w-[48%] h-[200px]">
                  <img src={houseImg} alt="houseImg" className="h-full" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 房源細項內容 */}
        <div className="container layout-grid">
          {/* 房源描述 */}
          <div className="col-span-6 col-start-2">
            <h2 className="text-sans-b-h3 mb-6">信義國小套房 捷運3分鐘</h2>
            {/* 房源特色：可短租、可養寵、可開火等等 */}
            <div className="mb-10">
              <ul className="flex gap-x-4">
                <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                  <span className="material-symbols-outlined mr-1">
                    savings
                  </span>
                  <span className="text-sans-b-body1">可申請租屋補助</span>
                </li>
                <li className="flex items-center px-4 py-2 bg-Tenant-90 rounded-full">
                  <span className="material-symbols-outlined mr-1">event</span>
                  <span className="text-sans-b-body1">可短租</span>
                </li>
              </ul>
            </div>
            {/* 基本資訊 */}
            <div className="pb-6 border-b border-Neutral-95 mb-10">
              <h3 className="text-sans-b-h6 mb-5">
                <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                  <span className="relative text-black px-3">基本資訊</span>
                </span>
              </h3>
              <p>
                <span className="inline-block mb-3">高雄市新興區信守街</span>
                <ul className="flex gap-x-2 mb-3">
                  <li className="border-r border-Tenant-70 pr-2">10坪</li>
                  <li>7/8樓</li>
                </ul>
                <ul className="flex gap-x-2">
                  <li className="border-r border-Tenant-70 pr-2">獨立套房</li>
                  <li>1房1衛</li>
                </ul>
              </p>
            </div>
            {/* 介紹、設備、雜支、評價 */}
            <div>
              <ul className="flex gap-x-3 mb-10">
                <li className="">
                  <button className="w-[153px] flex justify-center items-center gap-x-2 py-3 rounded-lg bg-Neutral-95">
                    <img src={handShakeIcon} alt="handShakeIcon" />
                    <span className="text-sans-b-body1">房源介紹</span>
                  </button>
                </li>
                <li className="">
                  <button className="w-[153px] flex justify-center items-center gap-x-2 py-3 rounded-lg bg-Neutral-95">
                    <img src={homeAndGardenIcon} alt="homeAndGardenIcon" />
                    <span className="text-sans-b-body1">設備設施</span>
                  </button>
                </li>
                <li className="">
                  <button className="w-[153px] flex justify-center items-center gap-x-2 py-3 rounded-lg bg-Neutral-95">
                    <img src={grandMoneyIcon} alt="handShakeIcon" />
                    <span className="text-sans-b-body1">雜支</span>
                  </button>
                </li>
                <li className="">
                  <button className="w-[153px] flex justify-center items-center gap-x-2 py-3 rounded-lg bg-Neutral-95">
                    <img src={reviewsIcon} alt="handShakeIcon" />
                    <span className="text-sans-b-body1">評價</span>
                  </button>
                </li>
              </ul>

              {/* 房源介紹 */}
              <div className="mb-10 border-b border-Neutral-95">
                <h3 className="text-sans-b-h6 mb-5">
                  <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                    <span className="relative text-black px-3">房源介紹</span>
                  </span>
                </h3>
                <p className="whitespace-break-spaces pb-6">
                  大家好，我是王太太，我有一間舒適溫馨的房間要出租，房源位於信義國小站旁，交通便利，生活機能完善。步行幾分鐘就能抵達捷運站和公車站。
                  <br />
                  <br />
                  您會與其他兩個房客共用客廳，但您可以獨享一個套房，裡面有一個開窗的衛浴。房間包含：窗人床、桌椅，一卡皮箱即可入住。
                  <br />
                  <br />
                  除此之外，整棟公寓有良好的Wifi，明亮的光線，很適合學生。如果您想吃的健康，旁邊有市場，公寓內有簡易的廚房可使用。但麻煩大家多注意衛生清潔。
                  <br />
                  <br />
                  歡迎學生，上班族預約看房！
                </p>
              </div>

              {/* 設備設施 */}
              <div className="mb-10 border-b border-Neutral-95">
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
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">百貨商場</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px]">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">早市</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">夜市</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px]">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">公園綠地</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">學校</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px]">
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
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">垃圾集中處理</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">浴室開窗</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
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
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">冷氣</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">洗衣機</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">冰箱</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">衣櫃</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">桌椅</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">熱水器</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">網路</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">床</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                        <img
                          src={houseFeatureCheckIcon}
                          alt="houseFeatureCheckIcon"
                          className="w-[10px] h-2"
                        />
                      </div>
                      <span className="text-sans-body1">電梯</span>
                    </li>
                    <li className="w-[30.86%] flex items-center gap-x-2">
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
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
                        <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ">
                          <img
                            src={houseFeatureCheckIcon}
                            alt="houseFeatureCheckIcon"
                            className="w-[10px] h-2"
                          />
                        </div>
                        <span className="text-sans-body1">捷運</span>
                      </div>
                    </li>
                    <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] bg-black">
                          <img
                            src={houseFeatureCheckIcon}
                            alt="houseFeatureCheckIcon"
                            className="w-[10px] h-2"
                          />
                        </div>
                        <span className="text-sans-body1">輕軌</span>
                      </div>
                      <div className="w-full flex">
                        <div className="p-3 w-full border-b border-Neutral-70">
                          <p className="">3</p>
                        </div>
                        <p className="whitespace-nowrap py-3">公尺</p>
                      </div>
                    </li>
                    <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ">
                          <img
                            src={houseFeatureCheckIcon}
                            alt="houseFeatureCheckIcon"
                            className="w-[10px] h-2"
                          />
                        </div>
                        <span className="text-sans-body1">公車</span>
                      </div>
                    </li>
                    <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ">
                          <img
                            src={houseFeatureCheckIcon}
                            alt="houseFeatureCheckIcon"
                            className="w-[10px] h-2"
                          />
                        </div>
                        <span className="text-sans-body1">火車</span>
                      </div>
                    </li>
                    <li className="w-[30.86%] flex flex-wrap items-start gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <div className="flex justify-center items-center w-5 h-5 border-2 border-black rounded-[4px] ">
                          <img
                            src={houseFeatureCheckIcon}
                            alt="houseFeatureCheckIcon"
                            className="w-[10px] h-2"
                          />
                        </div>
                        <span className="text-sans-body1">高鐵</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 雜支 */}
              <div className="mb-10 border-b border-Neutral-95">
                <h3 className="text-sans-b-h6 mb-5">
                  <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                    <span className="relative text-black px-3">雜支</span>
                  </span>
                </h3>
                <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">水費</h4>
                <p className="mb-6">包含於房租</p>

                <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">電費</h4>
                <p className="mb-3">依台電計價</p>
                <span className="inline-block text-sans-b-body1 mb-3">
                  繳納方式
                </span>
                <p className="mb-6">自行繳納</p>

                <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">
                  管理費
                </h4>
                <p className="mb-6">無管理費</p>
              </div>

              {/* 評價 */}
              <div className="mb-10 border-b border-Neutral-95">
                <h3 className="text-sans-b-h6 mb-5">
                  <span className="before:block before:absolute before:h-5 before:w-[100%] before:bg-Neutral-95 before:bottom-[-5%] before:-right-[0%] before:rounded-md relative">
                    <span className="relative text-black px-3">評價</span>
                  </span>
                </h3>
                {/* 評價列表 */}
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
              <button className="flex items-center mb-7 filled-button-s">
                查看更多照片 <img src={rightIcon_white} alt="rightIcon_white" />
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
                          10,000
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
                      一個月
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
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SingleHousePage;
