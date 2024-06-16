import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiCommentReply } from '../../apis/apis';
import getTimeNow from '../getTimeNow';

export type ReplyDataType = {
  replyComment: string;
  time?: string;
}

export default function ReplyReview ({commentId}: {commentId: number}) {
  const { register, handleSubmit, formState: { errors } } = useForm<ReplyDataType>();
  const [replyData, setReplyData] = useState<ReplyDataType | null>(null);
  console.log(replyData);
  const onSubmit = (data: ReplyDataType) => {
    const postReply = async (formData: ReplyDataType, orderRatingId: number) => {
      try {
        await apiCommentReply(formData, orderRatingId);
        formData.time = getTimeNow();
        setReplyData(formData);
      } catch (error) {
        console.log(error);
      }
    }
    postReply(data, commentId);
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