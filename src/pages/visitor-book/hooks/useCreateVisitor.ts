import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import VisitorApi from "../services/VisitorService";
import { sendPassSms } from "../services/PassSmsService";
import type { Visitor } from "../model/VisitorModel";
import { VISITOR_CACHE_KEY, VISITOR_TODAY_CACHE_KEY } from "../../../constants";

const useCreateVisitor = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateVisitor must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Visitor>, ApiErrorResponse, Visitor>({
    mutationFn: (visitor) => VisitorApi.post(visitor),

    onSuccess: async (res) => {
      showToast(res.message || "Visitor registered successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISITOR_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITOR_TODAY_CACHE_KEY] });

      // The walk-in gets the same pass link the kiosk texts. Reception is told
      // when it does not go out — they are standing with the visitor and can
      // read the code off the screen instead — but never blocked by it, since
      // the registration above has already succeeded.
      const qrToken = res.data?.qrToken;
      if (!qrToken) return;

      const sms = await sendPassSms(qrToken);
      if (!sms.sent) {
        showToast(`Pass link not texted: ${sms.reason}`, "error");
      }
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateVisitor;
