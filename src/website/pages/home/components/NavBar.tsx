import { useState, useEffect, useRef } from "react";
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
  FaLaptopCode,
  FaFlask,
  FaBriefcase,
  FaHeartbeat,
  FaPaintBrush,
  FaCogs,
  FaCalculator,
  FaGlobe,
  FaLeaf,
  FaMicroscope,
  FaBalanceScale,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaNetworkWired,
  FaRobot,
  FaCloud,
  FaMobile,
  FaShieldAlt,
  FaBuilding,
} from "react-icons/fa";
import logo from "../../../../assets/lbef_five.webp";
import apuLogo from "../../../../assets/apu_logo.webp";
import { useEnquiry } from "../../../../context/EnquiryContext";
import useGetIntakes from "../../../../pages/intake-calender/hooks/useGetAllIntakr";
import useGetCatWithDetails from "../../../../pages/courses/hooks/useGetCourseWithCat";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { GraduationCap, Volume2 } from "lucide-react";

const COURSE_ICONS = [
  <FaLaptopCode />,
  <FaFlask />,
  <FaBriefcase />,
  <FaHeartbeat />,
  <FaPaintBrush />,
  <FaCogs />,
  <FaCalculator />,
  <FaGlobe />,
  <FaLeaf />,
  <FaMicroscope />,
  <FaBalanceScale />,
  <FaChartLine />,
  <FaCode />,
  <FaDatabase />,
  <FaNetworkWired />,
  <FaRobot />,
  <FaCloud />,
  <FaMobile />,
  <FaShieldAlt />,
  <FaBuilding />,
];

const CATEGORY_ICONS = [
  <FaLaptopCode />,
  <FaFlask />,
  <FaBriefcase />,
  <FaHeartbeat />,
  <FaPaintBrush />,
  <FaCogs />,
  <FaCalculator />,
  <FaGlobe />,
  <FaMicroscope />,
  <FaBalanceScale />,
];

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

// ── Fix: use `Transition` type explicitly so TS is happy ──────────────────────
const easeOut: Transition = { duration: 0.18, ease: "easeOut" };
const easeIn: Transition = { duration: 0.13, ease: "easeIn" };
const nestedEaseOut: Transition = { duration: 0.22, ease: "easeOut" };
const nestedEaseIn: Transition = { duration: 0.15, ease: "easeIn" };

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: easeOut },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: easeIn },
};

const nestedVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: -4 },
  visible: { opacity: 1, height: "auto", y: 0, transition: nestedEaseOut },
  exit: { opacity: 0, height: 0, y: -4, transition: nestedEaseIn },
};
// ─────────────────────────────────────────────────────────────────────────────

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { open } = useEnquiry();

  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nestedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen({});
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  }, [location.pathname]);

  const { data } = useGetCatWithDetails();
  const categories = data?.data ?? [];

  const { data: intakeData, isLoading, isError } = useGetIntakes();
  const intakes = intakeData?.data ?? [];
  const openIntakes = intakes.filter((i) => i.status === "OPEN");
  const intakeList = isLoading
    ? "Loading intakes..."
    : isError
    ? "Admissions Open"
    : openIntakes.length > 0
    ? openIntakes.map((i) => i.intake).join(" • ")
    : "Admissions Closed";

  const onEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };
  const onLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveNestedDropdown(null);
    }, 150);
  };
  const onDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  };
  const onDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveNestedDropdown(null);
    }, 150);
  };
  const onNestedEnter = (name: string) => {
    if (nestedTimeoutRef.current) clearTimeout(nestedTimeoutRef.current);
    setActiveNestedDropdown(name);
  };
  const onNestedLeave = () => {
    nestedTimeoutRef.current = setTimeout(() => {
      setActiveNestedDropdown(null);
    }, 150);
  };
  const onNestedDropdownEnter = () => {
    if (nestedTimeoutRef.current) clearTimeout(nestedTimeoutRef.current);
  };

  const toggleMobile = (menu: string) =>
    setDropdownOpen((p) => ({ ...p, [menu]: !p[menu] }));

  const toggleNestedMobile = (parent: string, child: string) => {
    const key = `${parent}-${child}`;
    setDropdownOpen((p) => ({ ...p, [key]: !p[key] }));
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    {
      name: "About",
      dropdown: [
        { name: "About LBEF", link: "/about", icon: <FaUniversity /> },
        { name: "About University", link: "/about-university", icon: <FaUniversity /> },
        { name: "Recognitions", link: "/recognitions", icon: <FaCertificate /> },
        { name: "Permission Letter", link: "/permission-letter", icon: <FaCertificate /> },
        { name: "Achivements", link: "/achivements", icon: <FaCertificate /> },
        { name: "Messages", link: "/messages", icon: <FaUsers /> },
        { name: "Our Team", link: "/ourteam", icon: <FaUsers /> },
        { name: "Holidays", link: "/administrative-holidays", icon: <FaCalendar /> },
      ],
    },
    {
      name: "Courses",
      dropdown:
        categories.length > 0
          ? categories.map((cat, catIdx) => ({
              name: cat.name,
              icon: CATEGORY_ICONS[catIdx % CATEGORY_ICONS.length],
              dropdown:
                cat.courses.length > 0
                  ? cat.courses.map((course, courseIdx) => ({
                      name: `${course.prefix} ${course.title}`,
                      icon: COURSE_ICONS[(catIdx * 5 + courseIdx) % COURSE_ICONS.length],
                      onClick: () => {
                        navigate(`/${course.slug}`, { state: { course } });
                        setActiveDropdown(null);
                      },
                    }))
                  : [{ name: "No courses available", icon: <FaBook />, disabled: true }],
            }))
          : [{ name: "No categories available", icon: <FaBook />, disabled: true }],
    },
    {
      name: "Students",
      dropdown: [
        { name: "Academic Club", link: "/academic-club", icon: <FaGraduationCap /> },
        { name: "Academic Planner", link: "/academic-planners", icon: <FaUniversity /> },
        { name: "Downloads", link: "/downloads", icon: <FaUsers /> },
        { name: "Fee Planner", link: "/fee-payment-planners", icon: <FaUniversity /> },
        { name: "Notice Board", link: "/notices", icon: <FaUniversity /> },
        { name: "Payment Modes", link: "/payment-modes", icon: <FaUniversity /> },
        { name: "Student Access", link: "/online-libraries", icon: <FaUniversity /> },
        { name: "Contact List", link: "/contact-info", icon: <FaClipboardList /> },
        {
          name: "Alumni",
          icon: <FaUserGraduate />,
          dropdown: [
            { name: "Alumni Speaks", link: "/alumni-speaks", icon: <FaComment /> },
            { name: "Alumni Form", link: "/alumni-information-form", icon: <FaComment /> },
          ],
        },
      ],
    },
    {
      name: "Admissions",
      dropdown: [
        { name: "Admission Process", link: "/admission-procedure", icon: <FaClipboardList /> },
        { name: "Code of Conduct", link: "/codeofconduct", icon: <FaClipboardList /> },
        {
          name: "Scholarship",
          icon: <FaCertificate />,
          dropdown: [
            { name: "ICT Scholarship", link: "/ict-scholarship", icon: <FaCertificate /> },
            { name: "Gyandeep Scholarship", link: "/gyandeep-scholarship", icon: <FaCertificate /> },
            { name: "Merit Scholarship", link: "/merit-scholarship", icon: <FaCertificate /> },
          ],
        },
      ],
    },
    {
      name: "LBEF Publications",
      dropdown: [
        { name: "Photo Gallery", link: "/media/photo-gallery", icon: <FaBook /> },
        { name: "Lbef Connect", link: "/lbef-connect", icon: <FaBook /> },
        { name: "Journal", link: "/lrjstm/", icon: <FaBook /> },
        { name: "LBEF News", link: "/news", icon: <FaBook /> },
      ],
    },
    { name: "UGC", link: "https://lbef.org/ugc/login.php" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? "shadow-md" : ""}`}>
      {/* Announcement Bar */}
      <div className="w-full bg-blue-700 text-white font-medium overflow-hidden">
        <motion.a
          href="https://apply.lbef.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-4 py-2 hover:bg-blue-800 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
          <span className="text-[0.8125rem] md:text-[0.875rem]">
            Admissions Open for {intakeList} — Apply Now
          </span>
          <GraduationCap className="w-5 h-5 hidden md:flex md:w-6 md:h-6" />
        </motion.a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-1">
        <div className="flex gap-2">
          <NavLink to="/" className="w-40 cursor-pointer">
            <img src={logo} alt="LBEF Logo" />
          </NavLink>
          <NavLink to="/" className="w-14 cursor-pointer">
            <img src={apuLogo} alt="APU Logo" />
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
                  <motion.span
                    animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={onDropdownEnter}
                      onMouseLeave={onDropdownLeave}
                    >
                      <div
                        className={`bg-white shadow-xl rounded-xl p-1 ${
                          item.name === "Courses" ? "w-[480px]" : "w-[270px]"
                        }`}
                      >
                        {item.dropdown.map((sub) => {
                          if (sub.dropdown) {
                            return (
                              <div
                                key={sub.name}
                                className="relative"
                                onMouseEnter={() => onNestedEnter(sub.name)}
                                onMouseLeave={onNestedLeave}
                              >
                                {/* Category row — black icon */}
                                <div className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 w-full text-left rounded-lg cursor-pointer">
                                  <span className="flex items-center gap-3 min-w-0">
                                    <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900 text-base">
                                      {sub.icon}
                                    </span>
                                    <span className="text-[0.8375rem] font-medium leading-snug">
                                      {sub.name}
                                    </span>
                                  </span>
                                  <motion.span
                                    animate={{
                                      rotate: activeNestedDropdown === sub.name ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="shrink-0 ml-2"
                                  >
                                    <FaChevronDown className="text-xs text-gray-500" />
                                  </motion.span>
                                </div>

                                {/* Nested courses — animate height + opacity */}
                                <AnimatePresence>
                                  {activeNestedDropdown === sub.name && (
                                    <motion.div
                                      key="nested"
                                      variants={nestedVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      style={{ overflow: "hidden" }}
                                      onMouseEnter={onNestedDropdownEnter}
                                      onMouseLeave={onNestedLeave}
                                    >
                                      <div className="pl-4 pr-1 pb-1">
                                        {sub.dropdown?.map((nested) => (
                                          <button
                                            key={nested.name}
                                            onClick={() => {
                                              if (nested.link) navigate(nested.link);
                                              if (nested.onClick) nested.onClick();
                                            }}
                                            disabled={nested.disabled}
                                            className={`flex gap-3 items-start px-4 py-2.5 hover:bg-blue-50 rounded-lg w-full text-left ${
                                              nested.disabled
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                            }`}
                                          >
                                            {/* Blue icon for nested */}
                                            <span className="shrink-0 w-5 h-5 flex items-center justify-center text-blue-600 text-base mt-0.5">
                                              {nested.icon}
                                            </span>
                                            {/* Wraps naturally — no truncate */}
                                            <span className="text-[0.8375rem] leading-snug">
                                              {nested.name}
                                            </span>
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }

                          if (sub.onClick) {
                            return (
                              <button
                                key={sub.name}
                                onClick={sub.onClick}
                                className="flex gap-3 items-start cursor-pointer px-4 py-3 hover:bg-blue-50 w-full text-left rounded-lg"
                              >
                                <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900 text-base mt-0.5">
                                  {sub.icon}
                                </span>
                                <span className="text-[0.8375rem] leading-snug">{sub.name}</span>
                              </button>
                            );
                          }

                          return (
                            <NavLink
                              key={sub.name}
                              to={sub.disabled ? "#" : sub.link!}
                              className={`flex gap-3 items-start px-4 py-3 hover:bg-blue-50 rounded-lg ${
                                sub.disabled ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900 text-base mt-0.5">
                                {sub.icon}
                              </span>
                              <span className="text-[0.8375rem] leading-snug">{sub.name}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white px-4 py-3 shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain"
          >
            {menuItems.map((item) =>
              item.dropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMobile(item.name)}
                    className="flex justify-between items-center w-full py-3 uppercase font-medium cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <motion.span
                      animate={{ rotate: dropdownOpen[item.name] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen[item.name] && (
                      <motion.div
                        variants={nestedVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ overflow: "hidden" }}
                      >
                        {item.dropdown.map((sub) => {
                          if (sub.dropdown) {
                            const nestedKey = `${item.name}-${sub.name}`;
                            return (
                              <div key={sub.name}>
                                <button
                                  onClick={() => toggleNestedMobile(item.name, sub.name)}
                                  className="flex justify-between items-center w-full py-2 pl-4 font-medium cursor-pointer"
                                >
                                  <span className="flex items-center gap-2 min-w-0">
                                    <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900">
                                      {sub.icon}
                                    </span>
                                    <span className="text-[0.8375rem] leading-snug text-left">
                                      {sub.name}
                                    </span>
                                  </span>
                                  <motion.span
                                    animate={{ rotate: dropdownOpen[nestedKey] ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="shrink-0 ml-2"
                                  >
                                    <FaChevronDown className="text-xs" />
                                  </motion.span>
                                </button>

                                <AnimatePresence>
                                  {dropdownOpen[nestedKey] && (
                                    <motion.div
                                      variants={nestedVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      style={{ overflow: "hidden" }}
                                    >
                                      {sub.dropdown?.map((nested) => (
                                        <button
                                          key={nested.name}
                                          onClick={nested.onClick}
                                          disabled={nested.disabled}
                                          className={`flex items-start gap-2 py-2 pl-8 w-full text-left ${
                                            nested.disabled ? "opacity-50 cursor-not-allowed" : ""
                                          }`}
                                        >
                                          <span className="shrink-0 w-5 h-5 flex items-center justify-center text-blue-600 mt-0.5">
                                            {nested.icon}
                                          </span>
                                          <span className="text-[0.8375rem] leading-snug">
                                            {nested.name}
                                          </span>
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
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
                                className="flex items-start gap-2 py-2 pl-4 w-full text-left"
                              >
                                <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900 mt-0.5">
                                  {sub.icon}
                                </span>
                                <span className="text-[0.8375rem] leading-snug">{sub.name}</span>
                              </button>
                            );
                          }

                          return (
                            <NavLink
                              key={sub.name}
                              to={sub.link!}
                              className="flex items-start gap-2 py-2 pl-4"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-900 mt-0.5">
                                {sub.icon}
                              </span>
                              <span className="text-[0.8375rem] leading-snug">{sub.name}</span>
                            </NavLink>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
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

            <button
              onClick={() => {
                setMobileOpen(false);
                open();
              }}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 sticky bottom-0"
            >
              <FaUserGraduate />
              Enquiry Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}