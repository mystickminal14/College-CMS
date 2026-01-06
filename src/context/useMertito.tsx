// hooks/useMeritto.ts
import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    // Avoid loading script multiple times
    if (document.getElementById("meritto-script")) return;

    const script = document.createElement("script");
    script.id = "meritto-script";
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    script.onload = () => {
      new window.NpfWidgetsInit({
        widgetId,
        baseurl: "widgets.in8.nopaperforms.com",
      });
    };

    document.body.appendChild(script);
  }, [widgetId]);
};
