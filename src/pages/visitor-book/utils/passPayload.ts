import { APP_URL } from "../../../constants";

// The QR encodes only this URL, so scanning it opens the live pass page
// (/visitor-pass/:qrToken) rather than showing a block of text.
export const buildPassUrl = (qrToken: string) => `${APP_URL}/visitor-pass/${qrToken}`;
