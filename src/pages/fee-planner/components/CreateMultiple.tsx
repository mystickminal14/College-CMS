import React, { useEffect, useRef, useState, useContext } from "react";
import { X, Loader2, Check } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

import { AppContext } from "../../../context/ContextApp";

import useCreateFeePlanner from "../hooks/useCreate";

import type { FeePlanner } from "../model/PlannerModel";
import useGetFeeYears from "../hooks/year/useGetAcademicYear";
import useUpdateFeePlanner from "../hooks/useEdit";

interface Props {
  isOpen: boolean;
  planner?: FeePlanner | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const semesters = ["I", "II", "III", "IV", "V", "VI"];
const courses = ["Bachelor", "Master"] as const;

const CreateEditPlannerModal: React.FC<Props> = ({
  isOpen,
  planner,
  onClose,
  onSuccess,
}) => {
  const { data: yearRes } = useGetFeeYears();
  const feeYears = yearRes?.data ?? [];

  const [feeYearId, setFeeYearId] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const createMutation = useCreateFeePlanner();
  const updateMutation = useUpdateFeePlanner();

  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing");
  const { showToast } = ctx;

  /* ---------------- Reset on open / edit ---------------- */
  useEffect(() => {
    if (isOpen) {
      setFeeYearId(planner ? String(planner.feeYearId) : "");
      setSemester(
        planner?.semester
          ? planner.semester.replace("Semester - ", "")
          : ""
      );
      setCourse(planner?.course ?? "");
      setFile(null);
      setShowFileInput(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [isOpen, planner]);

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!feeYearId)
      return showToast("Fee Year is required", "error");

    if (!course)
      return showToast("Course is required", "error");

    if (!semester.trim())
      return showToast("Semester cannot be empty", "error");


    if (!planner && !file)
      return showToast("Planner PDF is required", "error");

    const payload: any = {
      feeYearId: Number(feeYearId),
      course,
      semester: `Semester - ${semester}`,
    };

    if (file) payload.file = file;

    if (planner) {
      updateMutation.mutate(
        { id: planner.id, ...payload },
        {
          onSuccess: () => {
            onSuccess?.();
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
      });
    }
  };

  if (!isOpen) return null;

  const existingFileName = planner?.file
    ? planner.file.split("/").pop()
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-[#1a7cd3] to-[#135EAB] p-5 flex justify-between">
          <h2 className="text-xl text-white font-bold">
            {planner ? "Edit Fee Planner" : "Add Fee Planner"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee Year */}
            <select
              value={feeYearId}
              onChange={(e) => setFeeYearId(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Select Fee Year *</option>
              {feeYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.year} ({y.session})
                </option>
              ))}
            </select>

            {/* Course */}
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Select Course *</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Semester */}
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Select Semester *</option>
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

          </div>

          {/* Existing File */}
          {planner?.file && !file && (
            <div className="flex items-center justify-between border rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaFilePdf className="text-red-600" />
                {existingFileName}
              </div>
              <button
                type="button"
                onClick={() => setShowFileInput(true)}
                className="text-blue-600 text-sm underline"
              >
                Edit file
              </button>
            </div>
          )}

          {/* File Upload */}
          {(showFileInput || !planner) && (
            <div
              onClick={() => fileRef.current?.click()}
              className="h-20 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer"
            >
              {file ? (
                <div className="flex gap-2 items-center">
                  <FaFilePdf className="text-red-600" />
                  {file.name}
                </div>
              ) : (
                <span className="text-gray-400 text-sm">
                  Click to upload planner PDF
                </span>
              )}
              <input
                ref={fileRef}
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl"
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Saving
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {planner ? "Update" : "Save"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPlannerModal;
