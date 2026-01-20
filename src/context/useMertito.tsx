import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit?: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    console.log("[Meritto] useMeritto hook mounted");
    console.log("[Meritto] Widget ID:", widgetId);

    const existingScript = document.querySelector(
      'script[src="https://in8cdn.npfs.co/js/widget/npfwpopup.js"]'
    );

    if (existingScript) {
      console.log("[Meritto] Script already exists");
      initWidget();
      return;
    }

    console.log("[Meritto] Injecting Meritto script...");

    const script = document.createElement("script");
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    script.onload = () => {
      console.log("[Meritto] Script loaded successfully");
      initWidget();
    };

    script.onerror = () => {
      console.error("[Meritto] Script failed to load");
    };

    document.body.appendChild(script);

    function initWidget() {
      console.log("[Meritto] Attempting widget initialization");

      if (!window.NpfWidgetsInit) {
        console.error("[Meritto] NpfWidgetsInit NOT found on window");
        return;
      }

      console.log("[Meritto] NpfWidgetsInit found, initializing...");

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

        console.log("[Meritto] Widget initialized SUCCESSFULLY");
      } catch (err) {
        console.error("[Meritto] Widget initialization FAILED", err);
      }
    }
  }, [widgetId]);
};
