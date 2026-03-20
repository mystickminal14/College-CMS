import React, { useState } from "react";
import { X, ArrowUpDown, Loader2 } from "lucide-react";
import type { HeroSectionImage } from "../model/HeroModel";
import useChangeHeroOrder from "../hooks/useChangeHeroOrder";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: HeroSectionImage | null;
  totalImages: number;
}

const ChangeHeroOrderModal: React.FC<Props> = ({ isOpen, onClose, image, totalImages }) => {
  const mutation = useChangeHeroOrder();
  const [newOrder, setNewOrder] = useState<number>(image?.order ?? 1);

  if (!isOpen || !image) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrder === image.order) {
      onClose();
      return;
    }
    mutation.mutate(
      { id: image.id, newOrder },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ArrowUpDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change Order</h2>
                <p className="text-white/80 text-sm mt-1">
                  Currently at position #{image.order}
                </p>
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
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Position
              </label>
              <input
                type="number"
                min={1}
                max={totalImages}
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter a value between 1 and {totalImages}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex space-x-3 pt-2">
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
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Update Order
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

export default ChangeHeroOrderModal;