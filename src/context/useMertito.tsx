import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit?: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    // Prevent re-initialization
    if ((window as any)[`__meritto_${widgetId}`]) return;

    const initWidget = () => {
      if (!window.NpfWidgetsInit) return;

      (window as any)[`__meritto_${widgetId}`] =
        new window.NpfWidgetsInit({
          widgetId,
          baseurl: "widgets.in8.nopaperforms.com",
          formTitle: "Enquiry Form",
          titleColor: "#FF0033",
          backgroundColor: "#ddd",
          iframeHeight: "500px",
          buttonbgColor: "#4c79dc",
          buttonTextColor: "#FFF",
        });
    };

    // If script already loaded
    if (window.NpfWidgetsInit) {
      initWidget();
      return;
    }

    // Load script once
    const script = document.createElement("script");
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;
    script.onload = initWidget;

    document.body.appendChild(script);
  }, [widgetId]);
};
