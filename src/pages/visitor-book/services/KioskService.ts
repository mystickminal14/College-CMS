import VisitorApiClient from "./visitorClient";
import type { KioskRegistration } from "../model/VisitorModel";

// Both are unauthenticated: the reception tablet is not signed in as anyone,
// so anything the kiosk touches has to work without a JWT.
export const KioskRegisterApi = new VisitorApiClient<KioskRegistration>(
  "/visitor/kiosk/register",
);
// POST /visitor/photo/{qrToken}. Write-once on the server — a second call for
// the same token 409s, which the caller surfaces rather than retrying.
export const KioskPhotoApi = new VisitorApiClient<null>("/visitor/photo");
