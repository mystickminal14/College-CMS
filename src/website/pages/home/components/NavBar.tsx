import { useState, useEffect, useRef } from "react";
import logo from "../../../../assets/lbef_white.png";

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleDropdown = (menu: string) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // shadow appears after 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (
          dropdownRefs.current[key] &&
          !dropdownRefs.current[key]?.contains(event.target as Node)
        ) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", link: "#" },
    {
      name: "ABOUT",
      dropdown: [
        { name: "About Us", link: "#", icon: "🏢" },
        { name: "Our Team", link: "#", icon: "👥" },
        { name: "Appreciation Letter", link: "#", icon: "📜" },
        { name: "Testimonial", link: "#", icon: "⭐" },
      ],
    },
    {
      name: "STUDENTS",
      dropdown: [
        { name: "Programs", link: "#", icon: "🎓" },
        { name: "Campus Life", link: "#", icon: "🏫" },
        { name: "Student Support", link: "#", icon: "🤝" },
        { name: "Career Services", link: "#", icon: "💼" },
      ],
    },
    {
      name: "ADMISSIONS",
      dropdown: [
        { name: "Apply Now", link: "#", icon: "📝" },
        { name: "Admission Process", link: "#", icon: "📋" },
        { name: "Tuition & Fees", link: "#", icon: "💰" },
        { name: "Scholarships", link: "#", icon: "🎯" },
      ],
    },
    {
      name: "MEDIA",
      dropdown: [
        { name: "Photo Gallery", link: "#", icon: "📷" },
        { name: "Video Library", link: "#", icon: "🎥" },
        { name: "News & Events", link: "#", icon: "📰" },
      ],
    },
    { name: "BLOGS", link: "#" },
    { name: "UGC", link: "#" },
  ];

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo */}
        <div className="w-32 md:w-36">
          <img src={logo} alt="LBEF Logo" className="w-full h-auto object-contain" />
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
                ref={(el) => {
                  dropdownRefs.current[item.name] = el;
                }}
              >
                <button className="flex items-center gap-1.5 px-4 py-3 text-[#050038] hover:text-[#3040E5] transition-colors duration-200 font-medium text-sm uppercase group">
                  <span className="relative">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3040E5] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <i className="fa-solid fa-angle-down text-[0.65rem] transition-transform duration-300 group-hover:rotate-180"></i>
                </button>

                {/* Modern Dropdown */}
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-300 transform origin-top ${activeDropdown === item.name
                    ? "opacity-100 scale-y-100 translate-y-0"
                    : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[220px] overflow-hidden">
                    <div className="p-1">
                      {item.dropdown.map((sub, index) => (
                        <a
                          key={sub.name}
                          href={sub.link}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#3040E5] hover:bg-blue-50 rounded-lg transition-all duration-200 group/sub"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span className="font-medium text-sm">{sub.name}</span>
                          <i className="fa-solid fa-arrow-right text-xs ml-auto opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-300"></i>
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-3 bg-linear-to-r from-blue-50/50 to-white">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#3040E5] hover:text-blue-700 transition-colors"
                      >
                        <i className="fa-solid fa-circle-info"></i>
                        View all {item.name.toLowerCase()} pages
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className="relative px-4 py-3 text-[#050038] hover:text-[#3040E5] transition-colors duration-200 font-medium text-sm uppercase group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#3040E5] transition-all duration-300 group-hover:w-3/4"></span>
              </a>
            )
          )}
        </nav>

        {/* Enroll Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#"
            className="text-[#050038] hover:text-[#3040E5] font-medium text-sm transition-colors"
          >
            <i className="fa-solid fa-phone mr-2"></i>
            Contact
          </a>
          <a
            href="#"
            className="bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-xl text-[#050038]`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
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
                      <i
                        className={`fa-solid fa-angle-down transition-transform duration-300 ${dropdownOpen[item.name] ? "rotate-180" : ""
                          }`}
                      ></i>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${dropdownOpen[item.name] ? "max-h-96" : "max-h-0"
                        }`}
                    >
                      <div className="pl-4 pb-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          {item.dropdown.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.link}
                              className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-[#3040E5] hover:bg-white rounded-md transition-colors"
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="font-medium">{sub.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.link}
                    className="flex items-center py-4 text-[#050038] font-medium uppercase text-sm hover:text-[#3040E5] transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-linear-to-r from-[#3040E5] to-blue-600 text-white px-6 py-3 rounded-full font-semibold uppercase text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mb-3"
            >
              <i className="fa-solid fa-graduation-cap"></i>
              Enroll Now
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 text-[#050038] hover:text-[#3040E5] font-medium py-2"
            >
              <i className="fa-solid fa-phone"></i>
              Contact Admissions
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}