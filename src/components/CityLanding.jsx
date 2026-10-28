import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Sun, Home, Building2, BadgeCheck, BatteryCharging, ClipboardCheck, Wrench,
  MapPin, ArrowRight, Calculator, ShieldCheck, CheckCircle2, Zap, CalendarRange,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

/* ------------------------------------------------------------------ */
/* Per-city SEO content. The FAQ strings here are mirrored EXACTLY in   */
/* the FAQPage JSON-LD of each city's index.html — do not edit one      */
/* without the other.                                                  */
/* ------------------------------------------------------------------ */
export const CITIES = {
  lahore: {
    name: 'Lahore',
    disco: 'LESCO',
    discoFull: 'Lahore Electric Supply Company (LESCO)',
    regionLabel: 'Punjab',
    industrial: 'Sundar Industrial Estate and Kot Lakhpat',
    areas: [
      'DHA (Phases 1–9)', 'Cantt', 'Gulberg', 'Johar Town', 'Bahria Town',
      'Valencia', 'Model Town', 'Wapda Town', 'Faisal Town', 'Lake City',
      'Askari', 'Sunder Industrial Estate',
    ],
    faq: [
      {
        q: 'How much does a 5 kW solar system cost in Lahore?',
        a: 'A quality 5 kW on-grid/hybrid system (5–8 bifacial N-type panels, hybrid inverter, structure, wiring and installation) currently costs roughly Rs. 640,000 – 820,000 in Lahore with bank-grade brands. Adding a lithium battery pack or an on-grid-only configuration changes the final price. Our load calculator gives you an instant item-wise estimate, and an exact quote follows a free site survey.',
      },
      {
        q: 'How long does LESCO net metering take?',
        a: 'After your system is installed and inspected, submitting the net metering application to LESCO and completing the green-meter swap typically takes 6–10 weeks. SolarTech prepares the full documentation (wiring diagram, test report, application forms) and follows your case until the agreement is signed and the meter is energized.',
      },
      {
        q: 'Which solar panels are best for Lahore?',
        a: 'N-type TOPCon modules such as Longi Hi-MO 6, Jinko Tiger Neo and Canadian Solar (550–650 W) are the best fit for Lahore: they degrade more slowly in heat above 40 °C, produce better in dust and haze, and are widely available with dealer warranty in Pakistan.',
      },
      {
        q: 'Do I need approval from DHA or my housing society for rooftop solar?',
        a: 'Most Lahore housing societies do not require a separate NOC for rooftop systems; what you need is the LESCO net metering application. If your society does require documentation, our team prepares and submits it for you as part of the install.',
      },
      {
        q: 'How much roof area is needed for a 5 kW system?',
        a: 'With modern 585 W panels, a 5 kW system needs about 145–160 sq ft of shade-free roof, plus small walkway gaps. We confirm the exact layout during the free survey, including south-facing orientation and any water-tank or lift-machine shadowing.',
      },
      {
        q: 'What warranty and after-sales support do you provide?',
        a: 'Every SolarTech system ships with a 10-year comprehensive warranty and certified engineers on staff. Our Lahore service team covers all major housing societies — same-week cleaning, check-ups and maintenance under our annual contracts.',
      },
    ],
  },
  faisalabad: {
    name: 'Faisalabad',
    disco: 'FESCO',
    discoFull: 'Faisalabad Electric Supply Company (FESCO)',
    regionLabel: 'Punjab',
    industrial: 'FIED Industrial Estate',
    areas: [
      'Madina Town', 'Canal Road', 'Civil Lines', 'Peoples Colony', 'Kohinoor City',
      'D Ground', 'Susan Road', 'Ghulam Muhammad Abad', 'Sargodha Road',
      'Jhok Graphar', 'Satiana Road', 'FIED Industrial Estate',
    ],
    faq: [
      {
        q: 'How much does a 5 kW solar system cost in Faisalabad?',
        a: 'A quality 5 kW on-grid/hybrid system (5–8 bifacial N-type panels, hybrid inverter, structure, wiring and installation) currently costs roughly Rs. 640,000 – 820,000 in Faisalabad with bank-grade brands. Adding a lithium battery pack or an on-grid-only configuration changes the final price. Our load calculator gives you an instant item-wise estimate, and an exact quote follows a free site survey.',
      },
      {
        q: 'How long does FESCO net metering take?',
        a: 'After your system is installed and inspected, submitting the net metering application to FESCO and completing the green-meter swap typically takes 6–10 weeks. SolarTech prepares the full documentation (wiring diagram, test report, application forms) and follows your case until the agreement is signed and the meter is energized.',
      },
      {
        q: 'Which solar panels are best for Faisalabad?',
        a: 'N-type TOPCon modules such as Longi Hi-MO 6, Jinko Tiger Neo and Canadian Solar (550–650 W) are the best fit for Faisalabad: they degrade more slowly in heat above 40 °C, produce better in dust and haze, and are widely available with dealer warranty in Pakistan.',
      },
      {
        q: 'Is solar suitable for textile units and small factories in Faisalabad?',
        a: 'Yes — Faisalabad is Pakistan\'s textile hub and daytime industrial loads match solar production almost perfectly. We deploy 25 kW–1 MW net-metered systems on factory rooftops and sheds in the FIED Industrial Estate, often cutting daytime grid import by 60–80% with payback of 2–4 years.',
      },
      {
        q: 'How much roof area is needed for a 5 kW system?',
        a: 'With modern 585 W panels, a 5 kW system needs about 145–160 sq ft of shade-free roof, plus small walkway gaps. We confirm the exact layout during the free survey, including south-facing orientation and any water-tank or lift-machine shadowing.',
      },
      {
        q: 'What warranty and after-sales support do you provide?',
        a: 'Every SolarTech system ships with a 10-year comprehensive warranty and certified engineers on staff. Our Faisalabad service team covers all major housing societies and industrial areas — same-week cleaning, check-ups and maintenance under our annual contracts.',
      },
    ],
  },
};

