import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaCertificate,
  FaUsers,
  FaClipboardList,
  FaRegCalendarAlt,
  FaBook,
  FaGraduationCap,
  FaChevronDown,
} from "react-icons/fa";
import logo from "../../../../assets/lbefHd.jpg";
import apuLogo from "../../../../assets/apu_logo.png";

import useGetNameAll from "../../../../pages/courses/hooks/useGetCourseName";

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
  link?: string;
  dropdown?: DropdownItem[];
};

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen({});
    setActiveDropdown(null);
  }, [location.pathname]);

  const { data } = useGetNameAll();
  const courseNames = data?.data ?? [];

  /* Desktop hover */
  const onEnter = (menu: string) => setActiveDropdown(menu);
  const onLeave = () => setActiveDropdown(null);

  /* Mobile click toggle */
  const toggleMobile = (menu: string) => {
    setDropdownOpen((p) => ({ ...p, [menu]: !p[menu] }));
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    {
      name: "About",
      dropdown: [
        { name: "About LBEF", link: "/about/about-lbef", icon: <FaUniversity /> },
        { name: "About University", link: "https://www.apu.edu.my/about-apu/", icon: <FaUniversity /> },
        { name: "Recognition", link: "/about/recognition", icon: <FaCertificate /> },
        { name: "Achivement", link: "/about/achivement", icon: <FaCertificate /> },
        { name: "Our Team", link: "/about/our-team", icon: <FaUsers /> },
        { name: "Holidays", link: "/about/holidays", icon: <FaRegCalendarAlt /> },
      ],
    },
    {
      name: "Courses",
      dropdown:
        courseNames.length > 0
          ? courseNames.map((course) => ({
            name: `${course.prefix} ${course.title}`,
            icon: <FaBook />,
            onClick: () => {
              navigate(
                `/students-life/${course.title.replace(/ /g, "-")}/${course.id}`,
                { state: { course } }
              );
              setActiveDropdown(null);
            },
          }))
          : [{ name: "No courses available", icon: <FaBook />, disabled: true, link: "#" }],
    },
    {
      name: "Students",
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
      dropdown: [
        { name: "Admission Process", link: "/admissions/admission-process", icon: <FaClipboardList /> },
        { name: "Code of Conduct", link: "/students-life/student-code-of-conduct", icon: <FaClipboardList /> },
      ],
    },
    {
      name: "Media",
      dropdown: [
        { name: "Photo Gallery", link: "/media/photo-gallery", icon: <FaBook /> },
        { name: "Lbef Connect", link: "/media/connect", icon: <FaBook /> },
        { name: "News & Events", link: "/media/news-events", icon: <FaBook /> },
      ],
    },
    { name: "UGC", link: "/ugc" },

  ];

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ?? ""}`}>
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-1">
        <div className="flex gap-2">
          <NavLink to="/" className="w-20 md:w-24 cursor-pointer">
            <img src={logo} alt="LBEF Logo" />
          </NavLink>
          <NavLink to="/" className="w-40  md:w-44 cursor-pointer">
            <img src={apuLogo} alt="LBEF Logo" className=" " />
          </NavLink>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => onEnter(item.name)}
                onMouseLeave={onLeave}
              >
                <button className="flex items-center gap-1 px-4 py-3 cursor-pointer uppercase text-sm font-medium hover:text-[#3040E5]">
                  <span>{item.name}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all ${activeDropdown === item.name
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                    }`}
                >
                  <div
                    className={`bg-white shadow-xl rounded-xl p-1 ${item.name === "Courses" ? "min-w-[380px]" : "min-w-[220px]"
                      }`}
                  >

                    {item.dropdown.map((sub) =>
                      "onClick" in sub ? (
                        <button
                          key={sub.name}
                          onClick={sub.onClick}
                          className="flex gap-3 cursor-pointer px-4 py-3 hover:bg-blue-50 w-full text-left rounded-lg"
                        >
                          {sub.icon}
                          {sub.name}
                        </button>
                      ) : (
                        <NavLink
                          key={sub.name}
                          to={sub.disabled ? "#" : sub.link}
                          className="flex gap-3 cursor-pointer px-4 py-3 hover:bg-blue-50 rounded-lg"
                        >
                          {sub.icon}
                          {sub.name}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.link!}
                className="px-4 py-3 uppercase cursor-pointer text-sm font-medium hover:text-[#3040E5]"
              >
                {item.name}
              </NavLink>
            )
          )}

          <NavLink
            to="/enroll"
            className="ml-3 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold"
          >
            Enquiry Now
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
          <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white px-4 py-3">
          {menuItems.map((item) =>
            item.dropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => toggleMobile(item.name)}
                  className="flex justify-between cursor-pointer items-center w-full py-3 uppercase font-medium"
                >
                  <span>{item.name}</span>
                  <FaChevronDown
                    className={`transition-transform ${dropdownOpen[item.name] ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {dropdownOpen[item.name] &&
                  item.dropdown.map((sub) =>
                    "onClick" in sub ? (
                      <button key={sub.name} className="block py-2 pl-4">
                        {sub.name}
                      </button>
                    ) : (
                      <NavLink key={sub.name} to={sub.link!} className="block py-2 pl-4">
                        {sub.name}
                      </NavLink>
                    )
                  )}
              </div>
            ) : (
              <NavLink key={item.name} to={item.link!} className="block py-3 uppercase">
                {item.name}
              </NavLink>
            )
          )}
        </div>
      )}
    </header>
  );
}
