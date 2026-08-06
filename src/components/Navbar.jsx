import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Phone } from 'lucide-react';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Products', to: 'products' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/60">
                  <Sun className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black gradient-text">SolarTech</h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Energy Solutions</p>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={`#${item.to}`}
                  className="nav-link text-sm font-medium text-slate-700 hover:text-orange-500 cursor-pointer transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+923001234567" className="flex items-center gap-2 text-sm text-slate-700 hover:text-orange-500 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+92 300 123 4567</span>
              </a>
              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                >
                  Get Free Quote
                </motion.button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg glass text-white"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-dark border-b border-white/10 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={`#${item.to}`}
                  onClick={handleNavClick}
                  className="text-gray-300 hover:text-orange-400 font-medium py-2 border-b border-white/5 cursor-pointer transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={handleNavClick}>
                <button className="btn-primary w-full py-3 rounded-xl font-semibold text-white mt-2">
                  Get Free Quote
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
