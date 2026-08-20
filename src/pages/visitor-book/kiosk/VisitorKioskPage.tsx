import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, TimerReset } from "lucide-react";

import { useKioskRegister } from "../hooks/useKiosk";
import useGetVisitorPass from "../hooks/useGetVisitorPass";
import KioskFrame, { type KioskStep } from "./KioskFrame";
import KioskPass from "./KioskPass";
import KioskPhoto from "./KioskPhoto";
import KioskForm, { type KioskFormValues } from "./KioskForm";
import { textItem } from "../../../website/comp/animation";
import { useIdleReset } from "./useIdleReset";
import { ghostButtonClass, primaryButtonClass } from "./tokens";
import { Alert } from "./ui";

type Step = "form" | "photo" | "pass";

const STEP_INDEX: Record<Step, number> = { form: 0, photo: 1, pass: 2 };

// A visitor filling in the form gets longest; deciding whether to take a
// photo is a quick yes/no; admiring the finished pass only needs time to
// photograph the QR code.
const IDLE_FORM_MS = 120_000;
const IDLE_PHOTO_MS = 45_000;
const IDLE_PASS_MS = 60_000;
const IDLE_WARN_MS = 20_000;

const VisitorKioskPage = () => {
  const [step, setStep] = useState<Step>("form");
  const [formDirty, setFormDirty] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState("");

  const registerMutation = useKioskRegister();

  // Fetched only once the visitor reaches the pass step. Public endpoint —
  // no token needed.
  const { data: passData } = useGetVisitorPass(step === "pass" ? qrToken ?? undefined : undefined);
  const pass = passData?.data;

  const reset = () => {
    setFormDirty(false);
    setVisitorName("");
    setQrToken(null);
    setRegisterError("");
    setStep("form");
  };

  const hasEnteredAnything = formDirty || step !== "form";

  const idleTimeoutMs =
    step === "pass" ? IDLE_PASS_MS : step === "photo" ? IDLE_PHOTO_MS : IDLE_FORM_MS;

  const secondsLeft = useIdleReset({
    enabled: hasEnteredAnything,
    timeoutMs: idleTimeoutMs,
    warnMs: IDLE_WARN_MS,
    onReset: reset,
  });

  const handleSubmit = (values: KioskFormValues) => {
    setRegisterError("");
    registerMutation.mutate(values, {
      onSuccess: (res) => {
        if (!res.data?.qrToken) return;
        setVisitorName(values.name);
        setQrToken(res.data.qrToken);
        setStep("photo");
      },
      onError: (err) =>
        setRegisterError(
          err.errors?.[0]?.message || err.message || "Could not register. Please try again.",
        ),
    });
  };

  const isFinished = step === "pass";

  const steps: KioskStep[] = [
    { label: "Your details", answer: visitorName || null },
    { label: "Photo" },
    { label: "Your pass" },
  ];

  return (
    <>
      <KioskFrame steps={steps} activeIndex={STEP_INDEX[step]} finished={isFinished}>
        <motion.div key={step} variants={textItem} initial="hidden" animate="visible">
          {step === "form" && (
            <>
              {registerError && <Alert className="mb-6 max-w-2xl">{registerError}</Alert>}
              <KioskForm
                isSubmitting={registerMutation.isPending}
                onDirty={() => setFormDirty(true)}
                onSubmit={handleSubmit}
              />
            </>
          )}

          {step === "photo" && qrToken && (
            <KioskPhoto qrToken={qrToken} onDone={() => setStep("pass")} />
          )}

          {step === "pass" &&
            (pass ? (
              <KioskPass pass={pass} qrToken={qrToken ?? ""} onDone={reset} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3.5 py-24 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#125DAA]" />
                <p className="text-base font-medium">Preparing your pass</p>
              </div>
            ))}
        </motion.div>
      </KioskFrame>

      {secondsLeft !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="kiosk-idle-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-5"
        >
          <div className="bg-white rounded-3xl ring-1 ring-slate-900/5 shadow-[0_32px_80px_-24px_rgba(2,6,23,0.6)] max-w-md w-full p-7 sm:p-8 text-center">
            <span className="relative w-16 h-16 rounded-2xl bg-[#125DAA]/10 flex items-center justify-center mx-auto">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-[#125DAA]/10 animate-ping"
              />
              <TimerReset className="relative w-8 h-8 text-[#125DAA]" />
            </span>
            <h2 id="kiosk-idle-title" className="text-2xl font-bold mt-5 text-slate-900">
              Still there?
            </h2>
            <p className="text-[15px] text-slate-500 mt-2.5 leading-relaxed">
              This screen clears in{" "}
              <span className="font-bold text-slate-900 tabular-nums">{secondsLeft}</span> seconds so
              the next visitor cannot see your details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button type="button" onClick={reset} className={`${ghostButtonClass} flex-1`}>
                Start over
              </button>
              {/* No handler needed — any tap or key press anywhere resets the
                  idle timer and closes this, so the button just gives the
                  visitor something obvious to press. */}
              <button type="button" className={`${primaryButtonClass} flex-1 min-w-0`}>
                Keep going
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisitorKioskPage;
