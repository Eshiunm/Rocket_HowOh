import HasReview from "./HasReview";
import HiddenReview from "./HiddenReview";
import MyReview from "./MyReview";
import { CommentInfoType } from "../../pages/landlordManagement/review";

type OffcanvasBlockPropsType = {
  role: string;
  orderId: number;
  commentInfo: CommentInfoType;
}

export default function OffcanvasBlock ({role = "tenant", orderId, commentInfo}: OffcanvasBlockPropsType) {
  const otherRole = role === "tenant" ? "landlord" : "tenant";
  console.log(orderId);
  console.log(commentInfo);
  
  return (
    <>
      <MyReview role={role} />
      <HasReview role={role} reviewRole={role} />
      <HasReview role={role} reviewRole={otherRole} />
      <HiddenReview reviewRole={otherRole} />
    </>
  )
}