import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { AppContext } from "../../context/ContextApp";
import { useGetProfile } from "../hooks/useGetProfile";
import { Outlet } from "react-router-dom";
import OfflinePage from "../OfflineOverlay";

const AppLayout: React.FC = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const appContext = useContext(AppContext);
  // const location = useLocation();
  if (!appContext) throw new Error("AppContext not found");

  const { showToast, isOnline } = appContext;
  const { data, isLoading, error, 
    // refetch
   } = useGetProfile();

  // useEffect(() => {
  //   refetch();
  // }, [location.pathname, refetch]);

  useEffect(() => {
    if (error) {
      showToast(error.message || "Failed to load profile", "error");
    }
  }, [error, showToast]);

  useEffect(() => {
    const handleResize = () => {
      setSideBarCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br 
                    from-slate-50 via-blue-50 to-indigo-50
                    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                    transition-all duration-300">
      <div className="flex h-screen overflow-hidden">
        <SideBar
          collapsed={sideBarCollapsed}
          profile={data || null}
          isLoading={isLoading}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            collapsed={sideBarCollapsed}
            onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
            profile={data || null}
            isLoading={isLoading}
          />
          <main className="flex-1 overflow-y-auto bg-transparent p-4">
            {isOnline ? <Outlet /> : <OfflinePage />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;