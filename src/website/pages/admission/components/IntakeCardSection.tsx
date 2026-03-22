import { Calendar } from "lucide-react";
import IntakeCard from "./IntakeCard";
import type { Intakes } from "../../../../pages/intake-calender/model/IntakeModel";

interface IntakeCardsSectionProps {
  intakes: Intakes[];
  isLoading: boolean;
  isError: boolean;
}

const IntakeCardsSection = ({
  intakes,
  isLoading,
}: IntakeCardsSectionProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Intake Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-4">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Intake Schedule
        </h2>
      </div>

      {intakes.length === 0 ? (
        <p className="text-gray-600 text-center">
          No intakes available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {intakes.map((intake) => (
            <IntakeCard
              key={intake.id}
              title={intake.intake || "Intake Program"}
              duration={intake.duration || "6 Months"}
              date={intake.lastdate || "N/A"}
              admissionStatus={intake.status || "CLOSED"}
              intakeData={intake}
            />
          ))}
        </div>
      )}
      <p className="mt-4">
        International students must apply at least 2 months in advance to ensure that their application, student pass (visa if required), and other logistical arrangements are completed on time.
      </p>
    </div>
  );
};

export default IntakeCardsSection;
