import React, { useState, useEffect } from "react";
import { X, ArrowUpDown, Loader2, ChevronUp, ChevronDown } from "lucide-react";
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

  useEffect(() => {
    if (image) setNewOrder(image.order);
  }, [image]);

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

  const increment = () => setNewOrder((prev) => Math.min(prev + 1, totalImages));
  const decrement = () => setNewOrder((prev) => Math.max(prev - 1, 1));

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
          <div className="p-6 space-y-5">

            {/* Order stepper */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                New Position
              </label>

              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={newOrder <= 1 || mutation.isPending}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white w-16 text-center tabular-nums">
                    {newOrder}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    of {totalImages}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={increment}
                  disabled={newOrder >= totalImages || mutation.isPending}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
              </div>

              {/* Visual progress bar */}
              <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-200"
                  style={{ width: `${(newOrder / totalImages) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>{totalImages}</span>
              </div>
            </div>

            {/* Change indicator */}
            {newOrder !== image.order && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg py-2 px-3">
                <span className="font-medium text-gray-700 dark:text-gray-300">#{image.order}</span>
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="font-medium text-blue-600 dark:text-blue-400">#{newOrder}</span>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex space-x-3 pt-1">
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