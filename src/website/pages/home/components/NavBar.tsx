import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUniversity, FaCertificate, FaUsers, FaClipboardList, FaRegCalendarAlt, FaBook, FaGraduationCap, FaPhone } from "react-icons/fa";
import logo from "../../../../assets/lbef_white.png";
import useGetNameAll from "../../../../pages/courses/hooks/useGetCourseName";

// Define types for dropdown items
type DropdownItem = {
  name: string;
  icon: React.ReactNode;
  disabled?: boolean;
} & (
  | { link: string; onClick?: never }
  | { link?: never; onClick: () => void }
);

type MenuItem = {
  name: string;
  icon?: React.ReactNode;
  link?: string;
  dropdown?: DropdownItem[];
};

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }));
          setActiveDropdown(null);
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen({});
    setActiveDropdown(null);
  }, [location.pathname]);
  
  const { data } = useGetNameAll();
  const courseNames = data?.data ?? [];
  
  const toggleDropdown = (menu: string) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    setActiveDropdown(prev => prev === menu ? null : menu);
  };
  
  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    Object.keys(dropdownOpen).forEach(key => {
      if (key !== menu && dropdownOpen[key]) {
        setDropdownOpen(prev => ({ ...prev, [key]: false }));
      }
    });
  };
  
  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    {
      name: "About",
      icon: <FaUniversity />,
      dropdown: [
        { name: "About LBEF", link: "/about/about-lbef", icon: <FaUniversity /> },
        { name: "About University", link: "/about/about-university", icon: <FaUniversity /> },
        { name: "Recognition", link: "/about/recognition", icon: <FaCertificate /> },
        { name: "Achivement", link: "/about/achivement", icon: <FaCertificate /> },

        { name: "Our Team", link: "/about/our-team", icon: <FaUsers /> },
        { name: "Holidays", link: "/about/holidays", icon: <FaRegCalendarAlt /> },
      ],
    },
    {
      name: "Courses",
      icon: <FaBook />,
      dropdown: courseNames && courseNames.length > 0
        ? courseNames.map((course) => {
            const titleSlug = course.title.replace(/ /g, "-");
            return {
              name: `${course.prefix} ${course.title}`,
              icon: <FaBook />,
              onClick: () => {
                navigate(`/students-life/${titleSlug}/${course.id}`, {
                  state: { course },
                });
                setActiveDropdown(null);
              },
            };
          })
        : [
            {
              name: "No courses available",
              icon: <FaBook />,
              disabled: true,
              link: "#",
            },
          ],
    },
    {
      name: "Students",
      icon: <FaUsers />,
      dropdown: [
        { name: "Programs", link: "/students-life/programs", icon: <FaGraduationCap /> },
        { name: "Academic Planner", link: "/students-life/academic-planner", icon: <FaUniversity /> },
        { name: "Downloads", link: "/students-life/downloads", icon: <FaUsers /> },
        { name: "Fee Planner", link: "/students-life/fee-planner", icon: <FaUniversity /> },
        { name: "Notice Board", link: "/students-life/notices", icon: <FaUniversity /> },
        { name: "Contact List", link: "/students-life/student-support", icon: <FaClipboardList /> },
      ],
    },
    {
      name: "Admissions",
      icon: <FaClipboardList />,
      dropdown: [
        { name: "Admission Process", link: "/admissions/admission-process", icon: <FaClipboardList /> },
        { name: "Code of Conduct", link: "/students-life/student-code-of-conduct", icon: <FaClipboardList /> },
      ],
    },
    {
      name: "Media",
      icon: <FaBook />,
      dropdown: [
        { name: "Photo Gallery", link: "/media/photo-gallery", icon: <FaBook /> },
        { name: "Lbef Connect", link: "/media/connect", icon: <FaBook /> },
        { name: "News & Events", link: "/media/news-events", icon: <FaBook /> },
      ],
    },
    { name: "Blogs", link: "/blogs", icon: <FaBook /> },
    { name: "UGC", link: "/ugc", icon: <FaBook /> },
  ];

  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="max-full mx-auto flex items-center px-4 sm:px-6 py-3">
        <div className="w-32 md:w-36 shrink-0">
          <NavLink to="/">
            <img src={logo} alt="LBEF Logo" className="w-full h-auto object-contain" />
          </NavLink>
        </div>

        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-1">
            {menuItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  ref={(el) => { dropdownRefs.current[item.name] = el; }}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-3 transition-colors duration-200 font-medium text-sm uppercase group whitespace-nowrap ${location.pathname === item.link || location.pathname.startsWith(`/${item.name.toLowerCase()}`) ? "text-[#3040E5]" : "text-[#050038] hover:text-[#3040E5]"}`}>
                    <span className="relative">{item.name}</span>
                    <i className="fa-solid fa-angle-down text-[0.65rem] transition-transform duration-300 group-hover:rotate-180"></i>
                  </button>
                  
                  {/* Dropdown - Wider for Courses */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-full pt-2 transition-all duration-300 origin-top z-50 ${activeDropdown === item.name ? "opacity-100 scale-y-100 translate-y-0 visible" : "opacity-0 scale-y-95 -translate-y-2 invisible"}`}>
                    <div className={`bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden ${item.name === "Courses" ? "min-w-[280px]" : "min-w-[220px]"}`}>
                      <div className="p-1">
                        {item.dropdown.map((sub) => (
                          'onClick' in sub ? (
                            <button
                              key={sub.name}
                              onClick={sub.onClick}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#3040E5] hover:bg-blue-50 rounded-lg transition-all duration-200 w-full text-left"
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="font-medium text-sm">{sub.name}</span>
                            </button>
                          ) : (
                            <NavLink
                              key={sub.name}
                              to={sub.disabled ? "#" : sub.link}
                              className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${sub.disabled ? "text-gray-400 cursor-not-allowed" : isActive ? "text-[#3040E5] bg-blue-50" : "text-gray-700 hover:text-[#3040E5] hover:bg-blue-50"}`
                              }
                              onClick={(e) => {
                                if (sub.disabled) e.preventDefault();
                                setActiveDropdown(null);
                              }}
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="font-medium text-sm">{sub.name}</span>
                            </NavLink>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.link!}
                  className={({ isActive }) =>
                    `relative px-4 py-3 transition-colors duration-200 font-medium text-sm uppercase whitespace-nowrap ${isActive ? "text-[#3040E5]" : "text-[#050038] hover:text-[#3040E5]"}`
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}
             <NavLink 
            to="/enroll" 
            className={({ isActive }) =>
              `bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${isActive ? "ring-2 ring-blue-300" : ""}`
            }
          >
            Enroll Now
          </NavLink>
          </div>
          
        </nav>

        

        {/* Mobile Hamburger - Right side */}
        <div className="lg:hidden shrink-0 ml-auto">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-xl text-[#050038]`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 py-3">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.name} className="border-b border-gray-100 last:border-0">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex justify-between items-center w-full py-4 text-[#050038] font-medium uppercase text-sm hover:text-[#3040E5] transition-colors"
                    >
                      <span>{item.name}</span>
                      <i className={`fa-solid fa-angle-down transition-transform duration-300 ${dropdownOpen[item.name] ? "rotate-180" : ""}`}></i>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${dropdownOpen[item.name] ? "max-h-96" : "max-h-0"}`}>
                      <div className="pl-4 pb-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          {item.dropdown.map((sub) => (
                            'onClick' in sub ? (
                              <button
                                key={sub.name}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setDropdownOpen({});
                                }}
                                className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-[#3040E5] hover:bg-white rounded-md transition-colors w-full text-left"
                              >
                                <span className="text-lg">{sub.icon}</span>
                                <span className="font-medium">{sub.name}</span>
                              </button>
                            ) : (
                              <NavLink
                                key={sub.name}
                                to={sub.disabled ? "#" : sub.link}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 py-2.5 px-3 rounded-md transition-colors w-full ${sub.disabled ? "text-gray-400 cursor-not-allowed" : isActive ? "text-[#3040E5] bg-white" : "text-gray-700 hover:text-[#3040E5] hover:bg-white"}`
                                }
                                onClick={() => {
                                  if (!sub.disabled) {
                                    setMobileOpen(false);
                                    setDropdownOpen({});
                                  }
                                }}
                              >
                                <span className="text-lg">{sub.icon}</span>
                                <span className="font-medium">{sub.name}</span>
                              </NavLink>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.link!}
                    className={({ isActive }) =>
                      `flex items-center py-4 font-medium uppercase text-sm transition-colors ${isActive ? "text-[#3040E5]" : "text-[#050038] hover:text-[#3040E5]"}`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
            <NavLink 
              to="/enroll" 
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-3 rounded-full font-semibold uppercase text-sm hover:shadow-lg transition-all duration-300 ${isActive ? "ring-2 ring-blue-300" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaGraduationCap />
              Enroll Now
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 font-medium py-2 ${isActive ? "text-[#3040E5]" : "text-[#050038] hover:text-[#3040E5]"}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaPhone />
              Contact Admissions
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}