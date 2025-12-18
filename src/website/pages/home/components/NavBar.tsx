import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUniversity, FaCertificate, FaUsers, FaClipboardList, FaRegCalendarAlt, FaBook, FaGraduationCap, FaPhone } from "react-icons/fa";
import logo from "../../../../assets/lbef_white.png";
import useGetNameAll from "../../../../pages/courses/hooks/useGetCourseName";

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
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen({});
  }, [location.pathname]);
  const { data } = useGetNameAll();
  const courseNames = data?.data ?? []
  const toggleDropdown = (menu: string) => setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
  const handleMouseLeave = () => setTimeout(() => setActiveDropdown(null), 200);

  const isActive = (path: string) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "About",
      icon: <FaUniversity />,
      dropdown: [
        { name: "About LBEF", link: "/about/about-lbef", icon: <FaUniversity /> },
        { name: "About University", link: "/about/about-university", icon: <FaUniversity /> },
        { name: "Recognition", link: "/about/recognition", icon: <FaCertificate /> },
        { name: "Our Team", link: "/about/our-team", icon: <FaUsers /> },
        { name: "Holidays", link: "/about/holidays", icon: <FaRegCalendarAlt /> },
      ],
    },
    {
      name: "Courses",
      icon: <FaBook />,
      dropdown: courseNames && courseNames.length > 0
        ? courseNames.map((course) => ({
          name: `${course.prefix} ${course.title}`,
          link: `/courses/${course.title}`,
          icon: <FaBook />,
        }))
        : [
          {
            name: "No courses",
            link: "#",
            icon: <FaBook />,
            disabled: true,
          },
        ],
    }
    ,
    {
      name: "Students",
      icon: <FaUsers />,
      dropdown: [
        { name: "Programs", link: "/students-life/programs", icon: <FaGraduationCap /> },
        { name: "Academic Planner", link: "/students-life/academic-planner", icon: <FaUniversity /> },
        { name: "Downloads", link: "/students-life/downloads", icon: <FaUsers /> },
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
        { name: "Video Library", link: "/media/video-library", icon: <FaBook /> },
        { name: "News & Events", link: "/media/news-events", icon: <FaBook /> },
      ],
    },
    { name: "Blogs", link: "/blogs", icon: <FaBook /> },
    { name: "UGC", link: "/ugc", icon: <FaBook /> },
  ];

  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo */}
        <div className="w-32 md:w-36">
          <Link to="/">
            <img src={logo} alt="LBEF Logo" className="w-full h-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
                ref={(el) => { dropdownRefs.current[item.name] = el; }}
              >
                <button className="flex items-center gap-1.5 px-4 py-3 text-[#050038] hover:text-[#3040E5] transition-colors duration-200 font-medium text-sm uppercase group">
                  <span className="relative">{item.name}</span>
                  <i className="fa-solid fa-angle-down text-[0.65rem] transition-transform duration-300 group-hover:rotate-180"></i>
                </button>
                <div className={`absolute left-0 top-full pt-2 transition-all duration-300 transform origin-top ${activeDropdown === item.name ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}`}>
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[220px] overflow-hidden">
                    <div className="p-1">
                      {item.dropdown.map((sub,) => (
                        <Link
                          key={sub.name}
                          to={sub.link}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#3040E5] hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span className="font-medium text-sm">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.link}
                className={`relative px-4 py-3 transition-colors duration-200 font-medium text-sm uppercase ${isActive(item.link) ? "text-[#3040E5]" : "text-[#050038] hover:text-[#3040E5]"}`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Enroll Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/contact" className="text-[#050038] hover:text-[#3040E5] font-medium text-sm transition-colors">
            <FaPhone className="inline mr-2" />
            Contact
          </Link>
          <Link to="/enroll" className="bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase hover:shadow-lg transition-all duration-300 hover:scale-105">
            Enroll Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
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
                            <Link
                              key={sub.name}
                              to={sub.link}
                              className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-[#3040E5] hover:bg-white rounded-md transition-colors"
                              onClick={() => {
                                setMobileOpen(false);
                                setDropdownOpen({});
                              }}
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="font-medium">{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.link}
                    className="flex items-center py-4 text-[#050038] font-medium uppercase text-sm hover:text-[#3040E5] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
            <Link to="/enroll" className="flex items-center justify-center gap-2 bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-3 rounded-full font-semibold uppercase text-sm hover:shadow-lg transition-all duration-300">
              <FaGraduationCap />
              Enroll Now
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 text-[#050038] hover:text-[#3040E5] font-medium py-2">
              <FaPhone />
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
