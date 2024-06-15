import HasReview from "./HasReview";
import HiddenReview from "./HiddenReview";
import MyReview from "./MyReview";
import { CommentInfoType } from "../../pages/landlordManagement/review";
import { createContext } from "react";

type OffcanvasBlockPropsType = {
  role: string;
  orderId: number;
  commentInfo: CommentInfoType;
}

type ReviewContextType = OffcanvasBlockPropsType & {
  otherRole: string;
}

export const ReviewContext = createContext<ReviewContextType>({} as ReviewContextType);

export default function OffcanvasBlock ({role = "tenant", orderId, commentInfo}: OffcanvasBlockPropsType) {
  const otherRole = role === "tenant" ? "landlord" : "tenant";
  // console.log(orderId);
  // console.log(commentInfo);
  const { canComment } = commentInfo;

  const reviewContextValue = {
    role,
    otherRole,
    orderId,
    commentInfo
  }
  
  return (
    <ReviewContext.Provider value={reviewContextValue}>
      {
        canComment && <MyReview />
      }
      {/* <MyReview role={role} />
      <HasReview role={role} reviewRole={role} />
      <HasReview role={role} reviewRole={otherRole} />
      <HiddenReview reviewRole={otherRole} /> */}
    </ReviewContext.Provider>
  )
}