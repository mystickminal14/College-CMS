import React, { createContext, useContext } from "react";
import { useMeritto } from "./useMertito";

type EnquiryContextType = {
  open: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

const WIDGET_ID = "22c1142ae37bdbc283d1bdf26604a17f";

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

      {/* REQUIRED: Widget button must exist in DOM */}
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

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
