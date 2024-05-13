import { FieldValues, UseFormRegister } from "react-hook-form";
import { optionType } from "../../../types/forPay";

interface RadioSelectProps {
  option: optionType;
  register: UseFormRegister<FieldValues>;
}

export default function RadioSelect({ option, register }: RadioSelectProps) {
  const { id, title, type } = option;

  return (
    <label htmlFor={id + type} className="flex-1">
      <div className="option-label">
        <input
          type="radio"
          value={id}
          id={id + type}
          {...register(type, { required: true })}
        />
        <span>{title}</span>
      </div>
    </label>
  );
}
