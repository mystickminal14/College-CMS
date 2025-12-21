import React from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { Connects } from "../model/Connects";
import ImageUpload from "./ImageUpload";

interface Props {
  connectId: number | null;
  uploadImageMutation: UseMutationResult<ApiResponse<Connects>, ApiErrorResponse, { id: number; image: File }>;
  onBack: () => void;
  onFinish: () => void;
}

const ConnectImageStep: React.FC<Props> = ({ connectId, uploadImageMutation, onBack, onFinish }) => {
  const handleUpload = (file: File) => {
    if (!connectId) {
      onFinish();
      return;
    }
    uploadImageMutation.mutate({ id: connectId, image: file }, { onSuccess: onFinish });
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-gray-600 hover:underline">← Back</button>
      <ImageUpload
        label="Upload Cover Image"
        onUpload={handleUpload}
        onSkip={onFinish}
        isUploading={uploadImageMutation.isPending}
      />
    </div>
  );
};

export default ConnectImageStep;
