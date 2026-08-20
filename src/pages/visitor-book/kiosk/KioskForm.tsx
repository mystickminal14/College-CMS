import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Minus,
  PencilLine,
  Phone,
  Plus,
  Search,
  UserRound,
  UserX,
  X,
} from "lucide-react";

import useGetVisitPurposeNameAll from "../../visit-purpose/hooks/useGetVisitPurposeName";
import type { VisitPurpose } from "../../visit-purpose/model/VisitPurposeModel";
import { useKioskStaff } from "../hooks/useKiosk";
import { KioskActions } from "./KioskFrame";
import {
  fieldClass,
  fieldErrorClass,
  focusRing,
  iconButtonClass,
  panelClass,
  popoverClass,
  primaryButtonClass,
  textareaClass,
} from "./tokens";
import { Field, FormSection, StaffAvatar, StepHeading } from "./ui";

// The submit button renders in the frame's fixed action bar, outside this
// form's DOM subtree, so it reaches the form by id instead of by nesting.
const FORM_ID = "kiosk-form";

// Nepali mobile numbers are ten digits and always start with a 9. Stored with
// the country code so a number captured here is dialable as-is.
const DIAL_CODE = "+977";
const NEPALI_MOBILE = /^9\d{9}$/;

const STAFF_PAGE_SIZE = 6;

// Nothing server-side caps the group, but a wall tablet with a +1 button that
// keeps going is a tablet that eventually reports a party of 400.
const MAX_GROUP = 20;

export interface KioskFormValues {
  name: string;
  phone: string;
  numberOfPerson: number;
  purposeId: number;
  otherPurpose?: string;
  personToMeet?: string;
  note?: string;
}

interface Props {
  isSubmitting: boolean;
  onDirty: () => void;
  onSubmit: (values: KioskFormValues) => void;
}

/** Closes a popover on Escape as well as on a click outside it. A kiosk has no
 *  keyboard, but the same screens get driven from a desk machine at handover. */
const useDismiss = (open: boolean, ref: React.RefObject<HTMLDivElement | null>, close: () => void) => {
  useEffect(() => {
    if (!open) return;
    const onClickAway = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, ref, close]);
};

const optionRowClass =
  "w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-50";

/**
 * Whom-to-meet is a searchable dropdown rather than a plain <select> so each
 * row can carry the staff member's photo — a native select cannot render
 * images. "Other" is always the first row, letting a visitor who can't find
 * their host switch straight to typing a name.
 */
const MeetPicker: React.FC<{
  selected: { name: string; position: string; avatar: string | null } | null;
  isOther: boolean;
  manualName: string;
  onPickStaff: (member: { name: string; position: string; avatar: string | null }) => void;
  onPickOther: () => void;
  onManualNameChange: (value: string) => void;
  onClear: () => void;
}> = ({ selected, isOther, manualName, onPickStaff, onPickOther, onManualNameChange, onClear }) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useDismiss(open, boxRef, () => setOpen(false));

  const { data, isLoading } = useKioskStaff({ search, page, limit: STAFF_PAGE_SIZE });
  const staff = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  if (isOther) {
    return (
      <div className="flex items-stretch gap-2.5">
        <div className="relative flex-1 min-w-0">
          <PencilLine className="pointer-events-none absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={manualName}
            onChange={(e) => onManualNameChange(e.target.value)}
            placeholder="Type the person's full name"
            autoFocus
            className={`${fieldClass} pl-12 sm:pl-13`}
          />
        </div>
        <button
          type="button"
          onClick={onClear}
          className={`${iconButtonClass} sm:w-16 sm:h-16`}
          aria-label="Back to the staff list"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`${fieldClass} ${focusRing} flex items-center gap-3.5 text-left ${
          open ? "border-[#125DAA] ring-4 ring-[#125DAA]/12" : ""
        }`}
      >
        {selected ? (
          <>
            <StaffAvatar src={selected.avatar} name={selected.name} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-900 truncate">{selected.name}</span>
              {selected.position && (
                <span className="block text-sm text-slate-500 truncate">{selected.position}</span>
              )}
            </span>
          </>
        ) : (
          <>
            <span className="w-11 h-11 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
              <UserRound className="w-5 h-5 text-slate-400" />
            </span>
            <span className="flex-1 min-w-0 truncate text-slate-400">Search staff by name</span>
          </>
        )}
        {selected ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                onClear();
              }
            }}
            aria-label="Clear selection"
            className="shrink-0 w-8 h-8 -mr-1 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </span>
        ) : (
          <ChevronDown
            className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {open && (
        <div className={`${popoverClass} absolute z-20 mt-2 w-full overflow-hidden`}>
          <div className="p-3 border-b border-slate-100 bg-slate-50/60">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or position"
                autoFocus
                className={`${focusRing} w-full h-12 pl-10 pr-3 text-[15px] rounded-xl border border-slate-200 bg-white placeholder:text-slate-400`}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onPickOther();
            }}
            className={`${optionRowClass} border-b border-slate-100`}
          >
            <span className="w-11 h-11 shrink-0 rounded-full bg-[#125DAA]/10 flex items-center justify-center">
              <PencilLine className="w-5 h-5 text-[#125DAA]" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Someone else</span>
              <span className="block text-sm text-slate-500">Type the name yourself</span>
            </span>
          </button>

          <div className="max-h-72 overflow-y-auto overscroll-contain">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-slate-300">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : staff.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center px-6">
                <UserX className="w-7 h-7 text-slate-300" />
                <p className="text-sm text-slate-500">
                  Nobody matches that search. Try a surname, or pick “Someone else”.
                </p>
              </div>
            ) : (
              staff.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onPickStaff({
                      name: member.name,
                      position: member.position,
                      avatar: member.portrait || member.image,
                    });
                  }}
                  className={optionRowClass}
                >
                  <StaffAvatar src={member.portrait || member.image} name={member.name} size="sm" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-slate-900 truncate">{member.name}</span>
                    <span className="block text-sm text-slate-500 truncate">{member.position}</span>
                  </span>
                </button>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-slate-100 bg-slate-50/60">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination?.hasPrevPage}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#125DAA] hover:bg-white disabled:text-slate-300 disabled:hover:bg-transparent transition"
              >
                Previous
              </button>
              <span className="text-xs font-medium text-slate-500 tabular-nums">
                {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!pagination?.hasNextPage}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#125DAA] hover:bg-white disabled:text-slate-300 disabled:hover:bg-transparent transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * A native <select> renders its option list chrome-side, which on kiosk
 * hardware has clipped or truncated a long purpose name with no way to see
 * the rest of it. This draws the list ourselves so every row can wrap
 * (nothing is ever cut off) and stays capped at a scrollable max-height so
 * it can never run off the bottom of the screen either.
 */
