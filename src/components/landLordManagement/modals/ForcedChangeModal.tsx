import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Model-popup 所需之匯入
import { Modal } from "flowbite-react";
import close from "../../../assets/imgs/icons/close.svg";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { apiHouseLandlordChangeFinish } from "../../../apis/apis";
import { ForcedChangeReload } from "../index/HouseList";

interface ForceChangeModalPropsType {
  openForceChangeModal: boolean;
  setOpenForceChangeModal: (value: boolean) => void;
  setOpenQuickCheckModal: ((value: boolean) => void) | null;
}

export default function ForcedChangeModal(props : ForceChangeModalPropsType) {
  const customTheme: CustomFlowbiteTheme = {
    modal: {
      "root": {
        "base": "z-50 backdrop-blur-md fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
        "show": {
          "on": "flex bg-black bg-opacity-20",
          "off": "hidden"
        },
        "sizes": {
          "sm": "max-w-sm",
          "md": "max-w-md",
          "lg": "max-w-lg",
          "xl": "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl"
        },
        "positions": {
          "top-left": "items-start justify-start",
          "top-center": "items-start justify-center",
          "top-right": "items-start justify-end",
          "center-left": "items-center justify-start",
          "center": "items-center justify-center",
          "center-right": "items-center justify-end",
          "bottom-right": "items-end justify-end",
          "bottom-center": "items-end justify-center",
          "bottom-left": "items-end justify-start"
        }
      },
      "content": {
        "base": "relative h-full w-full p-4 md:h-auto",
        "inner": "relative flex max-h-[90dvh] flex-col rounded-2xl bg-white shadow dark:bg-gray-700"
      },
      "body": {
        "base": "flex-1 overflow-auto p-10"
      },
      "header": {
        "base": "flex items-start justify-between rounded-t border-b",
        "popup": "border-b-0 pt-10",
        "title": "text-xl font-medium text-gray-900 dark:text-white",
        "close": {
          "base": "hidden",
          "icon": "h-10 w-10"
        }
      },
      "footer": {
        "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
        "popup": "border-t"
      }
    },
  };

  const { openForceChangeModal, setOpenForceChangeModal, setOpenQuickCheckModal } = props;
  const navigate = useNavigate();

  const { setReloadHouseList } = useContext(ForcedChangeReload);

  const forcedChangeAPI = async (houseId: string|null) => {
    try {
      await apiHouseLandlordChangeFinish(houseId);
      setOpenForceChangeModal(false);
      if (setOpenQuickCheckModal) {
        setReloadHouseList(true);
        setOpenQuickCheckModal(false);
      }
      localStorage.removeItem("houseId");
      navigate("/landlord",{
        state: {
          toastMessage: "房源狀態已更改"
        }
      });
      
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.clear();
        alert("操作失敗，請重新登入(錯誤：401)");
        navigate("/");
      } else {
        console.error("Failed to fetch data:", error);
      }
    }
  }
  
  const handleForcedChangeFinish = () => {
    const houseId = localStorage.getItem("houseId");
    forcedChangeAPI(houseId);
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
    <Modal show={openForceChangeModal} size="xl" onClose={() => setOpenForceChangeModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="flex items-center gap-3 mb-10">
          <HiOutlineExclamationCircle className="h-6 w-6 text-Alert-50" />
          <h3 className="text-sans-h5 text-Alert-50">
            更改：已完成
          </h3>
          <img
            src={close} alt="close"
            className="ml-auto cursor-pointer"
            onClick={() => setOpenForceChangeModal(false)} 
          />
        </div>
        <p className="mb-10 text-sans-body1">若強制更改為已完成，將無法與租客相互評價和下載合約。</p>
        <div className="flex justify-end gap-6">
          <button type="button" className="outline-button-m" onClick={handleForcedChangeFinish}>
            確認強制更改
          </button>
          <button type="button" className="filled-button-m" onClick={() => setOpenForceChangeModal(false)}>
            返回
          </button>
        </div>
      </Modal.Body>
    </Modal>
    </Flowbite>
  );
}