import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import StarRating from "./StarRating";
import ShowRatingStar from './ShowRatingStar';
import { ReviewContext } from "./OffcanvasBlock";
import HiddenReview from './HiddenReview';
import HasReview from './HasReview';
import { apiCommentPost } from '../../apis/apis';
import getTimeNow from '../getTimeNow';

export type ReviewPostDataType = {
  comment: string;
	rating?: number;
  time?: string;
}

export default function MyReview () {
  const { role, orderId, otherRole, commentInfo: { tenantComment, landlordComment } } = useContext(ReviewContext);
  
  const { register, handleSubmit } = useForm<ReviewPostDataType>();
  const [saveRating, setSaveRating] = useState(1);
  const [submitData, setSubmitData] = useState<ReviewPostDataType | null>(null);
  const handleRating = (rating: number) => setSaveRating(rating);

  const onSubmit = (data: ReviewPostDataType) => { 
    data.rating = saveRating;
    
    const postReview = async (data: ReviewPostDataType, orderId: number) => {
      try {
        await apiCommentPost(data, orderId);
        data.time = getTimeNow();
        setSubmitData(data);
      } catch (error) {
        console.log(error);
      }
    }
    postReview(data, orderId)
  };

  return (
    <>
      {
        submitData === null ? (
          <section className={`p-6 rounded-2xl ${
            role === "tenant" ? "bg-Tenant-99" : "bg-Landlord-95"
          }`}>
            <h4 className="text-sans-b-h5 mb-6">我要評價</h4>
            <div className="border-b border-Neutral-95">
              <h5 className="text-sans-b-h6">評分</h5>
              <StarRating onRating={handleRating} />
            </div>
            <form
              className="pt-6 flex flex-col"  
              onSubmit={handleSubmit(onSubmit)}
            >
              <h5 className="text-sans-b-h6 mb-4">評論</h5>
              <textarea
                className="resize-none w-full rounded p-3 text-sans-body1 bg-transparent border-black focus:ring-0 focus:border-2 focus:border-Brand-30 focus:-m-px"
                placeholder="請說明您的住宿經驗"
                rows={10}
                maxLength={200}
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
            </form>
          </section>
        ):(
          <section className={`p-6 rounded-2xl ${
            role === "tenant" ? "bg-Tenant-99": "bg-Landlord-95"
          }`}>
            <h4 className="text-sans-b-h5 mb-6">
              我的評價
            </h4>
            <div className="border-b border-Neutral-95">
              <h5 className="text-sans-b-h6">評分</h5>
              {
                submitData.rating && <ShowRatingStar rate={submitData.rating} />
              }
            </div>
            <div
              className="pt-6 flex flex-col"
            >
              <h5 className="text-sans-b-h6 mb-4">評論</h5>
              <p
                className="w-full p-3 text-sans-body1 bg-transparent border-b border-black"
              >
                {submitData.comment}
              </p>
              <time className="px-3 pt-1 mb-2.5 text-sans-caption text-Neutral-70">
                {
                  submitData.time
                }
              </time>
              <button
                type="button"
                className="outline-button-m self-end"
                disabled
              >
                評價已送出
              </button>
            </div>
          </section>
        )
      }
      {
        (tenantComment || landlordComment) && (
          submitData 
          ? <HasReview reviewRole={otherRole} /> 
          : <HiddenReview reviewRole={otherRole} />
        )
      }
    </>
  );
}