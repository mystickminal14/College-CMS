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
      <div className="w-full px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between max-w-full">

          <div className="flex-1 min-w-[280px] space-y-6">
            <img src={logo} alt="LBEF Logo" className="w-48 h-20" />
            <p className="text-[#4B5563] text-sm md:text-md leading-relaxed">
              Empowering learners and educators worldwide through flexible, expert-led online courses. Learn anytime, anywhere — with tools that help you grow.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-blue-500" />
                <a href="mailto:support@lbef.com" className="hover:text-blue-500 transition-colors">
                  support@lbef.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-blue-500" />
                <a href="tel:+1800123567" className="hover:text-blue-500 transition-colors">
                  +1 (800) 123-4567
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-6">
            <h3 className="text-black font-semibold text-xl">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'All Courses', 'Students', 'Admission', 'Media', 'Our Blogs'].map((link) => (
                <li key={link}>
                  <NavLink to="#" className="hover:text-blue-500 transition-colors text-sm">
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>

            <h3 className="text-black text-xl font-semibold mt-4">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-500 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-600 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="lg:w-[400px] min-w-[300px] space-y-6">
            <h3 className="text-black text-xl font-semibold">Our Courses</h3>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-4">
              {courseNames.length > 0 ? (
                courseNames.map((course) => (
                  <NavLink
                    key={course.id}
                    to={`/students-life/${course.title.replace(/ /g, "-")}/${course.id}`}
                    state={{ course }}
                    className="hover:text-blue-500  block text-base  "
                  >
                    {course.prefix} {course.title}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-400 text-base">No courses available</p>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-[350px] space-y-6">
            <h3 className="text-black text-xl font-semibold">Get in Touch</h3>
            <a
              href="https://maps.app.goo.gl/oU9yCBRxj3FCVCof6"
              target="_blank"
              rel="noreferrer"
              className="relative rounded-xl overflow-hidden shadow-2xl block h-80 w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361207676644!2d85.33068377653167!3d27.706131725543226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20College%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1766394882553!5m2!1sen!2snp"
                className="w-full h-full object-cover"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-white">
                  <MdLocationOn className="w-5 h-5" />
                  <span className="text-sm">LBEF CAMPUS, 1st IT College of Nepal</span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-16 py-6 border-t border-[#ECEFF1]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left text-sm text-[#4B5563]">
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