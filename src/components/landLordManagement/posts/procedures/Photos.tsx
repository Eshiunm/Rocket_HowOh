import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Toast, ToastToggle } from "flowbite-react";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import deleteImg from "../../../../assets/imgs/icons/deleteImg.svg"
import { RootState } from "../../../../../redux/store";
import { setPhotos } from "../../../../../redux/post/photosSlice";
import { apiHouseLandlordPostImg } from "../../../../apis/apis"
import BigLoading from "../../../loading/BigLoading";
import { useNavigate } from "react-router-dom";

// 定義送出照片資料的型別
export interface photosDataType {		
  "path": string,
  "isCover": boolean
}
interface UploadPhotoProps {
  photo: string;
  index: number;
}

export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos } = useSelector((store: RootState) => store.photosUpload);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState(0); 

  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } = useContext(ProcedureContext);

  // 預覽上傳圖片的卡片樣式
  function UploadPhoto({photo, index}: UploadPhotoProps) {
    return (
      <li className="col-span-3 flex flex-col gap-3">
        <img src={photo} className="rounded-xl" alt={`房源照片-${index+1}`} />
        <div className="flex justify-between">
          <button
            type="button"
            className={`text-sans-b-body1 px-4 py-1 rounded-3xl border border-Neutral-50 ${
              coverIndex === index
                ? " bg-Neutral-50 text-white"
                : "hover:border-2 hover:-m-[1px]"
              }`}
            onClick={() => setCoverIndex(index)}
            // 控制首圖所引號並設定為首圖樣式
          >
            {
              coverIndex === index ? "首圖" : "設為首圖"
            }
          </button>
          <button type="button" onClick={() => {
            // 刪除單張照片，並設定索引值
            if ( index === coverIndex ) {
              setCoverIndex(0)
            } 
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(() => newImages);
          }}>
            <img src={deleteImg} alt="delete-img" />
          </button>
        </div>
      </li>
    );
  }

  const uploadImage = async () => {
    const photosArray: photosDataType[] = [];
    // 將圖片陣列逐一上傳至指定資料夾、帳號
    const upload = images.map(async (image,index) =>{
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      data.append("folder", "Howoh house photos");

      return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, data)
      // 上傳data，打 Cloudinary API，上傳到自己的 Cloudinary 帳號
        .then((response) => {
          photosArray.push({		
            "path": response.data.url, //檔案路徑
            "isCover": coverIndex === index //是否為封面
          })
        })
        .catch((error) => {
          alert("圖片上傳失敗,請重新上傳");
          throw error;
        });

    })

    await Promise.all(upload);
    dispatch(setPhotos(photosArray));
    return photosArray; // 回傳資料後以便打 API
  };

  // 上傳圖片監聽事件 input:file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const selectedImages = Array.from(files);
    
    const imagePreviews = selectedImages.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
      })
    });
    
    Promise.all(imagePreviews).then((previews) => {
      setImages((prev)=>[...prev,...previews]);
    })
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const photosArray = await uploadImage();
      const newData = {
        "status": "完成步驟2", 
        "files": photosArray
      };
      const houseId = localStorage.getItem('houseId');
      // ALO-4
      const response =await apiHouseLandlordPostImg(newData, houseId);
      if (response.data.Status === false) {
        throw new Error(response.data.Message);
      }
      setLoading(false);
      handleProcedureDone(1);
      handleProcedureClick("設備設施");
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

  useEffect(() => {
    // 只要到這個頁面，就抓取redux內所有上傳的照片的資料，讓使用者可以接續上傳圖片
    if (photos.length > 0) {
      setImages([]);
      setCoverIndex(0);
      photos.forEach((item, index) => {
        if (item.isCover) {
          setCoverIndex(index)
        }
        setImages((prev) => [...prev, item.path]);
      })
    }
  }, [photos]);

  return (
    <>
      {
        // 上傳圖片時的 loading
        loading && <BigLoading />
      }
      <div className="p-5">
        <h3 className="add-new-title">照片</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="w-full mb-8">
            <label htmlFor="dropzone-file" className="p-20 flex flex-col items-center justify-center w-full h-64 border-2 border-Neutral-30 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="outline-button-s">瀏覽檔案</span>
                <p className="text-sans-body2 text-black text-center">最多上傳8張照片<br />支援PNG,  JPG </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/jpeg, image/png"
                multiple
                onChange={handleImageChange}
              />
            </label>
            {
              images.length < 1 && <p className="post-alert text-black">至少上傳１張照片</p>
            }
          </section>
          <section>
            <h4 className="text-sans-b-h6 mb-6">上傳照片</h4>
            <ul className="layout-grid gap-6 mb-6">
              {
                images && images.map((preview, index) => (
                  <UploadPhoto key={index} photo={preview} index={index} />
                ))
              }
            </ul>
          </section>
          <div className="col-span-12 pt-10 flex justify-between">
            <button 
              type="button"
              onClick={() => handleProcedureClick("基本資訊")}
              className="outline-button-m pr-3 flex items-center"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              <span>上一步</span>
            </button>
            <button 
              type="submit"
              className={`flex items-center pl-3 ${
                images.length < 1 || images.length > 8 ? "filled-button-m-disable" : "filled-button-m"
              }`}
              disabled={ images.length < 1 || images.length > 8 }
            >
              <span>下一步</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </form>
      </div>
      {
        images.length > 8 && (
          <Toast className="w-auto gap-2 fixed bottom-10 left-1/2 -translate-x-1/2 bg-Alert-60 rounded px-2 py-1">
            <div className="text-black text-sans-body1">最多上傳８張照片</div>
            <ToastToggle className="bg-transparent ml-0 focus:ring-0 text-black hover:bg-transparent" />
          </Toast>
        )
      }
    </>
  );
}
