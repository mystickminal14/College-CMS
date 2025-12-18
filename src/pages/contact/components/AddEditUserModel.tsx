import React, { useState, useEffect, useContext } from "react";
import {
    Mail,
    X,
    Check,
    Plus,
    Loader2,
    Cog,
    UserCircle,
    UserIcon,
} from "lucide-react";
import type {  Contact as ContactType } from "../model/ContactModel";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";
import { MdDepartureBoard } from "react-icons/md";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    contact?: ContactType;
    isEdit?: boolean;
    mutation?: UseMutationResult<any, any, ContactType>; // For Add
    editMutation?: UseMutationResult<any, any, Partial<ContactType>>; // For Edit
}

interface FormData {
    name: string;
    email: string;
    department: string;
    purpose: string;
}

const AddEditContactModal: React.FC<Props> = ({
    isOpen,
    onClose,
    contact,
    isEdit,
    mutation,
    editMutation
}) => {
    const appContext = useContext(AppContext);
    if (!appContext) throw new Error("AppContext missing");
    const { showToast } = appContext;

    const [formData, setFormData] = useState<FormData>({
        name: "",
        department: "",
        email: "",
        purpose: "",
    });


    useEffect(() => {
        if (isOpen && isEdit && contact) {
            setFormData({
                purpose: contact.purpose ?? "",
                name: contact.name ?? "",
                email: contact.email ?? "",
                department: contact.department??'',
            });
        } else if (isOpen) {
            resetForm();
        }
    }, [isOpen, contact, isEdit]);

    if (!isOpen) return null;

    const resetForm = () => {
        setFormData({
              name: "",
        department: "",
        email: "",
        purpose: "",
        });
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        if (!isEdit) { // Only validate in Add mode
            if (!formData.name.trim()) return error("Full Name is required");
            if (!formData.department.trim()) return error("Department is required");
            if (!formData.email.trim()) return error("Email is required");
            if (!formData.purpose.trim()) return error("Purpose is required");
        }
        return true;
    };

    const error = (msg: string) => {
        showToast(msg, "error");
        return false;
    };

    // HANDLE ADD CONTACT
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

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editMutation || !contact) return;

        const payload: Partial<ContactType> = { id: contact.id };

        if (formData.name !== contact.name) payload.name = formData.name;
        if (formData.purpose !== contact.purpose) payload.purpose = formData.purpose;
        if (formData.email !== contact.email) payload.email = formData.email;
        if (formData.department !== contact.department) payload.department = formData.department;

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
                    <div className="bg-[#125DAA] p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                {isEdit ? <Cog className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{isEdit ? "Edit Contact" : "Add New Contact"}</h2>
                                <p className="text-white/80 text-sm mt-1">{isEdit ? "Update contact information" : "Create a new contact account"}</p>
                            </div>
                        </div>
                        <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <InputField icon={<UserCircle className="w-4 h-4 text-[#125DAA]" />} label="Full Name" value={formData.name} onChange={(v:string) => handleChange("name", v)} placeholder="John Doe" required={!isEdit} />
                        <InputField icon={<UserIcon className="w-4 h-4 text-[#125DAA]" />} label="Purpose" value={formData.purpose} onChange={(v:string) => handleChange("purpose", v)} placeholder="Purpose" required={!isEdit} />
                        <InputField icon={<Mail className="w-4 h-4 text-[#125DAA]" />} label="Email" value={formData.email} onChange={(v: string) => handleChange("email", v)} placeholder="john@example.com" type="email" required={!isEdit} />
                        <InputField icon={<MdDepartureBoard className="w-4 h-4 text-[#125DAA]" />} label="Department" value={formData.department} onChange={(v: string) => handleChange("department", v)} placeholder="CEO" type="department" required={!isEdit} />

              

                      
                    </div>

                    {/* FOOTER */}
                    <div className="p-6 flex justify-end space-x-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-sm">
                            Cancel
                        </button>
                        <button type="submit" disabled={(isEdit ? editMutation?.isPending : mutation?.isPending)} className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${isEdit ? "bg-green-600 hover:bg-green-700" : "bg-[#125DAA] hover:bg-[#0f4a8c]"} disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {(isEdit ? editMutation?.isPending : mutation?.isPending) ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>{isEdit ? "Updating..." : "Creating..."}</span>
                                </>
                            ) : isEdit ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Update Contact</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>Create Contact</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ icon, label, value, onChange, type = "text", placeholder, required = false }: any) => (
    <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {icon}
            <span>{label}{required && " *"}</span>
        </label>
        <div className="relative">
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#125DAA] focus:border-transparent" />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
        </div>
    </div>
);

export default AddEditContactModal;
