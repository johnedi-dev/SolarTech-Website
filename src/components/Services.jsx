import { motion } from 'framer-motion';
import { Home, Building2, Factory, Wrench, ShieldCheck, PhoneCall, Calculator, Plug } from 'lucide-react';

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Residential Solar',
    desc: 'Complete home solar installations tailored to your household energy needs and roof type.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'hover:border-orange-500/50',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Commercial Solar',
    desc: 'Scalable commercial systems for offices, plazas, and retail businesses.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/50',
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: 'Industrial Solar',
    desc: 'High-capacity solar power plants for factories and industrial setups.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'hover:border-purple-500/50',
  },
  {
    icon: <Calculator className="w-8 h-8" />,
    title: 'Energy Audit',
    desc: 'Professional energy assessment to determine the optimal system size for your needs.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'hover:border-amber-500/50',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'AMC & Maintenance',
    desc: 'Annual maintenance contracts ensuring peak performance of your solar system.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'hover:border-green-500/50',
  },
  {
    icon: <Plug className="w-8 h-8" />,
    title: 'Net Metering',
    desc: 'Complete net metering setup with WAPDA/DISCO for selling surplus energy back to the grid.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'hover:border-cyan-500/50',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Warranty Support',
    desc: '10-year comprehensive warranty with dedicated after-sales technical support.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'hover:border-rose-500/50',
  },
  {
    icon: <PhoneCall className="w-8 h-8" />,
    title: '24/7 Support',
    desc: 'Round-the-clock customer support and remote monitoring for all installed systems.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'hover:border-teal-500/50',
  },
];

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'We assess your energy needs and site conditions.' },
  { step: '02', title: 'Custom Design', desc: 'Our engineers design the optimal solar system for you.' },
  { step: '03', title: 'Installation', desc: 'Professional installation by certified technicians.' },
  { step: '04', title: 'Go Solar!', desc: 'Start saving immediately with your new solar system.' },
];

export default function Services() {
  return (
    <section id="services" className="relative section-shell section-gradient overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/3 blur-3xl"></div>

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
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Complete Solar{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From consultation to installation and beyond — we handle everything for your solar journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group glass rounded-[1.6rem] p-7 h-full border border-slate-200 ${service.border} transition-all duration-300 card-hover cursor-pointer`}
            >
              <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-5 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-black mb-3">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-600">Your solar journey in 4 simple steps</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 opacity-30"></div>

          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-5 glow-orange">
                <span className="text-2xl font-black text-white">{step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
