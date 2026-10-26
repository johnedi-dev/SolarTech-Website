import { motion } from 'framer-motion';
import { Trophy, Clock, Headphones, BadgeCheck, ThumbsUp, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: <Trophy className="w-7 h-7" />,
    title: 'Premium Brands Only',
    desc: 'We exclusively source from Tier 1 manufacturers — GoodWe, Solax, Canadian Solar, Jinko, Longi, and more.',
    stat: '10+',
    statLabel: 'Brand Partners',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    borderHover: 'group-hover:border-orange-500/50',
  },
  {
    icon: <BadgeCheck className="w-7 h-7" />,
    title: 'Certified Installers',
    desc: 'All our engineers are certified by manufacturers and trained in the latest solar installation technologies.',
    stat: '50+',
    statLabel: 'Certified Techs',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    borderHover: 'group-hover:border-blue-500/50',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Fast Installation',
    desc: 'From survey to switch-on in as little as 3-5 working days. Minimal disruption to your daily routine.',
    stat: '3-5',
    statLabel: 'Days Installation',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    borderHover: 'group-hover:border-green-500/50',
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: '24/7 Technical Support',
    desc: 'Our dedicated support team is available around the clock via phone, WhatsApp, and remote monitoring.',
    stat: '24/7',
    statLabel: 'Customer Support',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    borderHover: 'group-hover:border-purple-500/50',
  },
  {
    icon: <ThumbsUp className="w-7 h-7" />,
    title: 'Guaranteed Savings',
    desc: 'Our custom designs guarantee maximum energy output and ROI, with documented bill savings.',
    stat: '80%',
    statLabel: 'Bill Reduction',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    borderHover: 'group-hover:border-amber-500/50',
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'Net Metering Experts',
    desc: 'Complete net metering documentation and DISCO/WAPDA application handled by our team.',
    stat: '100%',
    statLabel: 'Success Rate',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    borderHover: 'group-hover:border-cyan-500/50',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative section-shell bg-slate-50">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(128,201,27,1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(128,201,27,1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-orange-500"></div>
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            The <span className="gradient-text">Advantages</span> of{' '}
            <br />Choosing SolarTech
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Experience the difference of working with Pakistan's most trusted solar energy partner.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group glass rounded-[1.6rem] p-7 h-full border border-slate-200 ${reason.borderHover} transition-all duration-300 card-hover`}
            >
              {/* Icon & Stat Row */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 ${reason.bg} rounded-xl flex items-center justify-center ${reason.color} group-hover:scale-110 transition-transform duration-300`}>
                  {reason.icon}
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-black ${reason.color}`}>{reason.stat}</div>
                  <div className="text-gray-500 text-xs font-medium">{reason.statLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 rounded-[2rem] overflow-hidden relative border border-orange-500/20 shadow-[0_30px_70px_rgba(128,201,27,0.18)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-amber-500/60"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'url(/panels-aerial.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 p-10">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Ready to Go Solar?</h3>
              <p className="text-orange-100">Get a free site assessment and custom quote today.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="tel:+923015935773"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-xl bg-white text-orange-600 font-bold hover:shadow-xl transition-all duration-300"
              >
                Call Us Now
              </motion.a>
              <motion.a
                href="https://wa.me/923015935773"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-xl  border border-white/30 text-white bg-green-400/80 font-bold hover:bg-white/10 transition-all duration-300"
              >
                WhatsApp Chat
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
