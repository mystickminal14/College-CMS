import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { AppContext } from "../../context/ContextApp";
import { useGetProfile } from "../hooks/useGetProfile";
import { Outlet } from "react-router-dom";
import OfflinePage from "../OfflineOverlay";

const AppLayout: React.FC = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const appContext = useContext(AppContext);
  
  if (!appContext) throw new Error("AppContext not found");

  const { showToast, isOnline } = appContext;
  const { data, isLoading, error } = useGetProfile();

  // Handle mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSideBarCollapsed(false);
      }
      
      // Close mobile menu when resizing to desktop
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (error) {
      showToast(error.message || "Failed to load profile", "error");
    }
  }, [error, showToast]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
          onCollapse={() => setSideBarCollapsed(!sideBarCollapsed)}
          profile={data || null}
          isLoading={isLoading}
          isMobile={isMobile}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={closeMobileMenu}
        />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Header
            collapsed={sideBarCollapsed}
            onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
            profile={data || null}
            isLoading={isLoading}
            isMobile={isMobile}
            onMobileMenuToggle={toggleMobileMenu}
          />
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