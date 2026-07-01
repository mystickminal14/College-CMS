import { FaAward, FaBlog, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, } from "react";
import appLogo from "../../assets/butterfiles.webp";
import pcpsLogo from "../../assets/pcpslogo.webp";
import {
  MdPeople, MdSchool, MdBusinessCenter, MdArticle,
  MdWorkspacePremium, MdGroups,
  MdNotificationsActive,
  MdHowToReg,
  MdContactMail,
  MdCalendarToday,
  MdMenuBook,
  MdAssignment,
  MdAttachMoney,
  MdPhoto,
  MdDocumentScanner,
  MdWork,
} from 'react-icons/md';
import { useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../../login/hooks/useLogout";
import { filterMenuItems } from "../../utils/filteredMenu";
import useMe from "../../login/hooks/useMe";
import type { PermissionNameType } from "../../login/model/permission";

export interface SubMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  subMenus?: SubMenuItem[];
}

interface SideBarProps {
  collapsed: boolean;
  onCollapse?: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

// Full menu definition (unchanged)
const menuItems: MenuItem[] = [
  { id: "user", icon: MdPeople, label: "Users", badge: "New" },
  { id: "course", icon: MdSchool, label: "Courses", badge: "New" },
  { id: "course-registration", icon: MdHowToReg, label: "Course Registration" },
  { id: "teams", icon: MdGroups, label: "Our Teams", badge: "New" },
  { id: "hero-section", icon: MdBusinessCenter, label: "Hero Section", badge: "New" },
  { id: "faq", icon: MdBusinessCenter, label: "FAQ", badge: "New" },

  {
    id: "students",
    icon: MdBusinessCenter,
    label: "Students",
    subMenus: [
      { id: "planner", label: "Academic Planner", icon: MdAssignment },
      { id: "planner-course", label: "Course Planner", icon: MdAssignment },

      { id: "fee-planner", label: "Fee Planner", icon: MdAttachMoney },
      { id: "downloads", label: "Downloads", icon: MdMenuBook },
    ]
  },
  {
    id: "alumni",
    icon: MdArticle,
    label: "Alumni",
    subMenus: [
      { id: "screen", label: "Alumni", icon: MdBusinessCenter },
      { id: "form", label: "Alumni Form", icon: MdBusinessCenter },

    ],
  }, {
    id: "media",
    icon: MdArticle,
    label: "Lbef Publication",
    subMenus: [
      { id: "blogs", label: "Blogs", icon: FaBlog },
      { id: "news", label: "News", icon: MdArticle },
      { id: "journals", label: "Journal", icon: MdArticle },
      { id: "editorial-board", label: "Editorial Board", icon: MdArticle },
      { id: "connect", label: "LBEF Connect", icon: MdGroups },
      { id: "gallery", label: "Photo Gallery", icon: MdPhoto },
    ],
  },
  // {
  //   id: "lbef",
  //   icon: FaBlog,
  //   label: "Manage Blogs",
  //   subMenus: [
  //     { id: "blogs", label: "Blogs", icon: FaBlog },
  //   ]
  // },
  {
    id: "administation",
    icon: MdBusinessCenter,
    label: "Academic",
    subMenus: [
      { id: "notice", label: "Notice Board", icon: MdNotificationsActive },
      { id: "contact", label: "Contact List", icon: MdContactMail },
      { id: "recognition", label: "Recognitions", icon: MdWorkspacePremium },
      { id: "achievement", label: "Achievements", icon: FaAward },
    ]
  },
  {
    id: "admission",
    icon: MdHowToReg,
    label: "Admission",
    subMenus: [
      { id: "intake", label: "Intake Calender", icon: MdCalendarToday },
      { id: "scholarship", label: "ICT Scholarship", icon: MdDocumentScanner },
    ],
  },
  {
    id: "job-vacancy",
    icon: MdWork,
    label: "Job Vacancy",
    subMenus: [
      { id: "vacancy", label: "Vacancies", icon: MdWork },
    ],
  },
];

const SideBar: React.FC<SideBarProps> = ({
  collapsed,
  onCollapse,
  isMobile,
  mobileOpen,
  onCloseMobile,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeMobileItem, setActiveMobileItem] = useState<MenuItem | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: meData } = useMe();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Safe permissions mapping from API
  const userPermissions: PermissionNameType[] = meData?.data?.permissions || [];
  ;

  const role = meData?.data?.role || "USER";

