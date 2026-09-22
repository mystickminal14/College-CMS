import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CheckCircle2, MessageSquareText } from "lucide-react";

import type { VisitorPass } from "../model/VisitorModel";
import { buildPassQrText } from "../utils/passPayload";
import { formatVisitorTime } from "../utils/visitorTime";
import { KioskActions } from "./KioskFrame";
import { primaryButtonClass } from "./tokens";

interface Props {
  pass: VisitorPass;
  qrToken: string;
  /** The API texted the pass link on registration. */
  smsSent: boolean;
  onDone: () => void;
}


const KioskPass: React.FC<Props> = ({ pass, qrToken, smsSent, onDone }) => {
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    // Level L keeps this multi-line payload down to QR version 9-11. Rendered
    // at 640px for hidpi crispness but displayed around 350 CSS px, which
    // leaves ~6px per module — well above what a phone camera needs.
    //
    // margin: 2 bakes the quiet zone into the image itself, so the only white
    // around the code is the white the scanner needs. Nothing pads it further.
    QRCode.toDataURL(buildPassQrText(qrToken, pass), {
      width: 640,
      margin: 2,
      errorCorrectionLevel: "L",
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [qrToken, pass]);

  const firstName = pass.name.split(" ")[0];

  const meta = [
    pass.personToMeet ? `Meeting ${pass.personToMeet}` : null,
    pass.numberOfPerson > 1 ? `Group of ${pass.numberOfPerson}` : null,
    formatVisitorTime(pass.inTime),
  ].filter(Boolean) as string[];

  return (
    // The pass is one object — the code — so the step is a single centred
    // column rather than a full-width heading with a small card adrift under
    // it. Everything here is either the QR or a caption for it.
    <div className="mx-auto w-full max-w-xs sm:max-w-sm">
      <header className="mb-5 text-center">
        <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
          <CheckCircle2 className="w-4 h-4" />
          Checked in
        </p>
        <h1 className="mt-2 text-2xl sm:text-[1.75rem] font-bold tracking-[-0.02em] text-slate-900 leading-[1.15] text-balance">
          You're all set, {firstName}.
        </h1>
      </header>

      <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-24px_rgba(15,23,42,0.3)]">
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="Visitor pass QR code" className="block w-full h-auto" />
        ) : (
          <div className="aspect-square flex items-center justify-center text-[15px] text-slate-400">
            Generating code
          </div>
        )}
      </div>

      {/* Captions sit on the ground, not inside the card, so the white
          rectangle is the scannable area and nothing else. */}
      <p className="mt-4 text-center text-3xl font-extrabold tracking-[0.1em] tabular-nums text-[#125DAA]">
        {pass.code}
      </p>
      <p className="mt-2 text-center text-sm text-slate-500 leading-snug">
        {pass.name} · {meta.join(" · ")}
      </p>

      {/* Only shown when the gateway actually took the message — promising a
          text that never arrives is worse than saying nothing, and the QR
          above already works on its own. */}
      {smsSent && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-500">
          <MessageSquareText className="w-4 h-4 shrink-0 text-emerald-600" />
          We've texted your pass code and the guest WiFi login to your phone.
        </p>
      )}

      <KioskActions>
        <p className="hidden sm:block text-sm text-slate-500">
          Scan the code to keep a copy, or show this screen on your way in.
        </p>
        <button
          type="button"
          onClick={onDone}
          className={`${primaryButtonClass} ml-auto max-sm:w-full`}
        >
          Done
        </button>
      </KioskActions>
    </div>
  );
};

export default KioskPass;
