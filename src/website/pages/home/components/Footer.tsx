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
        backgroundImage: `linear-linear(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* Logo & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <img src={logo} alt="LBEF Logo" className="w-36 h-14" />

            <p className="text-[#4B5563] text-[11px] leading-relaxed">
              Empowering learners and educators worldwide through flexible,
              expert-led online courses. Learn anytime, anywhere.
            </p>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MdEmail className="w-4 h-4 text-blue-500" />
                <a
                  href="mailto:support@lbef.org"
                  className="hover:text-blue-500 text-[11px] break-all"
                >
                  support(@)lbef.org
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MdPhone className="w-4 h-4 text-blue-500" />
                <a href="tel:01-4544356" className="hover:text-blue-500 text-[11px]">
                  01-4544356
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-black font-semibold text-xs">Quick Links</h3>
              <ul className="mt-2 space-y-1">
                {[{ "name": "About Us", "link": "/about" }, { "name": "All Courses", "link": "/courses" }, { "name": "Student Access", "link": "/students-life/student-access" }, { "name": "Admission", "link": "/admissions/admission-process" }, { "name": "Media", "link": "/media/photo-gallery"}].map(
                  (link) => (
                    <li key={link.name}>
                      <NavLink to={link.link || "#"} className="hover:text-blue-500 text-[11px]">
                        {link.name}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold text-xs">Follow Us</h3>
              <div className="flex gap-3 mt-2">
                <a href="https://www.facebook.com/lbefcampus" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="w-4 h-4 text-blue-600 cursor-pointer" />
                </a>
                <a href="https://x.com/LBEF" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="w-4 h-4 text-blue-400 cursor-pointer" />
                </a>
                <a href="https://www.instagram.com/lbefcollege/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-4 h-4 text-pink-500 cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/company/lbefcampus/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-4 h-4 text-blue-700 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="lg:col-span-4">
            <h3 className="text-black font-semibold text-xs mb-2">Our Courses</h3>

            <div className="max-h-44 overflow-y-auto space-y-2 pr-2">
              {courseNames.length > 0 ? (
                courseNames.map((course) => (
                  <NavLink
                    key={course.id}
                    to={`/students-life/${course.title.replace(/ /g, "-")}/${course.id}`}
                    state={{ course }}
                    className="block text-[11px] hover:text-blue-500 whitespace-normal wrap-break-word leading-snug"
                  >
                    {course.prefix} {course.title}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-400 text-[11px]">No courses available</p>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <h3 className="text-black font-semibold text-xs mb-2">Get in Touch</h3>

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

              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-1">
                <div className="flex items-center gap-1 text-white text-[10px]">
                  <MdLocationOn className="w-3 h-3" />
                  LBEF College, Nepal
                </div>
              </div>
            </a> </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-3 border-t border-[#ECEFF1]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-1 text-[12px] text-[#4B5563]">
          <div>
            Developed by{" "}
            <span className="font-semibold text-black">
              YAKSHA <span className="text-blue-600">SOFT</span>
            </span>
          </div>
          <div>© <span className="font-semibold">LBEF College</span></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
