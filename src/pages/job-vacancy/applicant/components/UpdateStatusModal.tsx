import React, { useState } from "react";
import { X, Loader2, CheckCircle } from "lucide-react";
import useUpdateApplicantStatus from "../hooks/useUpdateStatus";
import type { ApplicationStatus, JobApplication } from "../model/ApplicantModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  applicant: JobApplication | null;
}

const ALL_STATUSES: ApplicationStatus[] = ["PENDING", "REVIEWED", "SHORTLISTED", "REJECTED", "HIRED"];

const UpdateStatusModal: React.FC<Props> = ({ isOpen, onClose, applicant }) => {
  const mutation = useUpdateApplicantStatus();
  const [selected, setSelected] = useState<ApplicationStatus>("PENDING");

  if (!isOpen || !applicant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { id: applicant.id, applicationStatus: selected },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-sm mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Update Status</h2>
                <p className="text-white/70 text-sm truncate max-w-40">{applicant.fullName}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} disabled={mutation.isPending} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Application Status
              </label>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button type="button" onClick={onClose} disabled={mutation.isPending}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                Cancel
              </button>
              <button type="submit" disabled={mutation.isPending}
                className="flex-1 px-4 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] transition-colors font-medium text-sm flex items-center justify-center disabled:opacity-50">
                {mutation.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</>
                ) : (
                  "Update Status"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
