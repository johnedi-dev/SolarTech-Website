import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Homepage FAQ section.
 * Q&A text is intentionally visible in the DOM so the FAQPage JSON-LD
 * in index.html is backed by on-page content (Google policy requirement).
 */
const faqs = [
  {
    q: 'How much does a solar system cost in Pakistan in 2026?',
    a: 'A quality 5 kW on-grid/hybrid system (N-type panels, hybrid inverter, structure and installation) costs approximately Rs. 640,000 – 820,000 in Lahore or Faisalabad with bank-grade brands (Canadian Solar, Longi, Jinko panels; Solax, GoodWe or Solis inverters). A 10 kW system runs Rs. 1,180,000 – 1,450,000. Adding a lithium battery pack (Dyness or Soluna, 5–16 kWh) increases the total by Rs. 200,000 – 600,000. Use our free Solar Load Calculator for an instant item-wise estimate.',
  },
  {
    q: 'How long does net metering take with LESCO or FESCO?',
    a: 'From the moment your system passes inspection, submitting the distributed-generation application to LESCO (Lahore) or FESCO (Faisalabad) and receiving the bi-directional (green) meter typically takes 6–10 weeks end to end. SolarTech prepares every document — wiring diagram, test report, annexures, fees — and tracks your application until the net metering agreement is signed and your exports start offsetting your bill.',
  },
  {
    q: "Which solar panels are best for Pakistan's climate?",
    a: "N-type TOPCon modules — Longi Hi-MO 6, Jinko Tiger Neo and Canadian Solar (550–650 W) — are the top choice for Pakistan. They degrade more slowly at temperatures above 40 °C (common in Punjab and Sindh summers), perform better in dust and haze, and carry internationally verifiable warranties from Tier 1 manufacturers with dealer presence in Pakistan.",
  },
  {
    q: 'What is the payback period for solar in Pakistan?',
    a: 'Most residential systems sized for a Rs. 30,000–80,000/month bill pay back in 3–5 years at today\'s WAPDA tariffs. Commercial and industrial systems — where daytime loads align almost perfectly with solar production — often achieve payback in 2–4 years. With net metering, units exported during low-demand hours credit your next bill, further shortening the payback.',
  },
  {
    q: 'On-grid vs hybrid vs off-grid — which is right for me?',
    a: 'On-grid systems are the most affordable and best for areas with less than 6 hours of daily load-shedding — they export surplus to the grid for credits. Hybrid systems add battery backup (Dyness or Soluna storage) for load-shedding-free nights and are ideal for homes or businesses with 6–18 hours of power cuts. Off-grid systems are for remote sites without any grid connection. Our engineers assess your DISCO bill, usage profile and load-shedding pattern to recommend the right configuration.',
  },
  {
    q: 'What warranty does SolarTech provide?',
    a: 'Every SolarTech installation comes with a 10-year comprehensive warranty covering panels, inverters, structure and workmanship. Panel manufacturers separately provide a 25-year performance guarantee (≥ 80% output at year 25). We also offer annual maintenance contracts (AMC) with periodic panel cleaning, torque checks and system performance monitoring — serviced by our local crews with same-week response time.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative section-shell bg-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
            FAQ
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">
            Everything you need to know about solar panels, pricing, net metering and installation in Pakistan.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-800 hover:text-green-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Have more questions?{' '}
          <a href="#contact" className="font-bold text-green-700 hover:text-green-800 underline underline-offset-2">
            Get a free consultation
          </a>{' '}
          or{' '}
          <a href="solar-calculator/" className="font-bold text-green-700 hover:text-green-800 underline underline-offset-2">
            try our Solar Calculator
          </a>.
        </p>
      </div>
    </section>
  );
}
