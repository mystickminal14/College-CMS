import React, { useState, useEffect } from "react";
import { X, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import type { Teams } from "../model/TeamsModel";
import useChangeTeamOrder from "../hooks/useChangeOrder";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  team?: Teams | null;
  maxOrder: number;
}

const ChangeTeamOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  team,
  maxOrder,
}) => {
  const [newOrder, setNewOrder] = useState<number>(1);
  const changeOrderMutation = useChangeTeamOrder();

  useEffect(() => {
    if (isOpen && team) {
      setNewOrder(team.order ?? 1);
    }
  }, [isOpen, team]);

  if (!isOpen || !team) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newOrder < 1 || newOrder > maxOrder) return;

    changeOrderMutation.mutate(
      { id: team.id!, newOrder },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">
              Change Order – {team.name}
            </h2>
            <button onClick={onClose} type="button">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setNewOrder((o) => Math.max(1, o - 1))}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <ArrowDown />
              </button>

              <input
                type="number"
                min={1}
                max={maxOrder}
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                className="w-20 text-center border rounded py-1"
              />

              <button
                type="button"
                onClick={() => setNewOrder((o) => Math.min(maxOrder, o + 1))}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <ArrowUp />
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Allowed range: 1 – {maxOrder}
            </p>
          </div>

          {/* FOOTER */}
          <div className="p-5 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={changeOrderMutation.isPending}
              className="flex-1 bg-[#1a7cd3] text-white rounded py-2 flex items-center justify-center"
            >
              {changeOrderMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating...
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

export default ChangeTeamOrderModal;
