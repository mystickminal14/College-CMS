import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useRegisterCourse from "../hooks/useRegisterCourse";

interface Props {
  courseName: string;
  onClose: () => void;
  onAfterRegister?: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
}

const EMPTY: FormState = { fullName: "", email: "", phone: "" };

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function CourseRegisterModal({ courseName, onClose, onAfterRegister }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const { mutate: register, isPending } = useRegisterCourse();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (key: keyof FormState, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(
      { fullName: form.fullName, email: form.email, phone: form.phone, courseName },
      {
        onSuccess: () => {
          if (onAfterRegister) {
            onClose();
            onAfterRegister();
          } else {
            setSubmitted(true);
          }
        },
      }
    );
  };

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
          className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[96dvh] sm:max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-0.5">
                Course Registration
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">{courseName}</h2>
              <p className="text-sm text-gray-500 mt-0.5">Fill in your details and we'll get in touch.</p>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Enquiry Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                  Thank you for your interest in{" "}
                  <span className="font-semibold text-gray-700">{courseName}</span>. Our admissions team will contact you shortly.
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
                <Field label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </Field>

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

                <Field label="Course">
                  <input
                    type="text"
                    value={courseName}
                    readOnly
                    className={inputCls + " bg-blue-50 cursor-default"}
                  />
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
                  {isPending ? "Submitting…" : "Register Now"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
