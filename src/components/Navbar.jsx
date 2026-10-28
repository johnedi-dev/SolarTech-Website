import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator } from 'lucide-react';

// Relative, trailing-slash URL: resolves correctly at a domain root
// (/, /solar-calculator/) AND under a subpath deploy (e.g. GitHub Pages).
const CALC_URL = 'solar-calculator/';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Products', to: 'products' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Contact', to: 'contact' },
];

/**
 * Light, clean navbar matching the green SolarCalc concept.
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
    if (offHome) return false;
    return activeHash === '' && item.to === 'hero';
  };

  // On the calculator page, section anchors must climb back to the home directory
  const hrefFor = (item) => (offHome ? `../#${item.to}` : `#${item.to}`);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl border-b border-slate-100 ${
          scrolled ? 'py-2.5 shadow-md shadow-slate-200/50' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href={offHome ? '../' : '#hero'}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5"
              aria-label="SolarTech Energy Solutions — home"
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-amber-300/70 blur-[6px] -top-1 -left-1" />
                <span className="relative w-8 h-8 grid grid-cols-2 grid-rows-2 gap-[2px] rounded-bl-full rounded-tr-full overflow-hidden">
                  <span className="bg-green-700 rounded-tr-sm rounded-bl-md" />
                  <span className="bg-green-500 rounded-tr-full" />
                  <span className="bg-green-600 rounded-bl-full" />
                  <span className="bg-amber-400 rounded-bl-sm" />
                </span>
              </div>
              <div>
                <div className="text-lg font-black bg-[linear-gradient(135deg,#166534,#15803d)] bg-clip-text text-transparent">SolarTech</div>
                <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase leading-none">Clean Energy. Brighter Future.</p>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-7">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={hrefFor(item)}
                  className={`relative text-sm font-medium cursor-pointer transition-colors duration-200 py-1 ${
                    isActive(item)
                      ? 'text-green-700 font-semibold after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:bg-green-600 after:rounded-full'
                      : 'text-slate-600 hover:text-green-700'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href={offHome ? '../solar-calculator/' : CALC_URL}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-green-500/70 text-green-700 bg-white hover:bg-green-50 text-sm font-bold transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  Solar Calculator
                </motion.button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
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
            className="fixed top-[64px] left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-slate-100 shadow-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={hrefFor(item)}
                  onClick={handleNavClick}
                  className={`font-medium py-2.5 px-3 rounded-lg border-b border-slate-50 cursor-pointer transition-colors ${
                    isActive(item) ? 'text-green-700 font-semibold bg-green-50' : 'text-slate-600 hover:text-green-700 hover:bg-green-50/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a href={offHome ? '../solar-calculator/' : CALC_URL} onClick={handleNavClick}>
                <button className="mt-3 w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 font-semibold text-white flex items-center justify-center gap-2">
                  <Calculator className="w-4 h-4" /> Solar Calculator
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
