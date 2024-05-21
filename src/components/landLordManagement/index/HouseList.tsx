import { CustomFlowbiteTheme, Flowbite, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import LandlordAnchor from "./LandlordAnchor";
import HouseCard from "./HouseCard";

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
        "base": "py-6 first:rounded-t-lg last:rounded-b-lg"
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

  return (
    <main className="container mt-14 mb-32">
      {/* 上方 anchor 區域 */}
      <LandlordAnchor />
      {/* 手風琴呈現列表 */}
      <Flowbite theme={{ theme: customTheme }}>
        <Accordion alwaysOpen>
          <AccordionPanel>
            <AccordionTitle>
              新增中
            </AccordionTitle>
            <AccordionContent>
              <ul className="layout-grid">
                <HouseCard />
              </ul>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
              刊登中
            </AccordionTitle>
            <AccordionContent>
              <ul className="layout-grid">
                <HouseCard />
              </ul>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
              已承租
            </AccordionTitle>
            <AccordionContent>
              <ul className="layout-grid">
                <HouseCard />
              </ul>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
              已完成
            </AccordionTitle>
            <AccordionContent>
              <ul className="layout-grid">
                <HouseCard />
              </ul>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </Flowbite>
    </main>
  );
}