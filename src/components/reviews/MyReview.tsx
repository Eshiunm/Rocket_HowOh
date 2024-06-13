import { useForm } from 'react-hook-form';
import StarRating from "./StarRating";

export default function MyReview ({role}: {role: string}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const handleRating = (rating: number) => {
    console.log('星星數:', rating);
  };
  return (
    <div className={`p-6 rounded-2xl ${
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
    </div>
  );
}