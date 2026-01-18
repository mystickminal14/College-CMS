import React, { useState, useEffect, useContext } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import { Check, Loader2, Plus, X } from "lucide-react";
import { AppContext } from "../../../../context/ContextApp";
import type {
  AcademicYear,
  UpdateAcademicYearPayload,
} from "../../model/PlannerModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type?: AcademicYear;
  isEdit?: boolean;
  mutation?: UseMutationResult<any, any, { year: string; session: string }>;
  editMutation?: UseMutationResult<any, any, UpdateAcademicYearPayload>;
}

/* ---------- Month + Season mapping ---------- */
const MONTH_SEASON_OPTIONS = [
  { month: "January", season: "Winter" },
  { month: "February", season: "Winter" },
  { month: "March", season: "Spring" },
  { month: "April", season: "Spring" },
  { month: "May", season: "Spring" },
  { month: "June", season: "Summer" },
  { month: "July", season: "Summer" },
  { month: "August", season: "Summer" },
  { month: "September", season: "Autumn" },
  { month: "October", season: "Autumn" },
  { month: "November", season: "Autumn" },
  { month: "December", season: "Winter" },
];

const AddEditAcademicYearModal: React.FC<Props> = ({
  isOpen,
  onClose,
  type,
  isEdit = false,
  mutation,
  editMutation,
}) => {
  const { showToast } = useContext(AppContext)!;

  const [year, setYear] = useState("");
  const [session, setSession] = useState("");

  /* ---------- Reset / Edit handling ---------- */
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && type) {
      setYear(type.year);
      // Extract month from "January (Winter) session"
      setSession(type.session.replace(/ \(.*\) session/, ""));
    } else {
      setYear("");
      setSession("");
    }
  }, [isOpen, isEdit, type]);

  if (!isOpen) return null;

  /* ---------- Submit ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year.trim()) {
      return showToast("Academic year is required", "error");
    }

    if (!session) {
      return showToast("Session is required", "error");
    }

    const selected = MONTH_SEASON_OPTIONS.find(
      (m) => m.month === session
    );

    const season = selected?.season ?? "";

    const payload = {
      year,
      session: `${session} (${season}) session`, // ✅ FINAL SAVED FORMAT
    };

    if (isEdit && type && editMutation) {
      editMutation.mutate({
        id: type.id,
        ...payload,
      });
    } else if (mutation) {
      mutation.mutate(payload);
    }

    onClose();
  };

  const isLoading =
    (isEdit && editMutation?.isPending) ||
    (!isEdit && mutation?.isPending);

  /* ---------- UI (UNCHANGED) ---------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Academic Year" : "Add Academic Year"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Year */}
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2024-2025"
          className="w-full px-4 py-2 border rounded-lg mb-3"
          required
        />

        {/* Session Dropdown */}
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          required
        >
          <option value="">Select Session Month</option>
          {MONTH_SEASON_OPTIONS.map(({ month, season }) => (
            <option key={month} value={month}>
              {month} ({season})
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isEdit ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isEdit ? "Update Academic Year" : "Add Academic Year"}
        </button>
      </form>
    </div>
  );
};

export default AddEditAcademicYearModal;
