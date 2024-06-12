import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiAppointmentCommonTotalNumber } from "../../apis/apis";
import Footer from "../../components/footer/Footer";

function HouseViewingManagementPage() {
  const navigate = useNavigate();
  const [isLinkActive, setIsLinkActive] = useState("houseViewingList");
  const [houseViewingListTotalNumber, setHouseViewingListTotalNumber] =
    useState(0);
  const handleRouteSetting = (e: any) => {
    const linkId = e.currentTarget.dataset.linkid;
    if (linkId === "houseViewingList") {
      setIsLinkActive("houseViewingList");
      navigate("/tenant/houseViewingManagement/houseViewingList");
    } else if (linkId === "rentalInviteList") {
      setIsLinkActive("rentalInviteList");
      navigate("/tenant/houseViewingManagement/rentalInviteList");
    } else if (linkId === "rentalHistoryList") {
      setIsLinkActive("rentalHistoryList");
      navigate("/tenant/houseViewingManagement/rentalHistoryList");
    } else if (linkId === "feedbackPendingList") {
      setIsLinkActive("feedbackPendingList");
      navigate("/tenant/feedbackManagement/feedbackPendingList");
    }
  };

  useEffect(() => {
    const getHouseViewingList = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await apiAppointmentCommonTotalNumber(
          userId as string
        );
        setHouseViewingListTotalNumber(response.data.totalNumber);
      } catch (error) {
        console.log(error);
      }
    };
    getHouseViewingList();
  });
  return (
    <>
      <section className="py-6 border-b border-t border-Neutral-95">
        <div className="container">
          <h2 className="text-sans-b-h5 mb-6">租屋管理</h2>
          <ul className="flex gap-x-6">
            <li
              data-linkid="houseViewingList"
              className={`w-full cursor-pointer group relative overflow-hidden text-Landlord-50 rounded-xl p-3 border border-Neutral-90 ${
                isLinkActive === "houseViewingList"
                  ? "bg-Landlord-95"
                  : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7  duration-500 fill-Landlord-50 ${
                  isLinkActive === "houseViewingList" ? "-translate-y-7" : ""
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
              className={`w-full cursor-pointer group relative overflow-hidden text-Alert-50 rounded-xl p-3 border border-Neutral-90 ${
                isLinkActive === "rentalInviteList" ? "bg-Alert-95" : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Alert-80 ${
                  isLinkActive === "rentalInviteList" ? "-translate-y-7" : ""
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
              <h4 className="px-[10px] py-3 text-sans-h2">{0}</h4>
              <button className="letter-button-dark absolute z-10 bottom-3 right-3 text-black">
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            <li
              data-linkid="rentalHistoryList"
              className={`w-full cursor-pointer group relative overflow-hidden text-Brand-50 rounded-xl p-3 border border-Neutral-90 ${
                isLinkActive === "rentalHistoryList"
                  ? "bg-Tenant-95"
                  : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Tenant-90 ${
                  isLinkActive === "rentalHistoryList" ? "-translate-y-7" : ""
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
              <h4 className="px-[10px] py-3 text-sans-h2">{0}</h4>
              <button className="letter-button-dark absolute z-10 bottom-3 right-3 text-black">
                <span>查看</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            <li
              data-linkid="feedbackPendingList"
              className={`w-full cursor-pointer group relative overflow-hidden text-Neutral-30 rounded-xl p-3 border border-Neutral-90 ${
                isLinkActive === "feedbackPendingList"
                  ? "bg-Neutral-80"
                  : "bg-white"
              }`}
              onClick={handleRouteSetting}
            >
              <svg
                className={`absolute right-0 top-9 group-hover:-translate-y-7 duration-500 fill-Neutral-90 ${
                  isLinkActive === "feedbackPendingList" ? "-translate-y-7" : ""
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
              <h4 className="px-[10px] py-3 text-sans-h2">{0}</h4>
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
