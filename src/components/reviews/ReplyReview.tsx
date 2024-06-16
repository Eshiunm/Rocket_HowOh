import { useForm } from 'react-hook-form';

type ReplyDataType = {
  replyComment: string;
}

export default function ReplyReview () {
  const { register, handleSubmit, formState: { errors } } = useForm<ReplyDataType>();
  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  };

  return (
    <form
      className="pt-6 flex flex-col"  
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="text-sans-b-h6 mb-4">您的回覆</h5>
      <textarea
        className={`resize-none w-full rounded p-3 text-sans-body1 bg-transparent focus:ring-0 focus:border-2 focus:-m-px ${
          errors.replyComment ? "border-Alert-50 focus:border-Alert-50" : "border-black focus:border-Brand-30"
        }`}
        placeholder="只能回覆對方評論一次"
        rows={10}
        maxLength={200}
        {...register("replyComment", {
          required: {value: true, message: "請填寫此則評論的回覆"},
          maxLength: 200
        })}
      />
      {
        errors.replyComment ? (
          <small className="px-3 pt-1 text-sans-caption text-Alert-50">
            {errors.replyComment.message}
          </small>
        ):(
          <small className="px-3 pt-1 text-sans-caption">
            最多200字
          </small>
        )
      }
      <button
        type="submit"
        className="outline-button-m mt-2.5 self-end"
      >
        送出回覆
      </button>
    </form>
  )
}