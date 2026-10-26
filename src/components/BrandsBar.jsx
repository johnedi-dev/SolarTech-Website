import { motion } from 'framer-motion';

const brands = [
  { name: 'GoodWe', emoji: '⚡' },
  { name: 'Maxpower', emoji: '🔋' },
  { name: 'Solax Power', emoji: '☀️' },
  { name: 'Dyness', emoji: '🔌' },
  { name: 'Soluna Lyra', emoji: '🌙' },
  { name: 'Canadian Solar', emoji: '🍁' },
  { name: 'Longi Solar', emoji: '💫' },
  { name: 'Jinko Solar', emoji: '⚙️' },
  { name: 'Solis', emoji: '🌟' },
];

const allBrands = [...brands, ...brands];

export default function BrandsBar() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
          Authorized Brand Partners & Suppliers
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#101A35] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#101A35] to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-4 sm:gap-6 whitespace-nowrap"
        >
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-5 py-3 glass rounded-xl border border-slate-200 hover:border-amber-300/40 transition-all duration-300 shrink-0"
            >
              <span className="text-xl">{brand.emoji}</span>
              <span className="text-slate-700 font-bold text-xs sm:text-sm whitespace-nowrap">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
