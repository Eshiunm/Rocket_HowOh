import { useState } from "react";
import ShowRatingStar from "./ShowRatingStar";

export default function HasMyReview ({role}:{role: string}) {
  const [showRating, setShowRating] = useState(3); 

  return (
    <section className={`p-6 rounded-2xl ${
      role === "tenant" ? "bg-Tenant-99" : "bg-Landlord-95"
    }`}>
      <h4 className="text-sans-b-h5 mb-6">我要評價</h4>
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
        <time className="px-3 pt-1 text-sans-caption text-Neutral-70">
          2024年5月18日 14:40
        </time>
        <button
          type="button"
          className="outline-button-m mt-2.5 self-end"
          disabled
        >
          評價已送出
        </button>
      </div>
    </section>
  )
}