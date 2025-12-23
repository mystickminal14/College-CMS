import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import logo from '../../../../assets/pcpsLogo.png';
import useGetNameAll from '../../../../pages/courses/hooks/useGetCourseName';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const { data } = useGetNameAll();
  const courseNames = data?.data ?? [];

  return (
    <footer className="bg-[#FCFCFF] text-black w-full shadow-[#00000033]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 max-w-full">
          
          {/* Logo and Contact Info - Takes 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <img src={logo} alt="LBEF Logo" className="w-40 sm:w-48 h-16 sm:h-20" />
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Empowering learners and educators worldwide through flexible, expert-led online courses. Learn anytime, anywhere — with tools that help you grow.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-blue-500" />
                <a 
                  href="mailto:support@lbef.com" 
                  className="hover:text-blue-500 transition-colors text-sm wrap-break-word"
                >
                  support@lbef.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-blue-500" />
                <a 
                  href="tel:+1800123567" 
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links and Social - Takes 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-6">
              <h3 className="text-black font-semibold text-lg sm:text-xl">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'All Courses', 'Students', 'Admission', 'Media', 'Our Blogs'].map((link) => (
                  <li key={link}>
                    <NavLink to="#" className="hover:text-blue-500 transition-colors text-sm sm:text-base">
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-black text-lg sm:text-xl font-semibold">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
                  <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                  <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Courses List - Takes 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-black text-lg sm:text-xl font-semibold">Our Courses</h3>
            <div className="max-h-60 sm:max-h-72 overflow-y-auto space-y-2 sm:space-y-3 pr-3 sm:pr-4">
              {courseNames.length > 0 ? (
                courseNames.map((course) => (
                  <NavLink
                    key={course.id}
                    to={`/students-life/${course.title.replace(/ /g, "-")}/${course.id}`}
                    state={{ course }}
                    className="hover:text-blue-500 block text-sm sm:text-base truncate"
                    title={`${course.prefix} ${course.title}`}
                  >
                    <span className="truncate block">{course.prefix} {course.title}</span>
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-400 text-sm sm:text-base">No courses available</p>
              )}
            </div>
          </div>

          {/* Map Section - Takes 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-black text-lg sm:text-xl font-semibold">Get in Touch</h3>
            <a
              href="https://maps.app.goo.gl/oU9yCBRxj3FCVCof6"
              target="_blank"
              rel="noreferrer"
              className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl block h-60 sm:h-72 md:h-80 w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361207676644!2d85.33068377653167!3d27.706131725543226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20College%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1766394882553!5m2!1sen!2snp"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LBEF Campus Location"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 sm:p-4">
                <div className="flex items-center gap-2 text-white">
                  <MdLocationOn className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">LBEF CAMPUS, 1st IT College of Nepal</span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 border-t border-[#ECEFF1]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 text-center sm:text-left text-xs sm:text-sm text-[#4B5563]">
          <div>
            Developed and Maintained by <span className="font-semibold text-black">YAKSHA <span className='text-blue-600'>SOFT</span></span>
          </div>
          <div>
            © All rights reserved by <span className="font-semibold">LBEF College</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;