import { APP_URL } from "../../../constants";
import type { VisitorPass } from "../model/VisitorModel";
import { formatVisitorDate, formatVisitorTime } from "./visitorTime";

// A visitor's phone is very often offline at reception (no data, no guest wifi),
// and a QR holding only a URL is useless in that case. So the QR carries the pass
// as human-readable text FIRST — every phone camera app renders that inline with
// zero network — and appends the live pass URL on the last line, which stays
// tappable whenever there *is* a connection.

export const buildPassUrl = (qrToken: string) => `${APP_URL}/visitor-pass/${qrToken}`;


/**
 * The text encoded into the QR image.
 *
 * Kept deliberately short: an encoded copy of the same fields was tried and
 * pushed the code from roughly version 8 to version 14, which is noticeably
 * harder to scan off a kiosk screen for no gain — the readable lines below
 * already convey everything an offline phone needs.
 */
export const buildPassQrText = (qrToken: string, pass: VisitorPass) =>
  [
    "LBEF VISITOR PASS",
    `Code: ${pass.code}`,
    `Name: ${pass.name}`,
    `Purpose: ${pass.purpose}`,
    // Optional on the record, so it is omitted rather than printed as "null"
    // — and dropping it keeps the QR a version or two smaller.
    ...(pass.personToMeet ? [`To meet: ${pass.personToMeet}`] : []),
    `Visitors: ${pass.numberOfPerson}`,
    `Date: ${formatVisitorDate(pass.visitedDate)}`,
    `In: ${formatVisitorTime(pass.inTime)}`,
    buildPassUrl(qrToken),
  ].join("\n");
