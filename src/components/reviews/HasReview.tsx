import { useContext, useState } from "react";
import ShowRatingStar from "./ShowRatingStar";
import ReplyReview from "./ReplyReview";
import { ReviewContext } from "./OffcanvasBlock";
import moment from "moment-timezone";

type HasReviewType = {
  // role: string;
  reviewRole: string;
}

export default function HasReview ({reviewRole}: HasReviewType) {
  const { role, orderId, otherRole, commentInfo: { myComment, tenantComment, landlordComment } } = useContext(ReviewContext);
  const [showRating, setShowRating] = useState(1); 
  const [showReply, setShowReply] = useState(false); 

  const choosePresent = (landlordLandlord: string | undefined, landlordTenant: string | undefined, tenantTenant: string | undefined, tenantLandlord: string | undefined) => {
    if (role === "landlord" && reviewRole === "landlord") return landlordLandlord;
    if (role === "landlord" && reviewRole === "tenant") return landlordTenant;
    if (role === "tenant" && reviewRole === "tenant") return tenantTenant;
    if (role === "tenant" && reviewRole === "landlord") return tenantLandlord;
  }

  return (
    <section className={`p-6 rounded-2xl ${
      choosePresent("bg-Landlord-95", "bg-Tenant-99", "bg-Tenant-99", "bg-Landlord-95" )
    }`}>
      <h4 className="text-sans-b-h5 mb-6">
        {choosePresent("我的評價", "租客評價", "我的評價", "房東評價")}
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
          {choosePresent(myComment?.comment, tenantComment?.comment, myComment?.comment, landlordComment?.comment)}
        </p>
        <time className="px-3 pt-1 mb-2.5 text-sans-caption text-Neutral-70">
          {
            moment(choosePresent(myComment?.commentTime, tenantComment?.commentTime, myComment?.commentTime, landlordComment?.commentTime))
            .tz('Asia/Taipei').format('YYYY年MM月DD日 HH:mm')
          }
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