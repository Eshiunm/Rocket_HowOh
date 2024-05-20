export default function LandlordAnchor() {
  return (
    <section className="pb-6 border-b border-Neutral-95">
      <ul className="layout-grid">
        <li className="col-span-3 text-white rounded-xl p-3 bg-Alert-70">
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">刊登中</h3>
          <div className="flex justify-between items-end">
            <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
            <button className="letter-button-dark">
              <span>查看</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </li>
        <li className="col-span-3 text-white rounded-xl p-3 bg-Landlord-60">
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已承租</h3>
          <div className="flex justify-between items-end">
            <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
            <button className="letter-button-dark">
              <span>查看</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </li>
        <li className="col-span-3 text-white rounded-xl p-3 bg-Tenant-50">
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">已完成</h3>
          <div className="flex justify-between items-end">
            <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
            <button className="letter-button-dark">
              <span>查看</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </li>
        <li className="col-span-3 text-white rounded-xl p-3 bg-Neutral-50">
          <h3 className="opacity-80 text-sans-b-h6 p-[10px]">待評價</h3>
          <div className="flex justify-between items-end">
            <h4 className="px-[10px] py-3 text-sans-h2">4</h4>
            <button className="letter-button-dark">
              <span>查看</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </li>
      </ul>
    </section>
  );
}