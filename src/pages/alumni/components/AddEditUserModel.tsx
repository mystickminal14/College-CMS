import React, { useState, useEffect, useRef } from "react";
import {
    X,
    User,
    Briefcase,
    Calendar,
    GraduationCap,
    FileText,
    Image as ImageIcon,
    Upload,
    Loader2,
    UserPlus,
    UserCog,
    Check
} from "lucide-react";
import type { Alumni } from "../model/AlumniModel";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    alumni?: Alumni | null;
    isEdit?: boolean;
    onSave: (alumniData: Partial<Alumni>) => void;
    onImageUpload?: (alumniId: number, imageFile: File) => void;
    createMutation?: UseMutationResult<any, any, Partial<Alumni>>;
    updateMutation?: UseMutationResult<any, any, Partial<Alumni>>;
    updateImageMutation?: UseMutationResult<any, any, { id: number; image: File }>;
}

const AddAlumniWizardModal: React.FC<Props> = ({
    isOpen,
    onClose,
    alumni,
    isEdit = false,
    onSave,
    onImageUpload,
    createMutation,
    updateMutation,
    updateImageMutation
}) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        batch: "",
        course: "",
        story: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [createdAlumniId, setCreatedAlumniId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEdit && alumni) {
            setFormData({
                name: alumni.name || "",
                position: alumni.position || "",
                batch: alumni.batch || "",
                course: alumni.course || "",
                story: alumni.story || "",
            });
            if (alumni.image) {
                setImagePreview(alumni.image);
            }
            setStep(1);
        } else {
            resetForm();
        }
    }, [isEdit, alumni]);

    const resetForm = () => {
        setFormData({
            name: "",
            position: "",
            batch: "",
            course: "",
            story: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setCreatedAlumniId(null);
        setStep(1);
    };

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("Please select an image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("Image size should be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            alert("Name is required");
            return false;
        }
        if (!formData.position.trim()) {
            alert("Position is required");
            return false;
        }
        if (!formData.batch.trim()) {
            alert("Batch is required");
            return false;
        }
        if (!formData.course.trim()) {
            alert("Course is required");
            return false;
        }
        return true;
    };

    const handleSubmitStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep1()) return;

        if (isEdit && alumni?.id) {
            // Update existing alumni
            console.log("Updating alumni:", alumni.id, formData);
            if (onSave) {
                onSave(formData);
            }
            setStep(2); // Go to image step
        } else {
            // Create new alumni
            console.log("Creating new alumni:", formData);
            if (createMutation) {
                createMutation.mutate(formData, {
                    onSuccess: (res) => {
                        const newId = res?.data?.id || res?.id;
                        if (newId) {
                            console.log("Alumni created with ID:", newId);
                            setCreatedAlumniId(newId);
                            setStep(2);
                        }
                    }
                });
            } else if (onSave) {
                onSave(formData);
                // Simulate ID for demo
                const demoId = Math.floor(Math.random() * 1000);
                setCreatedAlumniId(demoId);
                setStep(2);
            }
        }
    };

    const handleSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (imageFile) {
            const alumniId = isEdit ? alumni?.id : createdAlumniId;
            if (alumniId) {
                console.log("Uploading image for alumni:", alumniId, imageFile);
                if (updateImageMutation) {
                    updateImageMutation.mutate({
                        id: alumniId,
                        image: imageFile
                    }, {
                        onSuccess: () => {
                            console.log("Image uploaded successfully");
                            resetForm();
                            onClose();
                        }
                    });
                } else if (onImageUpload) {
                    onImageUpload(alumniId, imageFile);
                    resetForm();
                    onClose();
                }
            }
        } else {
            // No image selected, just close
            console.log("No image selected, closing modal");
            resetForm();
            onClose();
        }
    };

    const handleSaveWithoutImage = () => {
        console.log("Saving without image");
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-linear-to-r from-[#135EAB] to-blue-600 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-white/20 rounded-xl">
                                    {isEdit ? (
                                        <UserCog className="w-7 h-7 text-white" />
                                    ) : (
                                        <UserPlus className="w-7 h-7 text-white" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {isEdit ? "Edit Alumni" : "Add New Alumni"}
                                    </h2>
                                    <p className="text-white/90 text-sm mt-1">
                                        {step === 1 ? "Step 1: Basic Information" : "Step 2: Upload Image"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center mt-6">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-white text-[#135EAB]' : 'bg-white/30 text-white'}`}>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className={`w-24 h-1 ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-white text-[#135EAB]' : 'bg-white/30 text-white'}`}>
                                    <span className="font-bold">2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="p-6 md:p-8">
                        {step === 1 ? (
                            <form onSubmit={handleSubmitStep1} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        icon={<User className="w-5 h-5" />}
                                        label="Full Name"
                                        value={formData.name}
                                        onChange={(value) => handleChange("name", value)}
                                        placeholder="John Doe"
                                        required
                                    />

                                    <InputField
                                        icon={<Briefcase className="w-5 h-5" />}
                                        label="Position"
                                        value={formData.position}
                                        onChange={(value) => handleChange("position", value)}
                                        placeholder="Software Engineer"
                                        required
                                    />

                                    <InputField
                                        icon={<Calendar className="w-5 h-5" />}
                                        label="Batch"
                                        value={formData.batch}
                                        onChange={(value) => handleChange("batch", value)}
                                        placeholder="2020"
                                        required
                                    />

                                    <InputField
                                        icon={<GraduationCap className="w-5 h-5" />}
                                        label="Course"
                                        value={formData.course}
                                        onChange={(value) => handleChange("course", value)}
                                        placeholder="Computer Science"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FileText className="w-5 h-5 text-[#135EAB]" />
                                        <span>Story / Bio (Optional)</span>
                                    </label>
                                    <textarea
                                        value={formData.story}
                                        onChange={(e) => handleChange("story", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] focus:border-transparent min-h-[120px]"
                                        placeholder="Share the alumni's story, achievements, or journey..."
                                        rows={4}
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={createMutation?.isPending || updateMutation?.isPending}
                                        className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {createMutation?.isPending || updateMutation?.isPending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Continue to Image Upload</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmitStep2} className="space-y-6">
                                <div className="text-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Upload Alumni Photo
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Add a professional photo for {formData.name}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative mb-6">
                                        <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700/50">
                                            {imagePreview ? (
                                                <>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        No image selected
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                        Recommended: 500×500px
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2 font-medium"
                                    >
                                        <Upload className="w-5 h-5" />
                                        <span>{imagePreview ? "Change Image" : "Choose Image"}</span>
                                    </button>

                                    {!imageFile && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                                            Image is optional. You can skip this step.
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        <span>Back to Details</span>
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={updateImageMutation?.isPending}
                                        className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {updateImageMutation?.isPending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Uploading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                <span>Save {imageFile ? 'with Image' : 'without Image'}</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSaveWithoutImage}
                                    className="w-full px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium"
                                >
                                    Skip Image Upload
                                </button>
                            </form>
                        )}
                    </div>
                </div>
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
    required = false,
    type = "text"
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
    type?: string;
}) => (
    <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="text-[#135EAB]">{icon}</span>
            <span>{label}{required && " *"}</span>
        </label>
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icon}
            </div>
        </div>
    </div>
);

export default AddAlumniWizardModal;