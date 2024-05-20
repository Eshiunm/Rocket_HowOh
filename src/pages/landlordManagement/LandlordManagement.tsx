import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import addIcon from "../../assets/imgs/icons/add.svg";

export default function LandlordManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    // 判斷網址路徑所在位置，控制tab-button狀態
    if(location.pathname === '/landlord-management') {
      setActiveButton('all');
    } else if (location.pathname === '/landlord-management/history') {
      setActiveButton('history');
    }
  },[location]);

  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container px-8 py-6">
          <h2 className="text-sans-b-h5 mb-5">房東好窩</h2>
          <div className="flex items-end gap-3">
            <Link to="/landlord-management" className={`tab-button-m py-1 ${activeButton === 'all' ? 'bg-Landlord-50 text-Landlord-99' : ""}`}>全部房源</Link>
            <Link to="/landlord-management/history" className={`tab-button-m py-1 ${activeButton === 'history' ? 'bg-Landlord-50 text-Landlord-99' : ""}`}>出租歷史</Link>
            <button
              className="filled-button-m px-11 ml-auto flex justify-center items-center gap-2 "
              onClick={() => {
                navigate("/post");
              }}
            >
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