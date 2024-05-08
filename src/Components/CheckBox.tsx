import { FieldValues, UseFormRegister } from 'react-hook-form';
interface CheckBoxProps {
  id: string;
  title: string;
  register: UseFormRegister<FieldValues>; 
}
export default function CheckBox({ id, title, register }: CheckBoxProps) {
  return (
    <label htmlFor={id} className="option-label">
      <input type="checkbox" id={id} placeholder={id} {...register} />
      <span>{title}</span>
    </label>
  );
}
