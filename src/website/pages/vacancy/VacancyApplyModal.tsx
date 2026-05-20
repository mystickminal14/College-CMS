import { useState, useEffect } from "react";
import { X, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { JobVacancy } from "../../../pages/job-vacancy/vacancy/model/VacancyModel";
import type {
  Gender,
  MaritalStatus,
  VacancySource,
} from "../../../pages/job-vacancy/applicant/model/ApplicantModel";
import useApplyVacancy from "./hooks/useApplyVacancy";

interface Props {
  vacancy: JobVacancy | null;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender | "";
  nationality: string;
  highestQualification: string;
  maritalStatus: MaritalStatus | "";
  currentAddress: string;
  contactNumber: string;
  heardFrom: VacancySource | "";
  heardFromOther: string;
  resume: File | null;
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  highestQualification: "",
  maritalStatus: "",
  currentAddress: "",
  contactNumber: "",
  heardFrom: "",
  heardFromOther: "",
  resume: null,
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

const selectCls =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none";

export default function VacancyApplyModal({ vacancy, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const { mutate: apply, isPending } = useApplyVacancy(vacancy?.id ?? "");

  useEffect(() => {
    setForm(EMPTY);
    setSubmitted(false);
  }, [vacancy?.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (key: keyof FormState, val: string | File | null) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancy) return;
    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("dateOfBirth", form.dateOfBirth);
    fd.append("gender", form.gender);
    fd.append("nationality", form.nationality);
    fd.append("highestQualification", form.highestQualification);
    fd.append("maritalStatus", form.maritalStatus);
    fd.append("currentAddress", form.currentAddress);
    fd.append("contactNumber", form.contactNumber);
    fd.append("heardFrom", form.heardFrom);
    if (form.heardFrom === "OTHER" && form.heardFromOther)
      fd.append("heardFromOther", form.heardFromOther);
    if (form.resume) fd.append("resume", form.resume);

    apply(fd, { onSuccess: () => setSubmitted(true) });
  };

  if (!vacancy) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[96dvh] sm:max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-0.5">
                Job Application
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {vacancy.designation}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {vacancy.location} · {vacancy.timings}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition shrink-0 ml-4"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-6 py-5">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                  Thank you for applying for{" "}
                  <span className="font-semibold text-gray-700">{vacancy.designation}</span>. We
                  will review your application and reach out to you.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <Field label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className={inputCls}
                  />
                </Field>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email Address" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone Number" required>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="e.g. 98XXXXXXXX"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* DOB + Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Date of Birth" required>
                    <input
                      type="date"
                      required
                      value={form.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Gender" required>
                    <div className="relative">
                      <select
                        required
                        value={form.gender}
                        onChange={(e) => set("gender", e.target.value)}
                        className={selectCls}
                      >
                        <option value="">Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                    </div>
                  </Field>
                </div>

                {/* Nationality + Marital Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nationality" required>
                    <input
                      type="text"
                      required
                      value={form.nationality}
                      onChange={(e) => set("nationality", e.target.value)}
                      placeholder="e.g. Nepali"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Marital Status" required>
                    <div className="relative">
                      <select
                        required
                        value={form.maritalStatus}
                        onChange={(e) => set("maritalStatus", e.target.value)}
                        className={selectCls}
                      >
                        <option value="">Select status</option>
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                    </div>
                  </Field>
                </div>

                {/* Qualification */}
                <Field label="Highest Qualification" required>
                  <input
                    type="text"
                    required
                    value={form.highestQualification}
                    onChange={(e) => set("highestQualification", e.target.value)}
                    placeholder="e.g. Master's in Computer Science"
                    className={inputCls}
                  />
                </Field>

                {/* Address */}
                <Field label="Current Address" required>
                  <textarea
                    required
                    rows={2}
                    value={form.currentAddress}
                    onChange={(e) => set("currentAddress", e.target.value)}
                    placeholder="Your current address"
                    className={inputCls + " resize-none"}
                  />
                </Field>

                {/* Contact Number */}
                <Field label="Contact Number" required>
                  <input
                    type="tel"
                    required
                    value={form.contactNumber}
                    onChange={(e) => set("contactNumber", e.target.value)}
                    placeholder="e.g. 98XXXXXXXX"
                    className={inputCls}
                  />
                </Field>

                {/* Heard From */}
                <Field label="How did you hear about this vacancy?" required>
                  <div className="relative">
                    <select
                      required
                      value={form.heardFrom}
                      onChange={(e) => set("heardFrom", e.target.value)}
                      className={selectCls}
                    >
                      <option value="">Select source</option>
                      <option value="COMPANY_WEBSITE">Company Website</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="EMPLOYEE_REFERRAL">Employee Referral</option>
                      <option value="JOB_PORTAL">Job Portal</option>
                      <option value="OTHER">Other</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                  </div>
                </Field>

                <AnimatePresence>
                  {form.heardFrom === "OTHER" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <Field label="Please specify">
                        <input
                          type="text"
                          value={form.heardFromOther}
                          onChange={(e) => set("heardFromOther", e.target.value)}
                          placeholder="Where did you hear about this vacancy?"
                          className={inputCls}
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Resume */}
                <Field label="Resume (PDF)">
                  <label
                    className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all ${
                      form.resume
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        form.resume ? "bg-blue-100" : "bg-white border border-gray-200"
                      }`}
                    >
                      <Upload className={`w-4 h-4 ${form.resume ? "text-blue-600" : "text-gray-400"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${form.resume ? "text-blue-700" : "text-gray-500"}`}>
                        {form.resume ? form.resume.name : "Upload your resume"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">PDF files only</p>
                    </div>
                    {form.resume && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); set("resume", null); }}
                        className="ml-auto shrink-0 text-gray-400 hover:text-red-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => set("resume", e.target.files?.[0] ?? null)}
                    />
                  </label>
                </Field>
              </form>
            )}
          </div>

          {/* Footer */}
          {!submitted && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 rounded-b-2xl shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPending ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
