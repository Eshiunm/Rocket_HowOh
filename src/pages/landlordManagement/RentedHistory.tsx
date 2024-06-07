import HistoryCard from "../../components/landLordManagement/history/HistoryCard";
import leftIcon_white from "../../assets/imgs/icons/leftIcon_white.svg";
import rightIcon_white from "../../assets/imgs/icons/rightIcon_white.svg";
import { useEffect, useState } from "react";
import { apiOrderLandlordListExpired } from "../../apis/apis";

export type ExpiredListType = {
  name: string;
  orderId: number;
  photo: string;
  tenant: string;
  tenantTel: string;
  leaseStartTime: string;
  leaseEndTime: string;
  canComment: boolean;
};

export default function RentedHistory() {
  const [expiredList, setExpiredList] = useState<ExpiredListType[]>([]);

  useEffect(() => {
    const getExpiredList = async () => {
      try {
        const response = await apiOrderLandlordListExpired();
        setExpiredList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getExpiredList();
  },[])

  return (
    <main className="container layout-grid pt-6 mb-40">
      <div className="col-span-7 p-5">
        <section>
          <ul>
            {
              expiredList.map((list, index) => <HistoryCard key={`expiredlist+${index}`} data={list} />)
            }
          </ul>
        </section>
        <section className="flex justify-end pt-3 border-t border-Neutral-95">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-[10px] text-sans-body2">
              <h6>
                顯示
                <span className="text-sans-b-body2"> 1 </span>
                至
                <span className="text-sans-b-body2"> 12 </span>
                筆
              </h6>
              <h6>
                共
                <span className="text-sans-b-body2"> 32 </span>
                筆
              </h6>
            </div>
            <div className="flex gap-[1px]">
              <button className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1">
                <img src={leftIcon_white} alt="left-icon" />
                上一頁
              </button>
              <button className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1">
                下一頁
                <img src={rightIcon_white} alt="right-icon" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}