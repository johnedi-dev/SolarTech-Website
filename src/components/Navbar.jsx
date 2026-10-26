import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Phone } from 'lucide-react';

// Relative, trailing-slash URL: resolves correctly at a domain root
// (/, /solar-calculator/) AND under a subpath deploy (e.g. GitHub Pages).
const CALC_URL = 'solar-calculator/';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'Solar Calculator', to: CALC_URL, isRoute: true },
  { label: 'About', to: 'about' },
  { label: 'Products', to: 'products' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Contact', to: 'contact' },
];

/**
 * Brand heading uses a styled <div> (not <h1>) so each page has exactly one H1.
 * When `offHome` is true the component renders on /solar-calculator and all
 * section links point back to the home page ("/#section").
 */
export default function Navbar({ offHome = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => window.location.hash);

  const handleNavClick = () => {
    setMenuOpen(false);
    setActiveHash(window.location.hash);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isActive = (item) => {
    // Path-based check (works both at domain root and subpath deploys)
    if (item.isRoute) {
      return window.location.pathname.toLowerCase().includes('solar-calculator') && activeHash === '';
    }
    if (offHome) return false;
    return activeHash === '' && item.to === 'hero';
  };

  // On the calculator page, section anchors must climb back to the home directory
  const hrefFor = (item) => {
    if (item.isRoute) return CALC_URL;
    return offHome ? `../#${item.to}` : `#${item.to}`;
  };

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
            <motion.a
              href={offHome ? '../' : '#hero'}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
              aria-label="SolarTech Energy Solutions — home"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/60">
                  <Sun className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black gradient-text">SolarTech</div>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Energy Solutions</p>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={hrefFor(item)}
                  className={`nav-link text-sm font-medium cursor-pointer transition-colors duration-200 ${
                    isActive(item)
                      ? (scrolled || offHome ? 'text-orange-500' : 'text-orange-400') + ' font-semibold'
                      : (scrolled || offHome)
                        ? 'text-slate-700 hover:text-orange-500'
                        : 'text-white/85 hover:text-orange-400'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+923015935773"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  scrolled || offHome
                    ? 'text-slate-700 hover:text-orange-500'
                    : 'text-white/85 hover:text-orange-400'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+92 301 5935 773</span>
              </a>
              <a href={offHome ? '../#contact' : '#contact'}>
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
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
                  href={hrefFor(item)}
                  onClick={handleNavClick}
                  className={`font-medium py-2 border-b border-white/5 cursor-pointer transition-colors ${
                    isActive(item)
                      ? 'text-orange-400 font-semibold'
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a href={offHome ? '../#contact' : '#contact'} onClick={handleNavClick}>
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
