import starSelect from "../../assets/imgs/icons/star_select.svg";
import starDefault from "../../assets/imgs/icons/star_default.svg";

type StarType = {
  selected: boolean;
  onClick?: () => void;
};

export default function Star ({ selected, onClick }: StarType) {
  return (
    <img
      src={selected ? starSelect : starDefault}
      alt="star"
      onClick={onClick}
      className={`w-6 h-6 ${
        onClick && "cursor-pointer"
      }`}
    />
  );
}

