import housePic from "../../../assets/imgs/homePage/recommendation_picture_2.svg"

export default function HouseCard() {
  return (
    <li className="col-span-3 p-4 rounded-[20px]">
      <div className="overflow-hidden rounded-2xl mb-4 h-48">
        <img
          src={housePic}
          alt="房源照片"
          className="object-cover h-full"
        />
      </div>
      <h5 className="text-sans-b-h6 mb-2">房源名稱</h5>
      <div className="mb-6 text-sans-body1">
        <span className="pr-2">租約邀請已送出</span>
        <span className="pl-2 border-l border-Tenant-70">詹小美</span>
      </div>
      <button disabled className="w-full text-center outline-button-s">立即變更:已承租</button>

    </li>
  );
}