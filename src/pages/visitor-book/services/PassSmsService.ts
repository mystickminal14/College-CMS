import axios from "axios";

import { PASS_SMS_URL } from "../../../constants";

export interface PassSmsResult {
  sent: boolean;
  reason: string;
}

/**
 * Asks the Netlify function to text a visitor their pass link.
 *
 * Only the qrToken goes up: the function reads the number off the visitor
 * record itself, so nothing here can address an arbitrary phone.
 *
 * This never rejects. It is called after a registration that has already
 * succeeded — the visit is recorded and the QR is on screen whether or not the
 * text goes out — so a failure is a boolean to report, not an error to handle.
 * That also covers `npm run dev`, where the function is not mounted at all and
 * the request simply 404s; use `npx netlify dev` to exercise it locally.
 */
export const sendPassSms = async (qrToken: string): Promise<PassSmsResult> => {
  try {
    const res = await axios.post<PassSmsResult>(
      PASS_SMS_URL,
      { qrToken },
      { timeout: 15000, headers: { "Content-Type": "application/json" } },
    );
    return { sent: !!res.data?.sent, reason: res.data?.reason ?? "" };
  } catch (err) {
    // The endpoint answers 400/404/502 with a reason worth reading ("Visitor
    // pass not found", "Not a mobile number Sociair can deliver to"). Axios
    // throws on those, so without this the useful message would be replaced by
    // the generic fallback below.
    const reason = axios.isAxiosError(err)
      ? (err.response?.data as PassSmsResult | undefined)?.reason
      : undefined;
    return { sent: false, reason: reason || "Could not reach the SMS service." };
  }
};
