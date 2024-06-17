import HistoryCard from "../../components/landLordManagement/history/HistoryCard";
import leftIcon_white from "../../assets/imgs/icons/leftIcon_white.svg";
import rightIcon_white from "../../assets/imgs/icons/rightIcon_white.svg";
import { useEffect, useState } from "react";
import { apiOrderLandlordListExpired } from "../../apis/apis";
import noListImg from "../../assets/imgs/tenantManagement/whenNoItemsShowThisImg.svg"

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
  const [listCount,setListCount] = useState<number>(1);
  const [getListLoading, setGetListLoading] = useState<boolean>(false);
  const [pageNumberControl, setPageNumberControl] = useState(1);
  const totalPage = Math.ceil(listCount / 12);

  useEffect(() => {
    const getExpiredList = async () => {
      setGetListLoading(true);
      // 組裝頁數的 query string
      const queryString = new URLSearchParams({
        page: pageNumberControl.toString(),
      }).toString();

      try {
        const response = await apiOrderLandlordListExpired(queryString);
        setExpiredList(response.data.data.orderList);
        setListCount(response.data.data.totalCount);
      } catch (error) {
        console.log(error);
      }
      setGetListLoading(false);
    }
    getExpiredList();
  },[pageNumberControl]);

  return (
    <main className="container layout-grid pt-6 mb-52">
      <div className="col-span-7 p-5">
        {
          listCount === 0 && getListLoading === false ? (
            <section className="w-full h-44 flex gap-3 items-center">
              <img src={noListImg} alt="noListImg" />
              <h3 className="text-sans-body1">尚無出租歷史</h3>
            </section>
          ):(
            <>
              <section>
                <ul>
                  {
                    getListLoading ?
                    [...Array(5)].map((_, index) => (
                      <li key={`"requestListLoading"${index}`}>
                        <div role="status" className="p-3 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                          <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-2xl overflow-hidden">
                            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                          </div>
                          <div className="w-auto flex-1">
                            <div className="h-4 bg-gray-200 rounded-full w-48 mb-5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-3"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                          </div>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </li>
                    ))
                    :
                    expiredList.map((list, index) => <HistoryCard key={`expiredlist+${index}`} data={list} />)
                  }
                </ul>
              </section>
              <section className="flex justify-end pt-3 border-t border-Neutral-95">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-[10px] text-sans-body2">
                    <h6>
                      顯示
                      <span className="text-sans-b-body2"> {listCount > 0 ? pageNumberControl * 12 - 11 : 0} </span>
                      至
                      <span className="text-sans-b-body2"> {pageNumberControl === totalPage ? listCount : pageNumberControl * 12} </span>
                      筆
                    </h6>
                    <h6>
                      共
                      <span className="text-sans-b-body2"> {listCount} </span>
                      筆
                    </h6>
                  </div>
                  <div className="flex gap-[1px]">
                    <button
                      className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1"
                      disabled={pageNumberControl === 1}
                      onClick={() => setPageNumberControl(pageNumberControl - 1)}
                    >
                      <img src={leftIcon_white} alt="left-icon" />
                      上一頁
                    </button>
                    <button
                      className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1"
                      disabled={totalPage === pageNumberControl}
                      onClick={() => setPageNumberControl(pageNumberControl + 1)}
                    >
                      下一頁
                      <img src={rightIcon_white} alt="right-icon" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )
        }
      </div>
    </main>
  );
}