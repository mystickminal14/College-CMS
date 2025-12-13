import React, { useState, useEffect } from "react";
import { X, Lock, RefreshCw, Eye, EyeOff, Loader2 } from "lucide-react";
import type { User } from "../model/UserModel";
import useResetPassword from "../hooks/useResetPassword";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
}

const ResetPasswordModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const mutation = useResetPassword();

    useEffect(() => {
        if (isOpen && user) {
            setPassword("");
            setConfirmPassword("");
            setError("");
        }
    }, [isOpen, user]);

    if (!isOpen || !user) return null;

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let generated = '';
        for (let i = 0; i < 12; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generated);
        setConfirmPassword(generated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!password) {
            setError("Password is required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        if (user.id) {
            mutation.mutate(
                { id: user.id, password },
                {
                    onSuccess: () => onClose(),
                }
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="bg-[#1a7cd3] p-6 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Reset Password</h2>
                                <p className="text-white/80 text-sm mt-1">Set a new password for user</p>
                            </div>
                        </div>
                        <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Info */}
                        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">
                                Resetting password for <span className="font-semibold">{user.fullname}</span>
                            </p>
                            <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                                The user will need to use this password to login next time
                            </p>
                        </div>

                        <div className="flex justify-end mb-4">
                            <button
                                type="button"
                                onClick={generatePassword}
                                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-1"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Generate Password</span>
                            </button>
                        </div>

                        {/* Password Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a7cd3] focus:border-transparent pr-10"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a7cd3] focus:border-transparent"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                </div>
                            )}
                        </div>

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
                                disabled={mutation.isPending}
                                className="flex-1 px-4 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Resetting...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" /> Reset Password
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

export default ResetPasswordModal;
