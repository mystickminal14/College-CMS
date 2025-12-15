import React, { useState, useEffect, useContext } from "react";
import {
    User as UserIcon,
    UserCircle,
    Mail,
    Lock,
    Shield,
    X,
    Check,
    Plus,
    Loader2,
    UserCog,
    UserPlus,
    Eye,
    EyeOff
} from "lucide-react";
import type { Role, User as UserType } from "../model/UserModel";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: UserType;
    isEdit?: boolean;
    mutation?: UseMutationResult<any, any, UserType>; // For Add
    editMutation?: UseMutationResult<any, any, Partial<UserType>>; // For Edit
}

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}

const AddEditUserModal: React.FC<Props> = ({
    isOpen,
    onClose,
    user,
    isEdit,
    mutation,
    editMutation
}) => {
    const appContext = useContext(AppContext);
    if (!appContext) throw new Error("AppContext missing");
    const { showToast } = appContext;

    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        role: "MANAGER",
    });

    const [showPassword, setShowPassword] = useState(false);

    // Autofill when editing
    useEffect(() => {
        if (isOpen && isEdit && user) {
            setFormData({
                fullname: user.fullname ?? "",
                username: user.username ?? "",
                email: user.email ?? "",
                password: "",
                role: user.role as Role,
            });
        } else if (isOpen) {
            resetForm();
        }
    }, [isOpen, user, isEdit]);

    if (!isOpen) return null;

    const resetForm = () => {
        setFormData({
            fullname: "",
            username: "",
            email: "",
            password: "",
            role: "MANAGER",
        });
        setShowPassword(false);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        if (!isEdit) { // Only validate in Add mode
            if (!formData.fullname.trim()) return error("Full Name is required");
            if (!formData.username.trim()) return error("Username is required");
            if (!formData.email.trim()) return error("Email is required");
            if (!formData.password.trim()) return error("Password is required");
            if (!formData.role) return error("Role is required");
        }
        return true;
    };

    const error = (msg: string) => {
        showToast(msg, "error");
        return false;
    };

    // HANDLE ADD USER
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
        if (!editMutation || !user) return;

        const payload: Partial<UserType> = { id: user.id };

        if (formData.fullname !== user.fullname) payload.fullname = formData.fullname;
        if (formData.username !== user.username) payload.username = formData.username;
        if (formData.email !== user.email) payload.email = formData.email;
        if (formData.role !== user.role) payload.role = formData.role;
        if (formData.password.trim() !== "") payload.password = formData.password;

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
                                {isEdit ? <UserCog className="w-6 h-6 text-white" /> : <UserPlus className="w-6 h-6 text-white" />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{isEdit ? "Edit User" : "Add New User"}</h2>
                                <p className="text-white/80 text-sm mt-1">{isEdit ? "Update user information" : "Create a new user account"}</p>
                            </div>
                        </div>
                        <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <InputField icon={<UserCircle className="w-4 h-4 text-[#125DAA]" />} label="Full Name" value={formData.fullname} onChange={(v:string) => handleChange("fullname", v)} placeholder="John Doe" required={!isEdit} />
                        <InputField icon={<UserIcon className="w-4 h-4 text-[#125DAA]" />} label="Username" value={formData.username} onChange={(v:string) => handleChange("username", v)} placeholder="johndoe" required={!isEdit} />
                        <InputField icon={<Mail className="w-4 h-4 text-[#125DAA]" />} label="Email" value={formData.email} onChange={(v: string) => handleChange("email", v)} placeholder="john@example.com" type="email" required={!isEdit} />

                        {!isEdit && (
                        <>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <Lock className="w-4 h-4 text-[#125DAA]" />
                                    <span>Password *</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#125DAA] focus:border-transparent pr-10" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>  <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <Shield className="w-4 h-4 text-[#125DAA]" />
                                <span>Role *</span>
                            </label>
                            <div className="relative">
                                <select value={formData.role} onChange={(e) => handleChange("role", e.target.value)} className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#125DAA] focus:border-transparent appearance-none">
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div></>
                        )}

                      
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
                                    <span>Update User</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>Create User</span>
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

export default AddEditUserModal;
