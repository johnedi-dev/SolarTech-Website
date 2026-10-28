import { motion } from 'framer-motion';
import { Trophy, BadgeCheck, Clock, Headphones, ThumbsUp, Award } from 'lucide-react';

const reasons = [
  { icon: Award, title: 'Product Warranty', desc: '10 years of comprehensive coverage on every installation.' },
  { icon: Trophy, title: 'Top Brands', desc: 'Global quality products from Tier 1 manufacturers.' },
  { icon: BadgeCheck, title: 'Skilled Team', desc: 'Certified professionals, expert installation.' },
  { icon: Headphones, title: 'Ongoing Support', desc: 'Even after installation — 24/7 assistance.' },
  { icon: ThumbsUp, title: 'Transparent Pricing', desc: 'No hidden costs, honest quotes, guaranteed savings.' },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative section-shell bg-[#f7faf5]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
            Why Homeowners <span className="text-green-700">Trust Us</span>
          </h2>
        </motion.div>

        {/* Reasons row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-[0_20px_45px_rgba(21,128,61,0.10)] hover:border-green-200 transition-all duration-300 flex sm:flex-col items-center sm:items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <reason.icon className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{reason.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 rounded-[2rem] overflow-hidden relative bg-gradient-to-r from-green-800 to-green-600 shadow-[0_25px_60px_rgba(21,128,61,0.25)]"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 p-8 sm:p-10">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Ready to Go Solar?</h3>
              <p className="text-green-100 text-sm">Get a free site assessment and custom quote today.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:+923015935773"
                className="px-7 py-3 rounded-xl bg-white text-green-800 font-bold text-sm hover:shadow-xl transition-all"
              >
                Call Us Now
              </a>
              <a
                href="https://wa.me/923015935773"
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3 rounded-xl border border-white/40 text-white bg-white/10 font-bold text-sm hover:bg-white/20 transition-all"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
