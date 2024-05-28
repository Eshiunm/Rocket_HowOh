import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { changeContent } from "../../redux/searchForm/inputSearchSlice";
import {
  setDistrictNoLimitState,
  setDistrictItemsState,
} from "../../redux/searchForm/districtSlice";
import {
  setHouseTypeNoLimitState,
  setHouseTypeItemsState,
} from "../../redux/searchForm/houseTypeSlice";
import {
  setRentRangeNoLimitState,
  setRentRangeItemsState,
} from "../../redux/searchForm/rentRangeSlice";
import dropdownCities from "../constants/locations/dropdownCities";
import dropdownIcon from "../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../assets/imgs/icons/searchIcon.svg";
import leftIcon_white from "../assets/imgs/icons/leftIcon_white.svg";
import leftIcon_black from "../assets/imgs/icons/leftIcon_black.svg";
import rightIcon_white from "../assets/imgs/icons/rightIcon_white.svg";
import housePicture from "../assets/imgs/homePage/recommendation_picture_1.svg";
import starIcon from "../assets/imgs/icons/starIcon.svg";
import kaohsiungDistricts from "../constants/locations/districts/kaohsiungDistricts";
import houseTypes from "../constants/houseTypes";
import rentRanges from "../constants/rentRange";
import Footer from "../components/footer/Footer";

interface District {
  content: string;
  checked: boolean;
}
interface HouseType {
  content: string;
  checked: boolean;
}
interface RentRange {
  content: string;
  checked: boolean;
}

