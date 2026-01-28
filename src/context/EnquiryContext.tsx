import { createContext, useContext } from "react";

type EnquiryContextType = {
  open: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  const open = () => {
    const btn = document.getElementById("meritto-enquiry-btn");

    if (!btn) {
      console.error("[Meritto] Hidden button not found ❌");
      return;
    }

    btn.click(); // 🚀 Opens popup
  };

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
    </EnquiryContext.Provider>
  );
};


export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