const PurposePicker: React.FC<{
  id?: string;
  purposes: VisitPurpose[];
  selectedId: number;
  hasError: boolean;
  describedBy?: string;
  onSelect: (id: number) => void;
}> = ({ id, purposes, selectedId, hasError, describedBy, onSelect }) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const selected = purposes.find((p) => p.id === selectedId);

  useDismiss(open, boxRef, () => setOpen(false));

  return (
    <div ref={boxRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={`${fieldClass} ${focusRing} flex items-center gap-3 text-left ${
          hasError ? fieldErrorClass : open ? "border-[#125DAA] ring-4 ring-[#125DAA]/12" : ""
        }`}
      >
        <span
          className={`flex-1 min-w-0 truncate ${
            selected ? "font-semibold text-slate-900" : "text-slate-400"
          }`}
        >
          {selected ? selected.name : "Choose a reason"}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={`${popoverClass} absolute z-20 mt-2 w-full max-h-80 overflow-y-auto overscroll-contain p-1.5`}
        >
          {purposes.length === 0 ? (
            <p className="px-4 py-4 text-sm text-slate-500">No reasons have been set up yet.</p>
          ) : (
            purposes.map((purpose) => {
              const isSelected = purpose.id === selectedId;
              return (
                <button
                  key={purpose.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setOpen(false);
                    if (purpose.id != null) onSelect(purpose.id);
                  }}
                  className={`w-full flex items-start gap-3 rounded-xl px-3.5 py-3.5 text-left transition ${
                    isSelected ? "bg-[#125DAA]/8" : "hover:bg-slate-50"
                  }`}
                >
                  {/* whitespace-normal, deliberately no truncate — the whole
                      point of this list is that a long name is never cut off. */}
                  <span
                    className={`flex-1 text-[15px] leading-snug whitespace-normal ${
                      isSelected ? "font-semibold text-[#125DAA]" : "font-medium text-slate-800"
                    }`}
                  >
                    {purpose.name}
                  </span>
                  {isSelected && (
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-[#125DAA]" strokeWidth={2.5} />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

/** Plus/minus in one pill rather than two loose buttons, so the count and the
 *  controls that change it read as a single object. */
const GroupStepper: React.FC<{ value: number; onChange: (delta: number) => void }> = ({
  value,
  onChange,
}) => (
  <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
    <button
      type="button"
      onClick={() => onChange(-1)}
      disabled={value <= 1}
      className={`${iconButtonClass} w-12 h-12 rounded-xl border-transparent shadow-none hover:bg-slate-100`}
      aria-label="One fewer person"
    >
      <Minus className="w-5 h-5" />
    </button>
    <span
      aria-live="polite"
      className="w-14 text-center text-2xl font-bold text-slate-900 tabular-nums"
    >
      {value}
    </span>
    <button
      type="button"
      onClick={() => onChange(1)}
      disabled={value >= MAX_GROUP}
      className={`${iconButtonClass} w-12 h-12 rounded-xl border-transparent shadow-none hover:bg-slate-100`}
      aria-label="One more person"
    >
      <Plus className="w-5 h-5" />
    </button>
  </div>
);

const KioskForm: React.FC<Props> = ({ isSubmitting, onDirty, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState(1);
  const [note, setNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  const [purposeId, setPurposeId] = useState(0);
  const [otherPurpose, setOtherPurpose] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [purposeError, setPurposeError] = useState("");
  const [otherPurposeError, setOtherPurposeError] = useState("");

  const [meetSelected, setMeetSelected] = useState<{
    name: string;
    position: string;
    avatar: string | null;
  } | null>(null);
  const [meetIsOther, setMeetIsOther] = useState(false);
  const [meetManualName, setMeetManualName] = useState("");

  const { data: purposeData } = useGetVisitPurposeNameAll();
  const purposes = purposeData?.data ?? [];
  const selectedPurpose = purposes.find((p) => p.id === purposeId);

  const setCount = (delta: number) => {
    onDirty();
    setNumberOfPerson((n) => Math.min(MAX_GROUP, Math.max(1, n + delta)));
  };

  // Anything that is not a digit is dropped as it is typed, so the visitor
  // cannot fight the field by pasting spaces, dashes or another +977.
  const handlePhoneChange = (value: string) => {
    onDirty();
    setPhoneError("");
    setPhone(value.replace(/\D/g, "").slice(0, 10));
  };

  /* Validation is ours rather than the browser's. A native bubble is drawn by
     the chrome, which on the kiosk's locked-down browser lands in the wrong
     place, in the wrong type size, and vanishes on the next touch — so the
     form carries `noValidate` and every rule reports through the same red line
     under the field it belongs to. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const needsOther = !!selectedPurpose?.isOther;

    const nextName = trimmedName.length < 2 ? "Please enter your full name." : "";
    const nextPhone = NEPALI_MOBILE.test(phone)
      ? ""
      : "Enter a 10-digit mobile number starting with 9.";
    const nextPurpose = purposeId ? "" : "Please choose a reason for your visit.";
    const nextOther = needsOther && !otherPurpose.trim() ? "Please tell us a little more." : "";

    setNameError(nextName);
    setPhoneError(nextPhone);
    setPurposeError(nextPurpose);
    setOtherPurposeError(nextOther);

    // Jump to whatever failed first, so a problem below the fold is not a
    // button that silently refuses to work.
    const firstBad = nextName
      ? "kiosk-name"
      : nextPhone
        ? "kiosk-phone"
        : nextPurpose
          ? "kiosk-purpose"
          : nextOther
            ? "kiosk-other-purpose"
            : "";
    if (firstBad) {
      const el = document.getElementById(firstBad);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
      return;
    }

    const personToMeet = meetIsOther ? meetManualName.trim() : meetSelected?.name;

    onSubmit({
      name: trimmedName,
      phone: `${DIAL_CODE}${phone}`,
      numberOfPerson,
      purposeId,
      ...(needsOther ? { otherPurpose: otherPurpose.trim() } : {}),
      ...(personToMeet ? { personToMeet } : {}),
      ...(note.trim() ? { note: note.trim() } : {}),
    });
  };

  return (
    <div>
      <StepHeading
        title="Let's get you checked in"
        hint="A few quick details and your pass is ready."
      />

      <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
        <div className={`${panelClass} p-4 sm:p-7 lg:p-8 space-y-6 sm:space-y-8`}>
          <FormSection index={1} title="About you">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field label="Full name" htmlFor="kiosk-name" error={nameError} errorId="kiosk-name-error">
                <input
                  id="kiosk-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    onDirty();
                    setNameError("");
                    setName(e.target.value);
                  }}
                  placeholder="e.g. Ramesh Shrestha"
                  aria-required="true"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "kiosk-name-error" : undefined}
                  autoComplete="off"
                  className={`${fieldClass} ${nameError ? fieldErrorClass : ""}`}
                />
              </Field>

              <Field
                label="Mobile number"
                htmlFor="kiosk-phone"
                error={phoneError}
                errorId="kiosk-phone-error"
              >
                {/* The dial code is a fixed prefix, not something to type, so it
                    sits inside the field's own border as a quiet leading slug. */}
                <div
                  className={`flex items-stretch h-14 sm:h-16 rounded-2xl border bg-white shadow-xs transition ${
                    phoneError
                      ? "border-red-300 ring-4 ring-red-500/10"
                      : "border-slate-200 hover:border-slate-300 focus-within:border-[#125DAA] focus-within:ring-4 focus-within:ring-[#125DAA]/12"
                  }`}
                >
                  <span className="flex items-center gap-2 px-4 sm:px-5 text-base font-semibold text-slate-500 border-r border-slate-200 select-none">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {DIAL_CODE}
                  </span>
                  <input
                    id="kiosk-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!phoneError}
                    aria-describedby={phoneError ? "kiosk-phone-error" : undefined}
                    className="flex-1 min-w-0 px-4 text-base tracking-wide bg-transparent rounded-r-2xl text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal focus:outline-none"
                  />
                </div>
              </Field>
            </div>
          </FormSection>

          <FormSection index={2} title="Your visit">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field
                label="Reason for visiting"
                htmlFor="kiosk-purpose"
                error={purposeError}
                errorId="kiosk-purpose-error"
              >
                <PurposePicker
                  id="kiosk-purpose"
                  purposes={purposes}
                  selectedId={purposeId}
                  hasError={!!purposeError}
                  describedBy={purposeError ? "kiosk-purpose-error" : undefined}
                  onSelect={(id) => {
                    onDirty();
                    setPurposeError("");
                    setOtherPurposeError("");
                    setPurposeId(id);
                  }}
                />
              </Field>

              <Field label="Who are you here to see" optional>
                <MeetPicker
                  selected={meetSelected}
                  isOther={meetIsOther}
                  manualName={meetManualName}
                  onPickStaff={(member) => {
                    onDirty();
                    setMeetIsOther(false);
                    setMeetSelected(member);
                  }}
                  onPickOther={() => {
                    onDirty();
                    setMeetSelected(null);
                    setMeetIsOther(true);
                  }}
                  onManualNameChange={(value) => {
                    onDirty();
                    setMeetManualName(value);
                  }}
                  onClear={() => {
                    onDirty();
                    setMeetSelected(null);
                    setMeetIsOther(false);
                    setMeetManualName("");
                  }}
                />
              </Field>
            </div>

            {/* Only the purpose flagged isOther in the CMS opens a free-text box.
                It is tinted and rule-marked so it reads as a follow-up to the
                answer above it, rather than as a field that appeared by magic. */}
            {selectedPurpose?.isOther && (
              <div className="mt-4 rounded-2xl border-l-3 border-[#125DAA] bg-[#125DAA]/[0.04] p-4 sm:p-5">
                <Field
                  label="Tell us a little more"
                  htmlFor="kiosk-other-purpose"
                  hint="One line is plenty — it just helps us point you the right way."
                  error={otherPurposeError}
                  errorId="kiosk-other-purpose-error"
                  className="max-w-xl"
                >
                  <input
                    id="kiosk-other-purpose"
                    type="text"
                    value={otherPurpose}
                    onChange={(e) => {
                      onDirty();
                      setOtherPurposeError("");
                      setOtherPurpose(e.target.value);
                    }}
                    placeholder="Briefly, why are you visiting?"
                    maxLength={150}
                    autoFocus
                    aria-required="true"
                    aria-invalid={!!otherPurposeError}
                    aria-describedby={
                      otherPurposeError ? "kiosk-other-purpose-error" : undefined
                    }
                    className={`${fieldClass} ${otherPurposeError ? fieldErrorClass : ""}`}
                  />
                </Field>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
              <Field label="People in your group, including you">
                <GroupStepper value={numberOfPerson} onChange={setCount} />
              </Field>

              {noteOpen ? (
                <Field label="Anything else" htmlFor="kiosk-note" optional>
                  <textarea
                    id="kiosk-note"
                    value={note}
                    onChange={(e) => {
                      onDirty();
                      setNote(e.target.value);
                    }}
                    rows={2}
                    maxLength={1000}
                    autoFocus
                    placeholder="An appointment time, a vehicle number, anything at all."
                    className={textareaClass}
                  />
                </Field>
              ) : (
                <div className="min-w-0 flex sm:items-end">
                  <button
                    type="button"
                    onClick={() => setNoteOpen(true)}
                    className={`${focusRing} w-full h-14 sm:h-16 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 text-[15px] font-semibold text-slate-500 hover:border-[#125DAA]/50 hover:text-[#125DAA] transition`}
                  >
                    <Plus className="w-4.5 h-4.5" />
                    Add a note
                  </button>
                </div>
              )}
            </div>
          </FormSection>
        </div>
      </form>

      <KioskActions>
        <p className="hidden sm:block text-sm text-slate-500">
          Anything tagged Optional can be left blank.
        </p>
        <button
          type="submit"
          form={FORM_ID}
          disabled={isSubmitting}
          className={`${primaryButtonClass} ml-auto max-sm:w-full`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Checking you in
            </>
          ) : (
            <>
              Get my pass <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </KioskActions>
    </div>
  );
};

export default KioskForm;
