import { ArrowRight, LogIn, LogOut } from "lucide-react";

import { focusRing, panelClass } from "./tokens";
import { StepHeading } from "./ui";

interface Props {
  onCheckIn: () => void;
  onCheckOut: () => void;
}

/** First screen: two big targets, one per direction through the door. */
const KioskChoice: React.FC<Props> = ({ onCheckIn, onCheckOut }) => {
  const options = [
    {
      key: "in",
      title: "Check in",
      hint: "Arriving? Register and get your visitor pass.",
      icon: LogIn,
      tint: "bg-[#125DAA]/10 text-[#125DAA]",
      onClick: onCheckIn,
    },
    {
      key: "out",
      title: "Check out",
      hint: "Leaving? Find your name and sign out.",
      icon: LogOut,
      tint: "bg-[#E01B2E]/10 text-[#E01B2E]",
      onClick: onCheckOut,
    },
  ];

  return (
    <div>
      <StepHeading title="Welcome to LBEF" hint="Are you arriving or leaving?" />

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {options.map(({ key, title, hint, icon: Icon, tint, onClick }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={`${panelClass} ${focusRing} group text-left p-6 sm:p-8 min-h-48 sm:min-h-64 flex flex-col transition hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(15,23,42,0.24)] active:scale-[0.99]`}
          >
            <span className={`w-16 h-16 rounded-2xl flex items-center justify-center ${tint}`}>
              <Icon className="w-8 h-8" />
            </span>
            <span className="mt-auto pt-8 flex items-end justify-between gap-4">
              <span>
                <span className="block text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-slate-900">
                  {title}
                </span>
                <span className="block mt-1.5 text-[15px] text-slate-500 leading-snug">{hint}</span>
              </span>
              <ArrowRight className="w-6 h-6 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-500" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KioskChoice;
