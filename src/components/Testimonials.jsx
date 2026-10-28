import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Raza',
    location: 'Lahore',
    role: 'Homeowner',
    rating: 5,
    short: '"Excellent service and professional team. Our electricity bill is now almost zero!"',
    quote: 'SolarTech installed a 10kW Solax hybrid system with Dyness batteries. Our electricity bill dropped from Rs. 45,000 to just Rs. 4,000 per month.',
    avatar: 'AR',
    avatarBg: 'bg-green-700',
  },
  {
    name: 'Fatima Malik',
    location: 'Multan',
    role: 'Business Owner',
    rating: 5,
    short: '"The installation was smooth and clean. Highly recommended!"',
    quote: 'We got a 20kW Canadian Solar + Solis inverter system for our office. The energy audit was thorough and the projections were accurate. We achieved full ROI in under 3 years.',
    avatar: 'FM',
    avatarBg: 'bg-emerald-600',
  },
  {
    name: 'Usman Tariq',
    location: 'Faisalabad',
    role: 'Factory Owner',
    rating: 5,
    short: '"Great support even after installation. Very satisfied with the system."',
    quote: 'Installed a 50kW industrial solar system. GoodWe inverters and Jinko panels were of premium quality. The net metering setup was handled completely by SolarTech — zero hassle.',
    avatar: 'UT',
    avatarBg: 'bg-green-600',
  },
  {
    name: 'Ayesha Malik',
    location: 'Faisalabad',
    role: 'Residential Customer',
    rating: 5,
    short: '"Best investment we made for our home. The team is very professional."',
    quote: 'From the initial consultation to the final installation, the entire experience was flawless. The Longi panels and Solax inverter are working perfectly. The monitoring app is very user-friendly!',
    avatar: 'AM',
    avatarBg: 'bg-teal-600',
  },
  {
    name: 'Dr. Imran Hassan',
    location: 'Lahore',
    role: 'Hospital Administrator',
    rating: 5,
    short: '"Flawless coordination across three buildings. Zero downtime since day one."',
    quote: 'We have solar systems installed at 3 of our hospital buildings. SolarTech managed all three projects simultaneously with exceptional coordination.',
    avatar: 'IH',
    avatarBg: 'bg-amber-500',
  },
];

export default function Testimonials() {
  const [page, setPage] = useState(0); // 4 cards per view
  const perView = 4;
  const pages = Math.ceil(testimonials.length / perView);
  const visible = testimonials.slice(page * perView, page * perView + perView);

  const prev = () => setPage((p) => (p === 0 ? pages - 1 : p - 1));
  const next = () => setPage((p) => (p === pages - 1 ? 0 : p + 1));

  return (
    <section id="testimonials" className="relative section-shell bg-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
            What Our Customers Say
          </h2>
        </div>

        {/* Cards + arrows */}
        <div className="flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            className="hidden md:flex w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 hover:text-green-700 hover:border-green-300 transition-all shrink-0 cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {visible.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-[0_20px_45px_rgba(21,128,61,0.10)] transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">{t.name}</div>
                        <div className="text-slate-400 text-[11px]">{t.location}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{t.short}</p>
                    <span className="text-[10px] text-slate-400 mt-auto pt-3">{t.role}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="hidden md:flex w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 hover:text-green-700 hover:border-green-300 transition-all shrink-0 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="md:hidden w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400" aria-label="Previous">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(Math.floor(i / perView) < pages ? Math.floor(i / perView) : 0)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  Math.floor(i / perView) === page ? 'w-7 h-2 bg-green-600' : 'w-2 h-2 bg-slate-200 hover:bg-green-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="md:hidden w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400" aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
