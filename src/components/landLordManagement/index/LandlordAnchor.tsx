import anchorHouse from "../../../assets/imgs/landlord-management/AnchorHouse.svg";

export default function LandlordAnchor() {
  return (
    <section className="pb-6 border-b border-Neutral-95">
      <ul className="layout-grid">
        <li className="group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Alert-70">
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">刊登中</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li className="group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Landlord-60">
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已承租</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li className="group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Tenant-50">
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已完成</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
        <li className="group relative overflow-hidden col-span-3 text-white rounded-xl p-3 bg-Neutral-50">
          <img
            src={anchorHouse}
            alt="anchor-house"
            className="absolute right-0 top-9 group-hover:-translate-y-7 duration-500"
          />
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">待評價</h3>
          <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
          <button className="letter-button-dark absolute z-10 bottom-3 right-3">
            <span>查看</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
      </ul>
    </section>
  );
}