const SERVICES = [
  { icon: Home, t: 'Residential Rooftop Solar', d: '3–15 kW systems designed around your {DISCO} bill — load survey, sizing, panels, hybrid inverter, structure and wiring, plus net metering paperwork.' },
  { icon: Building2, t: 'Commercial & Industrial Solar', d: '25 kW – 1 MW net-metered systems for factories and shops. Ideal for {CITY}\'s daytime industrial loads with 2–4 year payback.' },
  { icon: BadgeCheck, t: 'Net Metering — {DISCO}', d: 'End-to-end {DISCO} net metering: documentation, inspection coordination, green-meter swap and agreement signing — handled by our compliance team.' },
  { icon: BatteryCharging, t: 'Hybrid Battery Backup', d: 'Dyness Tower and Soluna lithium storage for load-shedding-free nights. Sized from your actual evening usage, not guesswork.' },
  { icon: ClipboardCheck, t: 'Survey, Design & Energy Audit', d: 'Free on-site survey with shadow analysis and per-string layout; paid energy audits for commercial clients optimise tariff brackets.' },
  { icon: Wrench, t: 'Cleaning, AMC & Support', d: 'Annual maintenance contracts with periodic panel cleaning, torque checks and performance monitoring — local crews, same-week response.' },
];

const SYSTEMS = [
  {
    size: '5 kW', who: 'Medium homes; bill Rs. 40k–80k/mo', panels: '≈ 7 × 585 W', inv: '6 kW hybrid',
    area: '≈ 145 sq ft', price: 'Rs. 640,000 – 820,000',
  },
  {
    size: '10 kW', who: 'Large homes; bill Rs. 80k–150k/mo', panels: '≈ 14 × 585 W', inv: '12 kW hybrid',
    area: '≈ 290 sq ft', price: 'Rs. 1,180,000 – 1,450,000',
  },
  {
    size: '25 kW+', who: 'Commercial / industrial units', panels: '43+ × 585 W', inv: '33+ kW',
    area: '≈ 725 sq ft', price: 'Custom quote after survey',
  },
];

const NET_STEPS = [
  { n: 1, t: 'Document check', d: 'Copy of your latest {DISCO} bill, CNIC, proof of ownership and a sanctioned-load check (3-phase meter ≥ system size).' },
  { n: 2, t: 'Installation & inspection', d: 'System is installed to {DISCO} standards and inspected; test report and wiring diagram are prepared.' },
  { n: 3, t: 'Application submission', d: 'Distributed-generation application filed with {DISCO} along with all annexures and fees.' },
  { n: 4, t: 'Green meter issuance', d: '{DISCO} issues and installs the bi-directional (green) meter — typically 6–10 weeks end to end.' },
  { n: 5, t: 'Agreement & activation', d: 'Net metering agreement is signed and your export units start offsetting your bill every month.' },
];

function sub(str, c) {
  return str.replace(/\{CITY\}/g, c.name).replace(/\{DISCO\}/g, c.disco).replace(/\{DISCOFULL\}/g, c.discoFull);
}

