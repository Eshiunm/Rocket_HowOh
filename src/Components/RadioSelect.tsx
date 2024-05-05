export default function RadioSelect({option, register}) {
  const { id, title, type } = option;

  return (
    <label htmlFor={id} className="flex-1">
      <div className="option-label">
        <input type="radio" value={id} id={id} {...register(type)} />
        <span>{title}</span>
      </div>
    </label>
  );
}