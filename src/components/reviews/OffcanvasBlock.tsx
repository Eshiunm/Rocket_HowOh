import HasReview from "./HasReview";
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
  const { canComment, myComment, tenantComment, landlordComment } = commentInfo;

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
      {
        !canComment && myComment && <HasReview reviewRole={role} />
      }
      {
        !canComment && (tenantComment || landlordComment) && <HasReview reviewRole={otherRole} />
      }
    </ReviewContext.Provider>
  )
}