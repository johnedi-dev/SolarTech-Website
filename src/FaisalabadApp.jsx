import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CityLanding from './components/CityLanding';

/** Entry app for /solar-faisalabad (its own HTML document with city-specific SEO head). */
export default function FaisalabadApp() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar offHome />
      <CityLanding city="faisalabad" />
      <Footer offHome />
    </div>
  );
}
