import ReviewCard from "./ReviewCard";
import { ReviewListType } from "./index";
import noListImg from "../../../assets/imgs/landlord-management/noListImg.svg"

type ReviewListPropsType = {
  list: ReviewListType[] | null;
  isLoading: boolean;
}

export default function ReviewList ({list, isLoading}: ReviewListPropsType) {
  
  return (
    <ul className="flex flex-col gap-4">
      { isLoading ? ( 
        [...Array(5)].map((_, index) => (
          <li key={`"requestListLoading"${index}`}>
            <div role="status" className="p-3 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="flex items-center justify-center w-36 h-24 bg-gray-300 rounded-2xl overflow-hidden">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
              </div>
              <div className="w-auto flex-1">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </li>
        ))
      ) : 
      list ? (
        <>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </>
      ):(
        <li className="my-2 p-5 flex items-center gap-3 bg-Landlord-99 rounded-xl">
          <div className="h-[120px]">
            <img
              src={noListImg}
              alt="howoh_no_list_img"
              className="w-full h-full object-cover"
            />
          </div>
          <p>目前尚無評價列表</p>
        </li>
      )}
    </ul>
  )
}