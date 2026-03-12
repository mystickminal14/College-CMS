import React, { useState, useEffect, useContext } from "react";

import type { UseMutationResult } from "@tanstack/react-query";
import type { GalleryType } from "../../model/GallModel";
import { Check, Loader2, Plus, X } from "lucide-react";
import { AppContext } from "../../../../context/ContextApp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type?: GalleryType;
  isEdit?: boolean;
  mutation?: UseMutationResult<any, any, { name: string }>;
  editMutation?: UseMutationResult<any, any, { id: number; name: string, month: string, day: string, year: string }>;
}

const AddEditGalleryTypeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  type,
  isEdit,
  mutation,
  editMutation,
}) => {
  const { showToast } = useContext(AppContext)!;
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  useEffect(() => {
    if (isOpen) {
      setName(isEdit && type ? type.name : "");
      setMonth(isEdit && type ? type.month : "");
      setDay(isEdit && type ? type.day : "");
      setYear(isEdit && type ? type.year : "");
    }
  }, [isOpen, isEdit, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return showToast("Type name is required", "error");
    if (!month || !day || !year) {
      return showToast("Please select full date", "error");
    }
    if (isEdit && type && editMutation) {
      editMutation.mutate({ id: type.id, name, month, day, year });
    } else if (mutation) {
      mutation.mutate({ name });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Gallery Type" : "Add Gallery Type"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter type name"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          required
        />
        {/* Date Selection */}
        <div className="grid grid-cols-3 gap-3 mb-4">

          {/* Month Dropdown */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Day Dropdown */}
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Year Input */}
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="px-3 py-2 border rounded-lg"
          />

        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg"
        >
          {isEdit && editMutation?.isPending
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : isEdit
              ? <Check className="w-4 h-4" />
              : <Plus className="w-4 h-4" />}
          {isEdit ? "Update Type" : "Add Type"}
        </button>
      </form>
    </div>
  );
};

export default AddEditGalleryTypeModal;
