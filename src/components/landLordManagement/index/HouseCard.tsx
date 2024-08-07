import { useState } from 'react';
// 轉換承租時間
import moment from 'moment-timezone';
// 快速變更承租 Modal
import QuickCheckModal from '../modals/QuickCheckModal';
import { useNavigate } from 'react-router-dom';
import { apiHouseLandlordSingleInfo } from '../../../apis/apis';
import BigLoading from '../../loading/BigLoading';

export default function HouseCard({data, houseStatus}: {data:any, houseStatus:string}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { houseId, name, photo, status, reservationCount, userName, leaseStartTime, leaseEndTime, canComment} = data;

  // 控制 快速變更承租 Modal-popup 的開關
  const [openModal, setOpenModal] = useState(false);

  const buttonMessage = () => {
    if (houseStatus === "addingList") { // 新增中
      return "繼續編輯"; 
    } else if (houseStatus === "publishList") { // 刊登中
      return "立即更改:已出租"; 
    } else if (houseStatus === "rentedList") { // 已承租
      return "建立合約"; 
    } else if (houseStatus === "finishedList") { // 已完成
      return "前往評價";
    }
  };

  const houseMessage = () => {
    if (houseStatus === "publishList") { // 刊登中
      if ( status === "申請預約看房" ){
        return (
          <div className="mb-6 text-sans-body1">
            <span className="pr-2">{status}</span>
            <span className="pl-2 border-l border-Tenant-70">{reservationCount || 0} 人</span>
          </div>
        ); 
      }else if ( status === "租約邀請已送出" ){
        return (
          <div className="mb-6 text-sans-body1">
            <span className="pr-2 text-Brand-40">{status}</span>
            <span className="pl-2 border-l border-Tenant-70">{userName}</span>
          </div>
        ); 
      }else if ( status === "租約邀請已拒絕" ){
        return (
          <div className="mb-6 text-sans-body1">
            <span className="pr-2 text-Alert-50">{status}</span>
            <span className="pl-2 border-l border-Tenant-70">{userName}</span>
          </div>
        ); 

      }
    } else if (houseStatus === "rentedList") { // 已出租
      return (
        <div className="mb-6 text-sans-body1">
          <span className="pr-2">{moment(leaseStartTime).tz('Asia/Taipei').format('YYYY年M月D日')}</span>
          <span className="pl-2 border-l border-Tenant-70">{moment(leaseEndTime).tz('Asia/Taipei').format('YYYY年M月D日')}</span>
        </div>
      ); 
    } else if (houseStatus === "finishedList") { // 已完成
      return (
        <div className="mb-6 text-sans-body1 text-Neutral-40">
          {canComment && status === "系統用戶" && "請於合約結束後兩週內進行評價"}
          {!canComment && status === "系統用戶" && "評價已結束"}
          {!canComment && status === "非系統用戶" && "承租人非系統用戶，無法評價"}
          {!canComment && status === "強制變更" && "強制變更已完成，無法評價"}
        </div>
      ); 
    } else { // 新增中
      return (
        <div className="py-6"></div>
      ); 
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if ( houseStatus === "publishList" ) {
      event.stopPropagation();
      localStorage.setItem("houseId", houseId);
      setOpenModal(true);
    } else if ( houseStatus === "rentedList" ) {
      event.stopPropagation();
      navigate(`/landlord/rented/${houseId}`,{
        state: {
          openOffcanvas: true
        }
      });
    } else if ( houseStatus === "finishedList" ) {
      event.stopPropagation();
      window.open("/landlord/review","_blank")
    }
  }

  const handleCardClick = async () => {
    setLoading(true);
    if ( houseStatus === "addingList" ) {
      try {
        const response = await apiHouseLandlordSingleInfo(houseId);
        navigate("/landlord/post",{
          state: {
            houseId,
            page: response.data.message.split(" ")[1],
            data: response.data.data
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else if ( houseStatus === "publishList" ) {
      localStorage.setItem("houseId", houseId);
      navigate(`/landlord/publish/${houseId}`);
    } else if ( houseStatus === "rentedList" ) {
      navigate(`/landlord/rented/${houseId}`);
    } else if ( houseStatus === "finishedList" ) {
      navigate(`/landlord/finished/${houseId}`);
    }
    setLoading(false);
  }

  return (
    <>
      {
        loading && <BigLoading />
      }
      <li
        data-house-id={houseId}
        className="cursor-pointer col-span-3 p-4 rounded-[20px] bg-white hover:bg-Landlord-95"
        onClick={handleCardClick}
      >
        <div className="overflow-hidden rounded-2xl mb-4 h-48">
          {
            photo ? (
              <img
                src={ photo }
                alt="房源照片"
                className="object-cover h-full w-full"
              />
            ): // 新增中未填至照片則為空
            (
              <div className="bg-Neutral-95 h-full w-full"/>
            )
          }
        </div>
        <h5 className="text-sans-b-h6 mb-2">{name}</h5>
        {houseMessage()}
        <button
          className="w-full text-center outline-button-s"
          onClick={handleButtonClick}
          disabled={ (houseStatus === "publishList" && status === "租約邀請已送出") || (houseStatus === "finishedList" && (status === "非系統用戶" || status === "強制變更"))}
        >
          {buttonMessage()}
        </button>
        {/* 點擊立即更改跳出的 Model pop-up */}
        <QuickCheckModal openModal={openModal} setOpenModal={setOpenModal} />
      </li>
    </>
  );
}