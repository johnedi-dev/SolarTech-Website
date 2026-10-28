import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin } from 'react-icons/fa';

const footerLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Products', to: 'products' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Contact', to: 'contact' },
];

const socialLinks = [
  { icon: <FaFacebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
  { icon: <FaInstagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
  { icon: <FaWhatsapp className="w-4 h-4" />, href: 'https://wa.me/923015935773', label: 'WhatsApp' },
  { icon: <FaYoutube className="w-4 h-4" />, href: '#', label: 'YouTube' },
  { icon: <FaLinkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
];

export default function Footer({ offHome = false }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  // On /solar-calculator/ the footer's section links must climb back to the home page
  const sectionHref = (to) => (offHome ? `../#${to}` : `#${to}`);
  const pageHref = (file) => (offHome ? `../${file}` : file);

  return (
    <footer className="relative bg-green-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href={offHome ? '../' : '#hero'} className="flex items-center gap-2.5" aria-label="SolarTech — home">
            <span className="relative w-9 h-9 grid grid-cols-2 grid-rows-2 gap-[2px] rounded-bl-full rounded-tr-full overflow-hidden">
              <span className="bg-green-700 rounded-tr-sm rounded-bl-md" />
              <span className="bg-green-500 rounded-tr-full" />
              <span className="bg-green-600 rounded-bl-full" />
              <span className="bg-amber-400 rounded-bl-sm" />
            </span>
            <div className="text-left">
              <div className="text-lg font-black">SolarTech</div>
              <p className="text-[9px] text-green-300/70 font-semibold tracking-wider uppercase leading-none">Clean Energy. Brighter Future.</p>
            </div>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <a
                key={l.to}
                href={sectionHref(l.to)}
                className="text-sm text-green-100/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-2.5">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-200/60 text-xs text-center">
            © {new Date().getFullYear()} SolarTech Energy Solutions. All rights reserved. ·{' '}
            <a href={pageHref('privacy.html')} className="hover:text-white transition-colors ml-1">Privacy</a> ·{' '}
            <a href={pageHref('terms.html')} className="hover:text-white transition-colors">Terms</a>
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-green-200 hover:bg-green-600 hover:text-white transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
