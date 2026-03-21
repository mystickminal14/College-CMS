import React from "react";
import { X, AlertTriangle, Power, Loader2 } from "lucide-react";
import { useToggleFaqStatus } from "../hooks/FAqHooks";
import type { FAQ } from "../model/FAQmodel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  faq: FAQ | null;
}

const ToggleFaqStatusModal: React.FC<Props> = ({ isOpen, onClose, faq }) => {
  const mutation = useToggleFaqStatus();

  if (!isOpen || !faq) return null;

  const isEnabled = faq.status === "ENABLED";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: faq.id }, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div
            className={`p-6 flex justify-between items-center ${
              isEnabled ? "bg-yellow-600" : "bg-green-600"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Power className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isEnabled ? "Disable FAQ" : "Enable FAQ"}
                </h2>
                <p className="text-white/80 text-sm mt-1">Confirm status change</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isEnabled
                    ? "bg-yellow-100 dark:bg-yellow-900/30"
                    : "bg-green-100 dark:bg-green-900/30"
                }`}
              >
                <AlertTriangle
                  className={`w-6 h-6 ${
                    isEnabled
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                />
              </div>
            </div>

            <div className="text-center mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isEnabled ? "Disable" : "Enable"}{" "}
                <span className="text-blue-600">FAQ #{faq.order}</span>?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                "{faq.questions}"
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                {isEnabled
                  ? "This FAQ will be hidden from the public."
                  : "This FAQ will become visible to the public."}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`flex-1 px-4 py-3 text-white rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-50 ${
                  isEnabled
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4 mr-2" />
                    {isEnabled ? "Disable" : "Enable"}
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

export default ToggleFaqStatusModal;