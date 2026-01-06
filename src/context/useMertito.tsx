import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    // If already initialized, do nothing
    if (window.NpfWidgetsInit && (window as any)[`npfWidgetInstance_${widgetId}`]) {
      return;
    }

    // Function to initialize the widget
    const initWidget = () => {
      if (!window.NpfWidgetsInit) return;

      // Save instance to window to prevent multiple initializations
      (window as any)[`npfWidgetInstance_${widgetId}`] = new window.NpfWidgetsInit({
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

    // Check if script already exists
    const existingScript = document.getElementById("meritto-script");
    if (existingScript) {
      // Script already loaded, just initialize
      initWidget();
      return;
    }

    // Create script dynamically
    const script = document.createElement("script");
    script.id = "meritto-script";
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    script.onload = initWidget;

    document.body.appendChild(script);

    // Cleanup function (optional)
    return () => {
      // You could remove script if needed, but usually leave it for single-page apps
    };
  }, [widgetId]);
};
