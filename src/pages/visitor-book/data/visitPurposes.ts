/**
 * The reasons a visitor can pick from at reception or on the kiosk.
 *
 * These used to be a CRUD module backed by `/visit-purpose` on the Node server.
 * The PHP visitor API stores `purpose` as a plain string and has no purpose
 * table at all, so there is nothing left to administer — the list lives here
 * and ships with the bundle. Adding or renaming one is a code change.
 *
 * Carried over from the last state of the old table, minus the stray "mm" test
 * row. Keep "Other" last: it is the escape hatch, not a reason.
 */
export interface VisitPurpose {
  id: number;
  name: string;
  slug: string;
  /** The one entry that swaps the picker for a free-text box. */
  isOther: boolean;
}

export const VISIT_PURPOSES: VisitPurpose[] = [
  { id: 1, name: "Admission Inquiry", slug: "admission-inquiry", isOther: false },
  { id: 2, name: "Meeting", slug: "meeting", isOther: false },
  { id: 3, name: "Parent Visit", slug: "parent-visit", isOther: false },
  { id: 4, name: "Document Submission", slug: "document-submission", isOther: false },
  { id: 5, name: "Student Visit", slug: "student-visit", isOther: false },
  { id: 6, name: "Staff Meeting", slug: "staff-meeting", isOther: false },
  { id: 7, name: "Other", slug: "other", isOther: true },
];

export const findVisitPurpose = (id: number) => VISIT_PURPOSES.find((p) => p.id === id);

/**
 * What actually goes in the `purpose` column. For a listed reason that is its
 * name; for "Other" it is whatever the visitor typed, because the API keeps no
 * separate free-text field and a register full of rows reading "Other" tells
 * reception nothing.
 */
export const resolvePurpose = (id: number, otherPurpose: string) => {
  const purpose = findVisitPurpose(id);
  if (!purpose) return "";
  return purpose.isOther ? otherPurpose.trim() : purpose.name;
};
