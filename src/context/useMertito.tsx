import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit?: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    console.log("[Meritto] Hook mounted");

    const SCRIPT_SRC = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";

    const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

    if (!existingScript) {
      console.log("[Meritto] Injecting script");

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    } else {
      console.log("[Meritto] Script already present");
    }

    let attempts = 0;

    const waitForWidget = setInterval(() => {
      attempts++;
      console.log(`[Meritto] Waiting for NpfWidgetsInit... (${attempts})`);

      if (window.NpfWidgetsInit) {
        clearInterval(waitForWidget);

        console.log("[Meritto] NpfWidgetsInit FOUND ✅");

        try {
          new window.NpfWidgetsInit({
            widgetId,
            baseurl: "widgets.in8.nopaperforms.com",
            formTitle: "Enquiry Form",
            titleColor: "#FF0033",
            backgroundColor: "#ddd",
            iframeHeight: "500px",
            buttonbgColor: "navy",
            buttonTextColor: "#FFF",
          });

          console.log("[Meritto] Widget initialized SUCCESSFULLY 🎉");
        } catch (err) {
          console.error("[Meritto] Widget init FAILED", err);
        }
      }

      if (attempts > 20) {
        clearInterval(waitForWidget);
        console.error("[Meritto] Timed out waiting for NpfWidgetsInit ❌");
      }
    }, 300);

    return () => clearInterval(waitForWidget);
  }, [widgetId]);
};
