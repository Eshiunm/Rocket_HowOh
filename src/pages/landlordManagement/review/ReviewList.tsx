import ReviewCard from "./ReviewCard";

export default function ReviewList () {
  return (
    <ul className="flex flex-col gap-4">
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </ul>
  )
}