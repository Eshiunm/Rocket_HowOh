export default function CheckBox({ id, title, register }) {
  return (
    <label htmlFor={id} className="option-label">
      <input type="checkbox" id={id} placeholder={id} {...register} />
      <span>{title}</span>
    </label>
  );
}