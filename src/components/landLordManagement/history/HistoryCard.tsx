import { Link } from "react-router-dom";
// 轉換承租時間
import moment from 'moment-timezone';
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";
import { ExpiredListType } from "../../../pages/landlordManagement/RentedHistory";

export default function HistoryCard({data} : {data: ExpiredListType}) {
  const {name, photo, tenant, tenantTel, leaseStartTime, leaseEndTime, canComment} = data;

  return (
    <li
      className={`p-3 mb-4 flex gap-4 rounded-xl ${
        canComment && "cursor-pointer hover:bg-Landlord-95"
      }`}
      onClick={() => {
        if (canComment) {
          window.open("/landlord/review","_blank")
        }
      }}
    >
      <div className="w-32 h-32 rounded-2xl overflow-hidden">
        <img
          src={photo}
          alt="house_cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-sans-b-h6">{name}</h3>
        <div className="text-sans-body1 flex gap-2">
          <h4>合約起迄</h4>
          <time className="pl-2 border-l border-Tenant-70">{moment(leaseStartTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
          至
          <time>{moment(leaseEndTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
        </div>
        <div className="text-sans-body1 flex gap-2">
          <h4>租客</h4>
          <h5 className="pl-2 border-l border-Tenant-70">{tenant || "非系統用戶"}</h5>
        </div>
        <div className="text-sans-body1 flex gap-2">
          <h4>電話</h4>
          <a
            href={`+886-${tenantTel.replace(/^0/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`}
            className="pl-2 border-l border-Tenant-70">
            {tenantTel.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
          </a>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end">
        {
          canComment ? (
            <div className="badge-m bg-Neutral-50 text-white">待評價</div>
          ) : (
            <div className="badge-m bg-Neutral-99 text-Neutral-80">已完成</div>
          )
        }
        {
          canComment && (
            <Link
              to="/landlord/review" target="_blank"
              className="mt-auto mb-1 mr-2 letter-button-light border-b border-black hover:border-Neutral-30"
            >
              前往評價
              <img src={rightIcon_black} alt="rightIcon" />
            </Link>
          )
        }
      </div>
    </li>
  );
}