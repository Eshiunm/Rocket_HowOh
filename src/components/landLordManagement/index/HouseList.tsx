import { useEffect, useRef, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomFlowbiteTheme, Flowbite, Accordion, AccordionContent, AccordionPanel, AccordionTitle, Tooltip } from "flowbite-react";
import LandlordAnchor from "./LandlordAnchor";
import HouseCard from "./HouseCard";
import tooltipIcon from "../../../assets/imgs/icons/tooltip.svg"
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
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);
  const contentRef3 = useRef(null);
  const contentRef4 = useRef(null);
  useEffect(() => {
    // This effect runs when the isOpen state changes
    if (controlAccordion[0].isOpen) {
      contentRef1.current.style.maxHeight = `${contentRef1.current.scrollHeight}px`;
    } else {
      contentRef1.current.style.maxHeight = '0px';
    }
    if (controlAccordion[1].isOpen) {
      contentRef2.current.style.maxHeight = `${contentRef2.current.scrollHeight}px`;
    } else {
      contentRef2.current.style.maxHeight = '0px';
    }
    if (controlAccordion[2].isOpen) {
      contentRef3.current.style.maxHeight = `${contentRef3.current.scrollHeight}px`;
    } else {
      contentRef3.current.style.maxHeight = '0px';
    }
    if (controlAccordion[3].isOpen) {
      contentRef4.current.style.maxHeight = `${contentRef4.current.scrollHeight}px`;
    } else {
      contentRef4.current.style.maxHeight = '0px';
    }
  }, [controlAccordion]);
  console.log(controlAccordion);
  const customTheme: CustomFlowbiteTheme = {
    accordion: {
      "root": {
        "base": "divide-y divide-Neutral-95 border-Neutral-95",
        "flush": {
          "off": "",
          "on": ""
        }
      },
      "content": {
        "base": "pb-6 first:rounded-t-lg last:rounded-b-lg"
      },
      "title": {
        "arrow": {
          "base": "h-6 w-6 shrink-0",
          "open": {
            "off": "rotate-180",
            "on": ""
          }
        },
        "base": "flex w-full items-center justify-start gap-4 py-6 px-5 text-left text-sans-b-h6 first:rounded-t-lg last:rounded-b-lg",
        "flush": {
          "off": "",
          "on": ""
        },
        "heading": "",
        "open": {
          "off": "",
          "on": "text-Landlord-40 text-sans-b-h6"
        }
      }
    },
    modal: {
      "root": {
        "base": "z-50 backdrop-blur-md fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
        "show": {
          "on": "flex bg-black bg-opacity-20",
          "off": "hidden"
        },
        "sizes": {
          "sm": "max-w-sm",
          "md": "max-w-md",
          "lg": "max-w-lg",
          "xl": "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl"
        },
        "positions": {
          "top-left": "items-start justify-start",
          "top-center": "items-start justify-center",
          "top-right": "items-start justify-end",
          "center-left": "items-center justify-start",
          "center": "items-center justify-center",
          "center-right": "items-center justify-end",
          "bottom-right": "items-end justify-end",
          "bottom-center": "items-end justify-center",
          "bottom-left": "items-end justify-start"
        }
      },
      "content": {
        "base": "relative h-full w-full p-4 md:h-auto",
        "inner": "relative flex max-h-[90dvh] flex-col rounded-2xl bg-white shadow dark:bg-gray-700"
      },
      "body": {
        "base": "flex-1 overflow-auto p-10"
      },
      "header": {
        "base": "flex items-start justify-between rounded-t border-b",
        "popup": "border-b-0 pt-10",
        "title": "text-xl font-medium text-gray-900 dark:text-white",
        "close": {
          "base": "hidden",
          "icon": "h-10 w-10"
        }
      },
      "footer": {
        "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
        "popup": "border-t"
      }
    },
  };

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
  
  // anchor
  const publishCount = useRef<HTMLDivElement>(null);
  const rentedCount = useRef<HTMLDivElement>(null);
  const finishedCount = useRef<HTMLDivElement>(null);

  const goPublishList = () => {
    if (publishCount.current) {
      window.scrollTo({
        top: publishCount.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }
  const goRentedList = () => {
    if (rentedCount.current) {
      window.scrollTo({
        top: rentedCount.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }
  const goFinishedList = () => {
    if (finishedCount.current) {
      window.scrollTo({
        top: finishedCount.current.offsetTop - 100,
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
    setControlAccordion(newControlAccordion)
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
        setLoading(false);
      } catch (error) {
        localStorage.clear();
        alert(error);
        navigate("/");
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
      <main className="container mt-14 mb-32">
      <ForcedChangeReload.Provider value={contextValue}>
        {/* 上方 anchor 區域 */}
        <LandlordAnchor refFnList={refFnList} listCount={listCount} />
        {/* 手風琴呈現列表 */}
        <Flowbite theme={{ theme: customTheme }}>
          <Accordion alwaysOpen>
            <AccordionPanel>
              <div>
                <AccordionTitle>
                  新增中
                </AccordionTitle>
                <AccordionContent>
                  <ul className="layout-grid">
                    {
                      addingList.map(item => {
                        const {houseId} = item;
                        return <HouseCard key={houseId} data={item} houseStatus="addingList" />
                      })
                    }
                  </ul>
                </AccordionContent>
              </div>
            </AccordionPanel>
            <AccordionPanel>
              <div ref={publishCount}>
                <AccordionTitle>
                  <div className="flex items-start">
                    刊登中
                    <Tooltip
                      className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                      content={"租客可看到您的房源！\n當租約邀請送出並受指定租客接受，房源狀態即變更為已出租。"}
                    >
                      <img src={tooltipIcon} alt="tooltip" />
                    </Tooltip>
                  </div>
                </AccordionTitle>
                <AccordionContent>
                  <ul className="layout-grid">
                    {
                      publishList.map(item => {
                        const {houseId} = item;
                        return <HouseCard key={houseId} data={item} houseStatus="publishList" />
                      })
                    }
                  </ul>
                </AccordionContent>
              </div>
            </AccordionPanel>
            <AccordionPanel>
              <div ref={rentedCount}>
                <AccordionTitle>
                  <div className="flex items-start">
                    已出租
                    <Tooltip
                      className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                      content={"您的房源已成功指定租客！\n您可以隨時下載合約，進行線下紙本簽約。"}
                    >
                      <img src={tooltipIcon} alt="tooltip" />
                    </Tooltip>
                  </div>
                </AccordionTitle>
                <AccordionContent>
                  <ul className="layout-grid">
                    {
                      rentedList.map(item => {
                        const {houseId} = item;
                        return <HouseCard key={houseId} data={item} houseStatus="rentedList" />
                      })
                    }
                  </ul>
                </AccordionContent>
              </div>
            </AccordionPanel>
            <AccordionPanel>
              <div ref={finishedCount}>
                <AccordionTitle>
                  <div className="flex items-start">
                    已完成
                    <Tooltip
                      className="bg-Landlord-30 text-white text-center whitespace-pre-line"
                      content={"您的租約已完成！請於完成兩週內評價您的房客。\n您可以由此將房源重新上架。"}
                    >
                      <img src={tooltipIcon} alt="tooltip" />
                    </Tooltip>
                  </div>
                </AccordionTitle>
                <AccordionContent>
                  <ul className="layout-grid">
                    {
                      finishedList.map(item => {
                        const {houseId} = item;
                        return <HouseCard key={houseId} data={item} houseStatus="finishedList" />
                      })
                    }
                  </ul>
                </AccordionContent>
              </div>
            </AccordionPanel>
          </Accordion>
        </Flowbite>
        <div className="border-t border-red-700">
          <button className="bg-Landlord-70" onClick={() => clickAccordion(0)}>
            <h3>新增中</h3>
          </button>
          <section ref={contentRef1} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <div>
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
            </div>
          </section>
        </div>
        <div className="border-t border-red-700">
          <button className="bg-Landlord-70" onClick={() => clickAccordion(1)}>
            <h3>刊登中</h3>
          </button>
          <section ref={contentRef2} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <div>
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
            </div>
          </section>
        </div>
        <div className="border-t border-red-700">
          <button className="bg-Landlord-70" onClick={() => clickAccordion(2)}>
            <h3>已出租</h3>
          </button>
          <section ref={contentRef3} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <div>
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
            </div>
          </section>
        </div>
        <div className="border-t border-red-700">
          <button className="bg-Landlord-70" onClick={() => clickAccordion(3)}>
            <h3>已完成</h3>
          </button>
          <section ref={contentRef4} className="overflow-hidden transition-all duration-300 ease-linear max-h-0">
            <div>
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
              列表區域在這個快節奏的現代社會中，人們面臨著來自工作、家庭和社交生活的多重壓力。如何平衡這些壓力並保持心理健康成為了一個重要的課題。首先，學會合理安排時間是關鍵。有效的時間管理可以減少緊張感，讓人們有更多的時間來放鬆和享受生活。其次，適當的運動和健康的飲食也能幫助減壓，提高整體的身心健康水平。此外，尋找興趣愛好並投入其中，可以讓人們在繁忙的生活中找到樂趣和平靜。最後，不要忽視與家人和朋友的交流，支持和關心他人同樣能讓自己感到幸福和滿足。通過這些方法，人們可以更好地應對生活中的挑戰，保持積極樂觀的心態。
            </div>
          </section>
        </div>
      </ForcedChangeReload.Provider>
      </main>
    </>
  );
}