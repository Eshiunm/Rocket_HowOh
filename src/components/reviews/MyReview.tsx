import StarRating from "./StarRating";

export default function MyReview () {
  const handleRating = (rating: number) => {
    console.log('星星數:', rating);
  };
  return (
    <div className="bg-Landlord-95">
      <StarRating onRating={handleRating} />
    </div>
  );
}