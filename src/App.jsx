import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import SavingsCalculator from './components/SavingsCalculator';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCalculator from './components/FloatingCalculator';

// Legacy hash route — permanently moved to a real URL for SEO.
// Old shared links (#/solar-calculator) are redirected so nothing breaks.
const LEGACY_CALC_ROUTE = '#/solar-calculator';

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    if (window.location.hash === LEGACY_CALC_ROUTE) {
      // Relative redirect — works at domain root AND subpath deployments
      window.location.replace('solar-calculator/');
      return;
    }
    const onHashChange = () => {
      if (window.location.hash === LEGACY_CALC_ROUTE) {
        window.location.replace('solar-calculator/');
        return;
      }
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // When returning to the home page via a section link (e.g. /#about), scroll to that section after render
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Products />
      <Services />
      <SavingsCalculator />
      <WhyUs />
      <Testimonials />
      <Contact />
      <FloatingCalculator />
      <Footer />
    </div>
  );
}

export default App;
