import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import logo from "../../../../assets/pcpslogo.webp";
import useGetNameAll from "../../../../pages/courses/hooks/useGetCourseName";
import { NavLink } from "react-router-dom";
import bg1 from "../../../../assets/decoration/footer_background.webp";

const Footer = () => {
  const { data } = useGetNameAll();
  const courseNames = data?.data ?? [];

  return (
    <footer
      className="bg-[#FCFCFF] text-black w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-4 sm:py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* Logo & Contact */}
          <div className="lg:col-span-3 space-y-2">
            <img
              src={logo}
              alt="LBEF Logo"
              className="w-32 sm:w-36 h-12 sm:h-14"
            />

            <p className="text-[#4B5563] text-xs leading-tight">
              Empowering learners and educators worldwide through flexible,
              expert-led online courses. Learn anytime, anywhere.
            </p>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <MdEmail className="w-3.5 h-3.5 text-blue-500" />
                <a
                  href="mailto:support@lbef.com"
                  className="hover:text-blue-500 text-xs break-all"
                >
                  support(@)lbef.com
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <MdPhone className="w-3.5 h-3.5 text-blue-500" />
                <a
                  href="tel:01-4544356"
                  className="hover:text-blue-500 text-xs"
                >
                  01-4544356
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="lg:col-span-2 space-y-2">
            <div>
              <h3 className="text-black font-semibold text-sm">Quick Links</h3>
              <ul className="mt-1 space-y-1">
                {[
                  "About Us",
                  "All Courses",
                  "Students",
                  "Admission",
                  "Media",
                  "Our Blogs",
                ].map((link) => (
                  <li key={link}>
                    <NavLink
                      to="#"
                      className="hover:text-blue-500 text-xs"
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold text-sm">Follow Us</h3>
              <div className="flex gap-2 mt-1">
                <FaFacebook className="w-4 h-4 text-blue-600 hover:text-blue-500 cursor-pointer" />
                <FaTwitter className="w-4 h-4 text-blue-400 hover:text-blue-500 cursor-pointer" />
                <FaInstagram className="w-4 h-4 text-pink-500 hover:text-pink-400 cursor-pointer" />
                <FaLinkedin className="w-4 h-4 text-blue-700 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="lg:col-span-4 space-y-1.5">
            <h3 className="text-black font-semibold text-sm">Our Courses</h3>

            <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
              {courseNames.length > 0 ? (
                courseNames.map((course) => (
                  <NavLink
                    key={course.id}
                    to={`/students-life/${course.title.replace(/ /g, "-")}/${course.id}`}
                    state={{ course }}
                    className="block text-xs hover:text-blue-500 truncate"
                  >
                    {course.prefix} {course.title}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-400 text-xs">No courses available</p>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 space-y-1.5">
            <h3 className="text-black font-semibold text-sm">Get in Touch</h3>

            <a
              href="https://maps.app.goo.gl/oU9yCBRxj3FCVCof6"
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden rounded-md block h-36 sm:h-40 w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361207676644!2d85.33068377653167!3d27.706131725543226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20College%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1766394882553!5m2!1sen!2snp"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LBEF Campus Location"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1">
                <div className="flex items-center gap-1 text-white text-[10px]">
                  <MdLocationOn className="w-3 h-3" />
                  LBEF College, Nepal
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-2 border-t border-[#ECEFF1]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-1 text-[11px] text-[#4B5563]">
          <div>
            Developed by{" "}
            <span className="font-semibold text-black">
              YAKSHA <span className="text-blue-600">SOFT</span>
            </span>
          </div>
          <div>
            © <span className="font-semibold">LBEF College</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
