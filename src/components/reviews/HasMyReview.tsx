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
      {/* <form
        className="pt-6 flex flex-col"  
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5 className="text-sans-b-h6 mb-4">評論</h5>
        <textarea
          className="resize-none w-full rounded p-3 text-sans-body1 bg-transparent border-black focus:ring-0 focus:border-2 focus:border-Brand-30 focus:-m-px"
          placeholder="請說明您的住宿經驗"
          rows={11}
          {...register("comment", {maxLength: 200})}
        />
        <small className="px-3 pt-1 text-sans-caption">
          最多200字
        </small>
        <button
          type="submit"
          className="outline-button-m mt-2.5 self-end"
        >
          送出
        </button>
      </form> */}
    </section>
  )
}