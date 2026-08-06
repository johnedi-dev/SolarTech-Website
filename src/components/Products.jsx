import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBatteryThreeQuarters, FaSolarPanel, FaBolt, FaMicrochip } from 'react-icons/fa';
import { Zap, ChevronRight, Star } from 'lucide-react';

const categories = [
  { id: 'inverters', label: 'Inverters', icon: <FaBolt /> },
  { id: 'batteries', label: 'Batteries', icon: <FaBatteryThreeQuarters /> },
  { id: 'panels', label: 'Solar Panels', icon: <FaSolarPanel /> },
  { id: 'brands', label: 'Brands', icon: <FaMicrochip /> },
];

const products = {
  inverters: [
    {
      brand: 'Solax Power',
      name: 'X1 Hybrid Inverter',
      sizes: ['4kW', '6kW', '8kW', '10kW', '12kW'],
      features: ['Up to 98.5% efficiency', 'Wi-Fi monitoring', 'Hybrid ready', 'UPS backup'],
      tag: 'Best Seller',
      tagColor: 'bg-orange-500',
      color: 'from-orange-500/10 to-amber-500/5',
      borderColor: 'border-orange-500/30',
    },
    {
      brand: 'Solis',
      name: 'S6 Series Inverter',
      sizes: ['6kW', '8kW', '10kW', '12kW'],
      features: ['Three-phase output', 'IP65 rated', 'Smart monitoring', 'High efficiency'],
      tag: 'Premium',
      tagColor: 'bg-blue-500',
      color: 'from-blue-500/10 to-blue-400/5',
      borderColor: 'border-blue-500/30',
    },
    {
      brand: 'GoodWe',
      name: 'DNS Hybrid Series',
      sizes: ['5kW', '10kW'],
      features: ['Dual MPPT', 'Lead-acid & Li-ion', 'Grid export control', 'App monitoring'],
      tag: 'Value Pick',
      tagColor: 'bg-green-500',
      color: 'from-green-500/10 to-emerald-500/5',
      borderColor: 'border-green-500/30',
    },
  ],
  batteries: [
    {
      brand: 'Dyness',
      name: 'Tower B5 LiFePO4',
      sizes: ['5kWh', '10kWh', '16kWh'],
      features: ['6000+ cycle life', 'BMS protection', 'Modular design', 'IP55 rated'],
      tag: 'Top Choice',
      tagColor: 'bg-orange-500',
      color: 'from-orange-500/10 to-amber-500/5',
      borderColor: 'border-orange-500/30',
    },
    {
      brand: 'Soluna Lyra',
      name: 'Lyra LFP Battery',
      sizes: ['5kWh', '10kWh', '16kWh'],
      features: ['Smart BMS', 'Stackable design', 'Long lifespan', 'Temperature safe'],
      tag: 'New Arrival',
      tagColor: 'bg-purple-500',
      color: 'from-purple-500/10 to-violet-500/5',
      borderColor: 'border-purple-500/30',
    },
    {
      brand: 'Solax Power',
      name: 'T-BAT SL Battery',
      sizes: ['5kWh', '10kWh'],
      features: ['Integrated BMS', 'Solax compatible', 'Warranty 10 yrs', 'Easy install'],
      tag: 'Popular',
      tagColor: 'bg-blue-500',
      color: 'from-blue-500/10 to-blue-400/5',
      borderColor: 'border-blue-500/30',
    },
  ],
  panels: [
    {
      brand: 'Canadian Solar',
      name: 'CS6L BiHiKu Mono',
      sizes: ['420W', '450W', '500W', '550W'],
      features: ['Bifacial technology', '21.5% efficiency', '12yr product warranty', '25yr performance'],
      tag: 'Top Rated',
      tagColor: 'bg-amber-500',
      color: 'from-amber-500/10 to-yellow-500/5',
      borderColor: 'border-amber-500/30',
    },
    {
      brand: 'Longi Solar',
      name: 'Hi-MO 6 Mono PERC',
      sizes: ['420W', '450W', '480W', '530W'],
      features: ['22.4% efficiency', 'Extreme weather rated', 'Low degradation', 'Anti-soiling coat'],
      tag: 'Best Efficiency',
      tagColor: 'bg-green-500',
      color: 'from-green-500/10 to-emerald-500/5',
      borderColor: 'border-green-500/30',
    },
    {
      brand: 'Jinko Solar',
      name: 'Tiger Neo N-type',
      sizes: ['400W', '425W', '450W', '500W'],
      features: ['N-type cell tech', '23.5% efficiency', 'Half-cell module', 'Anti-PID tested'],
      tag: 'High Power',
      tagColor: 'bg-blue-500',
      color: 'from-blue-500/10 to-blue-400/5',
      borderColor: 'border-blue-500/30',
    },
  ],
  brands: [
    { name: 'GoodWe', logo: '⚡', desc: 'Globally trusted inverter manufacturer with 30+ million units shipped.', color: 'from-orange-500/10 to-amber-500/5', border: 'border-orange-500/30' },
    { name: 'Maxpower', logo: '🔋', desc: 'Pakistan\'s leading solar distributor with nationwide service network.', color: 'from-blue-500/10 to-blue-400/5', border: 'border-blue-500/30' },
    { name: 'Solax Power', logo: '☀️', desc: 'Advanced hybrid inverters with built-in battery management.', color: 'from-purple-500/10 to-violet-500/5', border: 'border-purple-500/30' },
    { name: 'Dyness', logo: '🔌', desc: 'LiFePO4 battery systems with 6000+ cycle life guarantee.', color: 'from-green-500/10 to-emerald-500/5', border: 'border-green-500/30' },
    { name: 'Canadian Solar', logo: '🌍', desc: 'One of world\'s largest solar panel manufacturers, Tier 1 certified.', color: 'from-amber-500/10 to-yellow-500/5', border: 'border-amber-500/30' },
    { name: 'Solis', logo: '⚙️', desc: 'Smart energy management with high-efficiency inverter solutions.', color: 'from-cyan-500/10 to-sky-500/5', border: 'border-cyan-500/30' },
  ],
};

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`product-card rounded-[1.6rem] p-6 h-full bg-gradient-to-br ${product.color || product.color} ${product.borderColor || product.border} flex flex-col`}
    >
      {/* Tag */}
      {(product.tag) && (
        <span className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full ${product.tagColor} mb-4`}>
          {product.tag}
        </span>
      )}
      <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">{product.brand || product.name}</p>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{product.name || product.desc}</h3>

      {/* Sizes */}
      {product.sizes && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map(size => (
            <span key={size} className="px-3 py-1 text-xs rounded-full glass border border-slate-200 text-slate-600 font-medium">
              {size}
            </span>
          ))}
        </div>
      )}

      {/* Features */}
      {product.features && (
        <ul className="space-y-2 mb-5">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Description for brands */}
      {product.desc && !product.features && (
        <p className="text-slate-600 text-sm mb-5 leading-relaxed">{product.desc}</p>
      )}

      <button className="mt-auto w-full py-2.5 rounded-xl border border-slate-200 hover:border-orange-500/50 text-sm text-slate-700 hover:text-orange-500 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('inverters');

  return (
    <section id="products" className="relative section-shell bg-slate-50">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>

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
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Our Products</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Premium Solar{' '}
            <span className="gradient-text">Equipment</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            World-class solar inverters, batteries, and panels from globally certified manufacturers — all under one roof.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'btn-primary text-white glow-orange'
                  : 'glass border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-orange-500/30'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {(products[activeCategory] || []).map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mt-12 rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-8 sm:p-10"
        >
          <p className="text-slate-600 mb-4">Can't find what you need? Contact us for custom solutions.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-3 rounded-xl text-white font-bold"
          >
            Request Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
