import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { IoMoon, IoSunny } from "react-icons/io5";

import SideBar from "./SideBar";
import OfflinePage from "../OfflineOverlay";
import { AppContext } from "../../context/ContextApp";

import appLogo from "../../assets/butterfiles.png";
const AppLayout: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext not found");

  const { isOnline } = appContext;

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ===============================
     🌙 Theme State & Logic
  =============================== */
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(prev => !prev);
  };

  /* ===============================
     📱 Mobile Detection
  =============================== */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) setSideBarCollapsed(false);
      if (!mobile && mobileMenuOpen) setMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleSidebarCollapse = () => setSideBarCollapsed(prev => !prev);

  return (
    <div
      className="min-h-screen bg-linear-to-br
                 from-slate-50 via-blue-50 to-indigo-50
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                 transition-all duration-300 relative"
    >
      <div className="flex h-screen overflow-hidden">
        {/* ================= Sidebar ================= */}
        <SideBar
          collapsed={sideBarCollapsed}
          onCollapse={toggleSidebarCollapse}
          isMobile={isMobile}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={closeMobileMenu}
        />

        {/* ================= Main ================= */}
        <div className="flex-1 flex flex-col overflow-hidden w-full relative">
          
          {/* ================= Mobile Header ================= */}
          {isMobile && (
            <div
              className="md:hidden flex items-center justify-between px-4 py-3
                         bg-white dark:bg-slate-800
                         border-b border-slate-200 dark:border-slate-700
                         shadow-sm"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={appLogo}
                  alt="Evolve"
                  className="w-12 h-10 rounded-lg object-cover"
                />
               
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* 🌙 Theme Toggle (Mobile) */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl
                             text-slate-600 hover:bg-slate-100
                             dark:text-slate-300 dark:hover:bg-slate-700
                             transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <IoSunny className="w-5 h-5" />
                  ) : (
                    <IoMoon className="w-5 h-5" />
                  )}
                </button>

                {/* ☰ Menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg
                             bg-slate-100 dark:bg-slate-700
                             hover:bg-slate-200 dark:hover:bg-slate-600
                             transition-colors"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? (
                    <MdClose className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  ) : (
                    <MdMenu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= Page Content ================= */}
          <main
            className={`flex-1 overflow-y-auto bg-transparent p-4 transition-all duration-300
                        ${mobileMenuOpen && isMobile ? "opacity-30" : "opacity-100"}`}
          >
            {isOnline ? <Outlet /> : <OfflinePage />}
          </main>
        </div>
      </div>

      {/* ================= Floating Theme Toggle (Desktop) ================= */}
    {/* ================= Floating Theme Toggle (Desktop) ================= */}
{!isMobile && (
  <button
    onClick={toggleTheme}
    className="fixed right-0 top-1/2 cursor-pointer -translate-y-1/2 z-50
               p-3 rounded-l-2xl
               bg-indigo-600 dark:bg-yellow-400
               text-white dark:text-slate-900
               shadow-xl
               hover:brightness-110
               transition-all duration-300"
    aria-label="Toggle theme"
    title="Toggle theme"
  >
    {isDark ? (
      <IoSunny className="w-6 h-6" />
    ) : (
      <IoMoon className="w-6 h-6" />
    )}
  </button>
)}

    </div>
  );
};

export default AppLayout;
