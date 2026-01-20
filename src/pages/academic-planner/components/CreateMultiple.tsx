import React, { useEffect, useRef, useState, useContext } from "react";
import { X, Loader2, Check } from "lucide-react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAlt } from "react-icons/fa";

import { AppContext } from "../../../context/ContextApp";

import useGetPlannerCourses from "../../planner-course/hooks/useGetAll";
import useCreateAcademicPlanner from "../hooks/useCreate";
import useUpdateAcademicPlanner from "../hooks/useEdit";

import type { AcademicPlanner } from "../model/PlannerModel";
import type { PlannerCourse } from "../../planner-course/model/PlannerCourse";
import useGetAcademicYears from "../hooks/year/useGetAcademicYear";

interface Props {
  isOpen: boolean;
  planner?: AcademicPlanner | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const semesters = ["I", "II", "III", "IV", "V", "VI"];

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const getFileIcon = (fileName: string | undefined) => {
  if (!fileName) return <FaFileAlt className="text-gray-500" />;

  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FaFilePdf className="text-red-600" />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-blue-600" />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className="text-green-600" />;
    case "ppt":
    case "pptx":
      return <FaFilePowerpoint className="text-orange-600" />;
    default:
      return <FaFileAlt className="text-gray-500" />;
  }
};

const CreateEditPlannerModal: React.FC<Props> = ({
  isOpen,
  planner,
  onClose,
  onSuccess,
}) => {
  const { data: courseRes } = useGetPlannerCourses();
  const { data: yearRes } = useGetAcademicYears();

  const plannerCourses: PlannerCourse[] = courseRes?.data ?? [];
  const academicYears = yearRes?.data ?? [];

  const [academicYearId, setAcademicYearId] = useState("");
  const [plannerCourseId, setPlannerCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [intake, setIntake] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const createMutation = useCreateAcademicPlanner();
  const updateMutation = useUpdateAcademicPlanner();

  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing");
  const { showToast } = ctx;

  /* ---------------- Reset on open / edit ---------------- */
  useEffect(() => {
    if (isOpen) {
      setAcademicYearId(planner ? String(planner.academicYearId) : "");
      setPlannerCourseId(planner ? String(planner.plannerCourseId) : "");
      setSemester(planner?.semester ? planner.semester.replace("SEMESTER - ", "") : "");
      setIntake(planner?.intake ?? "");
      setFile(null);
      setShowFileInput(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [isOpen, planner]);

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!academicYearId) return showToast("Academic Year is required", "error");
    if (!plannerCourseId) return showToast("Planner course is required", "error");
    if (!semester.trim()) return showToast("Semester cannot be empty", "error");
    if (!intake.trim()) return showToast("Intake cannot be empty", "error");
    if (!planner && !file) return showToast("Planner file is required", "error");

    const payload: any = {
      academicYearId: Number(academicYearId),
      plannerCourseId: Number(plannerCourseId),
      semester: `Semester- ${semester}`,
      intake,
    };

    if (file) payload.file = file;

    if (planner) {
      updateMutation.mutate({ id: planner.id, ...payload }, {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
      });
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

  const existingFileName = planner?.file?.split("/").pop();

  /* ---------------- File Change ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedMimeTypes.includes(selectedFile.type)) {
      showToast("Only PDF, Word, Excel, or PowerPoint files are allowed", "error");
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        {/* Header */}
        <div className="bg-linear-to-r from-[#1a7cd3] to-[#135EAB] p-5 flex justify-between">
          <h2 className="text-xl text-white font-bold">
            {planner ? "Edit Academic Planner" : "Add Academic Planner"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Year */}
            <select
              value={academicYearId}
              onChange={(e) => setAcademicYearId(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Select Academic Year *</option>
              {academicYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.year} ({y.session})
                </option>
              ))}
            </select>

            {/* Planner Course */}
            <select
              value={plannerCourseId}
              onChange={(e) => setPlannerCourseId(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Select Course *</option>
              {plannerCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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

            <input
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              placeholder="Intake"
              className="border rounded-xl px-4 py-2"
            />
          </div>

          {/* Existing File */}
          {planner?.file && !file && (
            <div className="flex items-center justify-between border rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getFileIcon(existingFileName)}
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
                  {getFileIcon(file.name)}
                  {file.name}
                </div>
              ) : (
                <span className="text-gray-400 text-sm">
                  Click to upload PDF, Word, Excel, or PowerPoint
                </span>
              )}
              <input
                ref={fileRef}
                type="file"
                hidden
                onChange={handleFileChange}
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
