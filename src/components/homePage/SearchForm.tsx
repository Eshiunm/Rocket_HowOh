import { useState, useEffect, ChangeEvent, MouseEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { changeContent } from "../../../redux/searchForm/inputSearchSlice";
import { setCountryDropdownState } from "../../../redux/searchForm/cityDropdownSlice";
import {
  setDistrictNoLimitState,
  setDistrictItemsState,
} from "../../../redux/searchForm/districtSlice";
import {
  setHouseTypeNoLimitState,
  setHouseTypeItemsState,
} from "../../../redux/searchForm/houseTypeSlice";
import {
  setRentRangeNoLimitState,
  setRentRangeItemsState,
} from "../../../redux/searchForm/rentRangeSlice";
//import { setQueryStringState } from "../../../redux/searchForm/queryStringSlice";
import dropdownCities from "../../constants/searchFormCondition/dropdownCities";
import dropdownIcon from "../../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../../assets/imgs/icons/searchIcon.svg";
import houseTypes from "../../constants/searchFormCondition/houseTypes";
import rentRanges from "../../constants/searchFormCondition/rentRange";
import { RootState } from "../../../redux/store";
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

function SearchForm() {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchContent = useSelector(
    (store: RootState) => store.inputSearch.textContent
  );
  const countryState = useSelector(
    (store: RootState) => store.cityDropdown.country
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const districtState = useSelector((store: RootState) => store.district);
  const houseTypeState = useSelector((store: RootState) => store.houseType);
  const rentRangeState = useSelector((store: RootState) => store.rentRange);
  const [isCityDropdownFocused, setIsCityDropdownFocused] = useState(false); // 判斷縣市的Dropdown是否被 focused
  const [cityDropdownModalIsOpen, setCityDropdownModalIsOpen] = useState(false);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 判斷搜尋框是否被 focused
  /* 初始化表單內所有的checkbox元素狀態 */
  useEffect(() => {
    // 如果縣市狀態在Redux裡為空，就把縣市預設為高雄市
    if (countryState.id.length === 0) {
      dispatch(setCountryDropdownState({ id: "64", name: "高雄市" }));
    }
    // 如果區域狀態在Redux裡面為空，就把區域預設為高雄市的區
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
      const newDistrictState = {
        noLimit: { content: "不限", checked: true, disabled: true },
        districts: newDistricts,
      };
      dispatch(setDistrictNoLimitState(newDistrictState.noLimit));
      dispatch(setDistrictItemsState(newDistrictState.districts));
    }
    // 如果房型狀態在Redux裡面為空，就初始化值
    if (houseTypeState.houseTypes.length === 0) {
      const newHouseTypes = houseTypes.map(item => {
        return {
          content: item.content,
          typeNumber: item.typeNumber,
          checked: false,
        };
      });
      const newHouseTypeState = {
        noLimit: { content: "不限", checked: true, disabled: true },
        houseTypes: newHouseTypes,
      };
      dispatch(setHouseTypeNoLimitState(newHouseTypeState.noLimit));
      dispatch(setHouseTypeItemsState(newHouseTypeState.houseTypes));
    }

    // 如果租金狀態在Redux裡面為空，就初始化值
    if (rentRangeState.rentRanges.length === 0) {
      const newRentRanges = rentRanges.map(item => {
        return {
          content: item.content,
          priceRange: item.priceRange,
          checked: false,
        };
      });
      const newRentRangeState = {
        noLimit: { content: "不限", checked: true, disabled: true },
        rentRanges: newRentRanges,
      };
      dispatch(setRentRangeNoLimitState(newRentRangeState.noLimit));
      dispatch(setRentRangeItemsState(newRentRangeState.rentRanges));
    }

    // 加上滑鼠點擊的監聽事件，當使用者點擊篩選縣市的下拉選單以外的地方，就將此下拉選單收起來
    document.addEventListener("mousedown", handleClickOutside);
    // 初始化表單內容(將 register 裡面的內容重新賦予預設值)
    reset();
  }, []);

  const setSearchContent = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeContent(e.target.value));
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

  // 隨著縣市的下拉選單狀態變化，更改成該縣市對應的區 (例如選了高雄市，區只會顯示高雄的區，像是三民區、新興區等)
  const setCity = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const region = target.dataset.region; // 使用者選擇的縣市屬於在北部、中部、南部、東部哪一個
    const currentChooseCountryId = target.id; // 取得使用者選擇的縣市 ID
    const counties = dropdownCities[region as keyof typeof dropdownCities]; //先透過區域篩選出該區域的縣市
    const country = counties.find(
      // 再透過縣市ID找到特定的縣市
      country => country.countryId === currentChooseCountryId
    );
    // 將剛剛找到的縣市所對應的區和checkbox 組出預設的狀態
    const newDistricts = country?.districts.map(item => {
      return {
        id: item.districtId,
        checked: false,
        content: item.districtName,
      };
    });
    const districtState = {
      noLimit: { content: "不限", checked: true, disabled: true },
      districts: newDistricts,
    };
    dispatch(
      setCountryDropdownState({
        id: country?.countryId,
        name: country?.countryName,
      })
    );
    dispatch(setDistrictNoLimitState(districtState.noLimit));
    dispatch(setDistrictItemsState(districtState.districts));
    reset();
    setCityDropdownModalIsOpen(false);
  };
  const handleCityDropdownFocused = () => {
    setIsCityDropdownFocused(true);
    setCityDropdownModalIsOpen(true);
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
          if ((item as { id?: string }).id === districtCheckboxDOM.id) {
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
      //console.log(newDistrictState);
      dispatch(setDistrictNoLimitState(newDistrictState.noLimit));
      dispatch(setDistrictItemsState(newDistrictState.districts));
    }
    reset();
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
            (item as { typeNumber?: string }).typeNumber ===
            houseTypeCheckboxDOM.id.toString()
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
    reset();
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
            (item as { priceRange?: string }).priceRange ===
            rentRangeCheckboxDOM.id
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
    reset();
  };
  const onSubmit = () => {
    //dispatch(setQueryStringState(queryString));
    navigate(`/houseList`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-[20px] p-8"
      >
        {/* dropdown & search */}
        <div className="flex gap-x-6 mb-6 ">
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
              type="text"
              readOnly
              value={countryState.name}
              id={countryState.id}
              className={`block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer cursor-pointer ${
                isCityDropdownFocused ? "caret-transparent" : ""
              }`}
              placeholder=""
              {...register("city", {
                setValueAs: value => ({
                  value: value,
                  cityId: countryState.id,
                }),
              })}
              onFocus={handleCityDropdownFocused}
              onBlur={() => setIsCityDropdownFocused(false)}
            />
            <label
              htmlFor={countryState.id}
              className="absolute text-sans-body1 text-black duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              縣市
            </label>
            <label htmlFor={countryState.id} className="cursor-pointer">
              <img src={dropdownIcon} className="w-4 h-4" alt="dropdownIcon" />
            </label>
            {/* 篩選縣市的下拉選單*/}
            {cityDropdownModalIsOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-[120%] w-[280%] p-5 bg-Neutral-99 rounded-xl shadow-elevation-3"
              >
                <ul>
                  {/* 北部縣市 */}
                  <li className="flex mb-3">
                    <span className="mr-6 text-sans-b-body1 text-Brand-40">
                      北部
                    </span>
                    <div className="flex gap-x-[14px]">
                      {dropdownCities.north.map((countryContent, index) => {
                        return (
                          <button
                            type="button"
                            key={index}
                            id={countryContent.countryId}
                            name={countryContent.countryName}
                            data-region="north"
                            className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                            onClick={setCity}
                          >
                            {countryContent.countryName}
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
                      {dropdownCities.central.map((countryContent, index) => {
                        return (
                          <button
                            type="button"
                            key={index}
                            id={countryContent.countryId}
                            name={countryContent.countryName}
                            data-region="central"
                            className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                            onClick={setCity}
                          >
                            {countryContent.countryName}
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
                      {dropdownCities.south.map((countryContent, index) => {
                        return (
                          <button
                            type="button"
                            key={index}
                            id={countryContent.countryId}
                            name={countryContent.countryName}
                            data-region="south"
                            className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                            onClick={setCity}
                          >
                            {countryContent.countryName}
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
                      {dropdownCities.east.map((countryContent, index) => {
                        return (
                          <button
                            type="button"
                            key={index}
                            id={countryContent.countryId}
                            name={countryContent.countryName}
                            data-region="east"
                            className="border-b border-black hover:text-Neutral-50 hover:border-Neutral-50"
                            onClick={setCity}
                          >
                            {countryContent.countryName}
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
            className={`relative flex items-center w-full border p-3 rounded-[4px] ${
              isSearchInputFocused
                ? "border-Brand-30 border-2 m-[-1px]"
                : "border-black"
            }`}
          >
            <input
              type="text"
              id="searchInput"
              className="block w-full p-0 pl-1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
              placeholder=""
              defaultValue={searchContent}
              {...register("searchContent")}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={() => {
                setIsSearchInputFocused(false);
                reset(); // 這段不能少，否則 register 抓不到這個 input value
              }}
              onChange={setSearchContent}
            />
            <label
              htmlFor="searchInput"
              className="absolute text-sans-body1 text-black duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-Brand-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
            >
              搜尋
            </label>
            <img src={searchIcon} className="w-4 h-4" alt="searchIcon" />
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
                    (districtState.noLimit as { checked?: boolean }).checked ===
                    undefined
                      ? false
                      : (districtState.noLimit as { checked?: boolean }).checked
                  }
                  onChange={handleDistrictState}
                />
                <label
                  htmlFor="districtsNoLimit"
                  className="pl-2 cursor-pointer"
                >
                  {(districtState.noLimit as { content?: string }).content}
                </label>
              </div>
              <div className="flex gap-x-[22px] gap-y-3 flex-wrap">
                {districtState.districts.map(
                  ({ content, checked, id }, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          checked={checked}
                          id={id}
                          {...register(`districtNumber_${id as string}`)}
                          onChange={handleDistrictState}
                        />
                        <label htmlFor={id} className="pl-2 cursor-pointer">
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
                  {(houseTypeState.noLimit as { content?: string }).content}
                </label>
              </div>
              <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                {houseTypeState.houseTypes.map(
                  ({ content, typeNumber, checked }, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          id={typeNumber}
                          checked={checked}
                          {...register(
                            `houseTypeNumber_${typeNumber as string}`
                          )}
                          onChange={handleHouseTypeState}
                        />
                        <label
                          htmlFor={typeNumber}
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
                <label htmlFor="rentNoLimit" className="pl-2 cursor-pointer">
                  {(rentRangeState.noLimit as { content?: string }).content}
                </label>
              </div>
              <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                {rentRangeState.rentRanges.map(
                  ({ content, priceRange, checked }, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                          type="checkbox"
                          id={priceRange}
                          checked={checked}
                          {...register(`priceRange_${priceRange as string}`)}
                          onChange={handleRentRangeState}
                        />
                        <label
                          htmlFor={priceRange}
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
          className="w-[520px] mx-auto filled-button-l py-3 shadow-elevation-5"
        >
          搜尋
        </button>
      </form>
    </>
  );
}

export default SearchForm;