  // Filter menu based on API permissions
  const visibleMenus = filterMenuItems(menuItems, userPermissions, role);

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return newExpanded;
    });
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

    if (isMobile) onCloseMobile();
  };

  const isMenuItemActive = (item: MenuItem) =>
    item.subMenus ? pathname.startsWith(`/app/${item.id}`) : pathname === `/app/${item.id}`;

  const isSubMenuActive = (item: MenuItem, subMenuId: string) =>
    pathname === `/app/${item.id}/${subMenuId}`;

  // ------------------- Mobile Sidebar -------------------
  if (isMobile) {
    return (
      <>
        {mobileOpen && (
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300 cursor-pointer"
          />
        )}
        <div
          className={`fixed top-0 left-0 h-full z-50
                    transition-all duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    ${collapsed ? "w-20" : "w-64"}
                    bg-white dark:bg-slate-900 
                    border-r border-slate-200 dark:border-slate-700
                    shadow-xl flex flex-col`}
        >
          <div className="p-3 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-center">
            {collapsed ? (
              <img src={appLogo} alt="Collapsed Logo" className="w-12 h-12 object-cover rounded-xl shadow-lg cursor-pointer" />
            ) : (
              <img src={pcpsLogo} alt="Expanded Logo" className="w-full h-auto object-contain rounded-xl cursor-pointer" />
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {visibleMenus.map((item) => {
              const isActive = isMenuItemActive(item);
              const isExpanded = expandedItems.has(item.id);

              return (
                <div key={item.id}>
                  <button
                    aria-label="handle menu click"
                    className={`w-full flex items-center justify-between p-3 rounded-xl 
                      transition-all duration-200 cursor-pointer
                      ${isActive
                        ? "bg-[#125DAA] text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/50"
                      }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
                      />
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </div>

                    {!collapsed && item.subMenus && (
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""} 
                          ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
                      />
                    )}
                  </button>

                  {item.subMenus && isExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subMenus.map((menu) => (
                        <button
                          aria-label="handle menu click"
                          key={menu.id}
                          className={`w-full text-left p-2 text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer
                          ${isSubMenuActive(item, menu.id)
                              ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                              : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                            }`}
                          onClick={() => handleMenuClick(item, menu.id)}
                        >
                          {menu.icon && <menu.icon className="w-4 h-4" />}
                          <span>{menu.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 rounded-xl 
                        bg-linear-to-r from-red-500 to-red-600 text-white 
                        hover:from-red-600 hover:to-red-700 
                        active:from-red-700 active:to-red-800
                        shadow-lg hover:shadow-red-500/25
                        transition-all duration-200 group cursor-pointer"
              aria-label="Log out"
              title="Log out"
            >
              <IoLogOutOutline className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {!collapsed && <span className="ml-3 font-medium hidden">Logout</span>}
            </button>
          </div>
        </div>

        {activeMobileItem && submenuOpen && (
          <>
            <div
              onClick={() => setSubmenuOpen(false)}
              className="fixed inset-0 bg-black/40 dark:bg-black/50 z-50 cursor-pointer"
            />
            <div
              className={`fixed inset-y-0 right-0 w-64 shadow-xl transform transition-transform duration-300 ease-in-out z-50
                        bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200
                        ${submenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {activeMobileItem.label}
                </h2>
                <button
                  aria-label="Close Submenu"
                  onClick={() => setSubmenuOpen(false)}
                  className="text-lg font-bold text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-2">
                {activeMobileItem.subMenus?.map((menu) => (
                  <button
                    key={menu.id}
                    className={`w-full text-left p-2 rounded-lg transition-all flex items-center space-x-2 cursor-pointer
                      ${isSubMenuActive(activeMobileItem, menu.id)
                        ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    onClick={() => {
                      handleMenuClick(activeMobileItem, menu.id);
                      setSubmenuOpen(false);
                    }}
                    aria-label="handle submenu click"
                  >
                    {menu.icon && <menu.icon className="w-4 h-4" />}
                    <span>{menu.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // ------------------- Desktop Sidebar -------------------
  return (
    <div
      className={`hidden md:flex flex-col relative z-10 
                  transition-all duration-300 ease-in-out border-r
                  ${collapsed ? "w-20" : "w-64"} 
                  bg-white dark:bg-slate-900 
                  border-slate-200 dark:border-slate-700`}
    >
      {!isMobile && onCollapse && (
        <button
          onClick={onCollapse}
          className="absolute -right-3 top-10 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110 cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <FaChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <FaChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      )}

      <div className="p-3 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-center">
        {collapsed ? (
          <img src={appLogo} alt="Collapsed Logo" className="w-12 h-12 object-cover rounded-xl shadow-lg cursor-pointer" />
        ) : (
          <img src={pcpsLogo} alt="Expanded Logo" className="w-full h-auto object-contain rounded-xl cursor-pointer" />
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleMenus.map((item) => {
          const isActive = isMenuItemActive(item);
          const isExpanded = expandedItems.has(item.id);

          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl 
                          transition-all duration-200 cursor-pointer
                          ${isActive
                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/50"
                  }`}
                onClick={() => handleMenuClick(item)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
                  />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!collapsed && item.subMenus && (
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""} 
                              ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
                  />
                )}
              </button>

              {item.subMenus && isExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subMenus.map((menu) => (
                    <button
                      aria-label="handle menu click"
                      key={menu.id}
                      className={`w-full text-left p-2 text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer
                          ${isSubMenuActive(item, menu.id)
                          ? "text-blue-600 bg-blue-50 dark:text-blue-600 dark:bg-blue-900/20 font-medium"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                      onClick={() => handleMenuClick(item, menu.id)}
                    >
                      {menu.icon && <menu.icon className="w-4 h-4" />}
                      <span>{menu.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 rounded-xl 
                    bg-linear-to-r from-red-500 to-red-600 text-white 
                    hover:from-red-600 hover:to-red-700 
                    active:from-red-700 active:to-red-800
                    shadow-lg hover:shadow-red-500/25
                    transition-all duration-200 group cursor-pointer"
          aria-label="Log out"
          title="Log out"
        >
          <IoLogOutOutline className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="ml-3 font-medium hidden">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
