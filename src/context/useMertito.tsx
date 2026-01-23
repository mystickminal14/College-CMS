import { useEffect } from "react";

export const useMeritto = () => {
  useEffect(() => {
    const SCRIPT_SRC =
      "https://in8cdn.npfs.co/js/widget/npfwpopup.js";

    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      console.log("[Meritto] Script already loaded");
      return;
    }

    console.log("[Meritto] Loading widget script");

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);
};
