import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import StarRating from "./StarRating";
import { ReviewContext } from "./OffcanvasBlock";
import HiddenReview from './HiddenReview';

export default function MyReview () {
  const { role, orderId, otherRole, commentInfo: { tenantComment, landlordComment } } = useContext(ReviewContext);
  console.log(orderId);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data : any) => { 
    console.log(data)
    console.log(errors)
  };

  const handleRating = (rating: number) => {
    console.log('星星數:', rating);
  };
  return (
    <>
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
        </form>
      </section>
      {
        (tenantComment || landlordComment) && <HiddenReview reviewRole={otherRole} />
      }
    </>
  );
}