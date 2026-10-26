import { motion } from 'framer-motion';
import { Sun, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  Company: [
    { label: 'About Us', to: 'about' },
    { label: 'Services', to: 'services' },
    { label: 'Products', to: 'products' },
    { label: 'Why Choose Us', to: 'why-us' },
    { label: 'Testimonials', to: 'testimonials' },
  ],
  Products: [
    { label: 'Solax Inverters', to: 'products' },
    { label: 'Solis Inverters', to: 'products' },
    { label: 'GoodWe Inverters', to: 'products' },
    { label: 'Dyness Batteries', to: 'products' },
    { label: 'Soluna Lyra Battery', to: 'products' },
  ],
  'Solar Panels': [
    { label: 'Canadian Solar', to: 'products' },
    { label: 'Longi Solar', to: 'products' },
    { label: 'Jinko Solar', to: 'products' },
    { label: 'Maxpower', to: 'products' },
    { label: 'Net Metering', to: 'services' },
  ],
};

const socialLinks = [
  { icon: <FaFacebook className="w-5 h-5" />, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
  { icon: <FaInstagram className="w-5 h-5" />, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: <FaWhatsapp className="w-5 h-5" />, href: 'https://wa.me/923015935773', label: 'WhatsApp', color: 'hover:text-green-400' },
  { icon: <FaYoutube className="w-5 h-5" />, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
];

export default function Footer({ offHome = false }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  // On /solar-calculator/ the footer's section links must climb back to the home page
  const sectionHref = (to) => (offHome ? `../#${to}` : `#${to}`);
  const pageHref = (file) => (offHome ? `../${file}` : file);

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid lg:grid-cols-5 gap-10 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/40">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-black gradient-text">SolarTech</div>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Energy Solutions</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Pakistan's premier solar energy provider. We deliver premium solar solutions powered by world-class brands including GoodWe, Solax, Canadian Solar, Jinko, Longi, Dyness, and more.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              {[
                { icon: <Phone className="w-4 h-4" />, text: '+92 301 5935 773', href: 'tel:+923015935773' },
                { icon: <Mail className="w-4 h-4" />, text: 'info@solartech.pk', href: 'mailto:info@solartech.pk' },
                { icon: <MapPin className="w-4 h-4" />, text: 'Lahore, Pakistan', href: null },
              ].map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} className="flex items-center gap-3 text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    <span className="text-orange-400">{item.icon}</span>
                    {item.text}
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-orange-400">{item.icon}</span>
                    {item.text}
                  </div>
                )
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 ${social.color} border border-white/5 hover:border-orange-500/30 transition-all duration-300`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-widest">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={sectionHref(link.to)}
                      className="text-slate-600 hover:text-orange-500 text-sm cursor-pointer transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 h-0.5 bg-orange-500 transition-all duration-200 inline-block"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} SolarTech Energy Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={pageHref('privacy.html')} className="text-gray-600 text-xs hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href={pageHref('terms.html')} className="text-gray-600 text-xs hover:text-orange-500 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/20 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/923015935773?text=Hi! I'm interested in solar installation."
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 sm:bottom-6 sm:right-6 sm:w-14 sm:h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 ring-4 ring-white/70"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 sm:w-7 sm:h-7" />
      </motion.a>
    </footer>
  );
}
