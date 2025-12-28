import React, { useState, useEffect, useContext } from "react";
import { X,  Loader2 } from "lucide-react";
import type { Journals, CreateChildPayload } from "../model/JournalModel";
import { AppContext } from "../../../context/ContextApp";
import useCreateJournalIssue from "../hooks/useCreateJournalIssue";
import useEditChildJournal from "../hooks/useEditJournal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  parentId: number; // Parent journal ID
  initialData?: Journals; // For editing
}

const CreateMultipleFilesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  parentId,
  initialData,
}) => {
  const [volume, setVolume] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("CreateMultipleFilesModal must be used within AppContext provider");


  const createMutation = useCreateJournalIssue({ parentId });
  const editMutation = useEditChildJournal();

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setVolume(initialData.volume ?? "");
      setMonth(initialData.month ?? "");
    } else {
      setVolume("");
      setMonth("");
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!volume.trim() || !month.trim()) {
      setError("Volume and Month are required");
      return;
    }

    const payload: CreateChildPayload = {
      parentId,
      volume,
      month,
    };

    if (initialData?.id) {
      // Edit child journal
      editMutation.mutate(
        { id: initialData.id, journal: payload },
        {
          onSuccess: () => {
            onClose();
          },

        }
      );
    } else {
      // Create child journal
      createMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      
      });
    }
  };

  const isPending = initialData ? editMutation.isPending : createMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {initialData ? "Edit Child Journal" : "Add Child Journal"}
            </h2>
            <button type="button" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Volume *</label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="eg: Volume 1"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Month *</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="eg: January"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {initialData ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  initialData ? "Update Child" : "Add Child"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMultipleFilesModal;
