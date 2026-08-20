import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Camera, Check, Loader2, RotateCcw, SkipForward } from "lucide-react";

import { useUploadKioskPhoto } from "../hooks/useKiosk";
import { KioskActions } from "./KioskFrame";
import { ghostButtonClass, primaryButtonClass } from "./tokens";
import { Alert, StepHeading } from "./ui";

interface Props {
  qrToken: string;
  /** Called once the step is over, whether a photo was saved or skipped. */
  onDone: () => void;
}

type CameraState = "starting" | "live" | "denied" | "unavailable";

const startCamera = (video: HTMLVideoElement | null) =>
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
    audio: false,
  }).then((stream) => {
    if (video) video.srcObject = stream;
    return stream;
  });

/**
 * A tablet-facing camera step. Runs entirely client-side (getUserMedia + a
 * canvas still) and only touches the network once the visitor confirms a
 * shot — the backend upload is write-once per qrToken, so nothing here
 * retries silently. Camera access is optional: a visitor who denies it, or a
 * kiosk with no camera, can still get a pass with no photo on it.
 */
const KioskPhoto: React.FC<Props> = ({ qrToken, onDone }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>(() =>
    navigator.mediaDevices ? "starting" : "unavailable",
  );
  const [captured, setCaptured] = useState<string | null>(null);
  const [error, setError] = useState("");

  const uploadMutation = useUploadKioskPhoto();

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const openCamera = () => {
    setCameraState("starting");
    startCamera(videoRef.current)
      .then((stream) => {
        streamRef.current = stream;
        setCameraState("live");
      })
      .catch((err: DOMException) => {
        setCameraState(err.name === "NotFoundError" ? "unavailable" : "denied");
      });
  };

  useEffect(() => {
    if (cameraState !== "starting") return;
    openCamera();
    return stopStream;
    // Runs once on mount only — retake() re-opens the camera explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The live preview is mirrored (selfie-style) for the visitor, so the
    // still is flipped back to match what they saw on screen.
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    setCaptured(canvas.toDataURL("image/jpeg", 0.9));
    stopStream();
  };

  const retake = () => {
    setCaptured(null);
    setError("");
    openCamera();
  };

  const handleUsePhoto = async () => {
    if (!captured) return;
    setError("");

    const blob = await fetch(captured).then((res) => res.blob());
    const formData = new FormData();
    formData.append("attachment", blob, "visitor.jpg");

    uploadMutation.mutate(
      { qrToken, formData },
      {
        onSuccess: () => onDone(),
        onError: (err) =>
          setError(err.errors?.[0]?.message || err.message || "Could not save the photo. Please try again."),
      },
    );
  };

  const cameraBroken = cameraState === "denied" || cameraState === "unavailable";

  return (
    <div>
      <StepHeading
        eyebrow="Almost there"
        title="Say cheese"
        hint="A quick photo goes on your pass so you are easy to recognise on the way in. Skip it if you'd rather not — your pass works either way."
      />

      {error && <Alert className="mb-6 max-w-md">{error}</Alert>}

      {/* The viewfinder is the only dark object on the screen, so it gets a
          soft blue halo rather than a hard border — at tablet distance that
          reads as "look here" without boxing the visitor's face in. */}
      <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-900 overflow-hidden ring-1 ring-slate-900/10 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_56px_-20px_rgba(18,93,170,0.45)]">
        {captured ? (
          <img src={captured} alt="Your captured photo" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover -scale-x-100 ${cameraState === "live" ? "" : "hidden"}`}
          />
        )}

        {/* Corner brackets, the way a camera app frames a subject. Purely
            decorative — nothing is cropped to them. */}
        {cameraState === "live" && !captured && (
          <div aria-hidden="true" className="pointer-events-none absolute left-5 right-5 top-5 bottom-30">
            <span className="absolute top-0 left-0 w-9 h-9 rounded-tl-xl border-t-3 border-l-3 border-white/60" />
            <span className="absolute top-0 right-0 w-9 h-9 rounded-tr-xl border-t-3 border-r-3 border-white/60" />
            <span className="absolute bottom-0 left-0 w-9 h-9 rounded-bl-xl border-b-3 border-l-3 border-white/60" />
            <span className="absolute bottom-0 right-0 w-9 h-9 rounded-br-xl border-b-3 border-r-3 border-white/60" />
          </div>
        )}

        {captured && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            <Check className="w-3.5 h-3.5" strokeWidth={3} /> Captured
          </span>
        )}

        {cameraState === "starting" && !captured && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-base">Starting camera</p>
          </div>
        )}

        {cameraBroken && !captured && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8 text-white/90">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <p className="text-base font-medium">
              {cameraState === "denied" ? "Camera access was blocked." : "No camera was found."}
            </p>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              No problem — skip this step and your pass will be issued without a photo.
            </p>
          </div>
        )}

        {cameraState === "live" && !captured && (
          <button
            type="button"
            onClick={capture}
            aria-label="Take photo"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white/95 ring-4 ring-white/30 hover:bg-white hover:ring-white/50 flex items-center justify-center shadow-xl active:scale-95 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
          >
            <Camera className="w-8 h-8 text-slate-900" />
          </button>
        )}
      </div>

      <KioskActions>
        {captured ? (
          <>
            <button
              type="button"
              onClick={retake}
              disabled={uploadMutation.isPending}
              className={`${ghostButtonClass} max-sm:flex-1`}
            >
              <RotateCcw className="w-5 h-5" /> Retake
            </button>
            <button
              type="button"
              onClick={handleUsePhoto}
              disabled={uploadMutation.isPending}
              className={`${primaryButtonClass} ml-auto max-sm:flex-1 max-sm:ml-0`}
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving
                </>
              ) : (
                "Use this photo"
              )}
            </button>
          </>
        ) : (
          <>
            <p className="hidden sm:block text-sm text-slate-500">
              Nothing is sent until you tap “Use this photo”.
            </p>
            <button
              type="button"
              onClick={onDone}
              className={`${ghostButtonClass} ml-auto max-sm:w-full`}
            >
              <SkipForward className="w-5 h-5" /> Skip the photo
            </button>
          </>
        )}
      </KioskActions>
    </div>
  );
};

export default KioskPhoto;
