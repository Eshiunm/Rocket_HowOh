import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refFnListType } from "./HouseList";
import anchorHouse from "../../../assets/imgs/landlord-management/AnchorHouse.svg";
import { listCountType } from "./HouseList";
import { apiHouseLandlordUnratedCount } from "../../../apis/apis";

export default function LandlordAnchor({refFnList, listCount}: {refFnList: refFnListType, listCount: listCountType}) {
  const navigate = useNavigate();
  const [unratedCount, setUnratedCount] = useState(0);
  useEffect(() => {
    const getUnratedCount = async () => {
      try {
        const response = await apiHouseLandlordUnratedCount();
        setUnratedCount(response.data.data.count);
      } catch (error) {
        localStorage.clear();
        alert("您不是房東，請先登入房東帳號");
        navigate("/");
      }
    }
    getUnratedCount();
  });
  return (
    <section className="pb-6 border-b border-Neutral-95">
      <ul className="layout-grid">
        <li className="cursor-pointer group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Alert-70"
          onClick={refFnList.goPublishList}
        >
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">刊登中</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">{listCount.publish}</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li className="cursor-pointer group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Landlord-60"
          onClick={refFnList.goRentedList}
        >
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已出租</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">{listCount.rented}</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li className="cursor-pointer group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Tenant-50"
          onClick={refFnList.goFinishedList}
        >
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已完成</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">{listCount.finished}</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li
          className="cursor-pointer group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Neutral-50"
          onClick={() => navigate("/landlord/review")}
        >
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">待評價</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">{unratedCount || 0}</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
      </ul>
    </section>
  );
}