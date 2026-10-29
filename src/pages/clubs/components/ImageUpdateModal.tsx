import React, { useContext, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import ModalShell from "./ModalShell";
import ImagePicker from "./ImagePicker";

interface Props {
  isOpen: boolean;
  title: string;
  currentImage?: string | null;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isPending: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

const UpdateImage: React.FC<Omit<Props, "isOpen">> = ({ title, currentImage, isPending, onClose, onSave, ...size }) => {
  const { showToast } = useContext(AppContext)!;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage ? `${IMAGE_URL}${currentImage}` : null);

  const pick = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <ModalShell title={title} subtitle="Only the image changes" onClose={onClose}>
      <div className="space-y-5">
        <ImagePicker
          label="Image"
          preview={preview}
          onChange={pick}
          onRemove={() => {
            setFile(null);
            setPreview(currentImage ? `${IMAGE_URL}${currentImage}` : null);
          }}
          onError={(m) => showToast(m, "warn")}
          {...size}
        />
        <button
          type="button"
          disabled={!file || isPending}
          onClick={() => file && onSave(file)}
          className="w-full px-6 py-3 bg-[#135EAB] text-white rounded-xl disabled:opacity-60"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Update Image"}
        </button>
      </div>
    </ModalShell>
  );
};

// Mounted per open so the preview always starts from the current image.
const ImageUpdateModal: React.FC<Props> = ({ isOpen, ...rest }) => (isOpen ? <UpdateImage {...rest} /> : null);

export default ImageUpdateModal;
