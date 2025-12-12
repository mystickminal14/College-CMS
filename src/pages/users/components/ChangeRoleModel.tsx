import React, { useState, useEffect } from "react";
import type { Role, User } from "../model/UserModel";
import { FaUserCog, FaShieldAlt } from "react-icons/fa";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import useUpdateRole from "../hooks/useUpdateRole";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

const ChangeRoleModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [role, setRole] = useState<Role>("USER");
  const mutation = useUpdateRole();

  useEffect(() => {
    if (user) setRole(user.role as Role);
    else setRole("USER");
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.id) {
      mutation.mutate(
        { id: user.id, role },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-[#125DAA] p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-lg p-1">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change User Role</h2>
                <p className="text-white/80 text-sm mt-1">Update role for {user?.fullname}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
              <AiOutlineClose className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaUserCog className="w-4 h-4 text-[#125DAA]" />
                <span>Select Role</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#125DAA] focus:border-transparent"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2.5 rounded-lg bg-[#125DAA] hover:bg-[#0f4a8c] text-white font-medium text-sm transition-colors duration-200 flex items-center space-x-2"
              >
                <AiOutlineSave className="w-4 h-4" />
                <span>{mutation.isPending ? "Updating..." : "Update Role"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
