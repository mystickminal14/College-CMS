import { useState, useEffect } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { EShiftStatus, Shift } from "../model/ShiftModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Shift | null;
  mutation: UseMutationResult<
    ApiResponse<Shift>,
    ApiErrorResponse,
    { id: number; status: EShiftStatus }
  >;
}

const StatusModal = ({ isOpen, onClose, data, mutation }: Props) => {
  const [status, setStatus] = useState<EShiftStatus>("DISABLED");

  useEffect(() => {
    if (data) setStatus(data.status || "DISABLED");
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: Number(data.id), status }, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Change Status
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as EShiftStatus)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="ENABLED">ENABLED</option>
            <option value="DISABLED">DISABLED</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-60"
            >
              {mutation.isPending ? "Saving..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusModal;
