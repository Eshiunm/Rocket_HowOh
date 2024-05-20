import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import addIcon from "../../assets/imgs/icons/add.svg";

export default function LandlordManagement() {
  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container px-8 py-6">
          <h2 className="text-sans-b-h5 mb-5">房東好窩</h2>
          <div className="flex items-end gap-3">
            <button className="tab-button-m py-1">全部房源</button>
            <button className="tab-button-m py-1">出租歷史</button>
            <button className="filled-button-m px-11 ml-auto flex justify-center items-center gap-2 ">
              <span>新增房源</span>
              <img src={addIcon} alt="add" />
            </button>
          </div>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}