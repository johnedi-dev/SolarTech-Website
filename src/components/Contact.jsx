import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+92 301 5935 773',
    link: 'tel:+923015935773',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'WhatsApp',
    value: '+92 301 5935 773',
    link: 'https://wa.me/923015935773',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'info@solartech.pk',
    link: 'mailto:info@solartech.pk',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Lahore, Pakistan',
    link: 'https://www.google.com/maps/search/?api=1&query=SolarTech+Energy+Solutions+Lahore',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Working Hours',
    value: 'Mon-Sat: 9am - 7pm',
    link: null,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

const systemSizes = ['3kW', '5kW', '6kW', '8kW', '10kW', '12kW', '15kW', '20kW+'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', systemSize: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="relative section-shell bg-slate-50">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-orange-500/5 blur-xl pointer-events-none"></div>

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
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Contact Us</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Get Your{' '}
            <span className="gradient-text">Free Quote</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Fill in the form below and our solar experts will get back to you within 2 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-5"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h3>

            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-slate-200 hover:border-orange-500/30 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 ${info.bg} rounded-lg flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{info.label}</p>
                      <p className="text-gray-500 font-semibold mt-0.5">{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-slate-200">
                    <div className={`w-10 h-10 ${info.bg} rounded-lg flex items-center justify-center ${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{info.label}</p>
                      <p className="text-white font-semibold mt-0.5">{info.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/923015935773?text=Hi! I'm interested in solar installation."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500/20 transition-all duration-300 mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp Now
            </motion.a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass-dark rounded-[2rem] p-8 border border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.1)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Quote Request Sent!</h3>
                  <p className="text-slate-600 max-w-sm">
                    Thank you! Our solar expert will contact you within 2 hours with a customized quote.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Muhammad Ali"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 000 0000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Location / City *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Lahore, Karachi, Islamabad..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">System Size (kW)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {systemSizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setForm({ ...form, systemSize: size })}
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            form.systemSize === size
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-orange-500/30 hover:text-orange-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your energy requirements, current bills, property type..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Free Quote
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-500 text-xs">
                    🔒 Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
