import { createContext, useContext } from "react";

type EnquiryContextType = {
  /** Pass a widget's unique class (e.g. "npfWidget-8ba86168...") to open that
   * specific Meritto form instead of the default one. */
  open: (widgetClass?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {

  const open = (widgetClass?: string) => {
    const tryOpen = () => {
      const btn = document.querySelector<HTMLButtonElement>(
        widgetClass ? `.${widgetClass}` : ".npfWidgetButton"
      );

      if (btn) {
        btn.click(); // ✅ Opens Meritto popup
        return true;
      }
      return false;
    };

    // Try immediately
    if (tryOpen()) return;

    // Retry if widget hasn't loaded yet
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryOpen() || attempts > 10) {
        clearInterval(interval);
      }
    }, 300);
  };

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used inside EnquiryProvider");
  }
  return ctx;
};
