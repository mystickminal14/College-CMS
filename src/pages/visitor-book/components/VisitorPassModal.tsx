import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CheckCircle2, X } from "lucide-react";

import { APP_URL } from "../../../constants";
import type { Visitor } from "../model/VisitorModel";

interface Props {
  visitor: Visitor | null;
  onClose: () => void;
}

const VisitorPassModal: React.FC<Props> = ({ visitor, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!visitor?.qrToken) {
      setQrDataUrl("");
      return;
    }

    const passUrl = `${APP_URL}/visitor-pass/${visitor.qrToken}`;
    QRCode.toDataURL(passUrl, { width: 220, margin: 1 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [visitor?.qrToken]);

  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm overflow-hidden">
        <div className="bg-green-600 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-white" />
            <h2 className="text-lg font-bold text-white">Visitor Registered</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center text-center gap-3">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{visitor.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            To meet <span className="font-medium">{visitor.personToMeet}</span>
          </p>

          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Visitor pass QR code" className="w-48 h-48" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-sm text-gray-400">
              Generating QR...
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Scan this with your phone to see your visitor pass — show it on arrival.
          </p>
        </div>

        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorPassModal;
