import { useState } from "react";
import Star from "./Star";

type StarRatingType = {
  onRating: (value: number) => void
};

export default function StarRating ({ onRating }: StarRatingType) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRating(rate);
  };

  return (
    <div className="flex gap-4 items-center">
      {
        [...Array(5)].map((_, index) => (
          <Star
            key={index}
            selected={index < rating}
            onClick={() => handleRating(index + 1)}
          />  
        ))
      }
    </div>
  );
}