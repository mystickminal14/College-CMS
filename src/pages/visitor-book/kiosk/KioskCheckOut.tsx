import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, LogOut, Search } from "lucide-react";

import type { Visitor } from "../model/VisitorModel";
import { useKioskCheckOut, useKioskVisitorsToday } from "../hooks/useKiosk";
import { formatVisitorTime } from "../utils/visitorTime";
import { KioskActions } from "./KioskFrame";
import { fieldClass, ghostButtonClass, panelClass, primaryButtonClass } from "./tokens";
import { Alert, StepHeading } from "./ui";

interface Props {
  onBack: () => void;
  onDone: () => void;
  /** Any interaction counts as activity for the idle timer. */
  onDirty: () => void;
}

// The list is on a public screen, so it shows only what a visitor needs to
// recognise their own row — never the full phone number or ID.
const maskPhone = (phone?: string) => {
  const digits = (phone ?? "").replace(/\D/g, "");
  return digits.length >= 3 ? `••• ${digits.slice(-3)}` : "";
};

const KioskCheckOut: React.FC<Props> = ({ onBack, onDone, onDirty }) => {
  const { data, isLoading, isError, refetch } = useKioskVisitorsToday(true);
  const checkOut = useKioskCheckOut();

  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [checkedOut, setCheckedOut] = useState<Visitor | null>(null);
  const [error, setError] = useState("");

  const inside = useMemo(() => {
    const rows = (data?.data?.visitors ?? []).filter((v) => v.status === "IN");
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    // Phone matches only on 3+ trailing digits, so typing one digit does not
    // turn the list into a lookup of everyone's number.
    const digits = q.replace(/\D/g, "");
    return rows.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.idNumber ?? "").toLowerCase().includes(q) ||
        (v.code ?? "").toLowerCase().includes(q) ||
        (digits.length >= 3 && v.phone.replace(/\D/g, "").endsWith(digits)),
    );
  }, [data, query]);

  const handleCheckOut = (visitor: Visitor) => {
    if (!visitor.id) return;
    setError("");
    checkOut.mutate(visitor.id, {
      onSuccess: () => {
        setConfirmId(null);
        setCheckedOut(visitor);
      },
      onError: (err) => {
        setError(err.errors?.[0]?.message || err.message || "Could not check out. Please try again.");
        // Someone else may have checked this visitor out from the desk.
        refetch();
      },
    });
  };

  if (checkedOut) {
    return (
      <div className="mx-auto w-full max-w-md text-center py-10">
        <span className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </span>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-slate-900">
          Goodbye, {checkedOut.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-base text-slate-500">
          You're checked out. Thanks for visiting LBEF.
        </p>
        <KioskActions>
          <button type="button" onClick={onDone} className={`${primaryButtonClass} ml-auto max-sm:w-full`}>
            Done
          </button>
        </KioskActions>
      </div>
    );
  }

  return (
    <div>
      <StepHeading title="Check out" hint="Find your name and tap Check out." />

      {error && <Alert className="mb-5">{error}</Alert>}

      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            onDirty();
            setConfirmId(null);
            setQuery(e.target.value);
          }}
          placeholder="Search your name, ID number, visit code or last digits of your phone"
          autoComplete="off"
          aria-label="Search today's visitors"
          className={`${fieldClass} pl-12 sm:pl-13`}
        />
      </div>

      <div className={`${panelClass} overflow-hidden`}>
        {isLoading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-[#125DAA]" />
            Loading today's visitors
          </div>
        ) : isError ? (
          <div className="py-14 text-center">
            <p className="text-slate-600">Couldn't load today's visitors.</p>
            <button type="button" onClick={() => refetch()} className={`${ghostButtonClass} mt-4`}>
              Try again
            </button>
          </div>
        ) : inside.length === 0 ? (
          <p className="py-16 text-center text-slate-500">
            {query ? "No one inside matches that search." : "No visitors are checked in right now."}
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {inside.map((v) => {
              const confirming = confirmId === v.id;
              const busy = checkOut.isPending && checkOut.variables === v.id;
              const details = [
                v.code,
                `In ${formatVisitorTime(v.inTime)}`,
                maskPhone(v.phone),
                v.purpose,
              ].filter(Boolean);

              return (
                <li
                  key={v.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-4 py-4 sm:px-6 transition-colors ${
                    confirming ? "bg-[#E01B2E]/[0.04]" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-slate-900 truncate">{v.name}</p>
                    <p className="text-sm text-slate-500 truncate tabular-nums">{details.join(" · ")}</p>
                  </div>

                  {confirming ? (
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setConfirmId(null)}
                        disabled={busy}
                        className={`${ghostButtonClass} h-12! sm:h-14! px-5! text-base! max-sm:flex-1`}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCheckOut(v)}
                        disabled={busy}
                        className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-full bg-[#E01B2E] hover:bg-[#C21625] text-white text-base font-semibold shadow-lg shadow-[#E01B2E]/25 disabled:opacity-60 transition max-sm:flex-1"
                      >
                        {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onDirty();
                        setError("");
                        setConfirmId(v.id ?? null);
                      }}
                      className={`${ghostButtonClass} h-12! sm:h-14! px-5! text-base! shrink-0`}
                    >
                      <LogOut className="w-5 h-5" /> Check out
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <KioskActions>
        <button type="button" onClick={onBack} className={ghostButtonClass}>
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </KioskActions>
    </div>
  );
};

export default KioskCheckOut;
