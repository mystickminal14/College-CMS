// EnquiryContext.tsx
import React, { createContext, useContext } from "react";
import { useMeritto } from "./useMertito";

type EnquiryContextType = {
  open: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

const WIDGET_ID = "37b0a5e5264dcf9f208d052c97b65286";

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  useMeritto(WIDGET_ID);

  const openPopup = () => {
    const btn = document.querySelector(
      `.npfWidget-${WIDGET_ID}`
    ) as HTMLButtonElement;

    btn?.click();
  };

  return (
    <EnquiryContext.Provider value={{ open: openPopup }}>
      {children}

      {/* 🔴 DO NOT use hidden */}
      <button
        type="button"
        className={`npfWidgetButton npfWidget-${WIDGET_ID}`}
        style={{
          position: "fixed",
          bottom: "-1000px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        Enquire Now
      </button>
    </EnquiryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
