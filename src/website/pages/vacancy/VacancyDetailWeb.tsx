import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { APP_URL, IMAGE_URL } from "../../../constants";
import useGetVacancyById from "./hooks/useGetVacancyById";
import useApplyVacancy from "./hooks/useApplyVacancy";
import type { Gender, MaritalStatus, VacancySource } from "../../../pages/job-vacancy/applicant/model/ApplicantModel";

interface FormState {
  fullName: string;
  dateOfBirth: string;
  gender: Gender | "";
  nationality: string;
  highestQualification: string;
  professionalCertifications: string;
  maritalStatus: MaritalStatus | "";
  currentAddress: string;
  contactNumber: string;
  heardFrom: VacancySource | "";
  heardFromOther: string;
  resume: File | null;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  highestQualification: "",
  professionalCertifications: "",
  maritalStatus: "",
  currentAddress: "",
  contactNumber: "",
  heardFrom: "",
  heardFromOther: "",
  resume: null,
};

const VacancyDetailWeb = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading } = useGetVacancyById(id ?? "");
  const vacancy = data?.data;

  const { mutate: apply, isPending } = useApplyVacancy(id ?? "");

  const set = (key: keyof FormState, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("dateOfBirth", form.dateOfBirth);
    fd.append("gender", form.gender);
    fd.append("nationality", form.nationality);
    fd.append("highestQualification", form.highestQualification);
    if (form.professionalCertifications)
      fd.append("professionalCertifications", form.professionalCertifications);
    fd.append("maritalStatus", form.maritalStatus);
    fd.append("currentAddress", form.currentAddress);
    fd.append("contactNumber", form.contactNumber);
    fd.append("heardFrom", form.heardFrom);
    if (form.heardFrom === "OTHER" && form.heardFromOther)
      fd.append("heardFromOther", form.heardFromOther);
    if (form.resume) fd.append("resume", form.resume);

    apply(fd, {
      onSuccess: () => {
        setSubmitted(true);
        setForm(INITIAL_FORM);
      },
    });
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Open";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroTitleWithGif
          title="Job Vacancy Details"
          highlightedText="Vacancy"
          badgeText="Career Opportunities"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full mb-3" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Vacancy Not Found</h2>
          <button
            onClick={() => navigate("/vacancy")}
            className="mt-4 text-blue-600 underline text-sm"
          >
            Back to Vacancies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${vacancy.designation} | LBEF College Vacancies`}
        description={`Apply for ${vacancy.designation} at LBEF College. Location: ${vacancy.location}.`}
        url={`${APP_URL}/vacancy/${id}`}
      />

      <HeroTitleWithGif
        title={`Apply for ${vacancy.designation}`}
        highlightedText={vacancy.designation}
        subtitle={`${vacancy.location} · ${vacancy.timings}`}
        badgeText="Career Opportunities"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <button
          onClick={() => navigate("/vacancy")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all vacancies
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── LEFT: Vacancy Details ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 sticky top-28">
            {vacancy.posterUrl && (
              <img
                src={`${IMAGE_URL}${vacancy.posterUrl}`}
                alt={vacancy.designation}
                className="w-full h-52 object-cover rounded-lg mb-5"
              />
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                {vacancy.status}
              </span>
              {vacancy.employmentType && (
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  {vacancy.employmentType}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{vacancy.designation}</h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-700">Location</span>
                  <p>{vacancy.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-700">Timings</span>
                  <p>{vacancy.timings}</p>
                </div>
              </div>
              {vacancy.salary && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-700">Salary</span>
                    <p>{vacancy.salary}</p>
                  </div>
                </div>
              )}
              {vacancy.experienceRequired && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-700">Experience</span>
                    <p>{vacancy.experienceRequired}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-700">Application Period</span>
                  <p>
                    {formatDate(vacancy.applicationStartDate)} –{" "}
                    {formatDate(vacancy.applicationEndDate)}
                  </p>
                </div>
              </div>
            </div>

            {vacancy.description && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-2">About the Role</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {vacancy.description}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: Application Form ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Thank you for applying. We will review your application and get back to you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 underline text-sm"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-5">Application Form</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className={labelClass}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  {/* Date of Birth + Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={form.dateOfBirth}
                        onChange={(e) => set("dateOfBirth", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.gender}
                        onChange={(e) => set("gender", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Nationality + Marital Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nationality}
                        onChange={(e) => set("nationality", e.target.value)}
                        placeholder="e.g. Nepali"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Marital Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.maritalStatus}
                        onChange={(e) => set("maritalStatus", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select status</option>
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Highest Qualification */}
                  <div>
                    <label className={labelClass}>
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.highestQualification}
                      onChange={(e) => set("highestQualification", e.target.value)}
                      placeholder="e.g. Master's in Computer Science"
                      className={inputClass}
                    />
                  </div>

                  {/* Professional Certifications */}
                  <div>
                    <label className={labelClass}>Professional Certifications (optional)</label>
                    <input
                      type="text"
                      value={form.professionalCertifications}
                      onChange={(e) => set("professionalCertifications", e.target.value)}
                      placeholder="e.g. AWS Certified, PMP"
                      className={inputClass}
                    />
                  </div>

                  {/* Current Address */}
                  <div>
                    <label className={labelClass}>
                      Current Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={form.currentAddress}
                      onChange={(e) => set("currentAddress", e.target.value)}
                      placeholder="Your current address"
                      className={inputClass}
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className={labelClass}>
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.contactNumber}
                      onChange={(e) => set("contactNumber", e.target.value)}
                      placeholder="e.g. 98XXXXXXXX"
                      className={inputClass}
                    />
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label className={labelClass}>
                      How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.heardFrom}
                      onChange={(e) => set("heardFrom", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select source</option>
                      <option value="COMPANY_WEBSITE">Company Website</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="EMPLOYEE_REFERRAL">Employee Referral</option>
                      <option value="JOB_PORTAL">Job Portal</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {form.heardFrom === "OTHER" && (
                    <div>
                      <label className={labelClass}>Please specify</label>
                      <input
                        type="text"
                        value={form.heardFromOther}
                        onChange={(e) => set("heardFromOther", e.target.value)}
                        placeholder="How did you hear about this vacancy?"
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* Resume Upload */}
                  <div>
                    <label className={labelClass}>Resume (PDF only)</label>
                    <label className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-4 py-5 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {form.resume ? form.resume.name : "Click to upload PDF"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => set("resume", e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isPending ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetailWeb;
