import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Loader2, RefreshCw, SkipForward } from "lucide-react";

import { KioskActions } from "./KioskFrame";
import { ghostButtonClass, primaryButtonClass } from "./tokens";
import { StepHeading } from "./ui";

interface Props {
  token: string;
  isUploading: boolean;
  onCapture: (file: File) => void;
  onSkip: () => void;
}

const CAPTURE_WIDTH = 640;

const StepPhoto: React.FC<Props> = ({ token, isUploading, onCapture, onSkip }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [isStarting, setIsStarting] = useState(true);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    setIsStarting(true);
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      // Denied permission, no camera, or a non-HTTPS origin — all recoverable
      // by skipping, so the visitor is never stuck at this step.
      setCameraError("Camera unavailable. Allow camera access for this site, or skip the photo.");
    } finally {
      setIsStarting(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, [startCamera, stopCamera]);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const scale = CAPTURE_WIDTH / video.videoWidth;
    const canvas = document.createElement("canvas");
    canvas.width = CAPTURE_WIDTH;
    canvas.height = Math.round(video.videoHeight * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        // Multer keeps the original filename verbatim, so this must be unique
        // or one visitor's photo would overwrite another's.
        const captured = new File([blob], `visitor-${token}-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setFile(captured);
        setPreview(URL.createObjectURL(blob));
        stopCamera();
      },
      "image/jpeg",
      0.85,
    );
  };

  const retake = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setFile(null);
    startCamera();
  };

  return (
    <div>
      <StepHeading
        eyebrow="Step 4 of 4"
        title="Look up for your photo"
        hint="It goes on your pass so reception can recognise you. You can skip it."
      />

      <div className="relative aspect-4/3 w-full max-w-xl rounded-xl overflow-hidden bg-gray-900 border border-gray-900">
        {preview ? (
          <img src={preview} alt="Your photo" className="w-full h-full object-cover" />
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              // Mirrored so the kiosk behaves like a mirror while framing.
              className="w-full h-full object-cover -scale-x-100"
            />
            {(isStarting || cameraError) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900/95 text-center px-8">
                {isStarting ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <>
                    <Camera className="w-9 h-9 text-blue-200" />
                    <p className="text-[15px] text-white/85 max-w-sm">{cameraError}</p>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="rounded-xl text-[15px] font-semibold text-white underline underline-offset-4"
                    >
                      Try again
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <KioskActions>
        {preview ? (
          <>
            <button
              type="button"
              onClick={retake}
              disabled={isUploading}
              className={ghostButtonClass}
            >
              <RefreshCw className="w-5 h-5" /> Retake
            </button>
            <button
              type="button"
              onClick={() => file && onCapture(file)}
              disabled={isUploading || !file}
              className={`${primaryButtonClass} ml-auto`}
            >
              {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
              Use this photo
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={onSkip} className={ghostButtonClass}>
              <SkipForward className="w-5 h-5" /> Skip
            </button>
            <button
              type="button"
              onClick={capture}
              disabled={!!cameraError || isStarting}
              className={`${primaryButtonClass} ml-auto`}
            >
              <Camera className="w-5 h-5" /> Take photo
            </button>
          </>
        )}
      </KioskActions>
    </div>
  );
};

export default StepPhoto;
