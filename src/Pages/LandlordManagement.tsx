import { Outlet } from "react-router-dom";

export default function LandlordManagement() {
  return (
    <>
      <div className="container">
        <div className="mt-[52px] bg-Landlord-95 rounded-xl p-6">
          <h2 className="text-sans-b-h5 mb-7">房東好窩</h2>
          <div className="flex gap-3">
            <button className="text-sans-b-body1 bg-Landlord-30 text-Landlord-99 px-4 py-2 rounded-3xl">全部房源</button>
            <button className="text-sans-b-body1 bg-transparent border border-Landlord-40 text-black px-4 py-2 rounded-3xl">出租歷史</button>
            <button className="text-sans-b-h6 ml-auto px-20 py-3 rounded-lg bg-black flex justify-center items-center gap-3 text-white">
              <span className="">新增房源</span>
              <img src="../public/imgs/icons/add.svg" alt="add" />
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}