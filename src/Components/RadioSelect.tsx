export default function RadioSelect({option, register}) {
  const { id, title, type } = option;

  return (
    <label htmlFor={id + type} className="flex-1">
      <div className="option-label">
        <input type="radio" value={id} id={id + type} {...register(type, { required: true })} />
        <span>{title}</span>
      </div>
    </label>
  );
}