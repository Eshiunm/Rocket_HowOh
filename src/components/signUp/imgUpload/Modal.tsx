import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";
import "react-image-crop/dist/ReactCrop.css";

interface ModalProps {
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
}

function Modal({ setAvatarUrl, closeModal }:ModalProps) {
  return (
    <div
      className="relative z-[60]"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal 打開時的背景模糊效果 */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-16">
          <div className="relative w-[90%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-white text-left shadow-xl transition-all">
            <div className="px-5 py-2">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center hover:bg-gray-700 focus:outline-none absolute top-4 right-4"
                onClick={closeModal}
              >
                <span className="text-2xl">
                  <CloseIcon />
                </span>
              </button>
            </div>
            <ImageCropper setAvatarUrl={setAvatarUrl} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
