import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Users, Globe } from 'lucide-react';

const values = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Quality Assured',
    desc: 'Only premium branded equipment from globally certified manufacturers.',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Eco-Friendly',
    desc: 'Reduce your carbon footprint and contribute to a cleaner Pakistan.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Expert Team',
    desc: 'Certified engineers and installation experts with years of experience.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Nationwide Service',
    desc: 'Serving customers across Pakistan with fast installation timelines.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-shell section-gradient particles-bg overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-2 sm:p-3">
              <img
                src="/team.webp"
                alt="SolarTech installation team reviewing solar panels on a rooftop project"
                className="w-full h-[500px] object-cover rounded-[1.5rem]"
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
            </div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 glass-dark rounded-2xl p-5 border border-orange-500/30 shadow-2xl"
            >
              <p className="text-4xl font-black gradient-text">5+ Years</p>
              <p className="text-sm text-slate-600 mt-1">Industry Experience</p>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-6 -left-6 glass-dark rounded-2xl p-4 border border-blue-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">500+ Tons</p>
                  <p className="text-slate-600 text-xs">CO₂ Saved</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm"
          >

            {/* Section label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">About Us</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Pakistan's Premier{' '}
              <span className="gradient-text">Solar Energy</span>{' '}
              Provider
            </h2>

            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              We are an authorized distributor and installer of world-class solar products. 
              From residential rooftops to commercial complexes, we design and deliver 
              custom solar systems that maximize energy output and minimize costs.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Our partnerships with <strong className="text-slate-900">GoodWe, Maxpower, Solax Power, Dyness, 
              Canadian Solar, Longi, Jinko,</strong> and <strong className="text-slate-900">Solis</strong> ensure 
              you get the very best in solar technology with unmatched after-sales support.
            </p>

            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex btn-primary px-8 py-4 rounded-xl font-bold text-white items-center gap-2 cursor-pointer"
            >
              Learn More About Us
            </motion.a>
          </motion.div>
        </div>
      {/* Value grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-start gap-3 p-4 glass rounded-xl border border-slate-200 hover:border-orange-500/20 transition-all duration-300"
                >
                  <div className="text-orange-500 mt-0.5 shrink-0">{val.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{val.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
                  </div>

    </section>
  );
}
