// useMeritto.ts
import { useEffect } from "react";

declare global {
  interface Window {
    NpfWidgetsInit?: any;
  }
}

export const useMeritto = (widgetId: string) => {
  useEffect(() => {
    if (window.NpfWidgetsInit) return;

    const script = document.createElement("script");
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    document.body.appendChild(script);
  }, [widgetId]);
};
