import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://in8cdn.npfs.co/js/widget/npfwpopup.js"]'
    );

    if (existingScript) {
      initWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    script.onload = () => initWidget();

    document.body.appendChild(script);

    function initWidget() {
      if (!window.NpfWidgetsInit) return;

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
    }
  }, [widgetId]);
};
