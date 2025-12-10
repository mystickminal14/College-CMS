import { IoMoon, IoSunny, IoLogOutOutline } from "react-icons/io5";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";
import type { ProfileModel } from "../model/ProfileModel";
import appLogo from "../../assets/applogo.png";
import { IMAGE_URL } from "../../constants";
import { useQueryClient } from "@tanstack/react-query";

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  profile: ProfileModel | null;
  isLoading: boolean;
  isMobile: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggle, 
  profile, 
  isLoading, 
  isMobile,
  onMobileMenuToggle 
}) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext not found");
  const { theme, toggleTheme } = appContext;
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/");
  };

  const profileImage = profile
    ? `${IMAGE_URL}${profile.stu_profile_path}/${profile.stu_photo}`
    : appLogo;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="font-poppins px-6 py-2 backdrop-blur-xl border-b 
                    bg-white dark:bg-slate-900
                    border-slate-200/50 dark:border-slate-700/50
                    transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Desktop sidebar toggle - only visible on desktop */}
          {!isMobile && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg 
                        text-slate-600 hover:bg-slate-100
                        dark:text-slate-300 dark:hover:bg-slate-800
                        transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <FaBars className="w-5 h-5" />
            </button>
          )}

          {/* Mobile menu button - only visible on mobile */}
          {isMobile && (
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-lg 
                        text-slate-600 hover:bg-slate-100
                        dark:text-slate-300 dark:hover:bg-slate-800
                        transition-colors duration-200"
              aria-label="Open menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          )}

          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-wider 
                           text-slate-800 dark:text-white">
              Welcome to PCPS Life 👋
            </h1>
          </div>
          
          {/* Mobile title */}
          <div className="md:hidden">
            <h1 className="text-lg font-bold 
                           text-slate-800 dark:text-white">
              PCPS Life
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 relative">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl cursor-pointer 
                      text-slate-600 hover:bg-slate-100
                      dark:text-slate-300 dark:hover:bg-slate-800
                      transition-colors duration-200"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <IoMoon className="w-5 h-5" />
            ) : (
              <IoSunny className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl cursor-pointer flex items-center gap-2 
                      text-slate-600 hover:bg-slate-100
                      dark:text-slate-300 dark:hover:bg-slate-800
                      transition-colors duration-200"
            aria-label="Log out"
            title="Log out"
          >
            <IoLogOutOutline className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>

          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex p-2 cursor-pointer items-center space-x-3 pl-3 border-l 
                        border-slate-200 dark:border-slate-700
                        hover:bg-slate-100 dark:hover:bg-slate-800
                        transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-8 h-8 rounded-full 
                              bg-slate-300 dark:bg-slate-700 
                              animate-pulse" />
              ) : (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full ring-1 object-cover ring-blue-500"
                />
              )}

              <div className="hidden md:block">
                {isLoading ? (
                  <div className="space-y-1">
                    <div className="h-4 w-28 
                                  bg-slate-300 dark:bg-slate-700 
                                  rounded animate-pulse" />
                    <div className="h-3 w-20 
                                  bg-slate-200 dark:bg-slate-600 
                                  rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium 
                                 text-slate-800 dark:text-white">
                      {profile
                        ? `${profile.stu_firstname} ${profile.stu_lastname || ""}`
                        : "No Profile"}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                      {profile ? profile.semester_name : "Invalid!"}
                    </p>
                  </>
                )}
              </div>

              <FaChevronDown
                className={`w-3 h-3 transition-transform duration-200 
                          ${dropdownOpen ? "rotate-180" : ""} 
                          text-slate-500 dark:text-slate-400`}
              />
            </div>

            {/* Dropdown menu */}
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50
                        transform transition-all duration-200 ease-in-out 
                        ${dropdownOpen
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0 pointer-events-none"
                        } 
                        bg-white dark:bg-slate-800 
                        border-slate-200 dark:border-slate-700`}
            >
              <ul className="py-2 text-sm">
                <li
                  onClick={() => navigate("profile")}
                  className="px-4 py-2 cursor-pointer transition-colors duration-200 
                           text-slate-700 dark:text-white 
                           hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Profile
                </li>
                <li
                  onClick={() => navigate("idcard")}
                  className="px-4 py-2 cursor-pointer transition-colors duration-200 
                           text-slate-700 dark:text-white 
                           hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Student Id Card
                </li>
                <li
                  onClick={() => navigate("/reset")}
                  className="px-4 py-2 cursor-pointer transition-colors duration-200 
                           text-slate-700 dark:text-white 
                           hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Change Password
                </li>
                <li
                  onClick={() => {
                    window.open("https://password.beds.ac.uk/", "_blank");
                  }}
                  className="px-4 py-2 cursor-pointer transition-colors duration-200 
                           text-slate-700 dark:text-white 
                           hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Change Breo Password
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;