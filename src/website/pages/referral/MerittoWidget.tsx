import { useEffect, useRef } from "react";

const EMWGTS_SRC = "https://widgets.in8.nopaperforms.com/emwgts.js";

interface Props {
  /** NoPaperForms widget id (the `data-w` value). */
  widgetId: string;
  /** Widget height, e.g. "600px". */
  height?: string;
  className?: string;
}

/**
 * Renders an inline Meritto / NoPaperForms embedded widget.
 *
 * The `emwgts.js` script scans the DOM for `.npf_wgts` containers when it
 * loads. Because website pages are client-side routed (the script may already
 * be present from a previous visit), we also call `window.npf_wgts.load()`
 * after mount so the widget re-renders into this container.
 */
export default function MerittoWidget({ widgetId, height = "600px", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderWidget = () => window.npf_wgts?.load?.();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMWGTS_SRC}"]`
    );

    if (existing) {
      // Script already loaded earlier — just re-trigger a render.
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = EMWGTS_SRC;
    script.async = true;
    script.addEventListener("load", renderWidget);
    document.body.appendChild(script);
  }, [widgetId]);

  return (
    <div
      ref={ref}
      className={`npf_wgts ${className ?? ""}`}
      data-height={height}
      data-w={widgetId}
    />
  );
}
