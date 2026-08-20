import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader2, TimerReset } from "lucide-react";

import { useKioskPhotoUpload, useKioskRegister } from "../hooks/useKiosk";
import useGetVisitorPass from "../hooks/useGetVisitorPass";
import KioskFrame, { type KioskStep } from "./KioskFrame";
import KioskPass from "./KioskPass";
import StepDepartment from "./StepDepartment";
import StepDetails, { type DetailsValues } from "./StepDetails";
import StepPerson from "./StepPerson";
import StepPhoto from "./StepPhoto";
import { textItem } from "../../../website/comp/animation";
import { useIdleReset } from "./useIdleReset";
import { ghostButtonClass, primaryButtonClass } from "./tokens";

type Step = "department" | "person" | "details" | "photo" | "pass";

const ORDER: Step[] = ["department", "person", "details", "photo"];

// A visitor filling in the form gets longer than one admiring their finished
// pass, who only needs time to photograph the QR code.
const IDLE_FORM_MS = 120_000;
const IDLE_PASS_MS = 60_000;
const IDLE_WARN_MS = 20_000;

const VisitorKioskPage = () => {
  const [step, setStep] = useState<Step>("department");

  // Department and person are stored as plain names, matching the columns on
  // the Visitor record. null means "not provided", which is a valid answer.
  const [department, setDepartment] = useState<string | null>(null);
  const [departmentIsOther, setDepartmentIsOther] = useState(false);
  const [person, setPerson] = useState<string | null>(null);
  const [personIsOther, setPersonIsOther] = useState(false);
  const [visitorName, setVisitorName] = useState("");

  const [qrToken, setQrToken] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoSkipped, setPhotoSkipped] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const registerMutation = useKioskRegister();
  const photoMutation = useKioskPhotoUpload();

  // Fetched only once the visitor reaches the pass step, so the response
  // already carries the uploaded photo. Public endpoint — no token needed.
  const { data: passData } = useGetVisitorPass(step === "pass" ? qrToken ?? undefined : undefined);
  const pass = passData?.data;

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const reset = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview("");
    setPhotoSkipped(false);
    setDepartment(null);
    setDepartmentIsOther(false);
    setPerson(null);
    setPersonIsOther(false);
    setVisitorName("");
    setQrToken(null);
    setRegisterError("");
    setStep("department");
  };

  const hasEnteredAnything = !!department || departmentIsOther || step !== "department";

  const secondsLeft = useIdleReset({
    enabled: hasEnteredAnything,
    timeoutMs: step === "pass" ? IDLE_PASS_MS : IDLE_FORM_MS,
    warnMs: IDLE_WARN_MS,
    onReset: reset,
  });

  const handleDetails = (values: DetailsValues) => {
    setRegisterError("");
    registerMutation.mutate(
      {
        ...values,
        department: department ?? undefined,
        personToMeet: person?.trim() || undefined,
      },
      {
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
      },
    );
  };

  const handleCapture = (file: File) => {
    if (!qrToken) return;
    setPhotoPreview(URL.createObjectURL(file));
    // Registration already succeeded, so a failed photo must not trap the
    // visitor — either outcome continues to the pass.
    photoMutation.mutate(
      { qrToken, file },
      { onSuccess: () => setStep("pass"), onError: () => setStep("pass") },
    );
  };

  const isFinished = step === "pass";
  const activeIndex = isFinished ? ORDER.length : ORDER.indexOf(step);

  const progress: KioskStep[] = [
    { label: "Department", answer: department ?? "Not sure" },
    { label: "Person", answer: person?.trim() || "Not sure" },
    { label: "Details", answer: visitorName || null },
    { label: "Photo", answer: photoSkipped ? "Skipped" : photoPreview ? "Taken" : null },
  ];

  // Answered steps stay reachable until registration, after which the visit
  // already exists on the server and there is nothing left to edit.
  const canRevisit = step === "person" || step === "details";

  return (
    <>
      <KioskFrame
        steps={progress}
        activeIndex={activeIndex}
        finished={isFinished}
        onStepClick={canRevisit ? (index) => setStep(ORDER[index]) : undefined}
      >
        <motion.div key={step} variants={textItem} initial="hidden" animate="visible">
          {step === "department" && (
            <StepDepartment
              value={department}
              isOtherSelected={departmentIsOther}
              onSelect={(dept, isOther) => {
                setDepartment(dept);
                setDepartmentIsOther(isOther);
              }}
              onNext={() => setStep("person")}
            />
          )}

          {step === "person" && (
            <StepPerson
              department={department}
              value={person}
              isOtherSelected={personIsOther}
              onSelect={(name, isOther) => {
                setPerson(name);
                setPersonIsOther(isOther);
              }}
              onBack={() => setStep("department")}
              onNext={() => setStep("details")}
            />
          )}

          {step === "details" && (
            <>
              {registerError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 mb-6 text-[15px] text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-px" />
                  <span>{registerError}</span>
                </div>
              )}
              <StepDetails
                isSubmitting={registerMutation.isPending}
                onBack={() => setStep("person")}
                onSubmit={handleDetails}
              />
            </>
          )}

          {step === "photo" && qrToken && (
            <StepPhoto
              token={qrToken}
              isUploading={photoMutation.isPending}
              onCapture={handleCapture}
              onSkip={() => {
                setPhotoSkipped(true);
                setStep("pass");
              }}
            />
          )}

          {step === "pass" &&
            (pass ? (
              <KioskPass
                pass={pass}
                qrToken={qrToken ?? ""}
                department={department}
                photoPreview={photoPreview}
                onDone={reset}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-base">Preparing your pass</p>
              </div>
            ))}
        </motion.div>
      </KioskFrame>

      {secondsLeft !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 px-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
            <span className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
              <TimerReset className="w-7 h-7 text-blue-600" />
            </span>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">Still there?</h2>
            <p className="text-[15px] text-gray-600 mt-2">
              This screen clears in {secondsLeft} seconds so the next visitor cannot see your
              details.
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
