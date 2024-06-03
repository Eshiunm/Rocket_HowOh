import { useState } from "react";
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import close from "../../../assets/imgs/icons/close.svg";
import alertTriangle from "../../../assets/imgs/icons/alertTriangle.svg";
import messageCloud from "../../../assets/imgs/icons/messageCloud.svg";
import smileWink from "../../../assets/imgs/icons/smileWink.svg";
import ForcedChangeModal from "./ForcedChangeModal";

interface QuickCheckModalPropsType {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export default function QuickCheckModal(props : QuickCheckModalPropsType) {
  const { openModal, setOpenModal } = props;
  const [isPhoneFocused,setIsPhoneFocused] = useState(false);
  const [openForceChangeModal, setOpenForceChangeModal] = useState(false);
  return (
    <div  onClick={(e) => e.stopPropagation()}>
      <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex items-center gap-3 mb-10">
            <h3 className="text-sans-h5">
              立即更改：已承租
            </h3>
            <img
              src={close} alt="close"
              className="ml-auto cursor-pointer"
              onClick={() => {
                localStorage.removeItem("houseId");
                setOpenModal(false)
              }} 
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
                <input type="date" name="startTime" id="startTime" className="w-full p-3 rounded border-black focus:ring-0 focus:border-Brand-30"/>
              </div>
              至
              
              <div className="flex-1 relative">
                <label htmlFor="endTime" className="text-sans-caption px-0.5 bg-white absolute -top-2 left-3">合約結束日</label>
                <input type="date" name="endTime" id="endTime" className="w-full p-3 rounded border-black focus:ring-0 focus:border-Brand-30"/>
              </div>
            </div>
            <div className="mb-6 text-sans-body2 flex flex-col gap-2 items-start">
              <p className="flex gap-2 bg-Alert-90 px-2 py-1 rounded-lg">
                <img src={alertTriangle} alt="alert_triangle" />
                請確保此用戶為您的承租客，我們將寄送租約邀請給此用戶
              </p>
              <p className="flex gap-2 bg-Brand-95 px-2 py-1 rounded-lg">
                <img src={messageCloud} alt="message_cloud" />
                當您填寫承租資訊時，您可以在合約結束後與該租客互相評價
              </p>
              <p className="flex gap-2 bg-Landlord-95 px-2 py-1 rounded-lg">
                <img src={smileWink} alt="smile_wink" />
                感謝您為友善的租屋環境付出心力，我們將在下次刊登時加強曝光
              </p>
            </div>
            <div className="mb-10 flex gap-2 text-sans-body1">
              <p>沒有承租資訊嗎？</p>
              <button
                type="button" 
                className="underline underline-offset-2"
                onClick={() => setOpenForceChangeModal(true)}
              >強制更改為已完成</button>
              {/* 點擊強制更改跳出的 Model pop-up */}
              <ForcedChangeModal openForceChangeModal={openForceChangeModal} setOpenForceChangeModal={setOpenForceChangeModal} />
            </div>
            <div className="flex justify-end gap-6">
              <button
                type="button" 
                className="outline-button-m" onClick={() => {
                  localStorage.removeItem("houseId");
                  setOpenModal(false)
                }}
              >取消</button>
              <button
                type="button" 
                className="filled-button-m" onClick={() => {
                  localStorage.removeItem("houseId");
                  setOpenModal(false)
                }}
              >立即更改</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}