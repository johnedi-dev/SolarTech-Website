import { motion } from 'framer-motion';
import { Calculator, Package, Zap, Leaf, Headphones } from 'lucide-react';

const CALC_URL = 'solar-calculator/';

const trustChips = [
  { icon: Zap, label: 'Lower Electricity Bills' },
  { icon: Leaf, label: 'Clean & Renewable' },
  { icon: Headphones, label: 'Reliable Support' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Video (unchanged) */}
      <div className="absolute inset-0">
        <video
          src="/Solar_energy_system_animation.mp4"
          poster="/hero-bg.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[calc(50%_-_20px)_center] lg:object-right"
          aria-hidden="true"
        />
        <div className="hero-overlay absolute inset-0"></div>
        {/* Soft green fade at bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="w-full max-w-xl text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full mb-6"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm font-semibold">Clean Energy · Brighter Future</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.12] text-slate-900 mb-5"
          >
            Power Your Home with{' '}
            <span className="text-green-700">Clean, Affordable Solar Energy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
          >
            Reduce your electricity bills, gain energy independence and build a cleaner tomorrow
            with our complete solar solutions. Cut bills by <strong className="text-green-700">up to 80% or go completly Free</strong>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a href={CALC_URL}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-700 hover:bg-green-800 px-7 py-3.5 rounded-xl font-bold text-white text-base shadow-lg shadow-green-700/25 flex items-center gap-2 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Try Solar Calculator
              </motion.button>
            </a>
            <a href="#products" className="inline-flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 rounded-xl font-bold text-base border-2 border-green-600 text-green-700 bg-white/70 hover:bg-green-50 transition-all flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Explore Our Products
              </motion.button>
            </a>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {trustChips.map((chip, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                  <chip.icon className="w-3.5 h-3.5 text-green-700" />
                </span>
                <span className="text-sm font-semibold text-slate-700">{chip.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
