import { useForm } from 'react-hook-form';

export default function ReplyReview () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form
      className="pt-6 flex flex-col"  
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="text-sans-b-h6 mb-4">您的回覆</h5>
      <textarea
        className="resize-none w-full rounded p-3 text-sans-body1 bg-transparent border-black focus:ring-0 focus:border-2 focus:border-Brand-30 focus:-m-px"
        placeholder="只能回覆對方評論一次"
        rows={11}
        {...register("reply", {maxLength: 200})}
      />
      <small className="px-3 pt-1 text-sans-caption">
        最多200字
      </small>
      <button
        type="submit"
        className="outline-button-m mt-2.5 self-end"
      >
        送出回覆
      </button>
    </form>
  )
}