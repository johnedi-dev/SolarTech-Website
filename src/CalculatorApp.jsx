import Navbar from './components/Navbar';
import SolarCalculatorPage from './components/SolarCalculatorPage';
import Footer from './components/Footer';

/** Entry app for /solar-calculator (its own HTML document with dedicated SEO head). */
export default function CalculatorApp() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar offHome />
      <SolarCalculatorPage />
      <Footer offHome />
    </div>
  );
}
