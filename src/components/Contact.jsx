import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Info, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: <Phone className="w-4 h-4" />,
    label: 'Call Us',
    value: '+92 301 5935 773',
    sub: 'Call or WhatsApp',
    link: 'tel:+923015935773',
    bg: 'bg-green-100',
    color: 'text-green-700',
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    label: 'WhatsApp',
    value: 'Chat with our team',
    sub: 'Quick replies, quotes & support',
    link: 'https://wa.me/923015935773',
    bg: 'bg-emerald-100',
    color: 'text-emerald-600',
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: 'Email',
    value: 'info@solartech.pk',
    sub: 'Send us an email',
    link: 'mailto:info@solartech.pk',
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: 'Our Office',
    value: 'Faisalabad, Punjab',
    sub: 'Visit our office',
    link: null,
    bg: 'bg-amber-100',
    color: 'text-amber-600',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative section-shell bg-[#f7faf5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
              Let's Build a <span className="text-green-700">Greener Future</span> Together
            </h2>
            <p className="text-slate-600 text-sm lg:text-base mt-3 max-w-xl">
              Have questions or need a custom quote? We're here to help — reach out any time.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Info + map card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-4">
              {contactInfo.map((info, i) => {
                const Inner = (
                  <>
                    <div className={`w-10 h-10 rounded-full ${info.bg} flex items-center justify-center ${info.color} shrink-0`}>
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{info.label}</p>
                      <p className="text-slate-800 font-bold text-sm mt-0.5">{info.value}</p>
                      <p className="text-slate-400 text-[11px]">{info.sub}</p>
                    </div>
                  </>
                );
                return info.link ? (
                  <a
                    key={i}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-green-50/60 transition-colors"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-2xl">
                    {Inner}
                  </div>
                );
              })}
            </div>

            {/* Office map card */}
            <div className="mt-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" /> Our Office
                </p>
                <p className="text-xs text-slate-500 mt-1">Faisalabad, Punjab, Pakistan — serving all major cities nationwide.</p>
              </div>
              <div className="w-24 h-20 rounded-2xl bg-green-50 border border-green-100 relative overflow-hidden shrink-0">
                {/* simple stylized "map" */}
                <div className="absolute inset-0 opacity-60" style={{
                  backgroundImage: 'linear-gradient(rgba(21,128,61,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(21,128,61,.12) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                }} />
                <MapPin className="absolute w-6 h-6 text-green-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-green-200" />
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 text-sm max-w-sm">
                    Thank you! Our solar expert will contact you within 2 hours with a customized quote.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-green-700 hover:bg-green-800 px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                    />
                  </div>
                  <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> Your information is secure and will never be shared with third parties.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-700 hover:bg-green-800 py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2.5 transition-colors disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
