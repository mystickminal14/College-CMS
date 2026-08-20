import { ArrowRight, Building2, HelpCircle, Loader2 } from "lucide-react";

import { useKioskDepartments } from "../hooks/useKiosk";
import { KioskActions } from "./KioskFrame";
import { primaryButtonClass } from "./tokens";
import { OptionCard, StepHeading } from "./ui";

interface Props {
  value: string | null;
  isOtherSelected: boolean;
  onSelect: (department: string | null, isOther: boolean) => void;
  onNext: () => void;
}

/**
 * First step: pick a department. "Other / Not sure" is a real choice, not a
 * dead end — department is optional on the record, so choosing it simply stores
 * nothing and lets the visitor search the whole staff directory on the next step.
 */
const StepDepartment: React.FC<Props> = ({ value, isOtherSelected, onSelect, onNext }) => {
  const { data, isLoading } = useKioskDepartments();
  const departments = data?.data ?? [];

  const hasChosen = !!value || isOtherSelected;

  return (
    <div>
      <StepHeading
        eyebrow="Step 1 of 4"
        title="Which department are you here for?"
        hint="Pick whichever is closest to your reason for visiting. Choose Other if you are not sure."
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {departments.map((dept) => (
            <OptionCard
              key={dept.id}
              selected={value === dept.name}
              onClick={() => onSelect(dept.name, false)}
              title={dept.name}
              media={
                <span className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </span>
              }
            />
          ))}

          <OptionCard
            muted
            selected={isOtherSelected}
            onClick={() => onSelect(null, true)}
            title="Other / Not sure"
            subtitle="Search all staff instead"
            media={
              <span className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </span>
            }
          />
        </div>
      )}

      <KioskActions>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasChosen}
          className={`${primaryButtonClass} ml-auto`}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </KioskActions>
    </div>
  );
};

export default StepDepartment;
