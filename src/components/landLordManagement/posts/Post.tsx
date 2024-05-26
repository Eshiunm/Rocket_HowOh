import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { procedureListType } from "../../../types/procedureList";
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
// 刪除房源處理
import { apiHouseLandlordPostDelete } from "../../../apis/apis";
import BigLoading from "../../loading/BigLoading";

export default function Post({procedure}:{procedure:procedureListType[]}) {
  // 控制 Model-popup 的開關
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePostDelete = async () => {
    setLoading(true);
    try {
      const houseId = localStorage.getItem('houseId');
      const response = await apiHouseLandlordPostDelete(houseId);
      if (response.data.Status === false) {
        throw new Error(response.data.Message);
      }
      alert("成功刪除房源，即將返回房源列表");
      navigate('/landlord');
      setOpenModal(false);
    } catch (error: any) {
      localStorage.clear();
      if (error.response.status === 401) {
        alert(`錯誤回報：401\n請洽 howoh好窩網路管理員`);
      } else {
        alert(error);
      }
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <>
      {
        loading && <BigLoading />
      }
      <div className="col-span-10 col-start-2 flex justify-between">
        <h2 className="text-sans-b-h5">新增房源</h2>
        <div className="flex gap-6">
          <Link to="/landlord" className="outline-button-m">返回房源列表</Link>
          <button
            className={`${procedure[0].isActive ? "outline-button-m-disable" : "outline-button-m"} px-4`}
            disabled={procedure[0].isActive ? true : false}
            // 在基本資訊頁面時不可點擊刪除房源
            onClick={() => setOpenModal(true)}
          >
            刪除房源
          </button>
          {/* 點擊刪除房源跳出的 Model pop-up */}
          <Modal className="z-30" show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
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
                <button className="outline-button-m" onClick={handlePostDelete}>
                  確認刪除
                </button>
                <button className="filled-button-m" onClick={() => setOpenModal(false)}>
                  返回
                </button>
              </div>
            </Modal.Body>
          </Modal>    
        </div>
      </div>
    </>
  );
}