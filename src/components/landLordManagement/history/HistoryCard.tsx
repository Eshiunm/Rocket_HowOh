import { Link } from "react-router-dom";
import house from "../../../assets/imgs/homePage/recommendation_picture_1.svg";
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";

export default function HistoryCard({canReview} : {canReview: boolean}) {
  return (
    <li
      className={`p-3 mb-4 flex gap-4 rounded-xl ${
        canReview && "cursor-pointer hover:bg-Landlord-95"
      }`}
      onClick={() => {
        if (canReview) {
          window.open("/landlord/review","_blank")
        }
      }}
    >
      <div className="w-32 h-32 rounded-2xl overflow-hidden">
        <img
          src={house}
          alt="house_cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-sans-b-h6">房源名稱</h3>
        <div className="text-sans-body1 flex gap-2">
          <h4>合約起迄</h4>
          <time className="pl-2 border-l border-Tenant-70">2024年4月23日</time>
          至
          <time>2025年4月22日</time>
        </div>
        <div className="text-sans-body1 flex gap-2">
          <h4>租客</h4>
          <h5 className="pl-2 border-l border-Tenant-70">黃世明</h5>
        </div>
        <div className="text-sans-body1 flex gap-2">
          <h4>電話</h4>
          <a href="tel:+886-958-230-1239" className="pl-2 border-l border-Tenant-70">0958-230-1239</a>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        {
          canReview ? (
            <div className="badge-m bg-Neutral-50 text-white">待評價</div>
          ) : (
            <div className="badge-m bg-Neutral-99 text-Neutral-80">已完成</div>
          )
        }
        {
          canReview && (
            <Link
              to="/landlord/review" target="_blank"
              className="mt-auto mb-1 mr-2 letter-button-light border-b border-black hover:border-Neutral-30"
            >
              前往評價
              <img src={rightIcon_black} alt="rightIcon" />
            </Link>
          )
        }
      </div>
    </li>
  );
}