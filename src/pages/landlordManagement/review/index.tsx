import { useEffect, useState } from "react";
import RefreshBtn from "../../../components/buttons/RefreshBtn";
import Footer from "../../../components/footer/Footer";
import ReviewList from "./ReviewList";
import leftIcon_white from "../../../assets/imgs/icons/leftIcon_white.svg";
import rightIcon_white from "../../../assets/imgs/icons/rightIcon_white.svg";
import { apiCommentList } from "../../../apis/apis";

export default function Review() {
  const [listCount, setListCount] = useState<number>(0);
  const [pageNumberControl, setPageNumberControl] = useState<number>(1);
  const totalPage = Math.ceil(listCount / 12);

  useEffect(() => {
    const queryString = new URLSearchParams({
      page: pageNumberControl.toString(),
    }).toString();

    const getReviewList = async (page) => {
      try {
        const response = await apiCommentList(page);
        setListCount(response.data.data.totalCount);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
    getReviewList(queryString);
  });


  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-Landlord-99 py-6">
        <h2 className="container text-sans-b-h5">評價管理</h2>
      </header>
      <main className="container layout-grid mt-6 mb-40">
        <div className="col-span-7 px-5">
          <nav className="py-3.5 border-b border-Neutral-95">
            <RefreshBtn />
          </nav>
          <section className="py-4 mb-3 border-b border-Neutral-95">
            <ReviewList />
          </section>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2.5 text-sans-body2">
              <h6>
                顯示
                <span className="text-sans-b-body2 px-1"> {pageNumberControl * 12 - 11} </span>
                至
                <span className="text-sans-b-body2 px-1"> {pageNumberControl === totalPage ? listCount : pageNumberControl * 12} </span>
                筆
              </h6>
              <h6>
                共
                <span className="text-sans-b-body2"> {listCount} </span>
                筆
              </h6>
            </div>
            <div className="flex gap-[1px]">
              <button
                type="button"
                className="text-sans-b-body2 filled-button-s rounded-r-none flex items-center gap-1"
                disabled={pageNumberControl === 1}
                onClick={() => setPageNumberControl(prev => prev - 1)}
                >
                <img src={leftIcon_white} alt="left-icon" />
                上一頁
              </button>
              <button
                type="button"
                className="text-sans-b-body2 filled-button-s rounded-l-none flex items-center gap-1"
                disabled={pageNumberControl === totalPage}
                onClick={() => setPageNumberControl(prev => prev + 1)}
              >
                下一頁
                <img src={rightIcon_white} alt="right-icon" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}