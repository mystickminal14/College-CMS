import React, { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Loader2 } from "lucide-react";

interface Props {
  src: string;
  fileName: string;
  // Exact size of the saved image, in pixels.
  width: number;
  height: number;
  onCancel: () => void;
  onDone: (file: File) => void;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read the image"));
    img.src = src;
  });

const cropToFile = async (src: string, area: Area, fileName: string, width: number, height: number): Promise<File> => {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.92));
  if (!blob) throw new Error("Could not crop the image");
  return new File([blob], fileName.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
};

const ImageCropModal: React.FC<Props> = ({ src, fileName, width, height, onCancel, onDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), []);

  const confirm = async () => {
    if (!area) return;
    setBusy(true);
    try {
      onDone(await cropToFile(src, area, fileName, width, height));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not crop the image");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crop image</h3>
          <p className="text-sm text-gray-500">
            Drag to position and use the slider to zoom. The saved image is {width} × {height} px.
          </p>
        </div>

        <div className="relative h-80 sm:h-96 bg-gray-900">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={width / height}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onComplete}
            objectFit="contain"
          />
        </div>

        <div className="px-5 pt-4">
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="w-full"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="p-5 flex gap-3 justify-end">
          <button type="button" onClick={onCancel} disabled={busy} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 dark:text-gray-200">
            Cancel
          </button>
          <button type="button" onClick={confirm} disabled={busy || !area} className="px-6 py-2.5 rounded-xl bg-[#135EAB] text-white disabled:opacity-60 min-w-28">
            {busy ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Crop & Use"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
