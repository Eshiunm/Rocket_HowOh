import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from "react";
import { changeContent } from "../../redux/searchForm/inputSearchSlice";
import { setCountryDropdownState } from "../../redux/searchForm/cityDropdownSlice";
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
import { apiHouseCommonSearchList } from "../apis/apis";
import BigLoading from "../components/loading/BigLoading";
import dropdownCities from "../constants/searchFormCondition/dropdownCities";
import dropdownIcon from "../assets/imgs/icons/dropdownIcon.svg";
import searchIcon from "../assets/imgs/icons/searchIcon.svg";
import leftIcon_white from "../assets/imgs/icons/leftIcon_white.svg";
import leftIcon_black from "../assets/imgs/icons/leftIcon_black.svg";
import rightIcon_white from "../assets/imgs/icons/rightIcon_white.svg";
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
  const { handleSubmit, reset, register } = useForm();
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
  const houseFeaturesState = useSelector(
    (store: RootState) => store.houseFeatures
  );
  const landLordRatingState = useSelector(
    (store: RootState) => store.landLordRating
  );
  const [isFormDataLoadingFinished, setIsFormDataLoadingFinished] =
    useState(false);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false); // 記錄搜尋框是否被 focused
  const [isCityDropdownFocused, setIsCityDropdownFocused] = useState(false); // 偵測縣市的Dropdown是否被 focused
  const [cityDropdownModalIsOpen, setCityDropdownModalIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]); // 房源列表清單

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
    // 如果房源特色狀態在Redux裡面為空，就初始化值
    if (houseFeaturesState.houseFeatures.length === 0) {
      const newHouseFeatures = houseFeatures.map(item => {
        return {
          content: item.content,
          type: item.type,
          checked: false,
        };
      });
      const newHouseFeaturesState = {
        noLimit: { content: "不限", checked: true, disabled: true },
        houseFeatures: newHouseFeatures,
      };
      dispatch(setHouseFeaturesNoLimitState(newHouseFeaturesState.noLimit));
      dispatch(setHouseFeaturesItemsState(newHouseFeaturesState.houseFeatures));
    }
    // 如果房東評價狀態在Redux裡面為空，就初始化值
    if (landLordRatingState.landLordRating.length === 0) {
      const newLandLordRating = landLordRating.map(item => {
        return {
          content: item.content,
          ratingNumber: item.ratingNumber,
          checked: false,
        };
      });
      const newLandLordRatingState = {
        noLimit: { content: "不限", checked: true, disabled: true },
        landLordRatings: newLandLordRating,
      };
      dispatch(setLandLordRatingNoLimitState(newLandLordRatingState.noLimit));
      dispatch(
        setLandLordRatingItemsState(newLandLordRatingState.landLordRatings)
      );
    }

    // 加上滑鼠點擊的監聽事件，當使用者點擊篩選縣市的下拉選單以外的地方，就將此下拉選單收起來
    document.addEventListener("mousedown", handleClickOutside);
    reset();
  }, []);

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
  const [isAPIProcessing, setIsAPIProcessing] = useState<boolean>(false);
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
  const setCity = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const region = target.dataset.region; // 使用者選擇的縣市屬於在北部、中部、南部、東部哪一個
    const currentChooseCountryId = target.id; // 取得使用者選擇的縣市 ID
    const counties = dropdownCities[region as keyof typeof dropdownCities]; //先透過區域篩選出該區域的縣市
    const country = counties.find(
      // 再透過縣市ID找到特定的縣市
      country => country.countryId === currentChooseCountryId
    );
    // 將剛剛找到的縣市所對應的區和checkbox預設的狀態組出新的資料
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
    setCityDropdownModalIsOpen(false);
    reset();
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
              (item as { type?: string }).type === houseFeaturesCheckboxDOM.id
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
    reset();
  };
  const handleLandLordRatingState = (e: ChangeEvent<HTMLInputElement>) => {
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
              (item as { ratingNumber?: string }).ratingNumber ===
              landLordRatingCheckboxDOM.id
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
    reset();
  };

  // 當區域、類型、租金、特色、房價的 checkbox 狀態有變動時，會直接打 API 取得房源列表
  useEffect(() => {
    if (
      districtState.districts.length > 0 &&
      houseTypeState.houseTypes.length > 0 &&
      rentRangeState.rentRanges.length > 0 &&
      houseFeaturesState.houseFeatures.length > 0 &&
      landLordRatingState.landLordRating.length > 0
    ) {
      setIsFormDataLoadingFinished(true); // 這段不能刪，否則有可能無法抓到表單內容
      handleSubmit(onSubmit)(); // 取得表單資料並打 API
    }
  }, [
    districtState,
    houseTypeState,
    rentRangeState,
    houseFeaturesState,
    landLordRatingState,
    isFormDataLoadingFinished,
  ]);
  const onSubmit = (data: any) => {
    // 確定有抓到表格內容才打 API
    if (Object.keys(data).length > 0 && isFormDataLoadingFinished) {
      // 取出縣市ID
      const cityId = data?.city?.cityId;
      // 取出搜尋內容
      const searchContent = data.searchContent;
      // 將區域中有打勾的 checkbox 保留下來並取出對應數字
      const districtNumbers = Object.entries(data)
        .filter(
          ([key, value]) => key.startsWith("districtNumber_") && value === true
        )
        .map(([key]) => parseInt(key.replace("districtNumber_", ""), 10));

      // 將類型中有打勾的 checkbox 保留下來並取出對應數字
      const houseTypeNumbers = Object.entries(data)
        .filter(
          ([key, value]) => key.startsWith("houseTypeNumber_") && value === true
        )
        .map(([key]) => parseInt(key.replace("houseTypeNumber_", ""), 10));

      // 將租金中有打勾的 checkbox 保留下來並取出對應數字
      const priceRangeNumbers = Object.entries(data)
        .filter(
          ([key, value]) => key.startsWith("priceRange_") && value === true
        )
        .map(([key]) => key.replace("priceRange_", ""));

      // 將特色中有打勾的 checkbox 保留下來並取出對應數字
      const houseFeatures = Object.entries(data)
        .filter(
          ([key, value]) => key.startsWith("houseFeatures_") && value === true
        )
        .map(([key]) => key.replace("houseFeatures_", ""));

      // 房東評價中有打勾的 checkbox 保留下來並取出對應數字
      const landLordRatingNumbers = Object.entries(data)
        .filter(
          ([key, value]) => key.startsWith("landLordRating_") && value === true
        )
        .map(([key]) => parseInt(key.replace("landLordRating_", ""), 10));

      //開始組 queryString
      let queryString = "";
      const cityQueryParams = "city=" + cityId;
      queryString += cityQueryParams;
      if (searchContent) {
        const searchContentQueryParams = "search=" + searchContent;
        queryString += "&" + searchContentQueryParams;
      }
      if (districtNumbers.length > 0) {
        const districtQueryParams = "districts=" + districtNumbers.join(",");
        queryString += "&" + districtQueryParams;
      }
      if (houseTypeNumbers.length > 0) {
        const houseTypeQueryParams = "type=" + houseTypeNumbers.join(",");
        queryString += "&" + houseTypeQueryParams;
      }
      if (priceRangeNumbers.length > 0) {
        const priceRangeQueryParams = "price=" + priceRangeNumbers.join(",");
        queryString += "&" + priceRangeQueryParams;
      }
      if (houseFeatures.length > 0) {
        const houseFeaturesQueryParams = "features=" + houseFeatures.join(",");
        queryString += "&" + houseFeaturesQueryParams;
      }
      if (landLordRatingNumbers.length > 0) {
        const landLordRatingQueryParams =
          "rating=" + landLordRatingNumbers.join(",");
        queryString += "&" + landLordRatingQueryParams;
      }

      const getHouseListData = async (queryString: any) => {
        setIsAPIProcessing(true);
        const res = await apiHouseCommonSearchList(queryString);
        setSearchResults(res.data.Houses);
        setIsAPIProcessing(false);
      };

      getHouseListData(queryString);
    }
  };

  return (
    <>
      {isAPIProcessing && <BigLoading />}
      <div className="bg-Neutral-99 pt-6 pb-32">
        <div className="container layout-grid ">
          {/* 搜尋表單 */}
          <div className="col-span-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[20px] p-5"
            >
              {/* dropdown & search */}
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
                      className="absolute top-[120%] w-[380%] left-0 z-10 p-5 bg-Neutral-99 rounded-xl shadow-elevation-3"
                    >
                      <ul>
                        {/* 北部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            北部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.north.map(
                              (countryContent, index) => {
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
                              }
                            )}
                          </div>
                        </li>
                        {/* 中部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            中部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.central.map(
                              (countryContent, index) => {
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
                              }
                            )}
                          </div>
                        </li>
                        {/* 南部縣市 */}
                        <li className="flex mb-3">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            南部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.south.map(
                              (countryContent, index) => {
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
                              }
                            )}
                          </div>
                        </li>
                        {/* 東部縣市 */}
                        <li className="flex">
                          <span className="mr-6 text-sans-b-body1 text-Brand-40">
                            東部
                          </span>
                          <div className="flex gap-x-[14px]">
                            {dropdownCities.east.map(
                              (countryContent, index) => {
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
                              }
                            )}
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
                    {...register("searchContent")}
                    onFocus={() => setIsSearchInputFocused(true)}
                    onBlur={() => {
                      setIsSearchInputFocused(false);
                      reset(); // 這段不能少，否則 register 抓不到這個 input value
                    }}
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
                              <label
                                htmlFor={id}
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
                                {...register(
                                  `priceRange_${priceRange as string}`
                                )}
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
                        ({ content, type, checked }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                id={type}
                                checked={checked}
                                {...register(`houseFeatures_${type as string}`)}
                                onChange={handleHouseFeaturesState}
                              />
                              <label
                                htmlFor={type}
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
                        onChange={handleLandLordRatingState}
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
                        ({ content, ratingNumber, checked }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                className="w-5 h-5 text-black focus:ring-transparent rounded-sm border-2 border-black cursor-pointer"
                                type="checkbox"
                                id={ratingNumber}
                                checked={checked}
                                {...register(
                                  `landLordRating_${ratingNumber as string}`
                                )}
                                onChange={handleLandLordRatingState}
                              />
                              <label
                                htmlFor="ratingNumber"
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
                    顯示 1 至 12 筆 共 {searchResults.length} 筆
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
                {searchResults.length > 0 &&
                  searchResults.map((house, index) => {
                    return (
                      <li
                        key={index}
                        className="p-3 flex justify-between cursor-pointer"
                        data-houseid="cfiuawehruh"
                        onClick={turnToSingleHousePage}
                      >
                        <div className="flex gap-x-4">
                          <div className="rounded-2xl overflow-hidden w-[248px] h-[189px]">
                            <img
                              src={house.image[0].coverIamgePath}
                              alt="housePicture"
                              className="rounded-2xl hover:scale-125 transition-all duration-300 hover:transition hover:duration-300"
                            />
                          </div>
                          <div className="relative flex flex-col justify-between">
                            <div className="flex justify-between">
                              <div>
                                {/* 房源名稱 */}
                                <h3 className="text-sans-b-h6 mb-3">
                                  {house.title}
                                </h3>
                                {/* 房源特色 */}
                                <ul className="flex gap-x-2">
                                  {house.isRentSubsidy && (
                                    <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                                      可申請租屋補助
                                    </li>
                                  )}
                                  {house.isPetAllowd && (
                                    <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                                      寵物友善
                                    </li>
                                  )}
                                  {house.isCookAllowd && (
                                    <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                                      可開火
                                    </li>
                                  )}
                                  {house.isSTRAllowed && (
                                    <li className="text-sans-body2 py-1 px-2 bg-Tenant-90 rounded-lg">
                                      可短租
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <ul className="flex gap-x-2 mb-2">
                                <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                                  <span>
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
                                    {house.bathRoomNumbers > 0
                                      ? `${house.bathRoomNumbers}衛`
                                      : ""}
                                    {house.livingRoomNumbers > 0
                                      ? ` ${house.livingRoomNumbers}廳`
                                      : ""}{" "}
                                    {house.balconyNumbers > 0
                                      ? `${house.balconyNumbers}陽台`
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
                                    !house.floor || !house.floorTotal
                                      ? "hidden"
                                      : ""
                                  }
                                >
                                  <span>{`${house.floor}/${house.floorTotal}樓`}</span>
                                </li>
                              </ul>
                              <p className="mb-2">
                                {getAddress(house.city, house.district) +
                                  `${house.road && house.road}`}
                              </p>
                              <ul className="flex gap-x-2">
                                <li className="pr-2 border-r-[1px] border-r-Tenant-70">
                                  <span>房東</span>
                                </li>
                                <li>
                                  <span>{`${house.landlordlastName}${house.landlordFirstName}`}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          {/* 評分 */}
                          <div className="flex justify-between">
                            <span></span>
                            <div className="flex items-center gap-x-[10px] p-2 bg-Neutral-95 rounded-lg ">
                              <span className="text-sans-body1">
                                {house.ratingDetails.AverageRating}
                              </span>
                              <img
                                src={starIcon}
                                alt="starIcon"
                                className="w-4 h-4"
                              />
                            </div>
                          </div>
                          {/* 價格 */}
                          <div>
                            <span className="before:block before:absolute before:h-[10%] before:w-[95%] before:bg-[#bac6e6] before:bottom-[5%] before:right-[7%] relative">
                              <span className="relative text-sans-b-h5 mr-2">
                                {parseInt(house.rent).toLocaleString()}
                              </span>
                            </span>
                            <span className="text-sans-caption font-normal">
                              元/月
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <button type="button"></button>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 {searchResults.length} 筆
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
