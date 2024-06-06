import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { apiAppointmentCommonList } from "../../../apis/apis";

export default function RequestList({sort}: {sort: string}) {
  const [getListLoading, setGetListLoading] = useState(false);
  const [pageNumberControl, setPageNumberControl] = useState(1);

  useEffect(() => {
    const houseId = localStorage.getItem("houseId") || "-1";
    let orderMethod = "1";
    switch (sort) {
      case "oldFirst":
        orderMethod = "1";
        break;
      case "newFirst":
        orderMethod = "2";
        break;
      case "hidden":
        orderMethod = "3";
        break;
      default:
        break;
    }
    const getSortList = async () => {
      setGetListLoading(true);
      const queryString = new URLSearchParams({
        houseId,
        orderMethod,
        pageNumber: pageNumberControl.toString(),
      }).toString();
      
      try {
        const response = await apiAppointmentCommonList(queryString);
        console.log(response);
        setGetListLoading(false);
      } catch (error) {
        console.log(error);
      }
      setGetListLoading(false);
    }
    getSortList();
  },[sort, pageNumberControl]);

  return (
    <ul>
      {
        getListLoading && 
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
      }
      <RequestCard status="send" />
      <RequestCard status="reject" />
      <RequestCard status="none" />
    </ul>
  );
}