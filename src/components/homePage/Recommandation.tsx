import recommendation_picture_2 from "../../assets/imgs/homePage/recommendation_picture_2.svg";
import { apiHouseCommonRecommendedList } from "../../apis/apis";
import { useEffect } from "react";

function Recommendation() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiHouseCommonRecommendedList();
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="recommendation py-16">
      <div className="container mb-16">
        <h3 className="text-sans-b-h4 text-center">
          <span className="before:block before:absolute before:h-6 before:w-[140px] before:bg-Tenant-95 before:bottom-[-10%] before:right-[-10%] before:rounded-md relative">
            <span className="relative text-black">精選推薦</span>
          </span>
        </h3>
      </div>
      {/* 房源推薦列表 */}
      <div className="container">
        <ul className="flex flex-wrap gap-x-3 gap-y-16">
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
          <li className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]">
            <a href="">
              <img
                className="rounded-[20px] mb-4"
                src={recommendation_picture_2}
                alt="recommendation_picture_1"
              />
              <h4 className="text-sans-b-h6 mb-3">信義國小套房 捷運3分鐘</h4>
              <div className="card_header mb-6">
                <ul className="flex gap-2 flex-wrap">
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">租屋補助</span>
                  </li>
                  <li className="py-1 px-2 bg-Tenant-90 rounded-lg">
                    <span className="text-sans-body1">寵物友善</span>
                  </li>
                </ul>
              </div>
              <div className="card_body mb-6">
                <ul className="flex flex-wrap gap-2 mb-2">
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">獨立套房</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">1房1衛</span>
                  </li>
                  <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                    <span className="text-sans-body1">6坪</span>
                  </li>
                  <li className="pr-2">
                    <span className="text-sans-body1">2/7樓</span>
                  </li>
                </ul>
                <span>高雄市新興區中正三路</span>
              </div>
              <div className="card_footer">
                <h5 className="text-right">
                  <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                    <span className="relative text-sans-b-h5 mr-2">10,000</span>
                  </span>
                  <span className="text-sans-caption font-normal">元/月</span>
                </h5>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Recommendation;
