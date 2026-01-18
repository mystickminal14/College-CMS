import React, { useState } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { Connects } from "../model/Connects";
import ConnectPdfUploadForm from "./ConnectPdfUpload";
import ConnectImageStep from "./ConnectImageUpload";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  createConnectMutation: UseMutationResult<
    ApiResponse<Connects>,
    ApiErrorResponse,
    {
      issue: string;
      duration: string;
      volumne: string;
      file: File;
    }
  >;

  uploadImageMutation: UseMutationResult<
    ApiResponse<Connects>,
    ApiErrorResponse,
    { id: number; image: File }
  >;
}

const ConnectUploadWizard: React.FC<Props> = ({
  isOpen,
  onClose,
  createConnectMutation,
  uploadImageMutation,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [connectId, setConnectId] = useState<number | null>(null);

  return (
    <>
      {/* STEP 1 – PDF */}
      {step === 1 && (
        <ConnectPdfUploadForm
          isOpen={isOpen}
          onClose={onClose}
          createConnectMutation={{
            ...createConnectMutation,
            mutate: (data, options) =>
              createConnectMutation.mutate(data, {
                ...options,
                onSuccess: (res) => {
                  const id = res.data?.id;
                  if (id) {
                    setConnectId(id);
                    setStep(2);
                  } else {
                    onClose();
                  }
                },
              }),
          }}
        />
      )}

      {/* STEP 2 – IMAGE */}
      {step === 2 && isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-4 flex flex-col" style={{ maxHeight: "75vh" }}>
            <ConnectImageStep
              connectId={connectId}
              uploadImageMutation={uploadImageMutation}
              onBack={() => setStep(1)}
              onFinish={() => {
                setStep(1);
                setConnectId(null);
                onClose();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectUploadWizard;
