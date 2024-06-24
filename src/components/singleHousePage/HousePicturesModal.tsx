// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./housePictureModal.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import CloseIcon from "../../components/signUp/imgUpload/CloseIcon";
import { useState } from "react";

interface ModalProps {
  closeModal: () => void;
  housePicturesData: string[];
}

function HousePicturesModal({ closeModal, housePicturesData }: ModalProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className="relative z-[60] hidden md:block">
      {/* Modal 打開時的背景模糊效果 */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center px-40 pt-5">
          <div className="relative w-[40%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-white text-left shadow-xl transition-all">
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
            <div className="p-10">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="housePicturesModalSwiper"
              >
                {housePicturesData.map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="w-[500px]">
                      <img src={item} className="object-cover h-[500px]" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {housePicturesData.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HousePicturesModal;
