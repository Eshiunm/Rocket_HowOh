import { useState } from "react";
import leftIcon_white from "../../assets/imgs/icons/leftIcon_white.svg";
import rightIcon_white from "../../assets/imgs/icons/rightIcon_white.svg";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import RequestList from "../../components/landLordManagement/request/RequestList";

export default function TenantRequest() {
  const navigate = useNavigate();
  const [isOrderFocused, setIsOrderFocused] = useState(false);

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
          <section className="flex items-start gap-6 pb-3 pl-3 pt-6 border-b border-Neutral-95 mb-6">
            <div className="flex gap-3 items-center pt-[14px]">
              <input
                type="checkbox"
                name=""
                id="checkAllTenant"
                className="checkBox-black"
              />
              <label
                htmlFor="checkAllTenant"
                className="letter-button-light cursor-pointer"
              >
                全選
              </label>
              <button
                type="button"
                className="text-sans-b-body1 text-Neutral-30"
              >
                刪除租客
              </button>
            </div>
            <div className="pt-[14px] ml-auto">
              <div
                className={`relative rounded ${
                  isOrderFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsOrderFocused(true)}
                onBlur={() => setIsOrderFocused(false)}
              >
                <select
                  id="city"
                  className="block p-3 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0"
                >
                  <option value="oldList">舊至新</option>
                  <option value="newList">新至舊</option>
                  <option value="hasView">已查看</option>
                  <option value="noView">未查看</option>
                </select>
                <label
                  htmlFor="city"
                  className="absolute text-sans-caption -translate-y-4 top-[6px] z-10 bg-white px-0.5 start-3"
                >
                  排序
                </label>
              </div>
            </div>
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
                  <span className="text-sans-b-body2"> 32 </span>
                  筆
                </h6>
              </div>
              <div className="flex gap-[1px]">
                <button className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1">
                  <img src={leftIcon_white} alt="left-icon" />
                  上一頁
                </button>
                <button className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1">
                  下一頁
                  <img src={rightIcon_white} alt="right-icon" />
                </button>
              </div>
            </div>
          </section>
          <section>
            <RequestList />
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
                  <span className="text-sans-b-body2"> 32 </span>
                  筆
                </h6>
              </div>
              <div className="flex gap-[1px]">
                <button className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1">
                  <img src={leftIcon_white} alt="left-icon" />
                  上一頁
                </button>
                <button className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1">
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