import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import leftIcon_white from "../../assets/imgs/icons/leftIcon_white.svg";
import rightIcon_white from "../../assets/imgs/icons/rightIcon_white.svg";
import RequestList from "../../components/landLordManagement/request/RequestList";
import Footer from "../../components/footer/Footer";
import { apiAppointmentCommonTotalNumber } from "../../apis/apis";

export default function TenantRequest() {
  const navigate = useNavigate();
  const [requestTotalNumber, setRequestTotalNumber] = useState(0);
  const [sortOrder, setSortOrder] = useState('oldFirst'); // 默認排序為舊至新

  const handleSortOrderChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sortType = e.currentTarget.getAttribute('data-sort');
    if (sortType) {
      setSortOrder(sortType);
    }
  };

  useEffect(() => {
    const houseId = localStorage.getItem("houseId")  || "-1";
    let orderMethod = "1";
    switch (sortOrder) {
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

    const getRequestTotalNumber = async () => {
      const queryString = new URLSearchParams({
        houseId,
        orderMethod,
      }).toString();
  
      try {
        const request = await apiAppointmentCommonTotalNumber(queryString);
        setRequestTotalNumber(request.data.totalNumber);
      } catch (error: any) {
        if(error.response.status === 401) {
          alert("登入已過期，請重新登入");
        } else if (error.response.status === 400) {
          alert("資料錯誤，請確認身分後重新登入");
        }
      }
    }
    getRequestTotalNumber();
  }, [sortOrder]);

  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6 flex justify-between items-end">
          <h2 className="text-sans-b-h5">租客預約請求</h2>
          <button
            type="button"
            className="filled-button-m"
            onClick={() => navigate(-1)}
          >
            返回房源資訊
          </button>
        </div>
      </header>
      <main className="container layout-grid mb-40">
        <div className="col-span-7 px-5">
          <section className="flex items-start gap-6 pb-3 pt-6 border-b border-Neutral-95 mb-6">
            <div className="flex gap-3 pt-4">
              <button
                className={`tab-button-m py-1 ${
                  sortOrder === "oldFirst" && "tab-button-m-select"
                }`}
                data-sort="oldFirst"
                onClick={handleSortOrderChange}
              >
                舊至新
              </button>
              <button
                className={`tab-button-m py-1 ${
                  sortOrder === "newFirst" && "tab-button-m-select"
                }`}
                data-sort="newFirst"
                onClick={handleSortOrderChange}
              >
                新至舊
              </button>
              <button
                className={`tab-button-m py-1 ${
                  sortOrder === "hidden" && "tab-button-m-select"
                }`}
                data-sort="hidden"
                onClick={handleSortOrderChange}
              >
                已隱藏
              </button>
            </div>
            <div className="ml-auto flex flex-col items-center gap-2">
              <div className="flex gap-[10px] text-sans-body2">
                <h6>
                  顯示
                  <span className="text-sans-b-body2"> 1 </span>
                  至
                  <span className="text-sans-b-body2"> 12 </span>
                  筆
                </h6>
                <h6>
                  共
                  <span className="text-sans-b-body2"> {requestTotalNumber} </span>
                  筆
                </h6>
              </div>
              <div className="flex gap-[1px]">
                <button
                  className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1"
                  disabled={requestTotalNumber < 12}
                >
                  <img src={leftIcon_white} alt="left-icon" />
                  上一頁
                </button>
                <button
                  className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1"
                  disabled={requestTotalNumber < 12}  
                >
                  下一頁
                  <img src={rightIcon_white} alt="right-icon" />
                </button>
              </div>
            </div>
          </section>
          <section>
            <RequestList sort={sortOrder} />
          </section>
          <section className="flex justify-end pt-3 border-t border-Neutral-95">
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-[10px] text-sans-body2">
                <h6>
                  顯示
                  <span className="text-sans-b-body2"> 1 </span>
                  至
                  <span className="text-sans-b-body2"> 12 </span>
                  筆
                </h6>
                <h6>
                  共
                  <span className="text-sans-b-body2"> {requestTotalNumber} </span>
                  筆
                </h6>
              </div>
              <div className="flex gap-[1px]">
                <button
                  className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1"
                  disabled={requestTotalNumber < 12}  
                >
                  <img src={leftIcon_white} alt="left-icon" />
                  上一頁
                </button>
                <button
                  className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1"
                  disabled={requestTotalNumber < 12}
                >
                  下一頁
                  <img src={rightIcon_white} alt="right-icon" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}