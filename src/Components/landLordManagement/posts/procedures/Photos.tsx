import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProcedureContext } from "../../../../pages/landlordManagement/AddNew";
import deleteImg from "../../../../assets/imgs/icons/deleteImg.svg"

function UploadPhoto({photo, index}) {
  return (
    <li className="col-span-3 flex flex-col gap-3">
      <img src={photo} className="rounded-xl" alt={`房源照片-${index+1}`} />
      <div className="flex justify-between">
        <button type="button" className="text-sans-b-body1 px-4 py-1 rounded-3xl border border-Neutral-50 hover:border-2 hover:-m-[1px]">設為首圖</button>
        <button type="button">
          <img src={deleteImg} alt="delete-img" />
        </button>
      </div>
    </li>
  );
}

export default function Photos() {
  const [image, setImage] = useState([]);
  const [previews, setPreview] = useState([]);

  const { handleSubmit } = useForm();
  const { handleProcedureClick, handleProcedureDone } =
    useContext(ProcedureContext);

  const uploadImage = async () => {
    const picArray = [];
    // 將圖片陣列逐一上傳
    image.forEach(async (image) =>{
      // console.log(image);
      const data = new FormData();
      data.append("file", image);
      // 選擇上傳圖片的位置(cloudinary upload_preset 的 name)，其設在環境變數中
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      // 選擇上傳圖片的帳號，其設在環境變數中
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      data.append("folder", "Howoh house photos");
      try {
        // 上傳data，打 Cloudinary API，上傳到自己的 Cloudinary 帳號
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        picArray.push(res.url); // 將上傳的圖片的 url 保存起來，可以將成功上傳的照片顯示在畫面上
      } catch (error) {
        alert("圖片上傳失敗,請重新上傳");
      }
    })
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const selectedImages = Array.from(files);
    setImage(selectedImages);

    const imagePreviews = selectedImages.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        // 檔案成功讀取到時，先將檔案放到 preview 中，以便預覽
        reader.onload = () => {
          resolve(reader.result);
        };
      })
    })
    Promise.all(imagePreviews).then((previews) => {
      setPreview(previews);
    })
  };

  const onSubmit = async () => {
    try {
      await uploadImage();
      handleProcedureDone(1);
      handleProcedureClick("設備設施");
    } catch (error) {
      alert("圖片上傳失敗,請重新上傳");
    }
  };

  return (
    <div className="p-5">
      <h3 className="add-new-title">照片</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex items-center justify-center w-full mb-8">
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
        </section>
        <section>
          <h4 className="text-sans-b-h6 mb-6">上傳照片</h4>
          <ul className="layout-grid gap-6 mb-6">
            {previews && previews.map((preview, index) => (
              <UploadPhoto key={index} photo={preview} index={index} />
            ))}
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
            className="filled-button-m pl-3 flex items-center"
            disabled={ previews.length === 0 }
          >
            <span>下一步</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </form>
    </div>
  );
}
