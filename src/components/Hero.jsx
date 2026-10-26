import { motion } from 'framer-motion';
import { ChevronDown, Zap, Shield, Award } from 'lucide-react';
import { FaSolarPanel, FaBolt } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src="/Solar_energy_system_animation.mp4"
          poster="/hero-bg.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="hero-overlay absolute inset-0"></div>
        {/* Additional dark gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
      </div>

      {/* Floating particles / orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-orange-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-48 h-48 rounded-full bg-blue-600/70 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Animated sun icon */}
      <div className="absolute right-10 top-1/3 hidden xl:block animate-rotate-slow opacity-20">
        <div className="w-64 h-64 rounded-full border-4 border-orange-500/80 border-dashed flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/50 to-amber-400/50 flex items-center justify-center">
            <FaSolarPanel className="w-16 h-16 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32 lg:pt-36">
        <div className="w-full max-w-3xl text-left p-4 sm:p-6 lg:p-6 bg-transparent shadow-none">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 rounded-full mb-2 border border-white/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-medium text-green-500">Pakistan's Trusted Solar Partner</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
          >
            Power Your Future{' '}
            <span className="block gradient-text">
              With Solar Energy
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-100 mb-8 max-w-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
          >
            Premium solar solutions with world-class brands and expert service.
            Cut your electricity bills by <span className="text-orange-400 font-bold">up to 80%</span> with our expert installations.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#contact" className="inline-flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 rounded-xl font-bold text-white text-lg flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Get Free Quote
              </motion.button>
            </a>
            <a href="#products" className="inline-flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-bold text-white text-lg glass border border-white/20 hover:border-orange-500/50 transition-all duration-300 flex items-center gap-2"
              >
                <FaSolarPanel className="w-5 h-5" />
                Our Products
              </motion.button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: <Shield className="w-5 h-5" />, text: '10 Year Warranty' },
              { icon: <Award className="w-5 h-5" />, text: 'Certified Installer' },
              { icon: <FaBolt className="w-5 h-5" />, text: '500+ Installations' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-200">
                <div className="text-orange-400">{badge.icon}</div>
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-300 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-orange-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
