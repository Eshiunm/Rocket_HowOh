import { PixelCrop } from "react-image-crop";

const setCanvasPreview = (
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: PixelCrop
) => {
  const ctx = canvas?.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image!.naturalWidth / image!.width || 1;
  const scaleY = image!.naturalHeight / image!.height || 1;

  if (!canvas) {
    throw new Error("Canvas is null");
  }
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  if (!image) {
    throw new Error("Image is null");
  }
  ctx.drawImage(
    image,
    0,
    0,
    image?.naturalWidth,
    image?.naturalHeight,
    0,
    0,
    image?.naturalWidth,
    image?.naturalHeight
  );

  ctx.restore();
};
export default setCanvasPreview;
