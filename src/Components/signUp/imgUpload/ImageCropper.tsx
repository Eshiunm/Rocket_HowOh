import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1; // 裁減比例1:1
const MIN_DIMENSION = 150; // 裁減的最小長寬為 150px * 150px

function ImageCropper({ setAvatarUrl, closeModal }) {
  // 處理圖片上傳的相關 Hooks
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  // 處理檔案上傳
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 取得選擇的文件（只取第一個文件）
    if (!file) return;

    const reader = new FileReader(); // FileReader 是一個內建的 JavaScript 物件，用於讀取文件內容（例如從 <input type="file"> 選擇的文件）
    reader.addEventListener("load", () => {
      // 當 FileReader 完成文件讀取後，會觸發此 load 事件，這裡面的內容
      const imageElement = new Image(); // 創建一個新的 HTML Image DOM 元素
      const imageUrl = reader.result?.toString() || ""; // reader.result 是將檔案內容經過 64Base 編碼後的字串
      imageElement.src = imageUrl; // 將圖片的 URL 賦值給 Image DOM src 屬性
      imageElement.addEventListener("load", e => {
        // 圖片加載完成後觸發 callback
        if (error) setError(""); // 如果舊訊息存在就清空
        // 取得圖片的自然寬度和高度
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          // 如果圖片尺寸小於設定大小，設置錯誤信息並清空圖片來源狀態
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl); // 將讀取到的圖片 URL 設置到 imgSrc 狀態
    });

    // 以 Data URL 的格式讀取文件內容，當讀取完內容後會觸發上面的 load 監聽事件
    reader.readAsDataURL(file);
  };

  const onImageLoad = e => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label htmlFor="file_input" className="block mb-3 w-fit ml-[40%]">
        <input
          id="file_input"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-[85%] text-sm text-slate-500 rounded-full file:rounded-full cursor-pointer  hover:fill:bg-white"
        ></input>
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-x-6">
            <ReactCrop
              crop={crop}
              onChange={percentCrop => setCrop(percentCrop)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            {crop && (
              <canvas
                ref={previewCanvasRef}
                className="w-[150px] h-[150px] rounded-full border"
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <button
              className="text-white text-sans-h6 py-2 px-4 rounded-2xl mt-4 bg-black hover:opacity-70"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(
                    crop,
                    imgRef.current?.width,
                    imgRef.current?.height
                  )
                );
              }}
            >
              預覽
            </button>
            <button
              className="text-white text-sans-h6 py-2 px-4 rounded-2xl mt-4 bg-black hover:opacity-70"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(
                    crop,
                    imgRef.current?.width,
                    imgRef.current?.height
                  )
                );
                const dataUrl = previewCanvasRef.current?.toDataURL();
                setAvatarUrl(dataUrl);
                closeModal();
              }}
            >
              儲存
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageCropper;
