import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  apiAppointmentCommonTotalNumber,
  apiAppointmentTenantInvitedListTotalNumber,
  apiTenantHistoryCountAndCommentCount,
} from "../../apis/apis";
import Footer from "../../components/footer/Footer";

function HouseViewingManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("houseViewingList");
  const [houseViewingListTotalNumber, setHouseViewingListTotalNumber] =
    useState<number>(0);
  const [rentalInviteListTotalNumber, setRentalInviteListTotalNumber] =
    useState<number>(0);
  const [rentalHistoryListTotalNumber, setRentalHistoryListTotalNumber] =
    useState<number>(0);
  const [feedbackPendingListTotalNumber, setFeedbackPendingListTotalNumber] =
    useState<number>(0);
  const settingActiveLink = (linkId: any) => {
    const currentPath = location.pathname;
    switch (linkId) {
      case "houseViewingList":
        if (currentPath.includes("houseViewingList")) {
          window.location.reload();
        } else {
          setActiveLink("houseViewingList");
          navigate("/tenant/houseViewingManagement/houseViewingList");
        }
        break;
      case "rentalInviteList":
        if (currentPath.includes("rentalInviteList")) {
          window.location.reload();
        } else {
          setActiveLink("rentalInviteList");
          navigate("/tenant/houseViewingManagement/rentalInviteList");
        }
        break;
      case "rentalHistoryList":
        if (currentPath.includes("rentalHistoryList")) {
          window.location.reload();
        } else {
          setActiveLink("rentalHistoryList");
          navigate("/tenant/houseViewingManagement/rentalHistoryList");
        }
        break;
      case "feedbackPendingList":
        setActiveLink("feedbackPendingList");
        navigate("/tenant/feedbackManagement/feedbackPendingList");
        break;
      default:
        // 可以在這裡加入處理未知 linkId 的邏輯，如果需要的話
        break;
    }
  };
  const getEveryListTotalNumber = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const [response, response2, response3] = await axios.all([
        apiAppointmentCommonTotalNumber(userId as string),
        apiAppointmentTenantInvitedListTotalNumber(),
        apiTenantHistoryCountAndCommentCount(),
      ]);
      const houseViewingListTotalNumber = response.data.totalNumber;
      const rentalInviteListTotalNumber = response2.data.totalNumber;
      const rentalHistoryListTotalNumber =
        response3.data.data.orderHistoryCount;
      const feedbackPendingListTotalNumber =
        response3.data.data.canCommentCount;
      setHouseViewingListTotalNumber(houseViewingListTotalNumber);
      setRentalInviteListTotalNumber(rentalInviteListTotalNumber);
      setRentalHistoryListTotalNumber(rentalHistoryListTotalNumber);
      setFeedbackPendingListTotalNumber(feedbackPendingListTotalNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentRoute = () => {
    const path = location.pathname;
    if (path === "/tenant/houseViewingManagement/houseViewingList") {
      setActiveLink("houseViewingList");
    } else if (path === "/tenant/houseViewingManagement/rentalInviteList") {
      setActiveLink("rentalInviteList");
    } else if (path === "/tenant/houseViewingManagement/rentalHistoryList") {
      setActiveLink("rentalHistoryList");
    } else if (path === "/tenant/feedbackManagement/feedbackPendingList") {
      setActiveLink("feedbackPendingList");
    }
  };
  useEffect(() => {
    getCurrentRoute();
    getEveryListTotalNumber();
  });

  const handleRouteSetting = (e: any) => {
    const linkId = e.currentTarget.dataset.linkid;
    settingActiveLink(linkId);
  };

  return (
    <>
      <section className="py-6 border-b border-t border-Neutral-95">
        <div className="container">
          <h2 className="text-sans-b-h5 mb-6">租屋管理</h2>
          <ul className="flex flex-wrap justify-evenly gap-y-3 sm:gap-x-6 md:flex-nowrap">
            <li
              data-linkid="houseViewingList"
              className={`w-[45%] sm:w-full cursor-pointer group relative overflow-hidden text-Landlord-50 rounded-xl p-3 border border-Neutral-90 ${
                activeLink === "houseViewingList"
                  ? "bg-Landlord-95"
                  : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7  duration-500 fill-Landlord-50 ${
                  activeLink === "houseViewingList" ? "-translate-y-7" : ""
                }`}
                width="137"
                height="132"
                viewBox="0 0 137 132"
              >
                <path
                  d="M0 92.367L95 0L190 92.367V223H0V92.367Z"
                  fillOpacity="0.1"
                />
              </svg>
              <h3 className="opacity-80 text-sans-b-h6 p-[10px]">預約看房</h3>
              <h4 className="px-[10px] py-3 text-sans-h2 text-black">
                {houseViewingListTotalNumber}
              </h4>
              <button
                className="letter-button-dark absolute z-10 bottom-3 right-3 text-black"
                onClick={handleRouteSetting}
              >
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            <li
              data-linkid="rentalInviteList"
              className={`w-[45%] sm:w-full cursor-pointer group relative overflow-hidden text-Alert-50 rounded-xl p-3 border border-Neutral-90 ${
                activeLink === "rentalInviteList" ? "bg-Alert-95" : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Alert-80 ${
                  activeLink === "rentalInviteList" ? "-translate-y-7" : ""
                }`}
                width="137"
                height="132"
                viewBox="0 0 137 132"
              >
                <path
                  d="M0 92.367L95 0L190 92.367V223H0V92.367Z"
                  fillOpacity="0.1"
                />
              </svg>
              <h3 className="opacity-80 text-sans-b-h6 p-[10px]">租約邀請</h3>
              <h4 className="px-[10px] py-3 text-sans-h2">
                {rentalInviteListTotalNumber}
              </h4>
              <button className="letter-button-dark absolute z-10 bottom-3 right-3 text-black">
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            <li
              data-linkid="rentalHistoryList"
              className={`w-[45%] sm:w-full cursor-pointer group relative overflow-hidden text-Brand-50 rounded-xl p-3 border border-Neutral-90 ${
                activeLink === "rentalHistoryList" ? "bg-Tenant-95" : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Tenant-90 ${
                  activeLink === "rentalHistoryList" ? "-translate-y-7" : ""
                }`}
                width="137"
                height="132"
                viewBox="0 0 137 132"
              >
                <path
                  d="M0 92.367L95 0L190 92.367V223H0V92.367Z"
                  fillOpacity="0.1"
                />
              </svg>
              <h3 className="opacity-80 text-sans-b-h6 p-[10px]">承租歷史</h3>
              <h4 className="px-[10px] py-3 text-sans-h2">
                {rentalHistoryListTotalNumber}
              </h4>
              <button className="letter-button-dark absolute z-10 bottom-3 right-3 text-black">
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            <li
              data-linkid="feedbackPendingList"
              className={`w-[45%] sm:w-full cursor-pointer group relative overflow-hidden text-Neutral-30 rounded-xl p-3 border border-Neutral-90 ${
                activeLink === "feedbackPendingList"
                  ? "bg-Neutral-80"
                  : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Neutral-90 ${
                  activeLink === "feedbackPendingList" ? "-translate-y-7" : ""
                }`}
                width="137"
                height="132"
                viewBox="0 0 137 132"
              >
                <path
                  d="M0 92.367L95 0L190 92.367V223H0V92.367Z"
                  fillOpacity="0.1"
                />
              </svg>
              <h3 className="opacity-80 text-sans-b-h6 p-[10px]">待評價</h3>
              <h4 className="px-[10px] py-3 text-sans-h2">
                {feedbackPendingListTotalNumber}
              </h4>
              <button className="letter-button-dark absolute z-10 bottom-3 right-3 text-black">
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <Outlet />
      <Footer />
    </>
  );
}
export default HouseViewingManagementPage;
