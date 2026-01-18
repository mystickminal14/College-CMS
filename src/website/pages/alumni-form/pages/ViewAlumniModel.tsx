import { X, Mail, Phone, Globe, Building, Calendar, User, Briefcase, GraduationCap, MapPin, Hash } from "lucide-react";
import type { AlumniFormData } from "../models/alumniModel";

interface ViewAlumniModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumni: AlumniFormData | null;
}

const ViewAlumniModal = ({
  isOpen,
  onClose,
  alumni,
}: ViewAlumniModalProps) => {
  if (!isOpen || !alumni) return null;

  const InfoCard = ({
    icon: Icon,
    title,
    value,
    color = "text-blue-600",
  }: {
    icon: any;
    title: string;
    value?: string;
    color?: string;
  }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className={`p-2 rounded-md bg-white dark:bg-gray-700 shadow-sm ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {value || "-"}
        </p>
      </div>
    </div>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <div className="w-1 h-4 bg-blue-500 rounded-full" />
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-800 bg-linear-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {alumni.prefix} {alumni.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Hash className="w-3 h-3" />
                {alumni.collegeRollNo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Personal Info Section */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <InfoCard 
                icon={GraduationCap} 
                title="Degree" 
                value={alumni.degree}
                color="text-purple-600"
              />
              <InfoCard 
                icon={Calendar} 
                title="Year of Passing" 
                value={alumni.yearOfPassing}
                color="text-green-600"
              />
              <InfoCard 
                icon={Hash} 
                title="University Roll No" 
                value={alumni.uniRollNo}
                color="text-gray-600"
              />
              <InfoCard 
                icon={Mail} 
                title="Email" 
                value={alumni.email}
                color="text-red-600"
              />
              <InfoCard 
                icon={Phone} 
                title="Mobile No" 
                value={alumni.mobileNo}
                color="text-teal-600"
              />
              <InfoCard 
                icon={Briefcase} 
                title="Study Mode" 
                value={alumni.mode}
                color="text-orange-600"
              />
            </div>
          </Section>

          {/* Professional Info Section */}
          <Section title="Professional Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <InfoCard 
                icon={Building} 
                title="Present Employer" 
                value={alumni.presentEmployer}
                color="text-indigo-600"
              />
              <InfoCard 
                icon={Briefcase} 
                title="Designation" 
                value={alumni.designation}
                color="text-amber-600"
              />
              <InfoCard 
                icon={MapPin} 
                title="Present Country" 
                value={alumni.presentCountry}
                color="text-emerald-600"
              />
            </div>
          </Section>

          {/* System Info Section */}
          <Section title="System Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alumni.status === "ENABLED" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}>
                    {alumni.status}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Date</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {alumni.registrationDate
                      ? new Date(alumni.registrationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Created At</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {alumni.createdAt
                    ? new Date(alumni.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "-"}
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* FOOTER */}
        <div className="border-t dark:border-gray-800 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors w-full sm:w-auto"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlumniModal;