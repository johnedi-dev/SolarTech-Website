import { motion } from 'framer-motion';
import { useInView as useIntersection } from 'react-intersection-observer';
import { Home, Zap, Users, Leaf } from 'lucide-react';

const stats = [
  { icon: Home, value: '1,200+', label: 'Happy Installations' },
  { icon: Zap, value: '2.5 MW+', label: 'Total Clean Energy Generated' },
  { icon: Users, value: '1,000+', label: 'Satisfied Customers' },
  { icon: Leaf, value: '2,800+ Tons', label: 'CO₂ Avoided' },
];

function StatCard({ stat, index }) {
  const { ref, inView } = useIntersection({ threshold: 0.1, triggerOnce: true });
  const Icon = stat.icon;

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-center gap-4 p-4 sm:p-6"
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-green-700" />
        </div>
        <div className="min-w-0">
          <div className="text-xl sm:text-2xl lg:text-3xl font-black bg-[linear-gradient(135deg,#166534,#15803d)] bg-clip-text text-transparent">{stat.value}</div>
          <p className="text-slate-500 font-medium text-xs lg:text-sm">{stat.label}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative -mt-10 pb-4 z-20" style={{ zIndex: 20 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-[0_25px_60px_rgba(21,128,61,0.08)] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 overflow-hidden">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
