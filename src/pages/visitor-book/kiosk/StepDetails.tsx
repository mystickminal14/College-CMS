import React, { useState } from "react";
import { ArrowRight, Check, ChevronLeft, Loader2, Minus, Plus } from "lucide-react";

import useGetVisitPurposeNameAll from "../../visit-purpose/hooks/useGetVisitPurposeName";
import { KioskActions } from "./KioskFrame";
import { fieldClass, ghostButtonClass, iconButtonClass, labelClass, primaryButtonClass, textareaClass } from "./tokens";
import { StepHeading } from "./ui";

// The submit button renders in the frame's action bar, outside this form's DOM
// subtree, so it reaches the form by id instead of by nesting.
const FORM_ID = "kiosk-details";

// Nepali mobile numbers are ten digits and always start with a 9. Stored with
// the country code so a number captured here is dialable as-is.
const DIAL_CODE = "+977";
const NEPALI_MOBILE = /^9\d{9}$/;

export interface DetailsValues {
  name: string;
  phone: string;
  numberOfPerson: number;
  purposeId: number;
  otherPurpose?: string;
  note?: string;
}

interface Props {
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (values: DetailsValues) => void;
}

/** Purposes are tiles rather than a dropdown — a native select is a poor target
 *  for a finger, and there are rarely more than a handful to choose from. */
const PurposeChip: React.FC<{ selected: boolean; label: string; onClick: () => void }> = ({
  selected,
  label,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`relative min-h-16 px-4 py-3 rounded-xl border text-[16px] font-semibold text-left transition active:translate-y-px ${
      selected
        ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-gray-900"
        : "border-gray-200 bg-white text-gray-900 hover:border-blue-600"
    }`}
  >
    {selected && (
      <span className="absolute top-0 right-0 w-6 h-6 bg-blue-600 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
      </span>
    )}
    <span className="pr-6 block leading-snug">{label}</span>
  </button>
);

const StepDetails: React.FC<Props> = ({ isSubmitting, onBack, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    numberOfPerson: 1,
    purposeId: 0,
    otherPurpose: "",
    note: "",
  });
  const [purposeError, setPurposeError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { data: purposeData } = useGetVisitPurposeNameAll();
  const purposes = purposeData?.data ?? [];
  const selectedPurpose = purposes.find((p) => p.id === form.purposeId);

  const setCount = (delta: number) =>
    setForm((f) => ({ ...f, numberOfPerson: Math.max(1, f.numberOfPerson + delta) }));

  // Anything that is not a digit is dropped as it is typed, so the visitor
  // cannot fight the field by pasting spaces, dashes or another +977.
  const handlePhoneChange = (value: string) => {
    setPhoneError("");
    setForm((f) => ({ ...f, phone: value.replace(/\D/g, "").slice(0, 10) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!NEPALI_MOBILE.test(form.phone)) {
      setPhoneError("Enter a 10-digit mobile number starting with 9.");
      return;
    }

    if (!form.purposeId) {
      setPurposeError("Choose a purpose so reception knows where to send you.");
      return;
    }

    onSubmit({
      name: form.name.trim(),
      phone: `${DIAL_CODE}${form.phone}`,
      numberOfPerson: form.numberOfPerson,
      purposeId: form.purposeId,
      ...(selectedPurpose?.isOther ? { otherPurpose: form.otherPurpose.trim() } : {}),
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    });
  };

  return (
    <div>
      <StepHeading
        eyebrow="Step 3 of 4"
        title="Tell us who you are"
        hint="Four things, and your pass is ready."
      />

      <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
          <div>
            <label className={labelClass} htmlFor="kiosk-name">
              Full name
            </label>
            <input
              id="kiosk-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Ramesh Shrestha"
              className={fieldClass}
              required
              minLength={2}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="kiosk-phone">
              Phone number
            </label>
            <div
              className={`flex items-stretch h-16 rounded-xl border bg-white transition ${
                phoneError
                  ? "border-red-400 ring-2 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
              }`}
            >
              <span className="flex items-center px-4 text-base font-semibold text-gray-500 border-r border-gray-200 select-none">
                {DIAL_CODE}
              </span>
              <input
                id="kiosk-phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="98XXXXXXXX"
                maxLength={10}
                autoComplete="off"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "kiosk-phone-error" : undefined}
                className="flex-1 min-w-0 px-4 text-base bg-transparent rounded-r-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            {phoneError && (
              <p id="kiosk-phone-error" role="alert" className="text-[15px] text-red-600 mt-2">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className={labelClass}>Purpose of visit</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl">
            {purposes.map((purpose) => (
              <PurposeChip
                key={purpose.id}
                selected={form.purposeId === purpose.id}
                label={purpose.name}
                onClick={() => {
                  setPurposeError("");
                  setForm((f) => ({ ...f, purposeId: purpose.id ?? 0 }));
                }}
              />
            ))}
          </div>
          {purposeError && (
            <p role="alert" className="text-[15px] text-red-600 mt-3">
              {purposeError}
            </p>
          )}
        </div>

        {/* Only the purpose flagged isOther in the CMS opens a free-text box. */}
        {selectedPurpose?.isOther && (
          <div className="max-w-xl">
            <label className={labelClass} htmlFor="kiosk-other-purpose">
              Please say a little more
            </label>
            <input
              id="kiosk-other-purpose"
              type="text"
              value={form.otherPurpose}
              onChange={(e) => setForm((f) => ({ ...f, otherPurpose: e.target.value }))}
              placeholder="Briefly, why are you visiting?"
              className={fieldClass}
              maxLength={150}
              required
              autoFocus
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
          <div>
            <p className={labelClass}>People in your group</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCount(-1)}
                disabled={form.numberOfPerson <= 1}
                className={iconButtonClass}
                aria-label="One fewer person"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-3xl font-bold tabular-nums w-12 text-center">
                {form.numberOfPerson}
              </span>
              <button
                type="button"
                onClick={() => setCount(1)}
                className={iconButtonClass}
                aria-label="One more person"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="kiosk-note">
              Anything else <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="kiosk-note"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              rows={2}
              maxLength={1000}
              className={textareaClass}
            />
          </div>
        </div>
      </form>

      <KioskActions>
        <button type="button" onClick={onBack} className={ghostButtonClass}>
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="submit"
          form={FORM_ID}
          disabled={isSubmitting}
          className={`${primaryButtonClass} ml-auto`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Checking you in
            </>
          ) : (
            <>
              Continue to photo <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </KioskActions>
    </div>
  );
};

export default StepDetails;
