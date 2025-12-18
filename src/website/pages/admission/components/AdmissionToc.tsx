import { BookOpen, ChevronRight } from "lucide-react";
import type { RefObject } from "react";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface AdmissionTOCProps {
  tocItems: TocItem[];
  activeSection: string;
  scrollToSection: (id: string) => void;
 tocRef: RefObject<HTMLDivElement | null>
}

const AdmissionTOC = ({
  tocItems,
  activeSection,
  scrollToSection,
  tocRef,
}: AdmissionTOCProps) => {
  return (
    <aside className="lg:w-1/4">
      <div
        ref={tocRef}
        className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Outline
            </h3>
            <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {tocItems.length} sections
            </span>
          </div>
        </div>

        <nav className="p-2 max-h-[calc(100vh-180px)] overflow-y-auto">
          <div className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full cursor-pointer text-left py-3 px-4 rounded-lg transition
                  flex items-start gap-3
                  ${
                    activeSection === item.id
                      ? "bg-blue-50 "
                      : "hover:bg-gray-50"
                  }`}
              >
                <div className="mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activeSection === item.id
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                </div>

                <span
                  className={`font-medium truncate ${
                    activeSection === item.id
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>

                {activeSection === item.id && (
                  <ChevronRight className="w-4 h-4 text-blue-600 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdmissionTOC;
