import React, { useState, useEffect, useContext } from "react";
import {
    User as UserIcon,
    UserCircle,
    Mail,
    Lock,
    Shield,
    X,
    UserCog,
    UserPlus,
    Eye,
    EyeOff,
    Loader2,
    Check,
    Plus,
} from "lucide-react";
import type {
    Role,
    User as UserType,
    PermissionNameType,
} from "../model/UserModel";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: UserType;
    isEdit?: boolean;
    mutation?: UseMutationResult<any, any, UserType>;
    editMutation?: UseMutationResult<any, any, Partial<UserType>>;
}

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    permissions: PermissionNameType[];
}

export const ALL_PERMISSIONS: PermissionNameType[] = [
  "USERS",
  "COURSES",
  "TEAMS",
  "ALUMNI",
  "PLANNER_COURSE",    
  "SCHOLARSHIP",// ✅ added
  "NEWS",
  "ALMUNI_FORM",       // ✅ added
  "JOURNALS",
  "EDITORIAL_BOARD",
  "CONNECT",
  "GALLERY",
  "NOTICE",
  "CONTACT",
  "HOLIDAY",
  "RECOGNITION",
  "ACHIEVEMENT",
  "INTAKE",
  "DOCUMENTS",
  "ACADEMIC_PLANNER",
  "FEE_PLANNER",
  "DOWNLOADS",
];


const AddEditUserModal: React.FC<Props> = ({
    isOpen,
    onClose,
    user,
    isEdit,
    mutation,
    editMutation,
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
        permissions: [],
    });

    const [showPassword, setShowPassword] = useState(false);

    console.log(user)
    useEffect(() => {
        if (isOpen && isEdit && user) {
            setFormData({
                fullname: user.fullname ?? "",
                username: user.username ?? "",
                email: user.email ?? "",
                password: "",
                role: user.role as Role,
                permissions:
                    user.permissions?.map(
                        (p: any) => p.permission.name as PermissionNameType
                    ) ?? [],
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
            permissions: [],
        });
        setShowPassword(false);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const togglePermission = (permission: PermissionNameType) => {
        setFormData(prev => {
            const exists = prev.permissions.includes(permission);

            if (exists && prev.permissions.length === 1) {
                showToast("At least one permission must be selected", "error");
                return prev;
            }

            return {
                ...prev,
                permissions: exists
                    ? prev.permissions.filter(p => p !== permission)
                    : [...prev.permissions, permission],
            };
        });
    };

    const isAllSelected =
        formData.permissions.length === ALL_PERMISSIONS.length;

    const toggleSelectAll = () => {
        setFormData(prev => ({
            ...prev,
            permissions: isAllSelected
                ? [ALL_PERMISSIONS[0]]
                : [...ALL_PERMISSIONS],
        }));
    };


    const validate = () => {
        if (!isEdit) {
            // For new users, validate all required fields
            if (!formData.fullname.trim()) return error("Full Name is required");
            if (!formData.username.trim()) return error("Username is required");
            if (!formData.email.trim()) return error("Email is required");
            if (!formData.password.trim()) return error("Password is required");
        } else {
            // For editing, only validate fields that are being changed
            if (formData.fullname.trim() === "") return error("Full Name is required");
            if (formData.username.trim() === "") return error("Username is required");
            if (formData.email.trim() === "") return error("Email is required");
        }

        // Always validate permissions (should already be pre-filled in edit mode)
        if (formData.permissions.length === 0) {
            return error("Select at least one permission");
        }

        return true;
    };

    const error = (msg: string) => {
        showToast(msg, "error");
        return false;
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mutation || !validate()) return;

        mutation.mutate(formData, {
            onSuccess: () => {
                resetForm();
                onClose();
            },
        });
    };


    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editMutation || !user) return;

        const payload: Partial<UserType> = { id: user.id };

        if (formData.fullname !== user.fullname)
            payload.fullname = formData.fullname;
        if (formData.username !== user.username)
            payload.username = formData.username;
        if (formData.email !== user.email)
            payload.email = formData.email;
        if (formData.role !== user.role)
            payload.role = formData.role;
        if (formData.password.trim() !== "")
            payload.password = formData.password;

        if (
            JSON.stringify(formData.permissions) !==
            JSON.stringify(user.permissions ?? [])
        ) {
            payload.permissions = formData.permissions;
        }

        editMutation.mutate(payload, {
            onSuccess: () => {
                resetForm();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md max-h-[90vh]">
                <form
                    onSubmit={isEdit ? handleEdit : handleAdd}
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                    style={{ maxHeight: "calc(90vh - 40px)" }}
                >
                    {/* HEADER */}
                    <div className="bg-[#125DAA] p-6 flex items-center justify-between shrink-0">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                {isEdit ? (
                                    <UserCog className="w-6 h-6 text-white" />
                                ) : (
                                    <UserPlus className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {isEdit ? "Edit User" : "Add New User"}
                                </h2>
                                <p className="text-white/80 text-sm mt-1">
                                    {isEdit
                                        ? "Update user information"
                                        : "Create a new user account"}
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

                    {/* BODY - Scrollable area */}
                    <div className="p-6 space-y-5 overflow-y-auto grow">
                        <InputField
                            icon={<UserCircle className="w-4 h-4 text-[#125DAA]" />}
                            label="Full Name"
                            value={formData.fullname}
                            onChange={(v: string) => handleChange("fullname", v)}
                            placeholder="John Doe"
                            required={true}
                        />

                        <InputField
                            icon={<UserIcon className="w-4 h-4 text-[#125DAA]" />}
                            label="Username"
                            value={formData.username}
                            onChange={(v: string) => handleChange("username", v)}
                            placeholder="johndoe"
                            required={true}
                        />

                        <InputField
                            icon={<Mail className="w-4 h-4 text-[#125DAA]" />}
                            label="Email"
                            value={formData.email}
                            onChange={(v: string) => handleChange("email", v)}
                            placeholder="john@example.com"
                            type="email"
                            required={true}
                        />

                        {!isEdit && (
                            <>
                                {/* PASSWORD */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium">
                                        <Lock className="w-4 h-4 text-[#125DAA]" />
                                        <span>Password *</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={e =>
                                                handleChange("password", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pl-10 pr-10 border rounded-lg"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                </div>

                                {/* ROLE */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium">
                                        <Shield className="w-4 h-4 text-[#125DAA]" />
                                        <span>Role *</span>
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={e => handleChange("role", e.target.value)}
                                        className="w-full px-4 py-2.5 border rounded-lg"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="MANAGER">MANAGER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* MANAGE ACCESS */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-[#125DAA]" />
                                    Manage Access
                                </h3>

                                <button
                                    type="button"
                                    onClick={toggleSelectAll}
                                    className="text-xs font-medium text-[#125DAA] hover:underline"
                                >
                                    {isAllSelected ? "Unselect All" : "Select All"}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {ALL_PERMISSIONS.map(permission => (
                                    <label
                                        key={permission}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.includes(permission)} // ✅ This will be true for user's existing permissions
                                            onChange={() => togglePermission(permission)}
                                        />
                                        {permission.replaceAll("_", " ")}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="p-6 flex justify-end space-x-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 shrink-0">
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

const InputField = ({
    icon,
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    required = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
}) => (
    <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium">
            {icon}
            <span>
                {label}
                {required && " *"}
            </span>
        </label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border rounded-lg"
            required={required}
        />
    </div>
);

export default AddEditUserModal;