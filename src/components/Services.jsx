import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Plug, ClipboardCheck, Sun, ArrowRight, Calculator, Leaf } from 'lucide-react';

const services = [
  {
    icon: Sun,
    title: 'Solar Installation',
    desc: 'Professional & safe installation for your home or business.',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    desc: 'Keep your system running at its best all year round.',
  },
  {
    icon: Plug,
    title: 'Net Metering',
    desc: 'Earn credits for excess energy exported to the grid.',
  },
  {
    icon: ClipboardCheck,
    title: 'Site Survey & Design',
    desc: 'Custom solution for your home or business needs.',
  },
];

const processSteps = [
  { step: '1', title: 'Free Consultation', desc: 'We assess your energy needs and site conditions.' },
  { step: '2', title: 'Custom Design', desc: 'Our engineers design the optimal solar system for you.' },
  { step: '3', title: 'Installation', desc: 'Professional installation by certified technicians.' },
  { step: '4', title: 'Go Solar!', desc: 'Start saving immediately with your new solar system.' },
];

export default function Services() {
  return (
    <section id="services" className="relative section-shell bg-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============ Top: services left + savings estimator right ============ */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
              Our Services
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">
              Complete <span className="text-green-700">Solar Solutions</span>
            </h2>
            <p className="text-slate-600 text-sm lg:text-base mb-9 max-w-md">
              We handle everything from consultation to installation and beyond.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Quick Savings Estimator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            id="calculator"
          >
            <div className="relative bg-green-50 rounded-[2rem] border border-green-100 p-6 sm:p-8 overflow-hidden">
              <Sun className="absolute top-5 right-6 w-8 h-8 text-amber-400" />
              <span className="inline-block bg-white text-green-800 px-3 py-1.5 rounded-full text-[11px] font-bold mb-4 border border-green-100">
                ⚡ Quick Savings Estimator
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-2">See Your Potential Savings</h3>
              <p className="text-slate-600 text-sm mb-6">
                Enter your monthly electricity bill or usage and get an instant estimate of your savings.
              </p>

              {/* mini estimator */}
              <Teaser />
            </div>
          </motion.div>
        </div>

        {/* ============ How It Works ============ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">
            How It <span className="text-green-700">Works</span>
          </h2>
          <p className="text-slate-600 text-sm">Your solar journey in 4 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-green-200"></div>
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 rounded-full bg-green-700 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-700/25 relative z-10">
                <span className="text-2xl font-black">{step.step}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
              <p className="text-slate-500 text-xs sm:text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Mini savings estimator (homepage teaser) ---------------- */
function Teaser() {
  const [bill, setBill] = useState('');
  const savings = (parseFloat(bill) || 0) * 0.8;
  const hasResult = (parseFloat(bill) || 0) > 0;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <label className="flex-1">
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Monthly bill (PKR)</span>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="e.g. 35000"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </label>
        <div className="flex items-end">
          <button
            onClick={() => {}}
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 px-7 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" /> Calculate
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={hasResult ? { opacity: 1, y: 0 } : { opacity: 0.6 }}
        className="bg-white rounded-2xl border border-green-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Monthly Savings</p>
          <p className="text-2xl sm:text-3xl font-black text-green-700 flex items-center gap-2">
            Rs. {Math.round(savings).toLocaleString()} <Leaf className="w-5 h-5 text-green-500" />
          </p>
        </div>
        <div className="text-xs text-slate-500 max-w-[220px]">
          Get a detailed system size, costs &amp; payback on our full calculator page.
        </div>
        <a
          href="solar-calculator/"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl whitespace-nowrap transition-colors"
        >
          Full Calculator <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </>
  );
}
