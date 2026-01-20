import React, { createContext, useContext } from "react";
import { useMeritto } from "./useMertito";

type EnquiryContextType = {
  open: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

const WIDGET_ID = "22c1142ae37bdbc283d1bdf26604a17f";

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("[EnquiryProvider] Rendered");

  useMeritto(WIDGET_ID);

  const openPopup = () => {
    console.log("[EnquiryProvider] openPopup called");

    const btn = document.querySelector(
      `.npfWidget-${WIDGET_ID}`
    ) as HTMLButtonElement | null;

    console.log("[EnquiryProvider] Widget button found:", btn);

    if (!btn) {
      console.error("[EnquiryProvider] Widget button NOT FOUND in DOM");
      return;
    }

    btn.click();
    console.log("[EnquiryProvider] Widget button clicked programmatically");
  };

  return (
    <EnquiryContext.Provider value={{ open: openPopup }}>
      {children}

      {/* THIS MUST EXIST */}
      <button
        type="button"
        className={`npfWidgetButton npfWidget-${WIDGET_ID}`}
        style={{
          position: "fixed",
          bottom: "-1000px",
          opacity: 0,
          pointerEvents: "none",
        }}
        onClick={() => {
          console.log("[Hidden Button] Native widget button clicked");
        }}
      >
        Enquire Now
      </button>
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);

  if (!ctx) {
    console.error("[useEnquiry] Context is NULL");
    throw new Error("useEnquiry must be used inside EnquiryProvider");
  }

  console.log("[useEnquiry] Context accessed successfully");
  return ctx;
};
