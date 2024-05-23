import { useRef } from "react";
import { CustomFlowbiteTheme, Flowbite, Accordion, AccordionContent, AccordionPanel, AccordionTitle, Tooltip } from "flowbite-react";
import LandlordAnchor from "./LandlordAnchor";
import HouseCard from "./HouseCard";
import tooltipIcon from "../../../assets/imgs/icons/tooltip.svg"

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

  const publishList = useRef<HTMLUListElement>(null);
  const rentedList = useRef<HTMLUListElement>(null);
  const finishedList = useRef<HTMLUListElement>(null);
  const refList = {
    publishList,
    rentedList,
    finishedList
  }

  return (
    <main className="container mt-14 mb-32">
      {/* 上方 anchor 區域 */}
      <LandlordAnchor targetRef={refList} />
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
                  <HouseCard />
                </ul>
              </AccordionContent>
            </div>
          </AccordionPanel>
          <AccordionPanel>
            <div ref={publishList}>
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
                  <HouseCard />
                </ul>
              </AccordionContent>
            </div>
          </AccordionPanel>
          <AccordionPanel>
            <div ref={rentedList}>
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
                  <HouseCard />
                </ul>
              </AccordionContent>
            </div>
          </AccordionPanel>
          <AccordionPanel>
            <div ref={finishedList}>
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
                  <HouseCard />
                </ul>
              </AccordionContent>
            </div>
          </AccordionPanel>
        </Accordion>
      </Flowbite>
    </main>
  );
}