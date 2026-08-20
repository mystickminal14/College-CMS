import APIClient from "../../../services/apiClient";
import type { KioskStaff, KioskRegistration } from "../model/VisitorModel";

// Both are unauthenticated: the reception tablet is not signed in as anyone,
// so anything the kiosk touches has to work without a JWT.
export const KioskStaffApi = new APIClient<KioskStaff>("/visitor/kiosk/staff");
export const KioskRegisterApi = new APIClient<KioskRegistration>(
  "/visitor/kiosk/register",
);
// Write-once on the server (see visitor.controller.ts) — a second call for the
// same qrToken 409s, which the caller surfaces as an error rather than retrying.
export const KioskPhotoApi = new APIClient<null>("/visitor/kiosk/photo");
