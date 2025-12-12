import { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { AppContext } from "../../context/ContextApp";
import { Outlet } from "react-router-dom";
import OfflinePage from "../OfflineOverlay";
import { MdMenu, MdClose } from "react-icons/md";
import appLogo from "../../assets/applogo.png";

const AppLayout: React.FC = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const appContext = useContext(AppContext);
  
  if (!appContext) throw new Error("AppContext not found");

  const {  isOnline } = appContext;
 

  // Handle mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setSideBarCollapsed(false);
      }
      
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);



  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setSideBarCollapsed(!sideBarCollapsed);
  };

  return (
    <div className="min-h-screen bg-linear-to-br 
                    from-slate-50 via-blue-50 to-indigo-50
                    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                    transition-all duration-300 relative">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for all screen sizes */}
        <SideBar
          collapsed={sideBarCollapsed}
          onCollapse={toggleSidebarCollapse}
         
          isMobile={isMobile}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={closeMobileMenu}
        />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full relative">
          {/* Mobile Header - Only visible on mobile */}
          {isMobile && (
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <img src={appLogo} alt="Evolve" className="w-8 h-8 object-cover rounded-lg" />
                <span className="text-lg font-semibold text-slate-800 dark:text-white">Evolve</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <MdClose className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                ) : (
                  <MdMenu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                )}
              </button>
            </div>
          )}

          <main className={`flex-1 overflow-y-auto bg-transparent p-4 transition-all duration-300
                          ${mobileMenuOpen && isMobile ? 'opacity-30' : 'opacity-100'}`}>
            {isOnline ? <Outlet /> : <OfflinePage />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;