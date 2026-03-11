import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {

  FaBook,
  FaChevronDown,
  FaUserGraduate,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import logo from "../../../../assets/lbef_five.webp";
import apuLogo from "../../../../assets/apu_logo.webp";
import { useEnquiry } from "../../../../context/EnquiryContext";
import useGetIntakes from "../../../../pages/intake-calender/hooks/useGetAllIntakr";
import useGetCatWithDetails from "../../../../pages/courses/hooks/useGetCourseWithCat";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { ArrowRight, GraduationCap, Volume2 } from "lucide-react";

type DropdownItem = {
  name: string;
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
        { name: "About LBEF", link: "/about" },
        { name: "About University", link: "/about-university" },
        { name: "Recognitions", link: "/recognitions" },
        { name: "Permission Letter", link: "/permission-letter" },
        { name: "Achivements", link: "/achivements" },
        { name: "Messages", link: "/messages" },
        { name: "Our Team", link: "/ourteam" },
        { name: "Holidays", link: "/administrative-holidays" },
      ],
    },
    {
      name: "Courses",
      dropdown:
        categories.length > 0
          ? categories.map((cat) => ({
            name: cat.name,
            dropdown:
              cat.courses.length > 0
                ? cat.courses.map((course) => ({
                  name: `${course.prefix} ${course.title}`,
                  onClick: () => {
                    navigate(`/${course.slug}`, { state: { course } });
                    setActiveDropdown(null);
                  },
                }))
                : [{ name: "No courses available", icon: <FaBook />, disabled: true }],
          }))
          : [{ name: "No categories available" }],
    },
    {
      name: "Students",
      dropdown: [
        { name: "Academic Club", link: "/academic-club", },
        { name: "Academic Calendar", link: "/academic-planners" },
        { name: "Downloads", link: "/downloads" },
        { name: "Fee Planner", link: "/fee-payment-planners" },
        { name: "Notice Board", link: "/notices" },
        { name: "Payment Modes", link: "/payment-modes" },
        { name: "Student Access", link: "/online-libraries" },
        { name: "Contact List", link: "/contact-info" },
        {
          name: "Alumni",
          dropdown: [
            { name: "Alumni Speaks", link: "/alumni-speaks" },
            { name: "Alumni Form", link: "/alumni-information-form" },
          ],
        },
      ],
    },
    {
      name: "Admissions",
      dropdown: [
        { name: "Admission Process", link: "/admission-procedure" },
        { name: "Code of Conduct", link: "/codeofconduct" },
        {
          name: "Scholarship",

          dropdown: [
            { name: "ICT Scholarship", link: "/ict-scholarship" },
            { name: "Gyandeep Scholarship", link: "/gyandeep-scholarship" },
            { name: "Merit Scholarship", link: "/merit-scholarship" },
          ],
        },
      ],
    },
    {
      name: "LBEF Publications",
      dropdown: [
        { name: "Photo Gallery", link: "/media/photo-gallery" },
        { name: "Lbef Connect", link: "/lbef-connect" },
        { name: "Journal", link: "/lrjstm/" },
        { name: "LBEF News", link: "/news" },
      ],
    },
    { name: "UGC", link: "https://lbef.org/ugc/login.php" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? "shadow-md" : ""}`}>
      {/* Announcement Bar */}
      <div className="relative w-full overflow-hidden bg-linear-to-r bg-blue-700 hover:bg-blue-800 transition-colors">

        {/* Shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-linear(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPositionX: ["200%", "-200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-linear(circle, white 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <motion.span
          rel="noopener noreferrer"
          className="relative flex items-center justify-center gap-3 px-5 py-2.5 group"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Frosted "Enroll Now" badge */}
          <motion.span
            className="hidden sm:flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[0.68rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <GraduationCap className="w-3 h-3 text-white" />
            </motion.span>
            <motion.span
              onClick={() => navigate('/courses')}
              className="cursor-pointer"
              rel="noopener noreferrer"
            >
              Explore Program

            </motion.span>
          </motion.span>

          {/* Divider */}
          <div className="hidden sm:block w-px h-3.5 bg-white/20" />

          {/* Animated speaker */}
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-violet-300 shrink-0"
          >
            <Volume2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </motion.div>

          {/* Message */}
          <p className="text-white text-[0.8rem] md:text-[0.875rem] font-medium tracking-wide">
            <span className="font-bold text-white">Admissions are open</span>
            <span className="mx-2 text-white">·</span>
            <span className="text-white">{intakeList}</span>
          </p>

          {/* CTA pill */}
          <motion.a
            href="https://apply.lbef.org/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 bg-white text-indigo-900 hover:bg-violet-100 text-[0.72rem] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full transition-colors shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply Now
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.span>
          </motion.a>
        </motion.span>
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
                        className={`bg-white shadow-xl rounded-xl p-1 min-w-[250px] md:min-w-[270px]"
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
                                    <span className="text-[1rem] font-medium leading-snug">
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
                                      variants={dropdownVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      className="absolute top-0 left-full ml-2 bg-white shadow-xl rounded-xl p-1 w-[360px]"
                                      onMouseEnter={onNestedDropdownEnter}
                                      onMouseLeave={onNestedLeave}
                                    >
                                      <div>
                                        {sub.dropdown?.map((nested) => (
                                          <button
                                            key={nested.name}
                                            onClick={() => {
                                              if (nested.link) navigate(nested.link);
                                              if (nested.onClick) nested.onClick();
                                            }}
                                            disabled={nested.disabled}
                                            className={`flex gap-3 items-start px-4 py-2.5 hover:bg-blue-50 rounded-lg w-full text-left ${nested.disabled
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                              }`}
                                          >
                                            {/* Wraps naturally — no truncate */}
                                            <span className="text-[1rem] cursor-pointer leading-snug">
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
                                <span className="text-[1rem] cursor-pointer leading-snug">{sub.name}</span>
                              </button>
                            );
                          }

                          return (
                            <NavLink
                              key={sub.name}
                              to={sub.disabled ? "#" : sub.link!}
                              className={`flex gap-3 items-start px-4 py-3 hover:bg-blue-50 cursor-pointer rounded-lg ${sub.disabled ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                              <span className="text-[1rem] cursor-pointer leading-snug">{sub.name}</span>
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
                                          className={`flex items-start gap-2 py-2 pl-8 w-full text-left ${nested.disabled ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                          <span className="text-sm leading-snug">
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
                                <span className="text-sm leading-snug">{sub.name}</span>
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
                              <span className="text-sm leading-snug">{sub.name}</span>
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