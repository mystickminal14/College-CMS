import { useEffect } from "react";

export const useMeritto = () => {
  useEffect(() => {
    const scripts = [
      "https://widgets.in8.nopaperforms.com/emwgts.js",
      "https://in8cdn.npfs.co/js/widget/npfwpopup.js",
    ];

    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) return;

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
};
