import { motion } from 'framer-motion';
import { useInView as useIntersection } from 'react-intersection-observer';

const stats = [
  { value: 500, suffix: '+', label: 'Installations' },
  { value: 80, suffix: '%', label: 'Bill Reduction' },
  { value: 10, suffix: ' Yrs', label: 'Warranty' },
  { value: 98, suffix: '%', label: 'Satisfaction' },
];

function StatCard({ stat, index }) {
  const { ref, inView } = useIntersection({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="text-center p-8 glass rounded-2xl border border-slate-200 hover:border-orange-500/30 transition-all duration-300 card-hover"
      >
        <div className="counter-number text-5xl lg:text-6xl font-black gradient-text mb-2">
          {inView ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
        </div>
        <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">{stat.label}</p>
      </motion.div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative section-shell -mt-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100 to-transparent"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-card rounded-[2rem] p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
