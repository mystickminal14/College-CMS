import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { IMAGE_URL } from "../../constants";
import useGetActivePopup from "../../pages/popup/hooks/useGetActivePopup";

const dismissedKey = (id: number) => `popup-dismissed-${id}`;

export default function PopupDisplay() {
  const { data } = useGetActivePopup();
  const popup = data?.data ?? null;

  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!popup) return;
    if (sessionStorage.getItem(dismissedKey(popup.id))) return;
    setVisible(true);
    setSecondsLeft(popup.closesAt ?? null);
  }, [popup]);

  useEffect(() => {
    if (!visible || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      handleClose();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => (s ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, secondsLeft]);

  if (!popup || !visible) return null;

  const handleClose = () => {
    sessionStorage.setItem(dismissedKey(popup.id), "1");
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-full max-h-full"
        style={{ width: popup.width, maxWidth: "95vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="w-full bg-gray-50"
          style={{ aspectRatio: `${popup.width} / ${popup.height}` }}
        >
          <img
            src={`${IMAGE_URL}${popup.image}`}
            alt={popup.title}
            className="w-full h-full object-contain"
          />
        </div>

        {secondsLeft !== null ? (
          <div className="px-3 py-1.5 bg-gray-50 text-xs text-gray-500 text-right">
            Closes in {secondsLeft}s
          </div>
        ) : null}
      </div>
    </div>
  );
}
