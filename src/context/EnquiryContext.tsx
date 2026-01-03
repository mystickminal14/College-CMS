import { createContext, useContext, useState } from "react";

type EnquiryContextType = {
  open: () => void;
  close: () => void;
};

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <EnquiryContext.Provider
      value={{
        open: () => setOpenPopup(true),
        close: () => setOpenPopup(false),
      }}
    >
      {children}

      {/* GLOBAL POPUP */}
      {openPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative animate-scaleIn">
            <button
              onClick={() => setOpenPopup(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Enquiry Form
            </h3>

            <form className="space-y-4">
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Full Name" />
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Email" />
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Phone" />

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
};
