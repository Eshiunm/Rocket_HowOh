// Import Swiper React components
// import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./housePictureModal.css";
// import required modules
//import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import CloseIcon from "../signUp/imgUpload/CloseIcon";
// import { useState } from "react";
// import singleHousePage_MainPicture from "../../assets/imgs/SingleHousePage/singleHousePage_MainPicture.jpg";
 import singleHousePage_secondaryPicture1 from "../../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture1.jpg";
// import singleHousePage_secondaryPicture2 from "../../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture2.jpg";
// import singleHousePage_secondaryPicture3 from "../../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture3.jpg";
// import singleHousePage_secondaryPicture4 from "../../assets/imgs/SingleHousePage/singleHousePage_secondaryPicture4.jpg";

interface ModalProps {
  closeModal: () => void;
}

function HousePicturesModal({ closeModal }: ModalProps) {
  //const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className="relative z-[60]">
      {/* Modal 打開時的背景模糊效果 */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center px-40 pt-5">
          <div className="relative w-[40%] sm:w-[80%] min-h-[0vh] rounded-2xl bg-white text-left shadow-xl transition-all">
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
            <div className="p-10 flex justify-center">
              <ul className="flex flex-wrap gap-6 w-[50%] justify-center">
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
                <li>
                  <img
                    src={singleHousePage_secondaryPicture1}
                    alt="singleHousePage_secondaryPicture1"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HousePicturesModal;
