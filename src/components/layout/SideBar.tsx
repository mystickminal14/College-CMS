import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import appLogo from "../../assets/applogo.png";
import pcpsLogo from "../../assets/pcpsLogo.png";
import {
  MdDashboard,
} from "react-icons/md";
import { AppContext } from "../../context/ContextApp";
import type { ProfileModel } from "../model/ProfileModel";
import { IMAGE_URL } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  subMenus?: { id: string; label: string }[];
}

interface SideBarProps {
  collapsed: boolean;
  onCollapse?: () => void;
  profile: ProfileModel | null;
  isLoading: boolean;
  isMobile: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const menuItems: MenuItem[] = [
  { id: "course", icon: MdDashboard, label: "Dashboard", badge: "New" },
  { id: "notice", icon: MdDashboard, label: "Notices", badge: "New" },
];

// Hook to detect mobile (<768px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

const SideBar: React.FC<SideBarProps> = ({
  collapsed,
  onCollapse,
  profile,
  isLoading,
  isMobile,
  mobileOpen,
  onCloseMobile,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeMobileItem, setActiveMobileItem] = useState<MenuItem | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext not found");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleSubmenu = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  const handleMenuClick = (item: MenuItem, subMenuId?: string) => {
    if (subMenuId) {
      navigate(`/app/${item.id}/${subMenuId}`);
    } else if (item.subMenus) {
      if (isMobile) {
        setActiveMobileItem(item);
        setSubmenuOpen(true);
      } else {
        toggleSubmenu(item.id);
        if (!expandedItems.has(item.id) && item.subMenus.length > 0) {
          navigate(`/app/${item.id}/${item.subMenus[0].id}`);
        }
      }
    } else {
      setExpandedItems(new Set());
      navigate(`/app/${item.id}`);
    }

    // Close sidebar on mobile after navigation
    if (isMobile) {
      onCloseMobile();
    }
  };

  const isMenuItemActive = (item: MenuItem): boolean => {
    return item.subMenus
      ? pathname.startsWith(`/app/${item.id}`)
      : pathname === `/app/${item.id}`;
  };

  const isSubMenuActive = (item: MenuItem, subMenuId: string) =>
    pathname === `/app/${item.id}/${subMenuId}`;

  const profileImage = profile
    ? `${IMAGE_URL}${profile.stu_profile_path}/${profile.stu_photo}`
    : appLogo;

