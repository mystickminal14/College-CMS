import React, { useState, useEffect, useContext } from "react";
import {
    X,
    Check,
    Plus,
    Loader2,
    Cog,
    UserCircle,
} from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Achivement } from "../model/AchivementModel";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    achivement?: Achivement;
    isEdit?: boolean;
    mutation?: UseMutationResult<any, any, Achivement>; // For Add
    editMutation?: UseMutationResult<any, any, Partial<Achivement>>; // For Edit
}

interface FormData {
    achivement: string;
}

const AddEditAchivementModal: React.FC<Props> = ({
    isOpen,
    onClose,
    achivement,
    isEdit,
    mutation,
    editMutation
}) => {
    const appContext = useContext(AppContext);
    if (!appContext) throw new Error("AppContext missing");
    const { showToast } = appContext;

    const [formData, setFormData] = useState<FormData>({
        achivement: "",
    });

    useEffect(() => {
        if (isOpen && isEdit && achivement) {
            setFormData({
                achivement: achivement.achivement ?? "",
            });
        } else if (isOpen) {
            resetForm();
        }
    }, [isOpen, achivement, isEdit]);

    if (!isOpen) return null;

    const resetForm = () => {
        setFormData({
            achivement: "",
        });
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        if (!isEdit) {
            if (!formData.achivement.trim()) return error("Achivement is required");
        }
        return true;
    };

    const error = (msg: string) => {
        showToast(msg, "error");
        return false;
    };

    // ADD
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mutation || !validate()) return;

        mutation.mutate(formData, {
            onSuccess: () => {
                resetForm();
                onClose();
            }
        });
    };

    // EDIT
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editMutation || !achivement) return;

        const payload: Partial<Achivement> = { id: achivement.id };

        if (formData.achivement !== achivement?.achivement) {
            payload.achivement = formData.achivement;
        }

        editMutation.mutate(payload, {
            onSuccess: () => {
                resetForm();
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md">
                <form
                    onSubmit={isEdit ? handleEdit : handleAdd}
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="bg-[#125DAA] p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                {isEdit ? (
                                    <Cog className="w-6 h-6 text-white" />
                                ) : (
                                    <Plus className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {isEdit ? "Edit Achivement" : "Add New Achivement"}
                                </h2>
                                <p className="text-white/80 text-sm mt-1">
                                    {isEdit
                                        ? "Update achivement information"
                                        : "Create a new achivement account"}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="p-6 space-y-5">
                        <InputField
                            icon={<UserCircle className="w-4 h-4 text-[#125DAA]" />}
                            label="Achivement"
                            value={formData.achivement}
                            onChange={(v: string) => handleChange("achivement", v)}
                            placeholder="LBEF college has accomplished..."
                            required={!isEdit}
                        />
                    </div>

                    {/* FOOTER */}
                    <div className="p-6 flex justify-end space-x-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isEdit ? editMutation?.isPending : mutation?.isPending}
                            className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                                isEdit
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-[#125DAA] hover:bg-[#0f4a8c]"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {(isEdit ? editMutation?.isPending : mutation?.isPending) ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>{isEdit ? "Updating..." : "Creating..."}</span>
                                </>
                            ) : isEdit ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Update Achivement</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>Create Achivement</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({
    icon,
    label,
    value,
    onChange,
    placeholder,
    required = false
}: any) => (
    <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {icon}
            <span>{label}{required && " *"}</span>
        </label>
        <div className="relative">
            <textarea
                rows={4}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#125DAA] focus:border-transparent resize-none"
            />
            <div className="absolute left-3 top-3">
                {icon}
            </div>
        </div>
    </div>
);

export default AddEditAchivementModal;
