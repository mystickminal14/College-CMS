import React, { useState, useRef, useEffect } from "react";
import { X, Trash2, Upload, Loader2, Check } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import useUpdateMultipleChildren from "../hooks/useCreateMultipleChild";

interface RecordInput {
  course: string;
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
  onSuccess 
}) => {
  const [records, setRecords] = useState<RecordInput[]>([]);
  const [current, setCurrent] = useState<RecordInput>({
    course: "",
    semester: "",
    intake: "",
    file: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useUpdateMultipleChildren();

  const resetAll = () => {
    setRecords([]);
    setCurrent({ course: "", semester: "", intake: "", file: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!isOpen) {
      resetAll();
    }
  }, [isOpen]);

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
    if (!current.course || !current.semester || !current.intake || !current.file) return;
    setRecords([...records, current]);
    setCurrent({ course: "", semester: "", intake: "", file: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    if (records.length === 0) return;

    mutation.mutate({
      parentId,
      records: records.map(({ course, semester, intake }) => ({ 
        course, 
        semester, 
        intake 
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
          <button onClick={onClose}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Course"
              value={current.course}
              onChange={(e) => setCurrent({ ...current, course: e.target.value })}
              className="input w-full px-4 py-2 border rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#135EAB] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Semester"
              value={current.semester}
              onChange={(e) => setCurrent({ ...current, semester: e.target.value })}
              className="input w-full px-4 py-2 border rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#135EAB] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <input
              type="text"
              placeholder="Intake"
              value={current.intake}
              onChange={(e) => setCurrent({ ...current, intake: e.target.value })}
              className="input w-full px-4 py-2 border rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#135EAB] focus:outline-none"
            />
            <div
              className="w-full h-20 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
              onClick={triggerFileInput}
            >
              {current.file ? (
                <div className="flex items-center gap-2">
                  <FaFilePdf className="w-6 h-6 text-red-600" />
                  <span className="truncate">{current.file.name}</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Click to select PDF</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={addRecord}
              disabled={!current.course || !current.semester || !current.intake || !current.file}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a7cd3] text-white rounded-xl hover:bg-[#135EAB] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={16} /> Add Record
            </button>
          </div>

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
                      <td className="p-2 font-medium">{r.course}</td>
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
                Total: {records.length} record{records.length !== 1 ? 's' : ''} added
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {records.length === 0 
                ? "No records added yet" 
                : `${records.length} record${records.length !== 1 ? 's' : ''} ready to save`}
            </div>
            
            <div className="flex gap-3">
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
    </div>
  );
};

export default CreateMultipleFilesModal;