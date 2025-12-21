import React from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { Connects } from "../model/Connects";
import ImageUpload from "./ImageUpload";

interface Props {
  connectId: number;
  isOpen: boolean;
  onClose: () => void;
  updateImageMutation: UseMutationResult<ApiResponse<Connects>, ApiErrorResponse, { id: number; image: File }>;
  currentImage?: string | null;
}

const UpdateConnectImage: React.FC<Props> = ({ connectId, isOpen, onClose, updateImageMutation, currentImage }) => {
  if (!isOpen) return null;

  const handleUpload = (file: File) => {
    updateImageMutation.mutate({ id: connectId, image: file }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <ImageUpload
          initialImage={currentImage}
          label="Update Cover Image"
          onUpload={handleUpload}
          isUploading={updateImageMutation.isPending}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default UpdateConnectImage;
