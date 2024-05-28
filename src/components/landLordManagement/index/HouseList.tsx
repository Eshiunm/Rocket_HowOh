import { useEffect, useRef, useState } from "react";
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

export default function HouseList() {
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
    }
  };

  const publishCount = useRef<HTMLDivElement>(null);
  const rentedCount = useRef<HTMLDivElement>(null);
  const finishedCount = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [addingList, setAddingList] = useState([]);
  const [publishList, setPublishList] = useState([]);
  const [rentedList, setRentedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  console.log(addingList);
  console.log(publishList);
  console.log(rentedList);
  console.log(finishedList);

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

  useEffect(() => {
    const getHouseList = async () => {
      setLoading(true);
      try {
        const response = await apiHouseLandlordList();
        console.log(response);
        setAddingList(response.data.data["未完成"]);
        setPublishList(response.data.data["刊登中"]);
        setRentedList(response.data.data["已承租"]);
        setFinishedList(response.data.data["已完成"]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

    }
    getHouseList();
  },[])

  return (
    <>
      {
        loading && <BigLoading />
      }
      <main className="container mt-14 mb-32">
        {/* 上方 anchor 區域 */}
        <LandlordAnchor refFnList={refFnList} />
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
                        return <HouseCard key={houseId} data={item} />
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
                      content={"租客可看到您的房源！\n當租約邀請送出並受指定租客接受，房源狀態即變更為已承租。"}
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
                        return <HouseCard key={houseId} data={item} />
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
                    已承租
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
                    {/* <HouseCard /> */}
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
                    {/* <HouseCard /> */}
                  </ul>
                </AccordionContent>
              </div>
            </AccordionPanel>
          </Accordion>
        </Flowbite>
      </main>
    </>
  );
}