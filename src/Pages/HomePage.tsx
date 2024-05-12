import { TypeAnimation } from "react-type-animation";
import SearchForm from "../components/homePage/SearchForm";

interface FormElementsState {
  District: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    districts: {
      content: string;
      checked: boolean;
    }[];
  };
  HouseType: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    houseTypes: {
      content: string;
      checked: boolean;
    }[];
  };
  RentRange: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    rentRanges: {
      content: string;
      checked: boolean;
    }[];
  };
}

function HomePage() {
  return (
    <>
      <section className="search bg-homeSearchImg bg-center bg-cover h-[842px]">
        {/* Title */}
        <div className="container pt-20 mb-8">
          <h2 className="w-[559px] mx-auto text-center bg-Neutral-10 text-white font-Dela-Gothic-One text-dela-display1 pl-8 rounded-[12px]">
            {/* <span className="text-Brand-90 font-Dela-Gothic-One text-dela-display1">
              找好房東
            </span> */}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "找好房東",
                1500, // wait 1s before replacing "Mice" with "Hamsters"
                "愛在一起",
                1500,
                "孟母三遷",
                1500,
                "安居樂業",
                1500,
                "租屋補助",
                1500,
              ]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 250 }}
              className={
                "text-Brand-90 font-Dela-Gothic-One text-dela-display1 type-animation"
              }
              repeat={Infinity}
            />
            ,好窩！
          </h2>
        </div>

        {/* Search body */}
        <div className="container layout-grid">
          <div className="col-start-2 col-span-10">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="recommendation py-16">
        <div className="container mb-16">
          <h3 className="text-sans-b-h4 text-center">精選推薦</h3>
        </div>
        <div className="container">
          <ul className="flex flex-wrap gap-x-3 gap-y-16">
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
            <li className="p-4">
              <a href="">
                <img
                  className="rounded-[20px] mb-4"
                  src="./src/assets/imgs/home/recommendation_picture_2.svg"
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
                    <span className="text-sans-b-h5 mr-2">10,000</span>
                    <span className="text-sans-caption font-normal">元/月</span>
                  </h5>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomePage;
