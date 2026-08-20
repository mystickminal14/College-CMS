import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2, Search, UserX } from "lucide-react";

import { IMAGE_URL } from "../../../constants";
import { useKioskStaff } from "../hooks/useKiosk";
import { KioskActions } from "./KioskFrame";
import { fieldClass, ghostButtonClass, iconButtonClass, linkButtonClass, primaryButtonClass } from "./tokens";
import { OptionCard, StepHeading } from "./ui";

const PAGE_SIZE = 6;

const initials = (name: string) =>
  name
    .replace(/\b(Er|Dr|Mr|Mrs|Ms|Prof)\.?\s+/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/** Staff portraits are optional and sometimes point at a file that is no longer
 *  on disk, so a broken image falls back to initials rather than a torn icon. */
const StaffAvatar: React.FC<{ src: string | null; name: string }> = ({ src, name }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="w-16 h-16 rounded-full bg-gray-100 text-gray-600 text-lg font-bold flex items-center justify-center">
        {initials(name)}
      </span>
    );
  }

  return (
    <img
      src={`${IMAGE_URL}${src}`}
      alt=""
      onError={() => setFailed(true)}
      className="w-16 h-16 rounded-full object-cover"
    />
  );
};

interface Props {
  department: string | null;
  value: string | null;
  isOtherSelected: boolean;
  onSelect: (person: string | null, isOther: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

/**
 * Second step: pick the host, six per page. Like department, this is optional —
 * "Not sure" stores nothing, and "Someone else" lets the visitor type a name
 * that is not in the directory. Both submit as a plain string.
 */
const StepPerson: React.FC<Props> = ({
  department,
  value,
  isOtherSelected,
  onSelect,
  onBack,
  onNext,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [manualEntry, setManualEntry] = useState(false);

  // Debounced so an on-screen keyboard does not fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching } = useKioskStaff({
    department: department ?? undefined,
    search,
    page,
    limit: PAGE_SIZE,
  });

  const staff = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div>
      <StepHeading
        eyebrow="Step 2 of 4"
        title="Who are you here to meet?"
        hint={
          department
            ? `Showing staff in ${department}. Search if you don't see them.`
            : "Search the full staff directory, or skip if you're not sure."
        }
      />

      {manualEntry ? (
        <div className="max-w-md space-y-4">
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onSelect(e.target.value, true)}
            placeholder="Type the person's full name"
            autoFocus
            className={fieldClass}
          />
          <button
            type="button"
            onClick={() => {
              setManualEntry(false);
              onSelect(null, false);
            }}
            className={linkButtonClass}
          >
            Back to the staff list
          </button>
        </div>
      ) : (
        <>
          <div className="relative mb-5 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or position"
              className={`${fieldClass} pl-12`}
            />
          </div>

          <div className="min-h-72">
            {isLoading ? (
              <div className="flex items-center justify-center h-72 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : staff.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-72 text-center gap-3">
                <UserX className="w-10 h-10 text-[#C7D5E3]" />
                <p className="text-base text-gray-600">
                  No staff match that search. Try a different name, or type it in below.
                </p>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-3 transition-opacity ${
                  isFetching ? "opacity-60" : "opacity-100"
                }`}
              >
                {staff.map((member) => (
                  <OptionCard
                    key={member.id}
                    selected={!isOtherSelected && value === member.name}
                    onClick={() => onSelect(member.name, false)}
                    title={member.name}
                    subtitle={member.position}
                    media={
                      <StaffAvatar src={member.portrait || member.image} name={member.name} />
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
            <button
              type="button"
              onClick={() => {
                setManualEntry(true);
                onSelect("", true);
              }}
              className={linkButtonClass}
            >
              Can't find them? Type a name instead
            </button>

            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination?.hasPrevPage}
                  className={iconButtonClass}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-[15px] text-gray-600 tabular-nums">
                  {page} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={!pagination?.hasNextPage}
                  className={iconButtonClass}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <KioskActions>
        <button type="button" onClick={onBack} className={ghostButtonClass}>
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button type="button" onClick={onNext} className={`${primaryButtonClass} ml-auto`}>
          {value?.trim() ? (
            <>
              Continue <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            "Skip — I'm not sure"
          )}
        </button>
      </KioskActions>
    </div>
  );
};

export default StepPerson;
