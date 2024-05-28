import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import {
  setHouseFeaturesNoLimitState,
  setHouseFeaturesItemsState,
} from "../../redux/searchForm/houseFeaturesSlice";
import {
  setLandLordRatingNoLimitState,
  setLandLordRatingItemsState,
} from "../../redux/searchForm/landLordRatingSlice";
import dropdownCities from "../constants/locations/dropdownCities";
import dropdownIcon from "../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../assets/imgs/icons/searchIcon.svg";
import leftIcon_white from "../assets/imgs/icons/leftIcon_white.svg";
import leftIcon_black from "../assets/imgs/icons/leftIcon_black.svg";
import rightIcon_white from "../assets/imgs/icons/rightIcon_white.svg";
import housePicture from "../assets/imgs/homePage/recommendation_picture_1.svg";
import starIcon from "../assets/imgs/icons/starIcon.svg";
import houseTypes from "../constants/searchFormCondition/houseTypes";
import rentRanges from "../constants/searchFormCondition/rentRange";
import houseFeatures from "../constants/searchFormCondition/houseFeatures";
import landLordRating from "../constants/searchFormCondition/landLordRating";
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
// interface HouseFeatures {
//   content: string;
//   checked: boolean;
// }
// interface LandLordRating {
//   content: string;
//   checked: boolean;
// }

