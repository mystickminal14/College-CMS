import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaCertificate,
  FaUsers,
  FaClipboardList,
  FaBook,
  FaGraduationCap,
  FaChevronDown,
  FaCalendar,
  FaUserGraduate,
  FaComment,
  FaTimes,
  FaBars,

} from "react-icons/fa";
import logo from "../../../../assets/lbef_five.webp";
import apuLogo from "../../../../assets/apu_logo.webp";
import useGetNameAll from "../../../../pages/courses/hooks/useGetCourseName";
import { useEnquiry } from "../../../../context/EnquiryContext";

type DropdownItem = {
  name: string;
  icon: React.ReactNode;
  disabled?: boolean;
  dropdown?: DropdownItem[];
} & (
    | { link: string; onClick?: never }
    | { link?: never; onClick: () => void }
    | { link?: never; onClick?: never }
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
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { open } = useEnquiry();

  /* Close menus on route change */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setDropdownOpen({});
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  }, [location.pathname]);

  const { data } = useGetNameAll();
  const courseNames = data?.data ?? [];

  /* Desktop hover */
  const onEnter = (menu: string) => setActiveDropdown(menu);
  const onLeave = () => {
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  };

  /* Mobile click toggle */
  const toggleMobile = (menu: string) => {
    setDropdownOpen((p) => ({ ...p, [menu]: !p[menu] }));
  };

  const toggleNestedMobile = (parent: string, child: string) => {
    const key = `${parent}-${child}`;
    setDropdownOpen((p) => ({ ...p, [key]: !p[key] }));
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    {
      name: "About",
      dropdown: [
        { name: "About LBEF", link: "/about/about-lbef", icon: <FaUniversity /> },
        { name: "About University", link: "/about/about-university", icon: <FaUniversity /> },
        { name: "Recognitions", link: "/about/recognition", icon: <FaCertificate /> },
        { name: "Permission Letter", link: "/about/permission-letter", icon: <FaCertificate /> },

        { name: "Achivements", link: "/about/achivement", icon: <FaCertificate /> },
        {name: "Messages", link: "/about/messages", icon: <FaUsers />},
        { name: "Our Team", link: "/about/our-team", icon: <FaUsers /> },
        { name: "Holidays", link: "/about/holidays", icon: <FaCalendar /> },
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
        { name: "Academic Club", link: "/students-life/academic-club", icon: <FaGraduationCap /> },
        { name: "Academic Planner", link: "/students-life/academic-planner", icon: <FaUniversity /> },
        { name: "Downloads", link: "/students-life/downloads", icon: <FaUsers /> },
        { name: "Fee Planner", link: "/students-life/fee-planner", icon: <FaUniversity /> },
        { name: "Notice Board", link: "/students-life/notices", icon: <FaUniversity /> },
        { name: "Payment Modes", link: "/students-life/payment-modes", icon: <FaUniversity /> },
        { name: "Student Access", link: "/students-life/student-access", icon: <FaUniversity /> },
        { name: "Contact List", link: "/students-life/student-support", icon: <FaClipboardList /> },
        {
          name: "Alumni",
          icon: <FaUserGraduate />,
          dropdown: [
            { name: "Alumni Speaks", link: "/students-life/alumni-speaks", icon: <FaComment /> },
            { name: "Alumni Form", link: "/students-life/alumni-form", icon: <FaComment /> },
          ],
        },
      ],
    },
    {
      name: "Admissions",
      dropdown: [
        // { name: "Programs", link: "/students-life/programs", icon: <FaGraduationCap /> },
        { name: "Admission Process", link: "/admissions/admission-process", icon: <FaClipboardList /> },
        { name: "Code of Conduct", link: "/students-life/student-code-of-conduct", icon: <FaClipboardList /> },
      ],
    },
    {
      name: "LBEF Publications",
      dropdown: [
        { name: "Photo Gallery", link: "/media/photo-gallery", icon: <FaBook /> },
        { name: "Lbef Connect", link: "/media/connect", icon: <FaBook /> },
        { name: "Journal", link: "/lrjstm/", icon: <FaBook /> },
        { name: "LBEF News", link: "/media/news-events", icon: <FaBook /> },
      ],
    },
    { name: "UGC", link: "https://lbef.org/ugc/login.php" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-1">
        <div className="flex gap-2">
          <NavLink to="/" className="w-40 cursor-pointer">
            <img src={logo} alt="LBEF Logo" />
          </NavLink>
          <NavLink to="/" className="w-14 cursor-pointer">
            <img src={apuLogo} alt="APU Logo" className="" />
          </NavLink>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center flex-wrap gap-1">
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
                    {item.dropdown.map((sub) => {
                      if (sub.dropdown) {
                        return (
                          <div
                            key={sub.name}
                            className="relative"
                            onMouseEnter={() => setActiveNestedDropdown(sub.name)}
                            onMouseLeave={() => setActiveNestedDropdown(null)}
                          >
                            <div className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 w-full text-left rounded-lg cursor-pointer">
                              <span className="flex items-center gap-3">
                                <span className="text-lg">{sub.icon}</span> {/* force icon size */}
                                <span className="whitespace-normal wrap-break-word">{sub.name}</span>
                              </span>
                              {sub.dropdown && (
                                <FaChevronDown className={`text-xs transition-transform break-words${activeNestedDropdown === sub.name ? "rotate-180" : ""}`} />
                              )}
                            </div>

                            {activeNestedDropdown === sub.name && (
                              <div className="absolute left-full top-0 pl-1">
                                <div className="bg-white shadow-xl rounded-xl p-1 min-w-[220px]">
                                  {sub.dropdown?.map((nested) => (
                                    <NavLink
                                      key={nested.name}
                                      to={nested.link!}
                                      className="flex gap-3 items-center px-4 py-3 hover:bg-blue-50 rounded-lg"
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setActiveNestedDropdown(null);
                                      }}
                                    >
                                      {nested.icon}
                                      {nested.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (sub.onClick) {
                        return (
                          <button
                            key={sub.name}
                            onClick={sub.onClick}
                            className="flex gap-3 items-center cursor-pointer px-4 py-3 hover:bg-blue-50 w-full text-left rounded-lg"
                          >
                            <span className="text-lg">{sub.icon}</span>
                            {sub.name}
                          </button>
                        );
                      }

                      return (
                        <NavLink
                          key={sub.name}
                          to={sub.disabled ? "#" : sub.link!}
                          className="flex gap-3 items-center px-4 py-3 hover:bg-blue-50 rounded-lg"
                        >
                          <span className="text-lg">{sub.icon}</span>
                          {sub.name}
                        </NavLink>
                      );
                    })}
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

          <button
            onClick={() => open()}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            <FaUserGraduate />
            Enquire Now
          </button>

        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
      lg:hidden 
      bg-white 
      px-4 
      py-3 
      shadow-lg 
      max-h-[calc(100vh-64px)] 
      overflow-y-auto
      overscroll-contain
    "
        >
          {menuItems.map((item) =>
            item.dropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => toggleMobile(item.name)}
                  className="flex justify-between items-center w-full py-3 uppercase font-medium cursor-pointer"
                >
                  <span>{item.name}</span>
                  <FaChevronDown
                    className={`transition-transform ${dropdownOpen[item.name] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {dropdownOpen[item.name] &&
                  item.dropdown.map((sub) => {
                    if (sub.dropdown) {
                      const nestedKey = `${item.name}-${sub.name}`;

                      return (
                        <div key={sub.name}>
                          <button
                            onClick={() =>
                              toggleNestedMobile(item.name, sub.name)
                            }
                            className="flex justify-between items-center w-full py-2 pl-4 font-medium cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-lg">{sub.icon}</span>
                              {sub.name}
                            </span>
                            <FaChevronDown
                              className={`transition-transform ${dropdownOpen[nestedKey] ? "rotate-180" : ""
                                }`}
                            />
                          </button>

                          {dropdownOpen[nestedKey] &&
                            sub.dropdown?.map((nested) => (
                              <NavLink
                                key={nested.name}
                                to={nested.link!}
                                className="flex items-center gap-2 py-2 pl-8"
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className="text-lg">{nested.icon}</span>
                                {nested.name}
                              </NavLink>
                            ))}
                        </div>
                      );
                    }

                    if (sub.onClick) {
                      return (
                        <button
                          key={sub.name}
                          onClick={() => {
                            sub.onClick?.();
                            setMobileOpen(false);
                          }}
                          className="flex items-center gap-2 py-2 pl-4 w-full text-left"
                        >
                          <span className="text-lg">{sub.icon}</span>
                          {sub.name}
                        </button>
                      );
                    }

                    return (
                      <NavLink
                        key={sub.name}
                        to={sub.link!}
                        className="flex items-center gap-2 py-2 pl-4"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.icon}
                        {sub.name}
                      </NavLink>
                    );
                  })}
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.link!}
                className="block py-3 uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </NavLink>
            )
          )}

          {/* CTA Button */}
          <button
            onClick={() => {
              setMobileOpen(false);
              console.log(" Enquiry button clicked");
              open();
            }}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 sticky bottom-0"
          >
            <FaUserGraduate />
            Enquiry Now
          </button>
        </div>
      )
      }

    </header >
  );
}