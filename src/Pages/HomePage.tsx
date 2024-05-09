import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import dropdownIcon from "../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../assets/imgs/icons/searchIcon.svg";
import kaohsiungDistricts from "../constants/locations/districts/kaohsiungDistricts";
import houseTypes from "../constants/houseTypes";
import rentRange from "../constants/rentRange";

function HomePage() {
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const regionNoLimitInputRef = useRef(null);
  const houseTypeNoLimitInputRef = useRef(null);
  const rentNoLimitInputRef = useRef(null);
  const { handleSubmit } = useForm();

  const handleRegionNoLimitChangeStatus = e => {
    regionNoLimitInputRef.current.checked = false;
  };
  const handleHouseTypeNoLimitChangeStatus = e => {
    houseTypeNoLimitInputRef.current.checked = false;
  };
  const handleRentNoLimitChangeStatus = e => {
    rentNoLimitInputRef.current.checked = false;
  };


  const onSubmit = data => {
    console.log(data);
  };
  return (
    <>
      <section className="section-search bg-homeSearchImg bg-center bg-cover h-[842px]">
        {/* Title */}
        <div className="container pt-20 mb-8">
          <h2 className="w-[559px] mx-auto text-center bg-Neutral-10 text-white font-Dela-Gothic-One text-dela-display1 pl-8   rounded-[12px]">
            <span className="text-Brand-90 font-Dela-Gothic-One text-dela-display1">
              找好房東
            </span>
            ,好窩！
          </h2>
        </div>
        {/* Filter form */}
        <div className="container layout-grid">
          <div className="col-start-2 col-span-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[20px] p-8"
            >
              {/* drowdown & search */}
              <div className="flex gap-6 mb-6">
                {/* dropdown component */}
                <div className="relative w-60">
                  <span className="absolute text-sans-caption text-black top-[-10px] z-1 bg-white px-[2px] start-3">
                    縣市
                  </span>
                  <div
                    tabIndex={0} // 新增這個屬性可獲得 focus 焦點
                    className="flex justify-between h-12 p-3 bg-transparent rounded-[4px] border-1 border border-black appearance-none focus:outline-none focus:ring-0 focus:border-Brand-30"
                  >
                    <span className="text-black">高雄市</span>
                    <img
                      src={dropdownIcon}
                      className="scale-[.8]"
                      alt="dropdownIcon"
                    />
                  </div>
                </div>

                {/* search component */}
                <div
                  tabIndex={0}
                  className={`relative flex w-full border p-3  rounded-[4px] ${
                    isSearchInputFocused ? "border-Brand-30 " : "border-black"
                  }`}
                >
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                    placeholder=""
                    onFocus={() => setIsSearchInputFocused(true)}
                    onBlur={() => setIsSearchInputFocused(false)}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sans-body1 text-black duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                  >
                    搜尋
                  </label>
                  <img src={searchIcon} alt="searchIcon" />
                </div>
              </div>

              {/* filter */}
              <div>
                <ul>
                  {/* 區域篩選 */}
                  <li className="border-b border-Neutral-80 pb-6 mb-6">
                    <div className="flex">
                      <h3 className="whitespace-nowrap text-sans-b-body1 text-Brand-40 pr-[15px] mr-6 ">
                        區域
                      </h3>
                      <div className="whitespace-nowrap self-start flex items-center cursor-pointer mr-8">
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          name="regionNoLimit"
                          id="regionNoLimit"
                          checked
                          ref={regionNoLimitInputRef}
                        />
                        <label
                          htmlFor="regionNoLimit"
                          className="pl-2 cursor-pointer"
                        >
                          不限
                        </label>
                      </div>
                      <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                        {kaohsiungDistricts.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                name={item}
                                id={item}
                                onChange={handleRegionNoLimitChangeStatus}
                              />
                              <label
                                htmlFor={item}
                                className="pl-2 cursor-pointer"
                              >
                                {item}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                  {/* 類型篩選 */}
                  <li className="border-b border-Neutral-80 pb-6 mb-6">
                    <div className="flex">
                      <h3 className="whitespace-nowrap text-sans-b-body1 text-Brand-40 pr-[15px] mr-6 ">
                        類型
                      </h3>
                      <div className="whitespace-nowrap self-start flex items-center cursor-pointer mr-8">
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          name="typeNoLimit"
                          id="typeNoLimit"
                          checked
                          ref={houseTypeNoLimitInputRef}
                        />
                        <label
                          htmlFor="typeNoLimit"
                          className="pl-2 cursor-pointer"
                        >
                          不限
                        </label>
                      </div>
                      <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                        {houseTypes.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                name={item}
                                id={item}
                                onChange={handleHouseTypeNoLimitChangeStatus}
                              />
                              <label
                                htmlFor={item}
                                className="pl-2 cursor-pointer"
                              >
                                {item}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                  {/* 租金篩選 */}
                  <li className="border-b border-Neutral-80 pb-6 mb-6">
                    <div className="flex">
                      <h3 className="whitespace-nowrap text-sans-b-body1 text-Brand-40 pr-[15px] mr-6 ">
                        租金
                      </h3>
                      <div className="whitespace-nowrap self-start flex items-center cursor-pointer mr-8">
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          name="rentNoLimit"
                          id="rentNoLimit"
                          checked
                          ref={rentNoLimitInputRef}
                        />
                        <label
                          htmlFor="rentNoLimit"
                          className="pl-2 cursor-pointer"
                        >
                          不限
                        </label>
                      </div>
                      <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                        {rentRange.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                name={item.content}
                                id={item.content}
                                onChange={handleRentNoLimitChangeStatus}
                              />
                              <label
                                htmlFor={item.content}
                                className="pl-2 cursor-pointer"
                              >
                                {item.content}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                type="submit"
                className="w-[520px] mx-auto bg-black text-white rounded-lg py-3"
              >
                搜尋
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
