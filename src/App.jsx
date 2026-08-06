import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import BrandsBar from './components/BrandsBar';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import SavingsCalculator from './components/SavingsCalculator';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <StatsBar />
      {/* <BrandsBar /> */}
      <About />
      <Products />
      <Services />
      <SavingsCalculator />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
