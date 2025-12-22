import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react'; // Or use your own icons
import logo from '../../../../assets/pcpsLogo.png'
const Footer = () => {
  return (
    <footer className=" bg-[#FCFCFF] text-black  shadow-[#00000033] ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Left Column - Logo & Description */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="rounded-md">
                <img src={logo} alt="" className='w-50 h-20'/>
              </div>
            </div>

            <p className="text-[#4B5563] leading-relaxed">
              Empowering learners and educators worldwide through flexible, expert-led online courses. Learn anytime, anywhere — with tools that help you grow.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:support@lbeef.com" className="hover:text-blue-400 transition-colors">
                  support@lbeef.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+1800123567" className="hover:text-blue-400 transition-colors">
                  +1 (800) 123-4567
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-black text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'All Courses', 'Students', 'Admission', 'Media', 'Our Blogs'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-6">
            <h3 className="text-black text-xl font-semibold">Follow Us</h3>
            <div className="flex gap-6">
              <a href="#" className="text-[#3040E5F7]  hover:text-blue-400 transition-colors">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="#" className="text-[#3040E5F7]  hover:text-blue-400 transition-colors">
                <Twitter className="w-7 h-7" />
              </a>
              <a href="#" className="text-[#3040E5F7]  hover:text-blue-400 transition-colors">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="#" className="text-[#3040E5F7] hover:text-blue-400 transition-colors">
                <Linkedin className="w-7 h-7" />
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-6">
            <h3 className="text-black text-xl font-semibold">Get in Touch</h3>
            <a className="relative rounded-xl overflow-hidden shadow-2xl" href='https://maps.app.goo.gl/oU9yCBRxj3FCVCof6' target='_blank'>
              {/* Replace with your actual map/image */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361207676644!2d85.33068377653167!3d27.706131725543226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20College%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1766394882553!5m2!1sen!2snp" className="w-full h-48 object-cover" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-black">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">LBEF CAMPUS, 1st IT College of Nepal</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#ECEFF1]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left text-sm text-[#4B5563]">
          <div>
            Developed and Maintained by <span className="font-semibold text-black">YAKSHA <span className='text-blue-600'>SOFT</span> </span>
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