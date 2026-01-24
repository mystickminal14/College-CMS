// import React, { createContext, useContext } from "react";

// type EnquiryContextType = {
//   open: () => void;
// };

// const EnquiryContext = createContext<EnquiryContextType | null>(null);

// const WIDGET_ID = "22c1142ae37bdbc283d1bdf26604a17f";

// export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
//   const open = () => {
//     const btn = document.querySelector(
//       `.npfWidget-${WIDGET_ID}`
//     ) as HTMLButtonElement | null;
//     btn?.click();
//   };

//   return (
//     <EnquiryContext.Provider value={{ open }}>
//       {children}
//     </EnquiryContext.Provider>
//   );
// };

// export const useEnquiry = () => {
//   const ctx = useContext(EnquiryContext);
//   if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
//   return ctx;
// };
