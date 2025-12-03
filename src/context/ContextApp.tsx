import { createContext, type ReactNode, useEffect, useState } from "react";
import { ToastContainer, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context value type
interface AppContextType {
  showToast: (
    message: string,
    type?: "warn" | "success" | "error" | "info" | "default"
  ) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  isOnline: boolean;
}

// Props for provider
interface ContextAppProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function ContextApp({ children }: ContextAppProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved ?? "light";
  });

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Theme Persistence
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  // Toast Function
  const showToast = (
    message: string,
    type: "warn" | "success" | "error" | "info" | "default" = "default"
  ) => {
    switch (type) {
      case "warn":
        toast.warn(message, defaultToastOptions);
        break;
      case "success":
        toast.success(message, defaultToastOptions);
        break;
      case "error":
        toast.error(message, defaultToastOptions);
        break;
      case "info":
        toast.info(message, defaultToastOptions);
        break;
      default:
        toast(message, defaultToastOptions);
        break;
    }
  };

  return (
    <AppContext.Provider value={{ showToast, theme, toggleTheme, isOnline }}>
      <ToastContainer />
      {children}
    </AppContext.Provider>
  );
}