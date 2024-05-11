import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeContent } from "../../redux/searchForm/inputSearchSlice";
import {
  setDistrictNoLimitState,
  setDistrictItemsState,
} from "../../redux/searchForm/districtSlice";
import dropdownIcon from "../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../assets/imgs/icons/searchIcon.svg";
import kaohsiungDistricts from "../constants/locations/districts/kaohsiungDistricts";
import houseTypes from "../constants/houseTypes";
import rentRanges from "../constants/rentRange";

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
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const searchContent = useSelector(store => store.inputSearch.textContent);
  const districtState = useSelector(store => store.district);
  console.log(districtState);
  const [formElementsState, setFormElementsState] = useState<FormElementsState>(
    {} as FormElementsState
  ); // 記錄表單內所有元素的狀態
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 記錄搜尋框是否被 focused

  const handleDistrictState = (e: MouseEvent<HTMLInputElement>) => {
    const districtCheckboxDOM = e.target as HTMLInputElement;
    if (districtCheckboxDOM.id === "districtsNoLimit") {
      const newDistrictState = {
        ...districtState,
        noLimit: {
          ...districtState.noLimit,
          checked: true, // 改變「不限的 checkbox」勾選狀態，false 改 true
          disabled: true, // 將「不限的checkbox」禁用
        },
        districts: districtState.districts.map(item => {
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
        districts: districtState.districts.map(item => {
          if (item.content === districtCheckboxDOM.name) {
            return {
              ...item,
              checked: !item.checked, // 改變剛剛按下的 checkbox 勾選狀態， true 改 false、false 改 true
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
    //console.log(districtState);
  };

  const setSearchContent = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeContent(e.target.value));
  };

  /* 初始化表單內要用到的所有元素，整合到 formElementState 變數，並增加 checked 屬性 */
  useEffect(() => {
    const newDistricts = kaohsiungDistricts.map(item => {
      return {
        content: item,
        checked: false,
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
    setFormElementsState(newformElementState);
  }, []);

  const onSubmit = () => {};
  return (
    <>
      <section className="section-search bg-homeSearchImg bg-center bg-cover h-[842px]">
        {/* Title */}
        <div className="container pt-20 mb-8">
          <h2 className="w-[559px] mx-auto text-center bg-Neutral-10 text-white font-Dela-Gothic-One text-dela-display1 pl-8 rounded-[12px]">
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
                        disabled={districtState.noLimit.disabled}
                        checked={districtState.noLimit.checked}
                        onClick={handleDistrictState}
                      />
                      <label
                        htmlFor="districtsNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {districtState.noLimit.content}
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
                                onClick={handleDistrictState}
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
                        name="typeNoLimit"
                        id="typeNoLimit"
                        disabled={formElementsState.HouseType?.noLimit.disabled}
                        defaultChecked={
                          formElementsState.HouseType?.noLimit.checked
                        }
                      />
                      <label
                        htmlFor="typeNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {formElementsState.HouseType?.noLimit.content}
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {formElementsState.HouseType?.houseTypes.map(
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
                                defaultChecked={checked}
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
                        disabled={formElementsState.RentRange?.noLimit.disabled}
                        defaultChecked={
                          formElementsState.RentRange?.noLimit.checked
                        }
                      />
                      <label
                        htmlFor="rentNoLimit"
                        className="pl-2 cursor-pointer"
                      >
                        {formElementsState.RentRange?.noLimit.content}
                      </label>
                    </div>
                    <div className="flex gap-x-[22px] gap-y-3 flex-wrap ">
                      {formElementsState.RentRange?.rentRanges.map(
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
                                defaultChecked={checked}
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
