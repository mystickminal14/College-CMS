import { useMutation } from "@tanstack/react-query";

import { sendPassSms, type PassSmsResult } from "../services/PassSmsService";

/**
 * Fires the pass-link SMS. Nothing is invalidated and nothing is retried: the
 * text is a one-shot courtesy on top of a visit that is already registered, and
 * a retry would be a second message the college pays for.
 */
const useSendPassSms = () =>
  useMutation<PassSmsResult, never, string>({
    mutationFn: (qrToken) => sendPassSms(qrToken),
    retry: false,
  });

export default useSendPassSms;
