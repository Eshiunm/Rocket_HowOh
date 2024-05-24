import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import BigLoading from "../../components/loading/BigLoading";
import Footer from "../../components/footer/Footer";
import addIcon from "../../assets/imgs/icons/add.svg";
import { apiHouseLandlordPostNew } from "../../apis/apis";

export default function LandlordManagement() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  const handlePostNew = async () => {
    // 新增房源
    setLoading(true);
    try {
      const res = await apiHouseLandlordPostNew({});
      if (res.data.Status === false) {
        throw new Error(res.data.Message);
      }
      localStorage.setItem("houseId", res.data.data.houseId);
      navigate('/landlord/post');
    } catch (error) {
      localStorage.clear();
      console.error(error);
      alert(error);
      navigate('/');
    }
    setLoading(false);
  }

  useEffect(() => {
    // 判斷網址路徑所在位置，控制tab-button狀態
    if(location.pathname === '/landlord') {
      setActiveButton('all');
    } else if (location.pathname === '/landlord/history') {
      setActiveButton('history');
    }
  },[location]);

  return (
    <>
      {loading && <BigLoading />}
      <header className="bg-Landlord-99">
        <div className="container px-8 py-6">
          <h2 className="text-sans-b-h5 mb-5">房東好窩</h2>
          <div className="flex items-end gap-3">
            <Link to="/landlord" className={`tab-button-m py-1 ${activeButton === 'all' ? 'bg-Landlord-50 text-Landlord-99' : ""}`}>全部房源</Link>
            <Link to="/landlord/history" className={`tab-button-m py-1 ${activeButton === 'history' ? 'bg-Landlord-50 text-Landlord-99' : ""}`}>出租歷史</Link>
            <button
              className="filled-button-m px-11 ml-auto flex justify-center items-center gap-2 "
              onClick={handlePostNew}
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