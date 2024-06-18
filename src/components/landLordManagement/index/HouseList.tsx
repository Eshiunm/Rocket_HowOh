import { useEffect, useRef, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import LandlordAnchor from "./LandlordAnchor";
import HouseCard from "./HouseCard";
import tooltipIcon from "../../../assets/imgs/icons/tooltip.svg"
import dropdownIcon from "../../../assets/imgs/icons/dropdownIcon.svg"
import BigLoading from "../../loading/BigLoading";
import { apiHouseLandlordList } from "../../../apis/apis";

export interface refFnListType {
  goPublishList : () => void,
  goRentedList :  () => void,
  goFinishedList : () => void,
}
export interface listCountType {
  publish : number,
  rented : number,
  finished : number
}

// 定義 ForcedChangeReload 的型別
interface contextValueType {
  reloadHouseList: boolean;
  setReloadHouseList: (value: boolean) => void;
}

export const ForcedChangeReload = createContext<contextValueType>(
  {} as contextValueType
);

type AccordionStatusType = {
  panelName : string;
  isOpen: boolean;
}

const accordionStatus: AccordionStatusType[] = [
  {
    panelName : "新增中",
    isOpen: true,
  }, {
    panelName : "刊登中",
    isOpen: true,
  }, {
    panelName : "已出租",
    isOpen: true,
  }, {
    panelName : "已完成",
    isOpen: true,
  },
];

export default function HouseList() {
  const [controlAccordion, setControlAccordion] = useState<AccordionStatusType[]>(accordionStatus);
  const addingListRef = useRef<HTMLDivElement>(null);
  const publishListRef = useRef<HTMLDivElement>(null);
  const rentedListRef = useRef<HTMLDivElement>(null);
  const finishedListRef = useRef<HTMLDivElement>(null);

  const refs = [addingListRef, publishListRef, rentedListRef, finishedListRef];

  useEffect(() => {
    controlAccordion.forEach((accordion, index) => {
      const contentRef = refs[index].current;
      if (contentRef) {
        if (accordion.isOpen) {
          contentRef.style.maxHeight = `${contentRef.scrollHeight}px`;
        } else {
          contentRef.style.maxHeight = '0px';
        }
      }
    });
  }, [controlAccordion, refs]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addingList, setAddingList] = useState([]);
  const [publishList, setPublishList] = useState([]);
  const [rentedList, setRentedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const listCount: listCountType = {
    publish : publishList.length,
    rented : rentedList.length,
    finished : finishedList.length,
  };

  const goPublishList = () => {
    if (publishListRef.current) {
      window.scrollTo({
        top: publishListRef.current.offsetTop - 150,
        behavior: "smooth",
      });
    }
  }
  const goRentedList = () => {
    if (rentedListRef.current) {
      window.scrollTo({
        top: rentedListRef.current.offsetTop - 150,
        behavior: "smooth",
      });
    }
  }
  const goFinishedList = () => {
    if (finishedListRef.current) {
      window.scrollTo({
        top: finishedListRef.current.offsetTop - 150,
        behavior: "smooth",
      });
    }
  }

  const refFnList: refFnListType = {
    goPublishList,
    goRentedList,
    goFinishedList,
  }

  // 當更改為已承租、強制變更觸發時，更改 false 為 true
  const [reloadHouseList, setReloadHouseList] = useState(false);
  const contextValue = {
    reloadHouseList,
    setReloadHouseList,
  };

  const clickAccordion = (index: number) => {
    const newControlAccordion = [...controlAccordion];
    newControlAccordion[index].isOpen = !newControlAccordion[index].isOpen;
    setControlAccordion(newControlAccordion);
  }

  useEffect(() => {
    const getHouseList = async () => {
      setLoading(true);
      try {
        const response = await apiHouseLandlordList();
        setAddingList(response.data.data["未完成"]);
        setPublishList(response.data.data["刊登中"]);
        setRentedList(response.data.data["已承租"]);
        setFinishedList(response.data.data["已完成"]);
      } catch (error) {
        localStorage.clear();
        alert(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    getHouseList();
    return setReloadHouseList(false);
  },[navigate, reloadHouseList])

  return (
    <>
      {
        loading && <BigLoading />
      }
      <main className="flex-grow container mt-14 mb-32">
      <ForcedChangeReload.Provider value={contextValue}>
        {/* 上方 anchor 區域 */}
        <LandlordAnchor refFnList={refFnList} listCount={listCount} />
        {/* 手風琴呈現列表 */}
        <div className="border-b border-Neutral-95">
          <button
            className="w-full py-6 px-5 text-sans-b-h6 flex gap-1 items-center"
            onClick={() => clickAccordion(0)}
          >
            <h3 className="text-start mr-auto">新增中</h3>
            <img src={dropdownIcon} alt="dropdown_icon" className={`transition-all duration-300 ${controlAccordion[0].isOpen ? "" : "transform rotate-180"}`} />
          </button>
          <section ref={addingListRef} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <ul className="layout-grid pb-6">
              {
                addingList.map(item => {
                  const {houseId} = item;
                  return <HouseCard key={houseId} data={item} houseStatus="addingList" />
                })
              }
            </ul>
          </section>
        </div>
        <div className="border-b border-Neutral-95">
          <button
            className="w-full py-6 px-5 text-sans-b-h6 flex gap-1 items-center"
            onClick={() => clickAccordion(1)}
          >
            <h3 className="text-start flex gap-1 mr-auto">
              刊登中
              <Tooltip
                className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                content={"租客可看到您的房源！\n當租約邀請送出並受指定租客接受，房源狀態即變更為已出租。"}
              >
                <img src={tooltipIcon} alt="tooltip" />
              </Tooltip>
            </h3>
            <img src={dropdownIcon} alt="dropdown_icon" className={`transition-all duration-300 ${controlAccordion[1].isOpen ? "" : "transform rotate-180"}`} />
          </button>
          <section ref={publishListRef} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <ul className="layout-grid pb-6">
              {
                publishList.map(item => {
                  const {houseId} = item;
                  return <HouseCard key={houseId} data={item} houseStatus="publishList" />
                })
              }
            </ul>
          </section>
        </div>
        <div className="border-b border-Neutral-95">
          <button
            className="w-full py-6 px-5 text-sans-b-h6 flex gap-1 items-center"
            onClick={() => clickAccordion(2)}
          >
            <h3 className="text-start flex gap-1 mr-auto">
              已出租
              <Tooltip
                className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                content={"您的房源已成功指定租客！\n您可以隨時下載合約，進行線下紙本簽約。"}
              >
                <img src={tooltipIcon} alt="tooltip" />
              </Tooltip>
            </h3>
            <img src={dropdownIcon} alt="dropdown_icon" className={`transition-all duration-300 ${controlAccordion[2].isOpen ? "" : "transform rotate-180"}`} />
          </button>
          <section ref={rentedListRef} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <ul className="layout-grid pb-6">
              {
                rentedList.map(item => {
                  const {houseId} = item;
                  return <HouseCard key={houseId} data={item} houseStatus="rentedList" />
                })
              }
            </ul>
          </section>
        </div>
        <div className="border-b border-Neutral-95">
          <button
            className="w-full py-6 px-5 text-sans-b-h6 flex gap-1 items-center"
            onClick={() => clickAccordion(3)}
          >
            <h3 className="text-start flex gap-1 mr-auto">
              已完成
              <Tooltip
                className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                content={"您的租約已完成！請於完成兩週內評價您的房客。\n您可以由此將房源重新上架。"}
              >
                <img src={tooltipIcon} alt="tooltip" />
              </Tooltip>
            </h3>
            <img src={dropdownIcon} alt="dropdown_icon" className={`transition-all duration-300 ${controlAccordion[3].isOpen ? "" : "transform rotate-180"}`} />
          </button>
          <section ref={finishedListRef} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <ul className="layout-grid pb-6">
              {
                finishedList.map(item => {
                  const {houseId} = item;
                  return <HouseCard key={houseId} data={item} houseStatus="finishedList" />
                })
              }
            </ul>
          </section>
        </div>
      </ForcedChangeReload.Provider>
      </main>
    </>
  );
}