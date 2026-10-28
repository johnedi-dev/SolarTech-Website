import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBatteryThreeQuarters, FaSolarPanel, FaBolt, FaMicrochip } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

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
    },
    {
      brand: 'Solis',
      name: 'S6 Series Inverter',
      sizes: ['6kW', '8kW', '10kW', '12kW'],
      features: ['Three-phase output', 'IP65 rated', 'Smart monitoring', 'High efficiency'],
      tag: 'Premium',
    },
    {
      brand: 'GoodWe',
      name: 'DNS Hybrid Series',
      sizes: ['5kW', '10kW'],
      features: ['Dual MPPT', 'Lead-acid & Li-ion', 'Grid export control', 'App monitoring'],
      tag: 'Value Pick',
    },
  ],
  batteries: [
    {
      brand: 'Dyness',
      name: 'Tower B5 LiFePO4',
      sizes: ['5kWh', '10kWh', '16kWh'],
      features: ['6000+ cycle life', 'BMS protection', 'Modular design', 'IP55 rated'],
      tag: 'Top Choice',
    },
    {
      brand: 'Soluna Lyra',
      name: 'Lyra LFP Battery',
      sizes: ['5kWh', '10kWh', '16kWh'],
      features: ['Smart BMS', 'Stackable design', 'Long lifespan', 'Temperature safe'],
      tag: 'New Arrival',
    },
    {
      brand: 'Solax Power',
      name: 'T-BAT SL Battery',
      sizes: ['5kWh', '10kWh'],
      features: ['Integrated BMS', 'Solax compatible', 'Warranty 10 yrs', 'Easy install'],
      tag: 'Popular',
    },
  ],
  panels: [
    {
      brand: 'Canadian Solar',
      name: 'CS6L BiHiKu Mono',
      sizes: ['420W', '450W', '500W', '550W'],
      features: ['Bifacial technology', '21.5% efficiency', '12yr product warranty', '25yr performance'],
      tag: 'Top Rated',
    },
    {
      brand: 'Longi Solar',
      name: 'Hi-MO 6 Mono PERC',
      sizes: ['420W', '450W', '480W', '530W'],
      features: ['22.4% efficiency', 'Extreme weather rated', 'Low degradation', 'Anti-soiling coat'],
      tag: 'Best Efficiency',
    },
    {
      brand: 'Jinko Solar',
      name: 'Tiger Neo N-type',
      sizes: ['400W', '425W', '450W', '500W'],
      features: ['N-type cell tech', '23.5% efficiency', 'Half-cell module', 'Anti-PID tested'],
      tag: 'High Power',
    },
  ],
  brands: [
    { name: 'GoodWe', tag: 'Inverters', desc: 'Globally trusted inverter manufacturer with 30+ million units shipped.' },
    { name: 'Maxpower', tag: 'Distribution', desc: "Pakistan's leading solar distributor with nationwide service network." },
    { name: 'Solax Power', tag: 'Hybrid', desc: 'Advanced hybrid inverters with built-in battery management.' },
    { name: 'Dyness', tag: 'Storage', desc: 'LiFePO4 battery systems with 6000+ cycle life guarantee.' },
    { name: 'Canadian Solar', tag: 'Panels', desc: "One of world's largest solar panel manufacturers, Tier 1 certified." },
    { name: 'Solis', tag: 'Smart Energy', desc: 'Smart energy management with high-efficiency inverter solutions.' },
  ],
};

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-[1.4rem] p-6 border border-slate-100 shadow-sm hover:shadow-[0_20px_45px_rgba(21,128,61,0.10)] hover:border-green-200 transition-all duration-300 flex flex-col"
    >
      {product.tag && (
        <span className="inline-block self-start bg-green-100 text-green-800 text-[11px] font-bold px-3 py-1 rounded-full mb-4">
          {product.tag}
        </span>
      )}
      <p className="text-green-700 text-[11px] font-bold uppercase tracking-widest mb-1">{product.brand || product.name}</p>
      <h3 className="text-lg font-bold text-slate-900 mb-3">{product.name || product.desc}</h3>

      {product.sizes && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((size) => (
            <span key={size} className="px-3 py-1 text-xs rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              {size}
            </span>
          ))}
        </div>
      )}

      {product.features && (
        <ul className="space-y-2 mb-5">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {product.desc && !product.features && (
        <p className="text-slate-600 text-sm mb-5 leading-relaxed">{product.desc}</p>
      )}

      {/* CTA — takes visitors to the quote form */}
      <a
        href="#contact"
        className="mt-auto w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
      >
        Get Quote <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('inverters');

  return (
    <section id="products" className="relative section-shell bg-[#f7faf5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — left aligned like the concept */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
              Our Products
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">
              High Quality <span className="text-green-700">Solar Solutions</span>
            </h2>
            <p className="text-slate-600 text-sm lg:text-base max-w-xl">
              We offer premium solar panels, inverters, batteries and accessories from trusted global brands.
            </p>
          </div>
          <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 whitespace-nowrap">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-green-700 text-white shadow-md shadow-green-700/25'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-green-700 hover:border-green-300'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid — ALL categories stay in the DOM (hidden when inactive)
            so search engines can crawl the full product catalog. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" aria-live="polite">
          {Object.entries(products).map(([categoryId, productList]) => (
            <div
              key={categoryId}
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch col-span-full ${
                activeCategory === categoryId ? '' : 'hidden'
              }`}
            >
              {productList.map((product, i) => (
                <ProductCard key={`${categoryId}-${product.name || i}`} product={product} index={i} />
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mt-12 rounded-[2rem] border border-green-100 bg-green-50 p-8 sm:p-10"
        >
          <p className="text-slate-600 mb-4">Can't find what you need? Contact us for custom solutions.</p>
          <a
            href="#contact"
            className="inline-flex bg-green-700 hover:bg-green-800 px-8 py-3 rounded-xl text-white font-bold transition-colors"
          >
            Request Custom Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
