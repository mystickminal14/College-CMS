import React from "react";
import ImageUpload from "../../lbef-connect/components/ImageUpload";

interface Props {
  GallerysName: string;
  imagePreview: string | null;
  onSubmit: (file: File) => void;
  onSkip: () => void;
  isUploading?: boolean;
}

const GallerysImageUploadForm: React.FC<Props> = ({
  GallerysName,
  imagePreview,
  onSubmit,
  onSkip,
  isUploading = false,
}) => {
  return (
    <ImageUpload
      initialImage={imagePreview}
      label={`Add image for ${GallerysName}`}
      onUpload={onSubmit}
      onSkip={onSkip}
      isUploading={isUploading}
    />
  );
};

export default GallerysImageUploadForm;
