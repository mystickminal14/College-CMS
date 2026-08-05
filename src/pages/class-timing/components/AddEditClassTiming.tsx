import React, { useState, useEffect, useContext } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import { Check, Loader2, Plus, X } from "lucide-react";
import type { ClassTiming, EClassTimingKind } from "../model/ClassTimingModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  timing?: ClassTiming;
  isEdit?: boolean;
  mutation?: UseMutationResult<ApiResponse<ClassTiming>, ApiErrorResponse, ClassTiming>;
  editMutation?: UseMutationResult<
    ApiResponse<ClassTiming>,
    ApiErrorResponse,
    Partial<ClassTiming> & { id: number }
  >;
}

const AddEditClassTimingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  timing,
  isEdit = false,
  mutation,
  editMutation,
}) => {
  const { showToast } = useContext(AppContext)!;

  const [name, setName] = useState("");
  const [kind, setKind] = useState<EClassTimingKind>("LECTURE");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && timing) {
      setName(timing.name);
      setKind(timing.kind);
      setStartTime(timing.startTime ?? "");
      setEndTime(timing.endTime ?? "");
      setDays(timing.days ?? "");
    } else {
      setName("");
      setKind("LECTURE");
      setStartTime("");
      setEndTime("");
      setDays("");
    }
  }, [isOpen, isEdit, timing]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return showToast("Name is required", "error");
    if (!!startTime !== !!endTime) {
      return showToast("Enter both a start and an end time, or neither", "error");
    }
    if (startTime && endTime && startTime >= endTime) {
      return showToast("End time must be after the start time", "error");
    }
    if (!startTime && !days.trim()) {
      return showToast("Enter a time range or the days it runs", "error");
    }

    const payload: ClassTiming = {
      name: name.trim(),
      kind,
      startTime: startTime || null,
      endTime: endTime || null,
      days: days.trim() || null,
    };

    if (isEdit && timing && editMutation) {
      editMutation.mutate({ id: Number(timing.id), ...payload });
    } else if (mutation) {
      mutation.mutate(payload);
    }

    onClose();
  };

  const isLoading =
    (isEdit && editMutation?.isPending) || (!isEdit && mutation?.isPending);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Class Timing" : "Add Class Timing"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Session"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Type</label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as EClassTimingKind)}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="LECTURE">Lecture</option>
              <option value="TUTORIAL">Tutorial</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Lectures show under “Class Timing”, tutorials under “Tutorials”.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm font-medium">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Days</label>
            <input
              type="text"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g. Sunday – Friday"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave the times empty to show only the days.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isEdit ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isEdit ? "Update " : "Add "}
        </button>
      </form>
    </div>
  );
};

export default AddEditClassTimingModal;
