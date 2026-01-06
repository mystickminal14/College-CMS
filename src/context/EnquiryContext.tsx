import { createContext, useContext } from "react";
import { useMeritto } from "./useMertito";

type EnquiryContextType = {
  open: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  const widgetId = "37b0a5e5264dcf9f208d052c97b65286";

  useMeritto(widgetId);

  const openPopup = () => {
    const btn = document.querySelector(
      `.npfWidget-${widgetId}`
    ) as HTMLButtonElement;

    btn?.click(); // programmatically trigger Meritto popup
  };

  return (
    <EnquiryContext.Provider value={{ open: openPopup }}>
      {children}

      {/* Hidden Meritto Button */}
      <button
        className={`npfWidgetButton npfWidget-${widgetId} hidden`}
        type="button"
      >
        Enquire Now
      </button>
    </EnquiryContext.Provider>
  );
};

// Hook
export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
