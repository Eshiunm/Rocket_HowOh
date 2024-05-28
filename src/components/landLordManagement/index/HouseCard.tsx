import { useState } from 'react';
// 轉換承租時間
import moment from 'moment-timezone';
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function HouseCard({data, houseStatus}: {data:any, houseStatus:string}) {
  const { houseId, name, photo, status, reservationCount, userName, leaseStartTime, leaseEndTime} = data;
  console.log(houseId, houseStatus);

  // 控制 Model-popup 的開關
  const [openModal, setOpenModal] = useState(false);

  const buttonMessage = () => {
    if (houseStatus === "addingList") { // 新增中
      return "繼續編輯"; 
    } else if (houseStatus === "publishList") { // 刊登中
      return "立即更改:已承租"; 
    } else if (houseStatus === "rentedList") { // 已承租
      return "下載合約"; 
    } else if (houseStatus === "finishedList") { // 已完成
      return "評價";
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
    } else if (houseStatus === "rentedList") { // 已承租
      return (
        <div className="mb-6 text-sans-body1">
          <span className="pr-2">{moment(leaseStartTime).tz('Asia/Taipei').format('YYYY年M月D日')}</span>
          <span className="pl-2 border-l border-Tenant-70">{moment(leaseEndTime).tz('Asia/Taipei').format('YYYY年M月D日')}</span>
        </div>
      ); 
    } else { // 新增中、已完成
      return (
        <div className="py-6"></div>
      ); 
    }
  };

  const handleButtonClick = () => {
    if ( houseStatus === "publishList" ) {
      console.log(houseId);
      setOpenModal(true)
    }
  }

  return (
    <li className="col-span-3 p-4 rounded-[20px] bg-white hover:bg-Landlord-99">
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
      >
        {buttonMessage()}
      </button>
      {/* 點擊刪除房源跳出的 Model pop-up */}
      <div className="blur">

      <Modal className="z-50 backdrop-blur-md" show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
        <Modal.Body className="p-10">
          <div className="flex items-center gap-3 mb-10">
            <HiOutlineExclamationCircle className="h-6 w-6 text-Alert-50" />
            <h3 className="text-sans-h5 text-Alert-50">
              警示
            </h3>
            <span
              className="material-symbols-outlined ml-auto cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              close
            </span>
          </div>
          <p className="mb-10 text-sans-body1">此動作不可返回，您確定要刪除房源？</p>
          <div className="flex justify-end gap-6">
            <button className="outline-button-m" onClick={() => setOpenModal(false)}>
              確認刪除
            </button>
            <button className="filled-button-m" onClick={() => setOpenModal(false)}>
              返回
            </button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </li>
  );
}