import housePic from "../../../assets/imgs/homePage/recommendation_picture_2.svg"

export default function HouseCard({data}) {
  const { name, photo, status} = data;
  return (
    <li className="col-span-3 p-4 rounded-[20px] bg-white hover:bg-Landlord-99">
      <div className="overflow-hidden rounded-2xl mb-4 h-48">
        <img
          src={ photo || housePic}
          alt="房源照片"
          className="object-cover h-full w-full"
        />
      </div>
      <h5 className="text-sans-b-h6 mb-2">{name}</h5>
      {
        status ? (
          <div className="mb-6 text-sans-body1">
            <span className="pr-2">租約邀請已送出</span>
            <span className="pl-2 border-l border-Tenant-70">詹小美</span>
          </div>
        ):(
          <div className="py-6"></div>
        )
      }
      <button className="w-full text-center outline-button-s">{
        status ? "立即變更:已承租" : "繼續編輯"}</button>

    </li>
  );
}