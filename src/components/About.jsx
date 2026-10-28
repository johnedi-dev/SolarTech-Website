import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Users, MapPin, ArrowRight } from 'lucide-react';

const perks = [
  {
    icon: ShieldCheck,
    title: 'Trusted & Experienced',
    desc: 'Years of industry experience and a skilled team.',
  },
  {
    icon: BadgeCheck,
    title: 'Premium Quality',
    desc: 'Only the best panels, inverters and batteries.',
  },
  {
    icon: Users,
    title: 'End-to-End Support',
    desc: 'From consultation to installation and after sales service.',
  },
  {
    icon: MapPin,
    title: 'Local Presence',
    desc: 'Proudly serving customers across Pakistan.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-shell section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
              About Us
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-5">
              Sustainable Energy for{' '}
              <span className="text-green-700">a Better Tomorrow</span>
            </h2>

            <p className="text-slate-600 text-sm lg:text-[15px] leading-relaxed mb-3">
              We are a trusted solar energy solutions provider, helping homes and businesses
              switch to clean, renewable energy. Our mission is to make solar simple,
              affordable and accessible for everyone in Pakistan.
            </p>
            <p className="text-slate-600 text-sm lg:text-[15px] leading-relaxed mb-7">
              Our partnerships with <strong className="text-slate-900">GoodWe, Maxpower, Solax Power,
              Dyness, Canadian Solar, Longi, Jinko</strong> and <strong className="text-slate-900">Solis</strong> ensure
              you get the very best in solar technology with unmatched after-sales support.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-green-700/25 transition-colors"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Middle: Perks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{p.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image (existing team photo) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(21,128,61,0.15)]">
              <img
                src="/team.webp"
                alt="SolarTech installation team installing solar panels on a rooftop"
                className="w-full h-[380px] object-cover"
                width="1200"
                height="1200"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
            </div>
            <span className="absolute -top-4 right-6 rotate-6 text-green-800 font-bold text-sm italic drop-shadow-sm bg-white/80 px-3 py-1 rounded-full border border-green-100">
              Expert Installation Guaranteed ✍️
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