  // Mobile sidebar overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300"
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed top-0 left-0 h-full z-50
                    transition-all duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    ${collapsed ? "w-20" : "w-64"}
                    bg-white dark:bg-slate-900 
                    border-r border-slate-200 dark:border-slate-700
                    shadow-xl`}
        >
          {/* Logo */}
          <div className="p-3 border-b 
                        border-slate-200/50 dark:border-slate-700/50 
                        flex justify-center">
            {collapsed ? (
              <img src={appLogo} alt="Collapsed Logo" className="w-12 h-12 object-cover rounded-xl shadow-lg" />
            ) : (
              <img src={pcpsLogo} alt="Expanded Logo" className="w-full h-auto object-contain rounded-xl" />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = isMenuItemActive(item);
              const isExpanded = expandedItems.has(item.id);

              return (
                <div key={item.id}>
                  <button
                    className={`w-full flex cursor-pointer items-center justify-between p-3 rounded-xl 
                              transition-all duration-200
                              ${isActive
                              ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/50"
                            }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        className={`w-6 h-6 
                                  ${isActive
                                ? "text-white"
                                : "text-slate-700 dark:text-slate-200"
                              }`}
                      />
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </div>
                    {!collapsed && item.subMenus && (
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform 
                                  ${isExpanded ? "rotate-180" : ""} 
                                  ${isActive
                                ? "text-white"
                                : "text-slate-700 dark:text-slate-200"
                              }`}
                      />
                    )}
                  </button>

                  {/* Mobile submenus */}
                  {item.subMenus && isExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subMenus.map((menu) => (
                        <button
                          key={menu.id}
                          className={`w-full text-left p-2 text-sm rounded-lg transition-all 
                                    ${isSubMenuActive(item, menu.id)
                                ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                              }`}
                          onClick={() => handleMenuClick(item, menu.id)}
                        >
                          {menu.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Profile Section */}
          <div
            className={`border-t 
                      border-slate-200/50 dark:border-slate-700/50 
                      ${collapsed ? "p-2" : "p-4"}`}
          >
            <div
              className={`flex items-center 
                        ${collapsed ? "justify-center" : "space-x-3"} 
                        p-3 rounded-xl 
                        bg-slate-50 dark:bg-slate-800/50`}
            >
              {isLoading ? (
                <div className="w-10 h-12 rounded-md 
                              bg-slate-300 dark:bg-slate-700 
                              animate-pulse" />
              ) : (
                <img src={profileImage} alt="user" className="w-10 h-12 rounded-md ring-2 object-cover" />
              )}
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-4 w-28 
                                    bg-slate-300 dark:bg-slate-700 
                                    rounded animate-pulse" />
                      <div className="h-3 w-20 
                                    bg-slate-200 dark:bg-slate-600 
                                    rounded animate-pulse" />
                      <div className="h-3 w-16 
                                    bg-slate-200 dark:bg-slate-600 
                                    rounded animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium truncate 
                                 text-slate-800 dark:text-white">
                        {profile ? `${profile.stu_firstname} ${profile.stu_lastname || ""}` : "No Profile"}
                      </p>
                      <p className="text-xs truncate 
                                 text-slate-600 dark:text-slate-300">
                        {profile ? profile.semester_name : "Invalid!"}
                      </p>
                      <p className="text-xs truncate 
                                 text-slate-600 dark:text-slate-300">
                        {profile ? profile.session_name : "Invalid!"}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sliding submenu */}
        {activeMobileItem && (
          <>
            {submenuOpen && (
              <div
                onClick={() => setSubmenuOpen(false)}
                className="fixed inset-0 
                          bg-black/40 dark:bg-black/50 
                          z-50"
              />
            )}
            <div
              className={`fixed inset-y-0 right-0 w-64 shadow-xl 
                        transform transition-transform duration-300 ease-in-out z-50
                        bg-white dark:bg-slate-900 
                        text-slate-800 dark:text-slate-200
                        ${submenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div
                className={`flex items-center justify-between p-4 border-b 
                          border-slate-200 dark:border-slate-700`}
              >
                <h2 className="text-lg font-semibold 
                              text-slate-800 dark:text-slate-200">
                  {activeMobileItem.label}
                </h2>
                <button
                  onClick={() => setSubmenuOpen(false)}
                  className="text-lg font-bold 
                            text-slate-500 hover:text-slate-800
                            dark:text-slate-300 dark:hover:text-slate-100"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-2">
                {activeMobileItem.subMenus?.map((menu) => (
                  <button
                    key={menu.id}
                    className={`block w-full text-left p-2 rounded-lg transition-all 
                              ${isSubMenuActive(activeMobileItem, menu.id)
                          ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                    onClick={() => {
                      handleMenuClick(activeMobileItem, menu.id);
                      setSubmenuOpen(false);
                    }}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={`hidden md:flex flex-col relative z-10 
                  transition-all duration-300 ease-in-out border-r
                  ${collapsed ? "w-20" : "w-65"} 
                  bg-white dark:bg-slate-900 
                  border-slate-200 dark:border-slate-700`}
    >
      {/* Logo */}
      <div className="p-3 border-b 
                    border-slate-200/50 dark:border-slate-700/50 
                    flex justify-center">
        {collapsed ? (
          <img src={appLogo} alt="Collapsed Logo" className="w-12 h-12 object-cover rounded-xl shadow-lg" />
        ) : (
          <img src={pcpsLogo} alt="Expanded Logo" className="w-full h-auto object-contain rounded-xl" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = isMenuItemActive(item);
          const isExpanded = expandedItems.has(item.id);

          return (
            <div key={item.id}>
              <button
                className={`w-full flex cursor-pointer items-center justify-between p-3 rounded-xl 
                          transition-all duration-200
                          ${isActive
                        ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/50"
                      }`}
                onClick={() => handleMenuClick(item)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-6 h-6 
                              ${isActive
                          ? "text-white"
                          : "text-slate-700 dark:text-slate-200"
                        }`}
                  />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!collapsed && item.subMenus && (
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform 
                              ${isExpanded ? "rotate-180" : ""} 
                              ${isActive
                          ? "text-white"
                          : "text-slate-700 dark:text-slate-200"
                        }`}
                  />
                )}
              </button>

              {/* Desktop submenus */}
              {item.subMenus && isExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subMenus.map((menu) => (
                    <button
                      key={menu.id}
                      className={`w-full text-left p-2 text-sm rounded-lg transition-all 
                                ${isSubMenuActive(item, menu.id)
                          ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                      onClick={() => handleMenuClick(item, menu.id)}
                    >
                      {menu.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div
        className={`border-t 
                  border-slate-200/50 dark:border-slate-700/50 
                  ${collapsed ? "p-2" : "p-4"}`}
      >
        <div
          className={`flex items-center 
                    ${collapsed ? "justify-center" : "space-x-3"} 
                    p-3 rounded-xl 
                    bg-slate-50 dark:bg-slate-800/50`}
        >
          {isLoading ? (
            <div className="w-10 h-12 rounded-md 
                          bg-slate-300 dark:bg-slate-700 
                          animate-pulse" />
          ) : (
            <img src={profileImage} alt="user" className="w-10 h-12 rounded-md ring-2 object-cover" />
          )}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-4 w-28 
                                bg-slate-300 dark:bg-slate-700 
                                rounded animate-pulse" />
                  <div className="h-3 w-20 
                                bg-slate-200 dark:bg-slate-600 
                                rounded animate-pulse" />
                  <div className="h-3 w-16 
                                bg-slate-200 dark:bg-slate-600 
                                rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium truncate 
                               text-slate-800 dark:text-white">
                    {profile ? `${profile.stu_firstname} ${profile.stu_lastname || ""}` : "No Profile"}
                  </p>
                  <p className="text-xs truncate 
                               text-slate-600 dark:text-slate-300">
                    {profile ? profile.semester_name : "Invalid!"}
                  </p>
                  <p className="text-xs truncate 
                               text-slate-600 dark:text-slate-300">
                    {profile ? profile.session_name : "Invalid!"}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;