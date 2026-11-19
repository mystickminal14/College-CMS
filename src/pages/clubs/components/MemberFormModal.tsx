import React, { useContext, useState } from "react";
import { Briefcase, Check, Linkedin, Loader2, User } from "lucide-react";
import InputField from "../../../utils/InputField";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import type { ClubMember } from "../model/ClubModel";
import { useSaveClubMember, useUploadMemberPhoto } from "../hooks/useClubMembers";
import { useGetClubNames } from "../hooks/useClubs";
import ModalShell from "./ModalShell";
import ImagePicker from "./ImagePicker";
import ClubTextEditor from "./ClubTextEditor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: ClubMember | null;
  defaultClubId?: number;
}

const empty = (clubId = 0): ClubMember => ({
  clubId,
  name: "",
  designation: "",
  semester: null,
  pastExperiences: "",
  linkedIn: "",
  isPresident: false,
});

const steps = ["Basic details", "Photo"];

const MemberForm: React.FC<Omit<Props, "isOpen">> = ({ onClose, member, defaultClubId }) => {
  const { showToast } = useContext(AppContext)!;
  const saveMutation = useSaveClubMember();
  const photoMutation = useUploadMemberPhoto();
  // Fetched when the form opens so a club added a moment ago is always listed.
  const { data: clubRes, isLoading: clubsLoading, isError: clubsError, refetch } = useGetClubNames({ refetchOnMount: "always" });
  const clubs = clubRes?.data ?? [];

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<ClubMember>(member ? { ...empty(), ...member } : empty(defaultClubId));
  // Set once the basic details exist on the server; the photo is attached to it.
  const [saved, setSaved] = useState<ClubMember | null>(member);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(member?.image ? `${IMAGE_URL}${member.image}` : null);

  const set = <K extends keyof ClubMember>(key: K, value: ClubMember[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const pick = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clubId) return showToast("Club is required", "warn");
    if (!form.name.trim()) return showToast("Name is required", "warn");
    if (!form.designation.trim()) return showToast("Designation is required", "warn");
    if (form.linkedIn && !/^https?:\/\/([\w-]+\.)*linkedin\.com\//i.test(form.linkedIn.trim())) {
      return showToast("LinkedIn must be a valid linkedin.com URL", "warn");
    }

    const payload: ClubMember = {
      ...form,
      id: saved?.id,
      name: form.name.trim(),
      designation: form.designation.trim(),
      linkedIn: form.linkedIn?.trim(),
    };

    saveMutation.mutate(
      { member: payload },
      {
        onSuccess: (res) => {
          setSaved({ ...payload, ...res.data });
          setStep(2);
        },
      }
    );
  };

  const uploadPhoto = () => {
    if (!saved?.id || !file) return;
    photoMutation.mutate({ id: saved.id, image: file }, { onSuccess: onClose });
  };

  const busy = saveMutation.isPending;

  return (
    <ModalShell
      title={member ? "Edit Member" : "Add Club Member"}
      subtitle="Mark one member as President to show on the club page"
      onClose={onClose}
      wide
    >
      <ol className="flex items-center gap-3 mb-6">
        {steps.map((label, i) => {
          const n = (i + 1) as 1 | 2;
          const done = n === 1 && !!saved;
          const reachable = n === 1 || !!saved;
          return (
            <li key={label} className="flex items-center gap-2 flex-1">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => setStep(n)}
                className={`flex items-center gap-2 text-sm font-medium ${
                  step === n ? "text-[#135EAB]" : "text-gray-500"
                } disabled:cursor-not-allowed`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step === n ? "bg-[#135EAB] text-white" : done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {done && step !== n ? <Check className="w-4 h-4" /> : n}
                </span>
                {label}
              </button>
              {i === 0 && <span className="flex-1 h-px bg-gray-200" />}
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <form onSubmit={submitDetails} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm">Club <span className="text-red-500">*</span></label>
            <select
              className="border rounded px-3 py-2 dark:bg-gray-800"
              value={form.clubId || ""}
              onChange={(e) => set("clubId", Number(e.target.value))}
              disabled={busy || clubsLoading}
            >
              <option value="">{clubsLoading ? "Loading clubs..." : "Select Club"}</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {clubsError && (
              <p className="mt-1 text-xs text-red-600">
                Could not load clubs.{" "}
                <button type="button" className="underline" onClick={() => refetch()}>Retry</button>
              </p>
            )}
            {!clubsLoading && !clubsError && clubs.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">No clubs yet. Add a club in the Clubs tab first.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField icon={<User className="w-5 h-5" />} label="Name" field="name" value={form.name} onChange={(_, v) => set("name", v)} placeholder="Full name" required isSubmitting={busy} />
            <InputField icon={<Briefcase className="w-5 h-5" />} label="Designation" field="designation" value={form.designation} onChange={(_, v) => set("designation", v)} placeholder="President / Vice President" required isSubmitting={busy} />
            <InputField icon={<Linkedin className="w-5 h-5" />} label="LinkedIn Profile" field="linkedIn" value={form.linkedIn ?? ""} onChange={(_, v) => set("linkedIn", v)} placeholder="https://linkedin.com/in/username" isSubmitting={busy} />
            <InputField label="Current Semester" field="semester" type="number" value={form.semester ? String(form.semester) : ""} onChange={(_, v) => set("semester", v ? Number(v) : null)} placeholder="6" isSubmitting={busy} />
          </div>

          <ClubTextEditor label="Past Experiences" value={form.pastExperiences ?? ""} onChange={(v) => set("pastExperiences", v)} placeholder="Vice-President of TechClub (2023-2024), LBEF Hackathon Winner" disabled={busy} />

          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer">
            <input type="checkbox" checked={!!form.isPresident} onChange={(e) => set("isPresident", e.target.checked)} disabled={busy} className="w-4 h-4" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              This member is the club President (replaces the current President, if any)
            </span>
          </label>

          <button type="submit" disabled={busy} className="w-full px-6 py-3 bg-[#135EAB] text-white rounded-xl disabled:opacity-60">
            {busy ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : saved ? "Update & Continue" : "Save & Continue"}
          </button>
        </form>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Details saved for <b>{saved?.name}</b>. Add a photo now, or skip and add it later by editing the member.
          </p>

          <ImagePicker
            label="Photo"
            width={800}
            height={800}
            minWidth={400}
            minHeight={400}
            preview={preview}
            onChange={pick}
            onRemove={() => {
              setFile(null);
              setPreview(saved?.image ? `${IMAGE_URL}${saved.image}` : null);
            }}
            onError={(m) => showToast(m, "warn")}
          />

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} disabled={photoMutation.isPending} className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 dark:text-gray-200">
              Back
            </button>
            <button type="button" onClick={onClose} disabled={photoMutation.isPending} className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 dark:text-gray-200">
              {file ? "Cancel" : "Skip / Done"}
            </button>
            <button type="button" onClick={uploadPhoto} disabled={!file || photoMutation.isPending} className="flex-1 px-6 py-3 bg-[#135EAB] text-white rounded-xl disabled:opacity-60">
              {photoMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Upload Photo"}
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

// The form is mounted per open so its state always starts from the current member.
const MemberFormModal: React.FC<Props> = ({ isOpen, ...rest }) => (isOpen ? <MemberForm {...rest} /> : null);

export default MemberFormModal;
