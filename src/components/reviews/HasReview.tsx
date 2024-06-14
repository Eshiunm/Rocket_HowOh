import { useState } from "react";
import ShowRatingStar from "./ShowRatingStar";
import ReplyReview from "./ReplyReview";

type HasReviewType = {
  role: string;
  reviewRole: string;
}

export default function HasReview ({role, reviewRole}: HasReviewType) {
  const [showRating, setShowRating] = useState(3); 
  const [showReply, setShowReply] = useState(false); 

  return (
    <section className={`p-6 rounded-2xl 
      ${ role === "landlord" && reviewRole === "landlord" && "bg-Landlord-95" }
      ${ role === "landlord" && reviewRole === "tenant" && "bg-Tenant-99" }      
      ${ role === "tenant" && reviewRole === "tenant" && "bg-Tenant-99" }      
      ${ role === "tenant" && reviewRole === "landlord" && "bg-Landlord-95" }
    `}>
      <h4 className="text-sans-b-h5 mb-6">
        { role === reviewRole && "我的評價" }
        { role === "landlord" && reviewRole === "tenant" && "租客評價" }
        { role === "tenant" && reviewRole === "landlord" && "房東評價" }
      </h4>
      <div className="border-b border-Neutral-95">
        <h5 className="text-sans-b-h6">評分</h5>
        <ShowRatingStar rate={showRating} />
      </div>
      <div
        className="pt-6 flex flex-col"
      >
        <h5 className="text-sans-b-h6 mb-4">評論</h5>
        <p
          className="w-full p-3 text-sans-body1 bg-transparent border-b border-black"
        >
          評論文字區域
        </p>
        <time className="px-3 pt-1 mb-2.5 text-sans-caption text-Neutral-70">
          2024年5月18日 14:40
        </time>
        {
          role === reviewRole && (
            <button
              type="button"
              className="outline-button-m self-end"
              disabled
            >
              評價已送出
            </button>
          )
        }
        {
          role === reviewRole && (
          <>
            <h6 className="text-sans-caption mb-1">
              { role === "landlord" && "租客回覆" }
              { role === "tenant" && "房東回覆" }
            </h6>
            <p
              className="w-full p-3 text-sans-body1 bg-transparent border-b border-black"
              >
              回覆評論文字區域
            </p>
            <time className="px-3 pt-1 mb-2.5 text-sans-caption text-Neutral-70">
              2024年5月18日 14:40
            </time>
          </>
          )
        }
        {
          role !== reviewRole && !showReply && (
            <button
              type="button"
              className="outline-button-m self-end"
              onClick={() => setShowReply(true)}
            >
              回覆
            </button>
          )
        }
        {
          showReply && <ReplyReview />
        }
        {
          role !== reviewRole && (
          <>
            <h5 className="text-sans-b-h6 mb-4">您的回覆</h5>
            <p
              className="w-full p-3 text-sans-body1 bg-transparent border-b border-black"
              >
              回覆評論文字區域
            </p>
            <time className="px-3 pt-1 mb-2.5 text-sans-caption text-Neutral-70">
              2024年5月18日 14:40
            </time>
          </>
          )
        }
      </div>
    </section>
  )
}