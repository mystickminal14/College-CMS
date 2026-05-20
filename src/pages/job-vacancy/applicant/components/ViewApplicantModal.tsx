import { useState } from "react";
import { X, Copy, Check, FileText, ExternalLink } from "lucide-react";
import { IMAGE_URL } from "../../../../constants";
import type { ApplicationStatus, JobApplication } from "../model/ApplicantModel";

interface Props {
  applicant: JobApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  SHORTLISTED: "bg-purple-100 text-purple-800",
  REJECTED: "bg-red-100 text-red-800",
  HIRED: "bg-green-100 text-green-800",
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      title="Copy"
      className={`ml-2 p-1 rounded transition-colors shrink-0 ${
        copied
          ? "text-green-600 bg-green-50"
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide sm:w-40 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  );
}

export default function ViewApplicantModal({ applicant: a, isOpen, onClose }: Props) {
  if (!isOpen || !a) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const sourceLabel: Record<string, string> = {
    COMPANY_WEBSITE: "Company Website",
    SOCIAL_MEDIA: "Social Media",
    EMPLOYEE_REFERRAL: "Employee Referral",
    JOB_PORTAL: "Job Portal",
    OTHER: a.heardFromOther ?? "Other",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{a.fullName}</h2>
            {a.vacancy?.designation && (
              <p className="text-sm text-gray-500 mt-0.5">
                Applied for{" "}
                <span className="font-semibold text-blue-600">{a.vacancy.designation}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition ml-3 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {/* Status + Applied date */}
          <div className="flex items-center gap-3 mb-4">
            {a.applicationStatus && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  STATUS_COLORS[a.applicationStatus as ApplicationStatus]
                }`}
              >
                {a.applicationStatus}
              </span>
            )}
            <span className="text-xs text-gray-400">
              Applied on {formatDate(a.appliedAt)}
            </span>
          </div>

          {/* Contact highlights */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
            {a.email && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-800">{a.email}</p>
                </div>
                <CopyButton value={a.email} />
              </div>
            )}
            {a.phone && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-800">{a.phone}</p>
                </div>
                <CopyButton value={a.phone} />
              </div>
            )}
            {a.contactNumber && a.contactNumber !== a.phone && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                    Contact No.
                  </p>
                  <p className="text-sm font-medium text-gray-800">{a.contactNumber}</p>
                </div>
                <CopyButton value={a.contactNumber} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="mb-4">
            <Row label="Date of Birth" value={formatDate(a.dateOfBirth)} />
            <Row
              label="Gender"
              value={a.gender.charAt(0) + a.gender.slice(1).toLowerCase()}
            />
            <Row label="Nationality" value={a.nationality} />
            <Row
              label="Marital Status"
              value={a.maritalStatus.charAt(0) + a.maritalStatus.slice(1).toLowerCase()}
            />
            <Row label="Qualification" value={a.highestQualification} />
            {a.professionalCertifications && (
              <Row label="Certifications" value={a.professionalCertifications} />
            )}
            <Row label="Address" value={a.currentAddress} />
            <Row
              label="Heard From"
              value={sourceLabel[a.heardFrom] ?? a.heardFrom}
            />
          </div>

          {/* Resume */}
          {a.resumeUrl && (
            <button
              onClick={() => window.open(IMAGE_URL + a.resumeUrl, "_blank")}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-semibold transition"
            >
              <FileText className="w-4 h-4" />
              View Resume
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
