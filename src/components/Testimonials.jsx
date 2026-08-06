import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Raza',
    location: 'Lahore, Pakistan',
    role: 'Homeowner',
    rating: 5,
    text: 'SolarTech installed a 10kW Solax hybrid system with Dyness batteries. Our electricity bill dropped from Rs. 45,000 to just Rs. 4,000 per month. The team was professional and the installation was completed in just 2 days. Highly recommended!',
    system: '10kW Solax + Dyness 10kWh',
    saving: 'Rs. 41,000/month saved',
    avatar: 'AR',
    avatarBg: 'bg-orange-500',
  },
  {
    name: 'Fatima Malik',
    location: 'Karachi, Pakistan',
    role: 'Business Owner',
    rating: 5,
    text: 'We got a 20kW Canadian Solar + Solis inverter system for our office. The energy audit was thorough and the projections were accurate. We achieved full ROI in under 3 years. SolarTech support is exceptional!',
    system: '20kW Canadian Solar + Solis',
    saving: '80% reduction in bills',
    avatar: 'FM',
    avatarBg: 'bg-blue-500',
  },
  {
    name: 'Usman Tariq',
    location: 'Islamabad, Pakistan',
    role: 'Factory Owner',
    rating: 5,
    text: 'Installed a 50kW industrial solar system. GoodWe inverters and Jinko panels were of premium quality. The net metering setup was handled completely by SolarTech — zero hassle. Very happy with the investment.',
    system: '50kW GoodWe + Jinko',
    saving: 'Rs. 3.5 lakh/month saved',
    avatar: 'UT',
    avatarBg: 'bg-green-500',
  },
  {
    name: 'Sana Khalid',
    location: 'Faisalabad, Pakistan',
    role: 'Residential Customer',
    rating: 5,
    text: 'From the initial consultation to the final installation, the entire experience was flawless. The Longi panels and Solax inverter are working perfectly. The monitoring app is very user-friendly!',
    system: '6kW Solax + Longi 450W',
    saving: 'Rs. 18,000/month saved',
    avatar: 'SK',
    avatarBg: 'bg-purple-500',
  },
  {
    name: 'Dr. Imran Hassan',
    location: 'Rawalpindi, Pakistan',
    role: 'Hospital Administrator',
    rating: 5,
    text: 'We have solar systems installed at 3 of our hospital buildings. SolarTech managed all three projects simultaneously with exceptional coordination. The Dyness battery backup ensures no interruption during load shedding.',
    system: '3 × 15kW + Dyness 16kWh',
    saving: 'Rs. 1.2 lakh/month saved',
    avatar: 'IH',
    avatarBg: 'bg-amber-500',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative section-shell section-gradient particles-bg">
      {/* Decorative quote marks */}
      <div className="absolute top-10 left-10 text-orange-500/5 text-[200px] font-black leading-none select-none">"</div>

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
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            What Our{' '}
            <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Hear from real customers who transformed their energy bills with SolarTech.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="grid lg:grid-cols-5 gap-8 items-center mb-12">
          {/* Prev button */}
          <div className="hidden lg:flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-14 h-14 rounded-full glass border border-white/10 hover:border-orange-500/50 flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Testimonial Card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="glass-dark rounded-[2rem] p-8 lg:p-10 border border-slate-200 animated-border shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
              >
                <Quote className="w-10 h-10 text-orange-500/30 mb-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                {/* System Info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 glass rounded-full text-sm text-orange-400 border border-orange-500/20 font-medium">
                    {t.system}
                  </span>
                  <span className="px-4 py-2 glass rounded-full text-sm text-green-400 border border-green-500/20 font-medium">
                    ✓ {t.saving}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{t.name}</div>
                    <div className="text-slate-600 text-sm">{t.role} · {t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <div className="hidden lg:flex justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-14 h-14 rounded-full glass border border-white/10 hover:border-orange-500/50 flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Mobile nav buttons */}
        <div className="flex lg:hidden justify-center gap-4 mb-8">
          <button onClick={prev} className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Mini testimonial cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setCurrent(i)}
              className={`glass rounded-xl p-5 border cursor-pointer transition-all duration-300 ${
                current === i ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-xs line-clamp-2 mb-3">{t.text}</p>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <span className="text-slate-900 text-xs font-medium">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
