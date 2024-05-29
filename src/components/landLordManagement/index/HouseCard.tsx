import { useState } from 'react';
// 轉換承租時間
import moment from 'moment-timezone';
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import Close from "../../../assets/imgs/icons/close.svg";

export default function HouseCard({data, houseStatus}: {data:any, houseStatus:string}) {
  const { houseId, name, photo, status, reservationCount, userName, leaseStartTime, leaseEndTime} = data;
  console.log(houseId, houseStatus);

  // 控制 Model-popup 的開關
  const [openModal, setOpenModal] = useState(false);
  const [isPhoneFocused,setIsPhoneFocused] = useState(false)

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
            <h3 className="text-sans-h5">
              立即更改：已承租
            </h3>
            <img
              src={Close} alt="close"
              className="ml-auto cursor-pointer"
              onClick={() => setOpenModal(false)} 
            />
          </div>
          <p className="mb-8 text-sans-body1">請填入承租資訊及合約起迄時間。</p>
          <form>
            <div className="mb-5">
              <div
                tabIndex={0}
                className={`relative flex w-full p-3 rounded ${
                  isPhoneFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              >
                <input
                  type="tel"
                  id="tenantPhone"
                  className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  placeholder=""
                  maxLength={10}
                />
                <label
                  htmlFor="tenantPhone"
                  className="absolute text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  承租人手機
                </label>
              </div>
            </div>
            <div className="mb-6 flex gap-6 items-center">
              
              <div className="flex-1 relative">
                <label htmlFor="startTime" className="text-sans-caption px-0.5 bg-white absolute -top-2 left-3">合約起始日</label>
                <input type="date" name="startTime" id="startTime" className="w-full p-3 rounded border-black"/>
              </div>
              至
              
              <div className="flex-1 relative">
                <label htmlFor="endTime" className="text-sans-caption px-0.5 bg-white absolute -top-2 left-3">合約結束日</label>
                <input type="date" name="endTime" id="endTime" className="w-full p-3 rounded border-black"/>
              </div>
            </div>
            <div className="mb-10 flex gap-2 text-sans-body1">
              <p>沒有承租資訊嗎？</p>
              <button className="underline underline-offset-2">強制更改為已完成</button>
            </div>
          </form>
          <div className="flex justify-end gap-6">
            <button className="outline-button-m" onClick={() => setOpenModal(false)}>
              取消
            </button>
            <button className="filled-button-m" onClick={() => setOpenModal(false)}>
              立即更改
            </button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </li>
  );
}