function HouseListPage() {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchContent = useSelector(
    (store: RootState) => store.inputSearch.textContent
  );
  const districtState = useSelector((store: RootState) => store.district);
  const houseTypeState = useSelector((store: RootState) => store.houseType);
  const rentRangeState = useSelector((store: RootState) => store.rentRange);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 記錄搜尋框是否被 focused
  /* 初始化表單內所有的checkbox元素狀態 */
  useEffect(() => {
    console.log(districtState);
    if (districtState.districts.length === 0) {
      const counties = dropdownCities.south;
      const country = counties.find(
        // 區域預設顯示高雄市
        county => county.countryId === "64"
      );
      const newDistricts = country?.districts.map(item => {
        return {
          id: item.districtId,
          checked: false,
          content: item.districtName,
        };
      });
      const newHouseTypes = houseTypes.map(item => {
        return {
          content: item,
          checked: false,
        };
      });
      const newRentRanges = rentRanges.map(item => {
        return {
          content: item,
          checked: false,
        };
      });

      const newformElementState = {
        District: {
          noLimit: { content: "不限", checked: true, disabled: true },
          districts: newDistricts,
        },
        HouseType: {
          noLimit: { content: "不限", checked: true, disabled: true },
          houseTypes: newHouseTypes,
        },
        RentRange: {
          noLimit: { content: "不限", checked: true, disabled: true },
          rentRanges: newRentRanges,
        },
      };
      dispatch(setDistrictNoLimitState(newformElementState.District.noLimit));
      dispatch(setDistrictItemsState(newformElementState.District.districts));
      dispatch(setHouseTypeNoLimitState(newformElementState.HouseType.noLimit));
      dispatch(
        setHouseTypeItemsState(newformElementState.HouseType.houseTypes)
      );
      dispatch(setRentRangeNoLimitState(newformElementState.RentRange.noLimit));
      dispatch(
        setRentRangeItemsState(newformElementState.RentRange.rentRanges)
      );
    }
  }, []);

  const turnToSingleHousePage = (e: any) => {
    const liElement = e.currentTarget;
    const houseId = liElement.dataset.houseid;
    navigate(`/houseList/${houseId}`);
  };

  const setSearchContent = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeContent(e.target.value));
  };
  const handleDistrictState = (e: ChangeEvent<HTMLInputElement>) => {
    const districtCheckboxDOM = e.target as HTMLInputElement;
    if (districtCheckboxDOM.id === "districtsNoLimit") {
      const newDistrictState = {
        ...districtState,
        noLimit: {
          ...districtState.noLimit,
          checked: true, // 改變「不限的 checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        districts: districtState.districts.map((item: District) => {
          return {
            ...item,
            checked: false, // 將所有區的 checkbox 勾選狀態設為「false」
          };
        }),
      };
      dispatch(setDistrictNoLimitState(newDistrictState.noLimit));
      dispatch(setDistrictItemsState(newDistrictState.districts));
    } else {
      let newDistrictState = {
        ...districtState,
        districts: districtState.districts.map((item: District) => {
          if (
            (item as { content?: string }).content === districtCheckboxDOM.name
          ) {
            return {
              ...item,
              checked: !(item as { checked?: boolean }).checked, // 改變剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
            };
          } else {
            return item;
          }
        }),
      };
      if (districtCheckboxDOM.checked === true) {
        newDistrictState = {
          ...newDistrictState,
          noLimit: {
            ...newDistrictState.noLimit,
            checked: false, // 將「不限的 checkbox」勾選狀態設為「false」
            disabled: false, // 將「不限的checkbox」解鎖
          },
        };
      } else {
        const isDistrictsAllClear = newDistrictState.districts.find(
          ({ checked }) => checked === true
        );
        // 如果所有區的 checkbox 勾選狀態都是「false」，就將「不限的checkbox」勾選狀態設為打勾
        if (isDistrictsAllClear === undefined) {
          newDistrictState = {
            ...newDistrictState,
            noLimit: {
              ...newDistrictState.noLimit,
              checked: true, // 將「不限的 checkbox」勾選狀態設為「true」
              disabled: true, // 將「不限的checkbox」鎖定
            },
          };
        }
      }

      dispatch(setDistrictNoLimitState(newDistrictState.noLimit));
      dispatch(setDistrictItemsState(newDistrictState.districts));
    }
  };
  const handleHouseTypeState = (e: ChangeEvent<HTMLInputElement>) => {
    const houseTypeCheckboxDOM = e.target as HTMLInputElement;
    if (houseTypeCheckboxDOM.id === "houseTypeNoLimit") {
      const newHouseTypeState = {
        ...houseTypeState,
        noLimit: {
          ...houseTypeState.noLimit,
          checked: true, // 改變「不限的checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        houseTypes: houseTypeState.houseTypes.map((item: HouseType) => {
          return {
            ...item,
            checked: false, // 將所有類型的 checkbox 勾選狀態設為「false」
          };
        }),
      };
      dispatch(setHouseTypeNoLimitState(newHouseTypeState.noLimit));
      dispatch(setHouseTypeItemsState(newHouseTypeState.houseTypes));
    } else {
      let newHouseTypeState = {
        ...houseTypeState,
        houseTypes: houseTypeState.houseTypes.map((item: HouseType) => {
          if (
            (item as { content?: string }).content === houseTypeCheckboxDOM.name
          ) {
            return {
              ...item,
              checked: !(item as { checked?: boolean }).checked, // 將剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
            };
          } else {
            return item;
          }
        }),
      };

      if (houseTypeCheckboxDOM.checked === true) {
        newHouseTypeState = {
          ...newHouseTypeState,
          noLimit: {
            ...newHouseTypeState.noLimit,
            checked: false, // 將「不限的 checkbox」勾選狀態設為「false」
            disabled: false, // 將「不限的checkbox」解鎖
          },
        };
      } else {
        const isHouseTypesAllClear = newHouseTypeState.houseTypes.find(
          ({ checked }) => checked === true
        );
        // 如果所有區的 checkbox 勾選狀態都是「false」，就將「不限的checkbox」勾選狀態設為打勾
        if (isHouseTypesAllClear === undefined) {
          newHouseTypeState = {
            ...newHouseTypeState,
            noLimit: {
              ...newHouseTypeState.noLimit,
              checked: true, // 將「不限的 checkbox」勾選狀態設為「true」
              disabled: true, // 將「不限的checkbox」鎖定
            },
          };
        }
      }

      dispatch(setHouseTypeNoLimitState(newHouseTypeState.noLimit));
      dispatch(setHouseTypeItemsState(newHouseTypeState.houseTypes));
    }
  };
  const handleRentRangeState = (e: ChangeEvent<HTMLInputElement>) => {
    const rentRangeCheckboxDOM = e.target as HTMLInputElement;
    console.log(rentRangeCheckboxDOM);
    if (rentRangeCheckboxDOM.id === "rentNoLimit") {
      const newRentRangeState = {
        ...rentRangeState,
        noLimit: {
          ...rentRangeState.noLimit,
          checked: true, // 改變「不限的checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        rentRanges: rentRangeState.rentRanges.map((item: RentRange) => {
          return {
            ...item,
            checked: false, // 將所有類型的 checkbox 勾選狀態設為「false」
          };
        }),
      };
      dispatch(setRentRangeNoLimitState(newRentRangeState.noLimit));
      dispatch(setRentRangeItemsState(newRentRangeState.rentRanges));
    } else {
      let newRentRangeState = {
        ...rentRangeState,
        rentRanges: rentRangeState.rentRanges.map((item: RentRange) => {
          if (
            (item as { content?: string }).content === rentRangeCheckboxDOM.name
          ) {
            return {
              ...item,
              checked: !(item as { checked?: boolean }).checked, // 將剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
            };
          } else {
            return item;
          }
        }),
      };

      if (rentRangeCheckboxDOM.checked === true) {
        newRentRangeState = {
          ...newRentRangeState,
          noLimit: {
            ...newRentRangeState.noLimit,
            checked: false, // 將「不限的 checkbox」勾選狀態設為「false」
            disabled: false, // 將「不限的checkbox」解鎖
          },
        };
      } else {
        const isRentRangesAllClear = newRentRangeState.rentRanges.find(
          ({ checked }) => checked === true
        );
        // 如果所有區的 checkbox 勾選狀態都是「false」，就將「不限的checkbox」勾選狀態設為打勾
        if (isRentRangesAllClear === undefined) {
          newRentRangeState = {
            ...newRentRangeState,
            noLimit: {
              ...newRentRangeState.noLimit,
              checked: true, // 將「不限的 checkbox」勾選狀態設為「true」
              disabled: true, // 將「不限的checkbox」鎖定
            },
          };
        }
      }

      dispatch(setRentRangeNoLimitState(newRentRangeState.noLimit));
      dispatch(setRentRangeItemsState(newRentRangeState.rentRanges));
    }
  };
  const onSubmit = () => {
    navigate("/houseList");
  };
  return (
    <>
      <div className="bg-Neutral-99 pt-6 pb-32">
        <div className="container layout-grid ">
          {/* 搜尋表單 */}
          <div className="col-span-5 ">
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
                    className="flex justify-between h-12 p-3 bg-transparent rounded-[4px] border border-black appearance-none focus:outline-none focus:ring-0 focus:border-Brand-30"
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
                    isSearchInputFocused
                      ? "border-Brand-30 border-2 m-[-1px]"
                      : "border-black"
                  }`}
                >
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                    placeholder=""
                    defaultValue={searchContent}
                    onFocus={() => setIsSearchInputFocused(true)}
                    onBlur={() => setIsSearchInputFocused(false)}
                    onChange={setSearchContent}
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
                        name="districtsNoLimit"
                        id="districtsNoLimit"
                        disabled={
                          (districtState.noLimit as { disabled?: boolean })
                            .disabled === undefined
                            ? true
                            : (districtState.noLimit as { disabled?: boolean })
                                .disabled
                        }
                        checked={
                          (districtState.noLimit as { checked?: boolean })
                            .checked === undefined
                            ? false
                            : (districtState.noLimit as { checked?: boolean })
                                .checked
                        }
                        onChange={handleDistrictState}
                      />
                      <label
                        htmlFor="districtsNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {
                          (districtState.noLimit as { content?: string })
                            .content
                        }
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap">
                      {districtState.districts.map(
                        ({ content, checked }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                checked={checked}
                                name={content}
                                id={content}
                                onChange={handleDistrictState}
                              />
                              <label
                                htmlFor={content}
                                className="pl-2 cursor-pointer"
                              >
                                {content}
                              </label>
                            </div>
                          );
                        }
                      )}
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
                        name="houseTypeNoLimit"
                        id="houseTypeNoLimit"
                        disabled={
                          (houseTypeState.noLimit as { disabled?: boolean })
                            .disabled === undefined
                            ? true
                            : (houseTypeState.noLimit as { disabled?: boolean })
                                .disabled
                        }
                        checked={
                          (houseTypeState.noLimit as { checked?: boolean })
                            .checked === undefined
                            ? true
                            : (houseTypeState.noLimit as { checked?: boolean })
                                .checked
                        }
                        onChange={handleHouseTypeState}
                      />
                      <label
                        htmlFor="houseTypeNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {
                          (houseTypeState.noLimit as { content?: string })
                            .content
                        }
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {houseTypeState.houseTypes.map(
                        ({ content, checked }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                name={content}
                                id={content}
                                checked={checked}
                                onChange={handleHouseTypeState}
                              />
                              <label
                                htmlFor={content}
                                className="pl-2 cursor-pointer"
                              >
                                {content}
                              </label>
                            </div>
                          );
                        }
                      )}
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
                        disabled={
                          (rentRangeState.noLimit as { disabled?: boolean })
                            .disabled === undefined
                            ? true
                            : (rentRangeState.noLimit as { disabled?: boolean })
                                .disabled
                        }
                        checked={
                          (rentRangeState.noLimit as { checked?: boolean })
                            .checked === undefined
                            ? true
                            : (rentRangeState.noLimit as { checked?: boolean })
                                .checked
                        }
                        onChange={handleRentRangeState}
                      />
                      <label
                        htmlFor="rentNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {
                          (rentRangeState.noLimit as { content?: string })
                            .content
                        }
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {rentRangeState.rentRanges.map(
                        ({ content, checked }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                name={content}
                                id={content}
                                checked={checked}
                                onChange={handleRentRangeState}
                              />
                              <label
                                htmlFor={content}
                                className="pl-2 cursor-pointer"
                              >
                                {content}
                              </label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              <button
                type="submit"
                className="w-full mx-auto filled-button-l py-3 shadow-elevation-5"
              >
                搜尋
              </button>
            </form>
          </div>
          {/* 房源列表區塊 */}
          <div className="col-span-7">
            <div className="bg-white rounded-xl p-5">
              <div className="flex justify-between mb-6 pb-3 border-b border-Neutral-95">
                <button
                  type="button"
                  className="flex gap-x-[10px] items-center text-sans-b-body1 hover:opacity-80"
                >
                  <img src={leftIcon_black} alt="leftIcon" />
                  返回
                </button>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 118 筆
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <img src={leftIcon_white} alt="rightIcon" />
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <img src={rightIcon_white} alt="rightIcon" />
                    </button>
                  </div>
                </div>
              </div>
              {/* 列表 */}
              <ul>
                <li
                  className="p-3 flex gap-x-4 cursor-pointer"
                  data-HouseId="cfiuawehruh"
                  onClick={turnToSingleHousePage}
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={housePicture}
                      alt="housePicture"
                      className="rounded-2xl hover:scale-125 transition-all duration-300 hover:transition hover:duration-300"
                    />
                  </div>

                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
                <li className="p-3 flex gap-x-4">
                  <img
                    src={housePicture}
                    alt="housePicture"
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-col justify-between">
                    <div className="relative flex justify-between">
                      <div>
                        {/* 房源名稱 */}
                        <h3 className="text-sans-b-h6 mb-3">
                          輕奢小資套房 近輕軌醫院公園
                        </h3>
                        {/* 房源特色 */}
                        <ul className="flex gap-x-2">
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可申請租屋補助
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            寵物友善
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可開火
                          </li>
                          <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                            可短租
                          </li>
                        </ul>
                      </div>
                      {/* 評分 */}
                      <div className="absolute top-0 -right-[24%] flex self-start items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                        <span className="text-sans-body1">4.5</span>
                        <img
                          src={starIcon}
                          alt="starIcon"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-x-2 mb-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>獨立套房</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>1房1衛1廳 1陽台</span>
                        </li>
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>15坪</span>
                        </li>
                        <li>
                          <span>2/7樓</span>
                        </li>
                      </ul>
                      <p className="mb-2">高雄市鼓山區美術東八街</p>
                      <ul className="flex gap-x-2">
                        <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                          <span>房東</span>
                        </li>
                        <li>
                          <span>陳小姐</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-0 -right-[24%]">
                      <span className="before:block before:z-[0] before:absolute before:h-[10%] before:w-[64%] before:bg-[#bac6e6] before:bottom-[5%] before:left-0"></span>
                      <span className="text-sans-b-h5 mr-2 relative">
                        15,000
                      </span>
                      <span>元/月</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <button type="button"></button>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 118 筆
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <img src={leftIcon_white} alt="rightIcon" />
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <img src={rightIcon_white} alt="rightIcon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HouseListPage;
