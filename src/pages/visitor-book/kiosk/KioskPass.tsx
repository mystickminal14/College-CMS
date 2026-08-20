import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CheckCircle2, ScanLine, UserRound, WifiOff } from "lucide-react";

import lbefLogo from "../../../assets/lbef_five.webp";
import { IMAGE_URL } from "../../../constants";
import type { VisitorPass } from "../model/VisitorModel";
import { buildPassQrText } from "../utils/passPayload";
import { KioskActions } from "./KioskFrame";
import { primaryButtonClass } from "./tokens";

interface Props {
  pass: VisitorPass;
  qrToken: string;
  department: string | null;
  photoPreview: string;
  onDone: () => void;
}

const formatTime = (value: string | null) =>
  value ? new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--";

const KioskPass: React.FC<Props> = ({ pass, qrToken, department, photoPreview, onDone }) => {
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    // Level L keeps this multi-line payload down to QR version 9-11. Rendered
    // at 576px for hidpi crispness but displayed at 224 CSS px, which leaves
    // ~3.7px per module — comfortably above what a phone camera needs.
    QRCode.toDataURL(buildPassQrText(qrToken, pass, department), {
      width: 576,
      margin: 1,
      errorCorrectionLevel: "L",
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [qrToken, pass, department]);

  const photoSrc = photoPreview || (pass.photo ? `${IMAGE_URL}${pass.photo}` : "");
  const firstName = pass.name.split(" ")[0];

  const rows: [string, string][] = [
    ["Purpose", pass.purpose],
    ...(pass.personToMeet ? ([["Meeting", pass.personToMeet]] as [string, string][]) : []),
    ...(department ? ([["Department", department]] as [string, string][]) : []),
    ["Group size", String(pass.numberOfPerson)],
    ["Checked in", formatTime(pass.inTime)],
  ];

  return (
    <div>
      <header className="mb-7">
        <span className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
          You're all set, {firstName}.
        </h1>
        <p className="text-base text-gray-600 mt-2 max-w-xl">
          Show this pass at the reception desk. Scan the code to keep a copy on your phone.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="w-full max-w-sm shrink-0 rounded-2xl border border-gray-200 shadow-md overflow-hidden bg-white">
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
            <img src={lbefLogo} alt="LBEF College" className="h-10 w-auto object-contain" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-3 py-1">
              Visitor
            </span>
          </div>

          <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt=""
                className="w-16 h-16 rounded-full object-cover shrink-0 border border-gray-200"
              />
            ) : (
              <span className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <UserRound className="w-8 h-8 text-gray-400" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-lg font-bold text-gray-900 truncate">{pass.name}</p>
              <p className="text-xl font-bold text-blue-600 tabular-nums tracking-wide">
                {pass.code}
              </p>
            </div>
          </div>

          <div className="px-5 py-5 flex justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Visitor pass QR code" className="w-56 h-56" />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-[15px] text-gray-400">
                Generating code
              </div>
            )}
          </div>

          <dl className="px-5 pb-5 pt-4 space-y-2 text-[15px] border-t border-gray-100">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-gray-500 shrink-0">{label}</dt>
                <dd className="font-semibold text-gray-900 text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="space-y-5 max-w-sm">
          <li className="flex gap-3.5">
            <ScanLine className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[15px] text-gray-900">
              Point your phone camera at the code to save your pass.
              <span className="block text-gray-500 mt-0.5">
                Reception can also look you up by {pass.code}.
              </span>
            </p>
          </li>
          <li className="flex gap-3.5">
            <WifiOff className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[15px] text-gray-900">
              The code carries your details.
              <span className="block text-gray-500 mt-0.5">
                It still opens without an internet connection.
              </span>
            </p>
          </li>
        </ul>
      </div>

      <KioskActions>
        <button type="button" onClick={onDone} className={`${primaryButtonClass} ml-auto`}>
          Done
        </button>
      </KioskActions>
    </div>
  );
};

export default KioskPass;