function HouseListPage() {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchContent = useSelector(
    (store: RootState) => store.inputSearch.textContent
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputCityRef = useRef<HTMLInputElement>(null);
  const districtState = useSelector((store: RootState) => store.district);
  const houseTypeState = useSelector((store: RootState) => store.houseType);
  const rentRangeState = useSelector((store: RootState) => store.rentRange);
  const houseFeaturesState = useSelector(
    (store: RootState) => store.houseFeatures
  );
  const landLordRatingState = useSelector(
    (store: RootState) => store.landLordRating
  );
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 記錄搜尋框是否被 focused
  const [isCityDropdownFocused, setIsCityDropdownFocused] = useState(false); // 偵測縣市的Dropdown是否被 focused
  const [cityDropdownModalIsOpen, setCityDropdownModalIsOpen] = useState(false);
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
  //當滑鼠點擊篩選縣市的下拉選單以外的地方，就將此下拉選單收起來
  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setCityDropdownModalIsOpen(false);
    }
  };
  const handleCityDropdownFocused = () => {
    setIsCityDropdownFocused(true);
    setCityDropdownModalIsOpen(true);
  };
  const setCity = (e: any) => {
    const cityName = e.currentTarget.name; // 獲取按鈕的 name 屬性
    if (inputCityRef.current) {
      // 更新縣市的 input 值
      inputCityRef.current.value = cityName;
    }
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
  const handleHouseFeaturesState = (e: ChangeEvent<HTMLInputElement>) => {
    const houseFeaturesCheckboxDOM = e.target as HTMLInputElement;
    if (houseFeaturesCheckboxDOM.id === "houseFeaturesNoLimit") {
      const newHouseFeaturesState = {
        ...houseFeaturesState,
        noLimit: {
          ...houseFeaturesState.noLimit,
          checked: true, // 改變「不限的checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        houseFeatures: houseFeaturesState.houseFeatures.map(
          (item: RentRange) => {
            return {
              ...item,
              checked: false, // 將所有類型的 checkbox 勾選狀態設為「false」
            };
          }
        ),
      };
      dispatch(setHouseFeaturesNoLimitState(newHouseFeaturesState.noLimit));
      dispatch(setHouseFeaturesItemsState(newHouseFeaturesState.houseFeatures));
    } else {
      let newHouseFeaturesState = {
        ...houseFeaturesState,
        houseFeatures: houseFeaturesState.houseFeatures.map(
          (item: RentRange) => {
            if (
              (item as { content?: string }).content ===
              houseFeaturesCheckboxDOM.name
            ) {
              return {
                ...item,
                checked: !(item as { checked?: boolean }).checked, // 將剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
              };
            } else {
              return item;
            }
          }
        ),
      };

      if (houseFeaturesCheckboxDOM.checked === true) {
        newHouseFeaturesState = {
          ...newHouseFeaturesState,
          noLimit: {
            ...newHouseFeaturesState.noLimit,
            checked: false, // 將「不限的 checkbox」勾選狀態設為「false」
            disabled: false, // 將「不限的checkbox」解鎖
          },
        };
      } else {
        const isHouseFeaturesAllClear =
          newHouseFeaturesState.houseFeatures.find(
            ({ checked }) => checked === true
          );
        // 如果所有區的 checkbox 勾選狀態都是「false」，就將「不限的checkbox」勾選狀態設為打勾
        if (isHouseFeaturesAllClear === undefined) {
          newHouseFeaturesState = {
            ...newHouseFeaturesState,
            noLimit: {
              ...newHouseFeaturesState.noLimit,
              checked: true, // 將「不限的 checkbox」勾選狀態設為「true」
              disabled: true, // 將「不限的checkbox」鎖定
            },
          };
        }
      }

      dispatch(setHouseFeaturesNoLimitState(newHouseFeaturesState.noLimit));
      dispatch(setHouseFeaturesItemsState(newHouseFeaturesState.houseFeatures));
    }
  };
  const hondleLandLordRatingState = (e: ChangeEvent<HTMLInputElement>) => {
    const landLordRatingCheckboxDOM = e.target as HTMLInputElement;
    if (landLordRatingCheckboxDOM.id === "landLordRatingNoLimit") {
      const newLandLordRatingState = {
        ...landLordRatingState,
        noLimit: {
          ...landLordRatingState.noLimit,
          checked: true, // 改變「不限的checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        landLordRating: landLordRatingState.landLordRating.map(
          (item: RentRange) => {
            return {
              ...item,
              checked: false, // 將所有類型的 checkbox 勾選狀態設為「false」
            };
          }
        ),
      };
      dispatch(setLandLordRatingNoLimitState(newLandLordRatingState.noLimit));
      dispatch(
        setLandLordRatingItemsState(newLandLordRatingState.landLordRating)
      );
    } else {
      let newLandLordRatingState = {
        ...landLordRatingState,
        landLordRating: landLordRatingState.landLordRating.map(
          (item: RentRange) => {
            if (
              (item as { content?: string }).content ===
              landLordRatingCheckboxDOM.name
            ) {
              return {
                ...item,
                checked: !(item as { checked?: boolean }).checked, // 將剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
              };
            } else {
              return item;
            }
          }
        ),
      };

      if (landLordRatingCheckboxDOM.checked === true) {
        newLandLordRatingState = {
          ...newLandLordRatingState,
          noLimit: {
            ...newLandLordRatingState.noLimit,
            checked: false, // 將「不限的 checkbox」勾選狀態設為「false」
            disabled: false, // 將「不限的checkbox」解鎖
          },
        };
      } else {
        const isHouseFeaturesAllClear =
          newLandLordRatingState.landLordRating.find(
            ({ checked }) => checked === true
          );
        // 如果所有區的 checkbox 勾選狀態都是「false」，就將「不限的checkbox」勾選狀態設為打勾
        if (isHouseFeaturesAllClear === undefined) {
          newLandLordRatingState = {
            ...newLandLordRatingState,
            noLimit: {
              ...newLandLordRatingState.noLimit,
              checked: true, // 將「不限的 checkbox」勾選狀態設為「true」
              disabled: true, // 將「不限的checkbox」鎖定
            },
          };
        }
      }

      dispatch(setLandLordRatingNoLimitState(newLandLordRatingState.noLimit));
      dispatch(
        setLandLordRatingItemsState(newLandLordRatingState.landLordRating)
      );
    }
  };
  const onSubmit = () => {
    console.log("YA");
    navigate("/houseList");
  };
  return (
    <>
      <div className="bg-Neutral-99 pt-6 pb-32">
        <div className="container layout-grid ">
          {/* 搜尋表單 */}
          <div className="col-span-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[20px] p-5"
            >
              {/* drowdown & search */}
              <div className="flex gap-6 mb-6">
                {/* dropdown component */}
                <div
                  tabIndex={0}
                  className={`relative cursor-pointer flex items-center w-60 border p-3  rounded-[4px] ${
                    isCityDropdownFocused
                      ? "border-Brand-30 border-2 m-[-1px]"
                      : "border-black"
                  }`}
                >
                  <input
                    ref={inputCityRef}
                    type="text"
                    readOnly
                    defaultValue={"高雄市"}
                    id="cityDropdown"
                    className={`block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer cursor-pointer ${
                      isCityDropdownFocused ? "caret-transparent" : ""
                    }`}
                    placeholder=""
                    onFocus={handleCityDropdownFocused}
                    onBlur={() => setIsCityDropdownFocused(false)}
                    onChange={setSearchContent}
                  />
                  <label
                    htmlFor="cityDropdown"
                    className="absolute text-sans-body1 text-black duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                  >
                    縣市
                  </label>
                  <label htmlFor="cityDropdown" className="cursor-pointer">
                    <img
                      src={dropdownIcon}
                      className="w-4 h-4"
                      alt="dropdownIcon"
                    />
                  </label>
                  {/* 篩選縣市的下拉選單*/}
                  {cityDropdownModalIsOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-[120%] w-[375%] z-10 left-0 p-5 bg-Neutral-99 rounded-xl shadow-elevation-3"
                    >
                      <ul>
                        {/* 北部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            北部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.north.map((district, index) => {
                              return (
                                <button
                                  type="button"
                                  key={index}
                                  name={district}
                                  className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                                  onClick={setCity}
                                >
                                  {district}
                                </button>
                              );
                            })}
                          </div>
                        </li>
                        {/* 中部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            中部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.central.map((district, index) => {
                              return (
                                <button
                                  type="button"
                                  key={index}
                                  name={district}
                                  className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                                  onClick={setCity}
                                >
                                  {district}
                                </button>
                              );
                            })}
                          </div>
                        </li>
                        {/* 南部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            南部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.south.map((district, index) => {
                              return (
                                <button
                                  type="button"
                                  key={index}
                                  name={district}
                                  className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                                  onClick={setCity}
                                >
                                  {district}
                                </button>
                              );
                            })}
                          </div>
                        </li>
                        {/* 東部縣市 */}
                        <li className="flex">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            東部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.east.map((district, index) => {
                              return (
                                <button
                                  type="button"
                                  key={index}
                                  name={district}
                                  className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                                  onClick={setCity}
                                >
                                  {district}
                                </button>
                              );
                            })}
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
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
                  <button type="submit">
                    <img src={searchIcon} alt="searchIcon" />
                  </button>
                </div>
              </div>
              {/* filter */}
              <ul className="flex flex-col gap-y-3">
                {/* 區域篩選 */}
                <li className="border-b border-Neutral-80 pb-3">
                  <div className="flex flex-col gap-y-3">
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
                <li className="border-b border-Neutral-80 pb-3">
                  <div className="flex flex-col gap-y-3">
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
                <li className="border-b border-Neutral-80 pb-3">
                  <div className="flex flex-col gap-y-3">
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
                {/* 房源特色篩選 */}
                <li className="border-b border-Neutral-80 pb-3">
                  <div className="flex flex-col gap-y-3">
                    <h3 className="whitespace-nowrap text-sans-b-body1 text-Brand-40 pr-[15px] mr-6 ">
                      特色
                    </h3>
                    <div className="whitespace-nowrap self-start flex items-center cursor-pointer mr-8">
                      <input
                        className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                        type="checkbox"
                        name="houseFeaturesNoLimit"
                        id="houseFeaturesNoLimit"
                        disabled={
                          (houseFeaturesState.noLimit as { disabled?: boolean })
                            .disabled === undefined
                            ? true
                            : (
                                houseFeaturesState.noLimit as {
                                  disabled?: boolean;
                                }
                              ).disabled
                        }
                        checked={
                          (houseFeaturesState.noLimit as { checked?: boolean })
                            .checked === undefined
                            ? true
                            : (
                                houseFeaturesState.noLimit as {
                                  checked?: boolean;
                                }
                              ).checked
                        }
                        onChange={handleHouseFeaturesState}
                      />
                      <label
                        htmlFor="houseFeaturesNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {
                          (houseFeaturesState.noLimit as { content?: string })
                            .content
                        }
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {houseFeaturesState.houseFeatures.map(
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
                                onChange={handleHouseFeaturesState}
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
                {/* 房東評價篩選 */}
                <li className="border-b border-Neutral-80 pb-3">
                  <div className="flex flex-col gap-y-3">
                    <h3 className="whitespace-nowrap text-sans-b-body1 text-Brand-40 pr-[15px] mr-6 ">
                      房東評價
                    </h3>
                    <div className="whitespace-nowrap self-start flex items-center cursor-pointer mr-8">
                      <input
                        className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                        type="checkbox"
                        name="landLordRatingNoLimit"
                        id="landLordRatingNoLimit"
                        disabled={
                          (
                            landLordRatingState.noLimit as {
                              disabled?: boolean;
                            }
                          ).disabled === undefined
                            ? true
                            : (
                                landLordRatingState.noLimit as {
                                  disabled?: boolean;
                                }
                              ).disabled
                        }
                        checked={
                          (landLordRatingState.noLimit as { checked?: boolean })
                            .checked === undefined
                            ? true
                            : (
                                landLordRatingState.noLimit as {
                                  checked?: boolean;
                                }
                              ).checked
                        }
                        onChange={hondleLandLordRatingState}
                      />
                      <label
                        htmlFor="landLordRatingNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {
                          (landLordRatingState.noLimit as { content?: string })
                            .content
                        }
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {landLordRatingState.landLordRating.map(
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
                                onChange={hondleLandLordRatingState}
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
            </form>
          </div>
          {/* 房源列表區塊 */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl p-5">
              <div className="flex justify-between mb-6 pb-3 border-b border-Neutral-95">
                <Link
                  to={"/"}
                  className="flex gap-x-[10px] items-center text-sans-b-body1 hover:opacity-80"
                >
                  <img src={leftIcon_black} alt="leftIcon" />
                  返回
                </Link>
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
