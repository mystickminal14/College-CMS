import APIClient from "../../../services/apiClient";
import type { KioskDepartment, KioskStaff, KioskRegistration } from "../model/VisitorModel";

// All four are unauthenticated: the reception tablet is not signed in as anyone,
// so anything the kiosk touches has to work without a JWT.
export const KioskDepartmentApi = new APIClient<KioskDepartment>(
  "/visitor/kiosk/departments",
);
export const KioskStaffApi = new APIClient<KioskStaff>("/visitor/kiosk/staff");
export const KioskRegisterApi = new APIClient<KioskRegistration>(
  "/visitor/kiosk/register",
);
export const KioskPhotoApi = new APIClient<null>("/visitor/kiosk/photo");