/* ================================================================== */
export default function CityLanding({ city = 'lahore' }) {
  const c = CITIES[city];
  if (!c) return null;

  const waText = encodeURIComponent(`Hi! I want solar installation in ${c.name}. Please share a quote.`);
  const waHref = `https://wa.me/923015935773?text=${waText}`;

  return (
    <div className="bg-slate-50">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-100 via-emerald-50 to-green-50 border-b border-green-100">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-green-300/20 blur-3xl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-green-800/70 mb-4 flex items-center gap-1.5">
            <a href="../" className="hover:underline">Home</a> <span>/</span>
            <span>Solar in {c.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md shrink-0">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                Solar Panel Installation in {c.name}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                Solar panels, hybrid inverters and net metering in {c.name} — Canadian Solar, Longi &amp; Jinko
                N-type panels, Solax, GoodWe &amp; Solis inverters, Dyness &amp; Soluna batteries, and complete{' '}
                <strong>{c.disco} net metering</strong> handling. 500+ installs, 10-year warranty, free survey.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.a
              whileTap={{ scale: 0.97 }} href={waHref} target="_blank" rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4" /> Get a {c.name} Quote <ArrowRight className="w-4 h-4" />
            </motion.a>
            <a href="../solar-calculator/" className="px-5 py-3 rounded-xl border border-green-600 text-green-700 text-sm font-bold flex items-center gap-2 hover:bg-green-50 cursor-pointer">
              <Calculator className="w-4 h-4" /> Free Solar Calculator
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: ShieldCheck, v: '500+', l: 'Installations nationwide' },
            { icon: CalendarRange, v: '6–10 wks', l: `${c.disco} net metering, end-to-end` },
            { icon: BadgeCheck, v: '10 yrs', l: 'Comprehensive warranty' },
            { icon: MapPin, v: '12+', l: `${c.name} areas & industrial zones` },
          ].map((s) => (
            <div key={s.l} className="bg-white border border-slate-200 rounded-xl p-4">
              <s.icon className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-lg font-black text-slate-900">{s.v}</div>
              <div className="text-[11px] font-semibold text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="py-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Our Solar Services in {c.name}</h2>
          <p className="text-sm text-slate-500 mb-6">
            Everything from the first site survey to {c.disco} net metering and lifetime support — one team, one warranty.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.t} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{sub(s.t, c)}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{sub(s.d, c)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Products & system prices ---------- */}
      <section id="products" className="py-12 bg-white border-y border-slate-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            Solar Panels, Inverters &amp; System Prices in {c.name} (2026)
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Indicative street prices with premium equipment. Panels: Canadian Solar, Longi Hi-MO 6, Jinko Tiger Neo (550–650 W N-type).
            Inverters: Solax X1/X3, GoodWe EH and Solis hybrid (4–12 kW). Batteries: Dyness Tower &amp; Soluna lithium (5–16 kWh).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-green-50 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3">System Size</th>
                  <th className="px-4 py-3">Best For</th>
                  <th className="px-4 py-3">Panels</th>
                  <th className="px-4 py-3">Inverter</th>
                  <th className="px-4 py-3">Roof Area</th>
                  <th className="px-4 py-3">Indicative Price</th>
                </tr>
              </thead>
              <tbody>
                {SYSTEMS.map((s) => (
                  <tr key={s.size} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-black text-green-700 whitespace-nowrap">{s.size}</td>
                    <td className="px-4 py-3 text-slate-600">{s.who}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.panels}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.inv}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.area}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Prices exclude battery storage (add {`Rs. 200,000`}+ for 5 kWh lithium) and vary with equipment selection, roof type and meter size. Get an exact quote via WhatsApp below.
          </p>
        </div>
      </section>

      {/* ---------- Net metering ---------- */}
      <section id="net-metering" className="py-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {c.disco} Net Metering in {c.name} — How It Works
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            We process your {c.discoFull} net metering application while your system is being installed, so nothing waits in a queue.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {NET_STEPS.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-green-700 text-white font-black text-xs flex items-center justify-center mb-3">{s.n}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{sub(s.t, c)}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{sub(s.d, c)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Coverage areas ---------- */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Areas We Cover in {c.name}</h2>
          <p className="text-sm text-slate-500 mb-5">
            Free site survey anywhere in or around {c.name}. Our installation and service crews are {c.name}-based, so support is never more than a few hours away.
          </p>
          <div className="flex flex-wrap gap-2">
            {c.areas.map((a) => (
              <span key={a} className="px-3.5 py-1.5 rounded-full bg-green-50 border border-green-100 text-xs font-semibold text-green-800 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="py-12 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions — Solar in {c.name}</h2>
          <div className="space-y-3">
            {c.faq.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm group">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-green-700 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-[11px] shrink-0"><CheckCircle2 className="w-4 h-4" /></span>
                  {f.q}
                </summary>
                <div className="px-5 pb-5 pl-[4.25rem] text-xs text-slate-600 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </span>
              <div>
                <p className="text-base font-black text-white">Start With a Free Survey in {c.name}</p>
                <p className="text-xs text-green-100 mt-0.5">
                  Send us your {c.disco} bill on WhatsApp — we\'ll return a sized system, item-wise price and savings estimate within 24 hours.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.a
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={waHref} target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-white text-green-700 font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp {c.disco} Bill <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a href="../solar-calculator/" className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Calculator className="w-4 h-4" /> Free Calculator
              </a>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="../" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-700 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to SolarTech Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
