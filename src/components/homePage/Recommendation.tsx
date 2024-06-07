import { apiHouseCommonRecommendedList } from "../../apis/apis";
import { useEffect, useState } from "react";
import dropdownCities from "../../constants/searchFormCondition/dropdownCities";
import RecommendationSkeleton from "../../components/homePage/RecommendationSkeleton";
import { Link } from "react-router-dom";

function Recommendation() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isAPIProcessing, setIsAPIProcessing] = useState<boolean>(false);
  // 最多只能顯示兩個標籤
  const getDisplayedTags = (
    isRentSubsidy: boolean,
    isPetAllowed: boolean,
    isCookAllowed: boolean,
    isSTRAllowed: boolean
  ) => {
    const tags = [];
    if (isRentSubsidy) {
      tags.push(
        <li className="py-1 px-2 bg-Tenant-90 rounded-lg" key="rentSubsidy">
          可申請租屋補助
        </li>
      );
    }
    if (isPetAllowed) {
      tags.push(
        <li className="py-1 px-2 bg-Tenant-90 rounded-lg" key="petAllowed">
          寵物友善
        </li>
      );
    }
    if (tags.length < 2 && isCookAllowed) {
      tags.push(
        <li className="py-1 px-2 bg-Tenant-90 rounded-lg" key="cookAllowed">
          可開火
        </li>
      );
    }
    if (tags.length < 2 && isSTRAllowed) {
      tags.push(
        <li className="py-1 px-2 bg-Tenant-90 rounded-lg" key="strAllowed">
          可短租
        </li>
      );
    }
    return tags.slice(0, 2); // 確保最多返回兩個標籤
  };
  const getAddress = (countryId: number, districtId: number) => {
    for (const region of Object.values(dropdownCities)) {
      for (const country of region) {
        if (country.countryId === countryId.toString()) {
          for (const district of country.districts) {
            if (district.districtId === districtId.toString()) {
              return `${country.countryName}${district.districtName}`;
            }
          }
        }
      }
    }
    return null;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsAPIProcessing(true);
        const res = await apiHouseCommonRecommendedList();
        setSearchResults(res.data);
        setIsAPIProcessing(false);
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
          {isAPIProcessing ? (
            <RecommendationSkeleton />
          ) : (
            searchResults.length > 0 &&
            searchResults.map((house, index) => {
              return (
                <li
                  key={index}
                  className="p-4 hover:bg-Neutral-99 hover:rounded-[20px]"
                >
                  <Link to={`/houseList/${house.Id}`}>
                    <div className="w-[289px] h-[188px] rounded-[20px] mb-4 overflow-hidden">
                      <img
                        src={house.image.imagePath}
                        alt="recommendationPicture"
                      />
                    </div>
                    <h4 className="text-sans-b-h6 mb-3">{house.title}</h4>
                    <div className="card_header mb-6">
                      <ul className="flex gap-2 flex-wrap">
                        {getDisplayedTags(
                          house.isRentSubsidy as boolean,
                          house.isPetAllowd as boolean,
                          house.isCookAllowd as boolean,
                          house.isSTRAllowed as boolean
                        )}
                      </ul>
                    </div>
                    <div className="card_body mb-6">
                      <ul className="flex flex-wrap gap-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span className="text-sans-body1">
                            {house.type === 1
                              ? "獨立套房"
                              : house.type === 2
                              ? "分租套房"
                              : house.type === 3
                              ? "雅房"
                              : house.type === 4
                              ? "其他"
                              : "整層住家"}
                          </span>
                        </li>
                        <li
                          className={
                            house.roomNumber > 0 ||
                            house.bathRoomNumbers > 0 ||
                            house.livingRoomNumbers > 0 ||
                            house.balconyNumbers > 0
                              ? "pr-2 border-r-[1px] border-r-Tenant-70"
                              : "hidden"
                          }
                        >
                          <span>
                            {house.roomNumber > 0
                              ? `${house.roomNumber}房`
                              : ""}
                            {house.livingRoomNumbers > 0
                              ? ` ${house.livingRoomNumbers}廳`
                              : ""}
                          </span>
                        </li>
                        <li
                          className={
                            house.ping > 0
                              ? "pr-2 border-r-[1px] border-r-Tenant-70"
                              : "hidden"
                          }
                        >
                          <span>{house.ping}坪</span>
                        </li>
                        <li
                          className={
                            !house.floor || !house.floorTotal ? "hidden" : ""
                          }
                        >
                          <span>{`${house.floor}/${house.floorTotal}樓`}</span>
                        </li>
                      </ul>
                      <span>
                        {getAddress(house.city, house.district) +
                          `${house.road && house.road}`}
                      </span>
                    </div>
                    <div className="card_footer">
                      <h5 className="text-right">
                        <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                          <span className="relative text-sans-b-h5 mr-2">
                            {parseInt(house.rent).toLocaleString()}
                          </span>
                        </span>
                        <span className="text-sans-caption font-normal">
                          元/月
                        </span>
                      </h5>
                    </div>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {}
    </section>
  );
}

export default Recommendation;
