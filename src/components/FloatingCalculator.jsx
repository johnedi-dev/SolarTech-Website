import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

export default function FloatingCalculator() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.4, type: 'spring' }}
      className="fixed bottom-[4.75rem] right-4 sm:bottom-[5.75rem] sm:right-6 z-50 group"
    >
      {/* Hover label */}
      <span className="hidden group-hover:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-green-800 shadow-md pointer-events-none">
        ⚡ Solar Load Calculator
      </span>

      <motion.a
        href="solar-calculator/"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-700 hover:bg-green-800 flex items-center justify-center text-white shadow-lg shadow-green-700/30 ring-4 ring-white/80"
        aria-label="Open Solar Load Calculator"
      >
        <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.a>
    </motion.div>
  );
}
