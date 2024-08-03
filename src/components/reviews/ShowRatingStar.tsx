import Star from "./Star";

export default function ShowRatingStar ({rate}: {rate: number}) {
  return(
    <div className="my-4 flex gap-4 items-center">
      {
        [...Array(5)].map((_, index) => (
          <Star
            key={index}
            selected={index < rate}
          />  
        ))
      }
    </div>
  )
}