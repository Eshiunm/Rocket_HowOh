import { useState } from "react";

export default function CheckToShowInput({ id, title, register }) {
  const [showInput, setShowInput] = useState(false);

  const handleCheckboxChange = () => {
    setShowInput(!showInput);
  };
  return (
    <label htmlFor={id} className="flex-1">
      <div className="option-label">
        <input type="checkbox" id={id} placeholder={id} onChange={handleCheckboxChange} />
        <span>{title}</span>
      </div>
      {
        showInput && (
          <div className="after:content-['公里'] add-new-input-unit">
            <p className="py-1">距離</p>
            <input type="number" id={id} className="add-new-input" placeholder="請填入與房源的距離"  {...register} />
          </div>
        )
      }
    </label>
  );
}