import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Zap, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'react-scroll';

export default function SavingsCalculator() {
  const [bill, setBill] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const monthlyBill = parseFloat(bill);
    if (!monthlyBill || monthlyBill <= 0) return;

    const savings = monthlyBill * 0.8;
    const annualSavings = savings * 12;
    const systemCost = Math.ceil(monthlyBill / 5000) * 150000;
    const roi = Math.round((systemCost / annualSavings) * 10) / 10;
    const co2 = Math.round(((annualSavings / 1200) * 0.82) * 10) / 10;
    const systemKw = Math.ceil(monthlyBill / 5000);

    setResult({ savings, annualSavings, roi, co2, systemCost, systemKw });
  };

  return (
    <section id="calculator" className="relative py-24 bg-slate-50 border-t border-slate-200">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-orange-500"></div>
            <span className="text-orange-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">Solar ROI Calculator</span>
            <div className="w-8 h-0.5 bg-orange-500"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3">
            Calculate Your <span className="gradient-text">Solar Savings</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Enter your average monthly electricity bill to calculate estimated bill savings & system capacity.
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">
                Monthly Electricity Bill (Rs.)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 font-bold text-lg">Rs.</span>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full pl-14 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-lg font-bold focus:outline-none focus:border-amber-300 transition-colors"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={calculate}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-white" />
                <span>Calculate</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-slate-500 self-center mr-2">Presets:</span>
            {['15000', '30000', '50000', '80000', '120000'].map((v) => (
              <button
                key={v}
                onClick={() => setBill(v)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  bill === v
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'glass border border-slate-200 text-slate-600 hover:border-amber-300/40 hover:text-amber-600'
                }`}
              >
                Rs. {parseInt(v).toLocaleString()}
              </button>
            ))}
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-200 pt-8"
            >
              <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Estimated Solar Benefits Breakdown</span>
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: <TrendingDown className="w-5 h-5 text-green-400" />, label: 'Monthly Savings', value: `Rs. ${Math.round(result.savings).toLocaleString()}`, color: 'text-green-400', bg: 'bg-green-500/10' },
                  { icon: <DollarSign className="w-5 h-5 text-orange-400" />, label: 'Annual Savings', value: `Rs. ${Math.round(result.annualSavings).toLocaleString()}`, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { icon: <Zap className="w-5 h-5 text-blue-400" />, label: 'Payback Period', value: `${result.roi} Years`, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { icon: <span className="text-lg">🌿</span>, label: 'CO₂ Reduced', value: `${result.co2} Tons/yr`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4 border border-white/5 text-center">
                    <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      {item.icon}
                    </div>
                    <div className={`text-xl font-black ${item.color} mb-1`}>{item.value}</div>
                    <div className="text-slate-500 text-xs font-medium">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-orange-200">
                    🎯 <strong>Recommended System Size:</strong> ~{result.systemKw} kW System setup.
                  </p>
                  <p className="text-xs text-slate-500">
                    Estimated Turnkey Investment: <strong className="text-slate-900">Rs. {Math.round(result.systemCost).toLocaleString()}</strong>
                  </p>
                </div>
                <Link to="contact" smooth={true} offset={-80} duration={600}>
                  <button className="btn-primary px-5 py-2.5 rounded-lg text-white font-bold text-xs shadow-md whitespace-nowrap cursor-pointer">
                    Book Survey
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
