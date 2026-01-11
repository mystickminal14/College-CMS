import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Trash2, Loader2, Check, Upload } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import useUpdateMultipleChildren from "../hooks/useCreateMultipleChild";
import useGetPlannerCourses from "../../planner-course/hooks/useGetAll";
import type { PlannerCourse } from "../../planner-course/model/PlannerCourse";
import { AppContext } from "../../../context/ContextApp";

interface RecordInput {
  plannerCourseId: number | undefined;
  semester: string;
  intake: string;
  file: File | null;
}

interface Props {
  isOpen: boolean;
  parentId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateMultipleFilesModal: React.FC<Props> = ({
  isOpen,
  parentId,
  onClose,
  onSuccess,
}) => {
  const { data } = useGetPlannerCourses();
  const plannerTypes: PlannerCourse[] = data?.data ?? [];

  const [selectedType, setSelectedType] = useState<PlannerCourse | null>(null);
  const [current, setCurrent] = useState<RecordInput>({
    plannerCourseId: undefined,
    semester: "",
    intake: "",
    file: null,
  });

  const [records, setRecords] = useState<RecordInput[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useUpdateMultipleChildren();
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext missing");
  const { showToast } = appContext;

  const semesters = ["I", "II", "III", "IV", "V", "VI"]; // Roman numerals

  const resetAll = () => {
    setCurrent({ plannerCourseId: undefined, semester: "", intake: "", file: null });
    setSelectedType(null);
    setRecords([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (isOpen) resetAll();
  }, [isOpen, parentId]);

  useEffect(() => {
    if (mutation.isSuccess) {
      resetAll();
      onSuccess?.();
      onClose();
    }
  }, [mutation.isSuccess, onClose, onSuccess]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCurrent({ ...current, file });
  };

  const addRecord = () => {
    if (!current.plannerCourseId || !current.semester || !current.intake || !current.file) return;

    // 🔹 Unique semester check for the same course
    const duplicate = records.some(
      (r) => r.plannerCourseId === current.plannerCourseId && r.semester === current.semester
    );
    if (duplicate) {
      showToast(`Semester "${current.semester}" already exists for this course`, "error");
      return;
    }

    setRecords([...records, current]);
    setCurrent({ plannerCourseId: undefined, semester: "", intake: "", file: null });
    setSelectedType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    if (records.length === 0) return;

    mutation.mutate({
      parentId,
      records: records.map(({ plannerCourseId, semester, intake }) => ({
        plannerCourseId,
        semester: `SEMESTER - ${semester}`,
        intake,
      })),
      files: records.map((r) => r.file!),
    });
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[#1a7cd3] to-[#135EAB] p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add Multiple Files</h2>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded">
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* PlannerCourse Dropdown */}
            <select
              value={selectedType?.id ?? ""}
              onChange={(e) => {
                const type = plannerTypes.find(
                  (t) => t.id === Number(e.target.value)
                );
                setSelectedType(type ?? null);
                setCurrent({ ...current, plannerCourseId: type?.id });
              }}
              className="w-full border rounded-xl px-4 py-2 border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Planner Course *</option>
              {plannerTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            {/* Semester Dropdown */}
            <select
              value={current.semester}
              onChange={(e) => setCurrent({ ...current, semester: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Semester *</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Intake Input */}
            <input
              type="text"
              placeholder="Intake"
              value={current.intake}
              onChange={(e) => setCurrent({ ...current, intake: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* File Upload */}
          <div
            className="w-full h-20 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={triggerFileInput}
          >
            {current.file ? (
              <div className="flex items-center gap-2">
                <FaFilePdf className="w-6 h-6 text-red-600" />
                <span>{current.file.name}</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Click to select PDF</span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Add Record Button */}
          <div className="flex justify-end">
            <button
              onClick={addRecord}
              disabled={!current.plannerCourseId || !current.semester || !current.intake || !current.file}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a7cd3] text-white rounded-xl hover:bg-[#135EAB] transition disabled:opacity-50"
            >
              <Upload size={16} /> Add Record
            </button>
          </div>

          {/* Records Table */}
          {records.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border rounded-xl overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">SN</th>
                    <th className="p-2 text-left">Course</th>
                    <th className="p-2 text-left">Semester</th>
                    <th className="p-2 text-left">Intake</th>
                    <th className="p-2 text-left">File</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2 font-medium">{plannerTypes.find(p => p.id === r.plannerCourseId)?.name || "-"}</td>
                      <td className="p-2">{r.semester}</td>
                      <td className="p-2">{r.intake}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <FaFilePdf className="w-5 h-5 text-red-500" />
                          <span className="truncate max-w-[200px] text-sm">{r.file?.name}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeRecord(i)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Total: {records.length} record{records.length !== 1 ? "s" : ""} added
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAll}
              disabled={records.length === 0 || mutation.isPending}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" /> Save All
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMultipleFilesModal;
