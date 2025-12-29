import React, { useState, useEffect } from "react";
import { X, RefreshCw, Loader2 } from "lucide-react";
import useCreateParent from "../hooks/useCreate";
import useEditSession from "../hooks/useEdit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSession?: string; 
  initialYear?:string;// prefilled for edit
  sessionId?: number; // if present, edit mode
}

const CreateEditSessionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialSession = "",
  initialYear = "",

  sessionId,
}) => {
  const [session, setSession] = useState(initialSession);
  const [year, setYear] = useState(initialYear);

  const [error, setError] = useState("");

  const createMutation = useCreateParent();
  const editMutation = useEditSession();

  useEffect(() => {
    setSession(initialSession);
    setYear(initialYear);

    setError("");
  }, [initialSession, isOpen,initialYear]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!session.trim()) {
      setError("Session is required");
      return;
    }

    if (sessionId) {
      // EDIT
      editMutation.mutate(
        { id: sessionId, session,year },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      // CREATE
      createMutation.mutate(
        { session,year },
        {
          onSuccess: () => onClose(),
        }
      );
    }
  };

  const isPending = sessionId ? editMutation.isPending : createMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {sessionId ? "Edit Session" : "Create Session"}
            </h2>
            <button type="button" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Session Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Session *
              </label>
              <input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                placeholder="eg: Dec Session "
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a7cd3] focus:border-transparent"
              />
            </div>
 <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year *
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="eg: 2025"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a7cd3] focus:border-transparent"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> {sessionId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" /> {sessionId ? "Update Session" : "Create Session"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditSessionModal;
