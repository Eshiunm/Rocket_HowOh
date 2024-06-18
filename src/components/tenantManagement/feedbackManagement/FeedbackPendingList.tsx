import { useEffect, useState } from "react";
import { apiCommentList } from "../../../apis/apis";
import NoResults from "../houseViewingManagement/NoResults";
import HouseViewingListSkeleton from "../houseViewingManagement/HouseViewingListSkeleton";
import FeedbackPendingCard from "./FeedbackPendingCard";
import RefreshBtn from "../../../components/buttons/RefreshBtn";

type OrderInfoType = {
  orderId: number;
  photo: string;
  name: string;
  tenant: string;
  leaseStartTime: string;
  leaseEndTime: string;
};

type CommentType = {
  // 自己或租客對這筆order的評論
  commentId: number;
  rating: number; // 幾顆星
  comment: string; // 評論內容
  commentTime: string; // 評論時間
  reply?: string; // 對方對評論的回覆內容
  replyTime?: string; // 回覆時間
};

export type CommentInfoType = {
  canComment: boolean;
  myComment: CommentType;
  tenantComment?: CommentType;
  landlordComment?: CommentType;
};

export type ReviewListType = {
  orderInfo: OrderInfoType;
  commentInfo: CommentInfoType;
};

function FeedbackPendingList() {
  const [isAPIProcessing, setIsAPIProcessing] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  useEffect(() => {
    setIsAPIProcessing(true);
    const defaultPageNumber = "1";
    const getCommentList = async (pageNumber: string) => {
      try {
        const response = await apiCommentList(pageNumber);
        console.log(response);
        setFeedbackList(response.data.data.orderList);
        setIsAPIProcessing(false);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getCommentList(defaultPageNumber);
    
  }, []);
  return (
    <>
      <section className={`flex-grow ${isAPIProcessing ? "" : "pb-[130px]"}`}>
        <div className="container layout-grid">
          <div className="col-span-7 ">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex justify-between mb-6 pb-[26px] border-b border-Neutral-95">
                <RefreshBtn/>
              </div>
              {/* 列表 */}
              {isAPIProcessing ? (
                <HouseViewingListSkeleton />
              ) : feedbackList.length > 0 ? (
                <ul>
                  {feedbackList.map((card,index) => (
                    <FeedbackPendingCard data={card} key={index}/>
                  ))}
                </ul>
              ) : (
                <NoResults />
              )}
              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    {feedbackList.length > 0
                      ? feedbackList.length >= 12
                        ? `顯示 1 至 12 筆 共 ${feedbackList.length} 筆`
                        : `顯示 1 至 ${feedbackList.length} 筆 共 ${feedbackList.length} 筆`
                      : "顯示 0 至 0 筆 共 0 筆"}
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <svg
                        className="fill-white"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3539 2.14689C11.4005 2.19334 11.4374 2.24852 11.4626 2.30926C11.4878 2.37001 11.5008 2.43513 11.5008 2.50089C11.5008 2.56666 11.4878 2.63178 11.4626 2.69253C11.4374 2.75327 11.4005 2.80845 11.3539 2.85489L5.70692 8.50089L11.3539 14.1469C11.4478 14.2408 11.5006 14.3681 11.5006 14.5009C11.5006 14.6337 11.4478 14.761 11.3539 14.8549C11.26 14.9488 11.1327 15.0015 10.9999 15.0015C10.8671 15.0015 10.7398 14.9488 10.6459 14.8549L4.64592 8.85489C4.59935 8.80845 4.56241 8.75327 4.5372 8.69253C4.512 8.63178 4.49902 8.56666 4.49902 8.50089C4.49902 8.43513 4.512 8.37001 4.5372 8.30926C4.56241 8.24852 4.59935 8.19334 4.64592 8.14689L10.6459 2.14689C10.6924 2.10033 10.7475 2.06339 10.8083 2.03818C10.869 2.01297 10.9342 2 10.9999 2C11.0657 2 11.1308 2.01297 11.1916 2.03818C11.2523 2.06339 11.3075 2.10033 11.3539 2.14689Z"
                        />
                      </svg>
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <svg
                        className="fill-white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeedbackPendingList;
