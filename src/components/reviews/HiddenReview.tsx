import hiddenReviewImg from "../../assets/imgs/hiddenOtherReview.svg";

export default function HiddenReview ({reviewRole}: {reviewRole: string}) {
  return (
    <section className={`p-6 rounded-2xl 
      ${ reviewRole === "landlord" && "bg-Landlord-95" }
      ${ reviewRole === "tenant" && "bg-Tenant-99" }
    `}>
      <h4 className="text-sans-b-h5 mb-6">
        { reviewRole === "landlord" && "房東評價" }
        { reviewRole === "tenant" && "租客評價" }
      </h4>
      <p className="text-sans-body2 mb-6">請先評價以查看對方評價</p>
      <div className="w-full overflow-hidden">
        <img
          src={hiddenReviewImg}
          alt="hidden_review_picture"
          className="w-full h-full"
        />
      </div>
      
    </section>
  )
}