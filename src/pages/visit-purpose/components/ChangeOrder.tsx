import React, { useState, useEffect } from "react";
import { X, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import type { VisitPurpose } from "../model/VisitPurposeModel";
import useChangeVisitPurposeOrder from "../hooks/useChangeVisitPurposeOrder";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  purpose?: VisitPurpose | null;
  maxOrder?: number;
}

const ChangeVisitPurposeOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  purpose,
  maxOrder,
}) => {
  const [newOrder, setNewOrder] = useState<number>(purpose?.order ?? 1);

  const changeOrderMutation = useChangeVisitPurposeOrder();

  useEffect(() => {
    if (isOpen && purpose) {
      setNewOrder(purpose.order ?? 1);
    }
  }, [isOpen, purpose]);

  if (!isOpen || !purpose) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder || newOrder < 1 || (maxOrder && newOrder > maxOrder)) return;

    changeOrderMutation.mutate(
      { id: purpose.id!, newOrder },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  const handleIncrement = () => {
    if (!maxOrder || newOrder < maxOrder) setNewOrder(newOrder + 1);
  };

  const handleDecrement = () => {
    if (newOrder > 1) setNewOrder(newOrder - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-[#1a7cd3] p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ArrowUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change Purpose Order</h2>
                <p className="text-white/80 text-sm mt-1">
                  Update the display order for{" "}
                  <span className="font-semibold">{purpose.name}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleIncrement}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
              >
                <ArrowDown className="w-4 h-4 mr-1" /> Down
              </button>

              <input
                type="number"
                min={1}
                max={maxOrder}
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                className="w-16 text-center border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a7cd3]"
              />

              <button
                type="button"
                onClick={handleDecrement}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
              >
                <ArrowUp className="w-4 h-4 mr-1" /> Up
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Enter a value between 1 and {maxOrder}.
            </p>
          </div>

          <div className="flex space-x-3 p-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={changeOrderMutation.isPending}
              className="flex-1 px-4 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {changeOrderMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Updating...
                </>
              ) : (
                "Update Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeVisitPurposeOrderModal;
