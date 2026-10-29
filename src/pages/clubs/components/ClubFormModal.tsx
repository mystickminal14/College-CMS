import React, { useContext, useState } from "react";
import { Link2, Loader2, Users } from "lucide-react";
import InputField from "../../../utils/InputField";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import type { Club } from "../model/ClubModel";
import { useSaveClub } from "../hooks/useClubs";
import ModalShell from "./ModalShell";
import ImagePicker from "./ImagePicker";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  club: Club | null;
}

const ClubForm: React.FC<{ onClose: () => void; club: Club | null }> = ({ onClose, club }) => {
  const { showToast } = useContext(AppContext)!;
  const mutation = useSaveClub();

  const [name, setName] = useState(club?.name ?? "");
  const [mission, setMission] = useState(club?.mission ?? "");
  const [vision, setVision] = useState(club?.vision ?? "");
  const [joinFormUrl, setJoinFormUrl] = useState(club?.joinFormUrl ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(club?.image ? `${IMAGE_URL}${club.image}` : null);

  const pick = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return showToast("Club name is required", "warn");
    if (joinFormUrl.trim() && !/^https:\/\//i.test(joinFormUrl.trim())) {
      return showToast("Join form must be a valid https:// link", "warn");
    }
    mutation.mutate(
      {
        club: { id: club?.id, name: name.trim(), mission: mission.trim(), vision: vision.trim(), joinFormUrl: joinFormUrl.trim() },
        image: file,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <ModalShell title={club ? "Edit Club" : "Add New Club"} subtitle="Name, logo, mission, vision and join form" onClose={onClose}>
      <form onSubmit={submit} className="space-y-5">
        <InputField
          icon={<Users className="w-5 h-5" />}
          label="Club Name"
          field="name"
          value={name}
          onChange={(_, v) => setName(v)}
          placeholder="LBEF IT Club"
          required
          isSubmitting={mutation.isPending}
        />
        <InputField label="Mission" field="mission" type="textarea" rows={3} value={mission} onChange={(_, v) => setMission(v)} placeholder="What the club does and how" isSubmitting={mutation.isPending} />
        <InputField label="Vision" field="vision" type="textarea" rows={3} value={vision} onChange={(_, v) => setVision(v)} placeholder="What the club wants to become" isSubmitting={mutation.isPending} />
        <InputField
          icon={<Link2 className="w-5 h-5" />}
          label="Join Now (Google Form link)"
          field="joinFormUrl"
          value={joinFormUrl}
          onChange={(_, v) => setJoinFormUrl(v)}
          placeholder="https://forms.gle/..."
          isSubmitting={mutation.isPending}
        />
        <ImagePicker
          label="Club Image / Logo"
          width={600}
          height={600}
          minWidth={300}
          minHeight={300}
          preview={preview}
          onChange={pick}
          onRemove={() => {
            setFile(null);
            setPreview(null);
          }}
          onError={(m) => showToast(m, "warn")}
        />
        {club?.image && !preview && (
          <p className="text-xs text-gray-500">The current image stays unless you upload a new one.</p>
        )}
        <button type="submit" disabled={mutation.isPending} className="w-full px-6 py-3 bg-[#135EAB] text-white rounded-xl disabled:opacity-60">
          {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : club ? "Update Club" : "Add Club"}
        </button>
      </form>
    </ModalShell>
  );
};

// The form is mounted per open so its state always starts from the current club.
const ClubFormModal: React.FC<Props> = ({ isOpen, ...rest }) => (isOpen ? <ClubForm {...rest} /> : null);

export default ClubFormModal;
