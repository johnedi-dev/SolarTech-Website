import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Sun, Zap, BatteryCharging, Calculator, FileSpreadsheet, Plus, Trash2,
  Lightbulb, Fan, Refrigerator, Snowflake, Tv, Wifi, Monitor, Microwave,
  WashingMachine, Gamepad2, Waves, ShowerHead, AirVent, Thermometer,
  Speaker, Cctv, CookingPot, Plug, PlugZap, Sparkles, TrendingDown,
  CircleDollarSign, ArrowLeft, Info, RotateCcw, CheckCircle2, CalendarRange,
  Gauge, SunMedium, Layers, Search,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Catalog of common home appliances (wattages = typical market values) */
/* ------------------------------------------------------------------ */
const CATALOG = [
  { key: 'led-bulb', name: 'LED Bulb', group: 'Lighting', watts: 12, hours: 5, icon: Lightbulb },
  { key: 'led-tube', name: 'LED Tube Light', group: 'Lighting', watts: 20, hours: 6, icon: Lightbulb },
  { key: 'ceiling-fan', name: 'Ceiling Fan', group: 'Cooling', watts: 80, hours: 10, icon: Fan, summer: true },
  { key: 'inverter-ac-1t', name: 'Inverter AC 1.0 Ton', group: 'Cooling', watts: 900, hours: 8, icon: AirVent, summer: true },
  { key: 'inverter-ac-15t', name: 'Inverter AC 1.5 Ton', group: 'Cooling', watts: 1300, hours: 8, icon: AirVent, summer: true },
  { key: 'inverter-ac-2t', name: 'Inverter AC 2.0 Ton', group: 'Cooling', watts: 1700, hours: 8, icon: AirVent, summer: true },
  { key: 'noninv-ac-15t', name: 'Non-Inverter AC 1.5 Ton', group: 'Cooling', watts: 1800, hours: 8, icon: AirVent, summer: true },
  { key: 'air-cooler', name: 'Air Cooler', group: 'Cooling', watts: 200, hours: 8, icon: Thermometer, summer: true },
  { key: 'exhaust-fan', name: 'Exhaust Fan', group: 'Cooling', watts: 60, hours: 4, icon: Fan },
  { key: 'fridge', name: 'Refrigerator (Inverter)', group: 'Kitchen', watts: 150, hours: 24, icon: Refrigerator },
  { key: 'freezer', name: 'Deep Freezer', group: 'Kitchen', watts: 250, hours: 24, icon: Snowflake },
  { key: 'microwave', name: 'Microwave Oven', group: 'Kitchen', watts: 1200, hours: 0.3, icon: Microwave },
  { key: 'kettle', name: 'Electric Kettle', group: 'Kitchen', watts: 1500, hours: 0.2, icon: CookingPot },
  { key: 'blender', name: 'Blender / Juicer', group: 'Kitchen', watts: 300, hours: 0.2, icon: CookingPot },
  { key: 'dispenser', name: 'Water Dispenser (Hot & Cold)', group: 'Kitchen', watts: 500, hours: 6, icon: CookingPot },
  { key: 'washing', name: 'Washing Machine', group: 'Laundry', watts: 800, hours: 1.5, icon: WashingMachine },
  { key: 'iron', name: 'Clothes Iron', group: 'Laundry', watts: 1200, hours: 1, icon: PlugZap },
  { key: 'vacuum', name: 'Vacuum Cleaner', group: 'Laundry', watts: 1000, hours: 1, icon: Sparkles },
  { key: 'tv', name: 'LED TV (55")', group: 'Electronics', watts: 100, hours: 5, icon: Tv },
  { key: 'tv-large', name: 'Smart TV (75")', group: 'Electronics', watts: 180, hours: 5, icon: Tv },
  { key: 'desktop', name: 'Desktop PC', group: 'Electronics', watts: 250, hours: 5, icon: Monitor },
  { key: 'laptop', name: 'Laptop', group: 'Electronics', watts: 65, hours: 8, icon: Monitor },
  { key: 'console', name: 'Gaming Console', group: 'Electronics', watts: 180, hours: 3, icon: Gamepad2 },
  { key: 'router', name: 'Wi-Fi Router', group: 'Electronics', watts: 12, hours: 24, icon: Wifi },
  { key: 'cctv', name: 'Security Camera & DVR', group: 'Electronics', watts: 25, hours: 24, icon: Cctv },
  { key: 'speaker', name: 'Sound System', group: 'Electronics', watts: 100, hours: 3, icon: Speaker },
  { key: 'pump-1hp', name: 'Water Pump 1 HP', group: 'Water & Utility', watts: 750, hours: 1.5, icon: Waves },
  { key: 'pump-half', name: 'Water Pump 0.5 HP', group: 'Water & Utility', watts: 400, hours: 1.5, icon: Waves },
  { key: 'geyser', name: 'Electric Geyser', group: 'Water & Utility', watts: 2000, hours: 2, icon: ShowerHead, winter: true },
  { key: 'motor-pump', name: 'Pressure Motor', group: 'Water & Utility', watts: 550, hours: 1, icon: Plug },
];

const DEFAULT_ITEMS = [
  { uid: 1, key: 'led-bulb', name: 'LED Bulb', watts: 12, qty: 8, hours: 5, icon: Lightbulb },
  { uid: 2, key: 'ceiling-fan', name: 'Ceiling Fan', watts: 80, qty: 3, hours: 10, icon: Fan },
  { uid: 3, key: 'fridge', name: 'Refrigerator (Inverter)', watts: 150, qty: 1, hours: 24, icon: Refrigerator },
  { uid: 4, key: 'tv', name: 'LED TV (55")', watts: 100, qty: 1, hours: 5, icon: Tv },
  { uid: 5, key: 'router', name: 'Wi-Fi Router', watts: 12, qty: 1, hours: 24, icon: Wifi },
];

/* ------------------------------------------------------------------ */
/* Sizing constants & helpers                                          */
/* ------------------------------------------------------------------ */
const PERF_RATIO = 0.78;   // inverter + wiring + soiling + temperature losses (~22%)
const DIVERSITY = 0.85;    // not everything runs fully at the same moment
const INVERTER_SIZES = [1.2, 1.5, 2, 2.5, 3, 3.2, 4, 5, 6, 6.2, 8, 10, 12, 15, 20];
const PANEL_WATTS = [550, 585, 600, 650];
const TUBULAR_UNIT_KWH = 2.22;   // one 12V 185Ah battery
const LITHIUM_MODULE_KWH = 5.12; // one 48V 100Ah pack
const COST = { panelW: 35, invKw: 50000, lithKwh: 40000, tubKwh: 15500, bosPct: 0.12 };

const snapUp = (v) => INVERTER_SIZES.find((s) => s >= v - 1e-9) ?? Math.ceil(v);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const num = (s) => (s === '' || s === null || s === undefined ? 0 : parseFloat(s) || 0);
const fmt = (n, d = 0) => n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
const rs = (n) => `Rs. ${fmt(Math.round(n))}`;

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
function NumInput({ label, value, onChange, min = 0, max = 1000000, step = 1, suffix }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</span>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            if (e.target.value === '') return onChange('');
            onChange(clamp(parseFloat(e.target.value) || 0, min, max));
          }}
          className={`w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 text-slate-900 font-semibold text-sm focus:outline-none focus:border-amber-300 transition-colors ${suffix ? 'pr-10 pl-3' : 'px-3'}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">{suffix}</span>}
      </div>
    </label>
  );
}

function StatChip({ icon, label, value }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/10">
      <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-slate-900 font-black text-base sm:text-lg leading-tight truncate">{value}</div>
        <div className="text-slate-500 text-[10px] sm:text-xs font-medium">{label}</div>
      </div>
    </div>
  );
}

function ResultCard({ icon, title, headline, sub, children, accent = 'bg-orange-500/10', accentText = 'text-orange-500' }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</div>
      </div>
      <div className={`text-2xl sm:text-3xl font-black ${accentText} mb-1`}>{headline}</div>
      {sub && <div className="text-xs text-slate-500 font-medium mb-2">{sub}</div>}
      {children && <div className="mt-3 border-t border-slate-200/70 pt-3 space-y-1.5 text-xs text-slate-600">{children}</div>}
    </div>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */
export default function SolarCalculatorPage() {
  const [tab, setTab] = useState('appliances');          // 'appliances' | 'bills'
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [unitsMax, setUnitsMax] = useState('');
  const [unitsMin, setUnitsMin] = useState('');
  const [tariff, setTariff] = useState('65');
  const [sunHours, setSunHours] = useState('5.5');
  const [backupHours, setBackupHours] = useState('4');
  const [panelWatt, setPanelWatt] = useState(585);
  const [batteryType, setBatteryType] = useState('lithium');

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');
  const [custom, setCustom] = useState({ name: '', watts: '', hours: '' });
  const [showResult, setShowResult] = useState(false);

  /* ---------------- appliance editors ---------------- */
  const updateItem = (uid, field, value) =>
    setItems((prev) => prev.map((i) => (i.uid === uid ? { ...i, [field]: value } : i)));

  const removeItem = (uid) => setItems((prev) => prev.filter((i) => i.uid !== uid));

  const addFromCatalog = (c) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.key === c.key);
      if (existing) return prev.map((i) => (i.key === c.key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { uid: Date.now() + Math.random(), key: c.key, name: c.name, watts: c.watts, qty: 1, hours: c.hours, icon: c.icon }];
    });
  };

  const addCustom = () => {
    const watts = num(custom.watts);
    const hours = clamp(num(custom.hours) || 1, 0.1, 24);
    if (!custom.name.trim() || watts <= 0) return;
    setItems((prev) => [
      ...prev,
      { uid: Date.now() + Math.random(), key: `custom-${Date.now()}`, name: custom.name.trim(), watts, qty: 1, hours, icon: Plug },
    ]);
    setCustom({ name: '', watts: '', hours: '' });
  };

  const reset = () => {
    setItems(DEFAULT_ITEMS);
    setUnitsMax('');
    setUnitsMin('');
    setShowResult(false);
  };

  /* ---------------- live load summary ---------------- */
  const summary = useMemo(() => {
    const dailyWh = items.reduce((s, i) => s + i.watts * i.qty * clamp(num(i.hours), 0, 24), 0);
    const peakW = items.reduce((s, i) => s + i.watts * i.qty, 0) * DIVERSITY;
    return {
      dailyKwh: dailyWh / 1000,
      unitsPerMonth: (dailyWh * 30) / 1000,
      peakKw: peakW / 1000,
      count: items.reduce((s, i) => s + i.qty, 0),
    };
  }, [items]);

  /* ---------------- sizing engine ---------------- */
  const res = useMemo(() => {
    const hasBills = num(unitsMax) > 0 || num(unitsMin) > 0;
    const billAvg =
      num(unitsMax) > 0 && num(unitsMin) > 0 ? (num(unitsMax) + num(unitsMin)) / 2 : Math.max(num(unitsMax), num(unitsMin));

    const useBills = tab === 'bills' && billAvg > 0;
    const designUnits = useBills ? billAvg : summary.unitsPerMonth;
    if (designUnits <= 0) return null;

    const sun = clamp(num(sunHours) || 5.5, 3, 8);
    const dailyKwhDesign = designUnits / 30;

    // PV array: daily energy ÷ (peak sun hours × performance ratio)
    const pvKw = dailyKwhDesign / (sun * PERF_RATIO);
    const panelCount = Math.max(1, Math.ceil((pvKw * 1000) / panelWatt));
    const arrayKw = (panelCount * panelWatt) / 1000;

    // Inverter: peak running load × 25% headroom; must also process the array (hybrid) and supply avg load
    const avgLoadW = (dailyKwhDesign * 1000) / 24;
    const inverterKw = snapUp(Math.max(summary.peakKw * 1.25, arrayKw / 1.6, avgLoadW / 900 + 0.6));

    // Battery bank: average load × backup hours, corrected for efficiency & depth-of-discharge
    const backup = clamp(num(backupHours), 0, 24);
    let battery = null;
    if (backup > 0) {
      const storeWh = (avgLoadW * backup) / 0.9; // energy through inverter (~90% eff.)
      if (batteryType === 'lithium') {
        const nameplateKwh = storeWh / 0.9 / 1000;          // LiFePO4 DoD 90%
        battery = {
          nameplateKwh,
          modules: Math.max(1, Math.ceil(nameplateKwh / LITHIUM_MODULE_KWH)),
          label: `Lithium — ${Math.max(1, Math.ceil(nameplateKwh / LITHIUM_MODULE_KWH))} × 48V/100Ah LiFePO4`,
        };
      } else {
        const battVoltage = summary.peakKw > 3 ? 48 : 24;
        const perString = battVoltage / 12;
        const strings = Math.max(1, Math.ceil((storeWh / 0.5 / 1000) / TUBULAR_UNIT_KWH / perString));
        battery = {
          nameplateKwh: (strings * perString * TUBULAR_UNIT_KWH),
          perString,
          strings,
          voltage: battVoltage,
          label: `12V/185Ah tubular batteries (strings of ${perString} in series @ ${battVoltage}V)`,
        };
      }
    }

    // Night-load sanity check vs total daily usage
    const nightShare = backup > 0 && dailyKwhDesign > 0 ? (avgLoadW * backup) / 1000 / dailyKwhDesign : 0;

    // Cost estimate (PKR, indicative street rates)
    const panelsCost = arrayKw * 1000 * COST.panelW;
    const inverterCost = inverterKw * COST.invKw;
    const batteryCost = battery
      ? batteryType === 'lithium'
        ? battery.nameplateKwh * COST.lithKwh
        : battery.nameplateKwh * COST.tubKwh
      : 0;
    const bosCost = (panelsCost + inverterCost) * COST.bosPct;
    const totalCost = panelsCost + inverterCost + batteryCost + bosCost;

    // Savings / payback (≈90% of monthly units offset via net metering)
    const T = clamp(num(tariff) || 65, 1, 500);
    const monthlySave = designUnits * T * 0.9;
    const annualSave = monthlySave * 12;
    const payback = annualSave > 0 ? totalCost / annualSave : 0;
    const co2 = (designUnits * 12 * 0.57) / 1000; // tons/yr, grid factor ~0.57 kg CO₂/kWh
    const roofSqft = panelCount * 29;

    return { hasBills, billAvg, designUnits, dailyKwhDesign, sun, pvKw, panelCount, arrayKw, inverterKw, battery, avgLoadW, backup, nightShare, panelsCost, inverterCost, batteryCost, bosCost, totalCost, T, monthlySave, annualSave, payback, co2, roofSqft };
  }, [tab, items, unitsMin, unitsMax, tariff, sunHours, backupHours, panelWatt, batteryType, summary]);

  const filteredCatalog = CATALOG.filter(
    (c) =>
      c.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
      c.group.toLowerCase().includes(pickerSearch.toLowerCase())
  );
  const groups = [...new Set(filteredCatalog.map((c) => c.group))];

  /* ================================================================ */
  return (
    <div className="bg-slate-50">
      {/* ---------- Page header ---------- */}
      <section className="relative overflow-hidden border-b border-slate-200 section-gradient">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-orange-500" />
            <span className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-widest">Free Load &amp; Sizing Tool</span>
            <div className="w-8 h-0.5 bg-orange-500" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            Solar <span className="gradient-text">Load Calculator</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            List the appliances you use at home (or enter your bill units) and get an instant, item-wise estimate of the
            <strong className="text-slate-800"> solar panels, inverter and batteries</strong> your home actually needs — measured in
            <strong className="text-slate-800"> kWh and units</strong>.
          </p>
        </div>
      </section>

      {/* ---------- Input section ---------- */}
      <section className="relative py-10 sm:py-14">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-dark rounded-3xl p-5 sm:p-8 border border-white/10 shadow-2xl">
            {/* Method tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {[
                { id: 'appliances', label: 'Appliance Method', icon: Calculator, hint: 'List every appliance with its usage hours — we compute kW/h, monthly units and peak load automatically.' },
                { id: 'bills', label: 'Bill / Units Method', icon: FileSpreadsheet, hint: 'Use your highest & lowest monthly units from recent bills — the bill average sizes the system.' },
              ].map((t) => {
                const TIcon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      tab === t.id ? 'btn-primary text-white shadow-md' : 'glass border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300/40'
                    }`}
                  >
                    <TIcon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs text-slate-500 mb-8 flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 text-orange-400" />
              {tab === 'appliances'
                ? 'Add every appliance you run at home. Change wattages, quantities and hours to match your real usage.'
                : 'Enter your highest (summer) and lowest (winter) monthly units from electricity bills — covers seasonal variation automatically.'}
            </p>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* ================= Left: inputs ================= */}
              <div className="lg:col-span-3 space-y-6">
                {tab === 'bills' && (
                  <div className="glass rounded-2xl p-5 border border-white/10">
                    <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-orange-500" /> Monthly Units from Bills
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-4">Check your past bills — enter the highest &amp; lowest months for maximum accuracy. 1 unit = 1 kWh.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <NumInput label="Max Units / Month (Summer)" value={unitsMax} onChange={setUnitsMax} suffix="units" />
                      <NumInput label="Min Units / Month (Winter)" value={unitsMin} onChange={setUnitsMin} suffix="units" />
                    </div>
                    {num(unitsMax) > 0 && num(unitsMin) > 0 && (
                      <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                        <CalendarRange className="w-4 h-4 shrink-0" />
                        Bill average: <strong>{fmt((num(unitsMax) + num(unitsMin)) / 2)} units/month</strong> (range {fmt(num(unitsMin))} – {fmt(num(unitsMax))})
                      </div>
                    )}
                  </div>
                )}

                {/* Appliance editor */}
                <div className="glass rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <PlugZap className="w-4 h-4 text-orange-500" /> Home Appliances
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">{summary.count} items running</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4">
                    {tab === 'bills' ? 'Optional — but improves peak-load, inverter & battery accuracy.' : 'Correct the wattage of each device if you know it.'}
                  </p>

                  {/* rows */}
                  <div className="space-y-3 max-h-[430px] overflow-y-auto pr-1">
                    {items.map((i) => {
                      const Icon = i.icon || Plug;
                      const wh = (i.watts * i.qty * clamp(num(i.hours), 0, 24)) / 1000;
                      return (
                        <div key={i.uid} className="glass rounded-xl p-3 border border-white/10">
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-orange-500" />
                              </div>
                              <span className="text-sm font-semibold text-slate-800 truncate">{i.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md whitespace-nowrap">{fmt(wh, 1)} kWh/day</span>
                              <button onClick={() => removeItem(i.uid)} className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 hover:bg-rose-500/20 transition-colors cursor-pointer" aria-label={`Remove ${i.name}`}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2.5">
                            <NumInput label="Watts" value={i.watts} onChange={(v) => updateItem(i.uid, 'watts', v)} suffix="W" />
                            <NumInput label="Qty" value={i.qty} onChange={(v) => updateItem(i.uid, 'qty', v)} min={0} max={99} />
                            <NumInput label="Hrs / Day" value={i.hours} onChange={(v) => updateItem(i.uid, 'hours', v)} min={0} max={24} step={0.5} suffix="h" />
                          </div>
                        </div>
                      );
                    })}
                    {items.length === 0 && (
                      <div className="text-center py-8 text-slate-400 text-sm">No appliances added yet — add some from the library below.</div>
                    )}
                  </div>

                  {/* add-appliance picker */}
                  <div className="mt-4">
                    <button
                      onClick={() => setPickerOpen((o) => !o)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-orange-300/60 text-orange-500 font-semibold text-sm hover:bg-orange-500/5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Appliance from Library
                    </button>

                    {pickerOpen && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 glass rounded-xl p-4 border border-white/10">
                        <div className="relative mb-3">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            value={pickerSearch}
                            onChange={(e) => setPickerSearch(e.target.value)}
                            placeholder="Search appliances…"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300"
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                          {groups.map((g) => (
                            <div key={g}>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{g}</div>
                              <div className="flex flex-wrap gap-2">
                                {filteredCatalog
                                  .filter((c) => c.group === g)
                                  .map((c) => {
                                    const CIcon = c.icon;
                                    return (
                                      <button key={c.key} onClick={() => addFromCatalog(c)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-slate-200 text-xs font-medium text-slate-700 hover:border-amber-300/50 hover:text-amber-600 transition-all cursor-pointer">
                                        <CIcon className="w-3.5 h-3.5 text-orange-400" />
                                        {c.name} <span className="text-slate-400">{c.watts}W</span>
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          ))}
                          {groups.length === 0 && <div className="text-xs text-slate-400 py-2">No matches — add it as a custom appliance below.</div>}
                        </div>

                        {/* custom appliance */}
                        <div className="mt-4 pt-4 border-t border-slate-200/70">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Custom Appliance</div>
                          <div className="grid grid-cols-1 sm:grid-cols-[1.4fr,6rem,6rem,auto] gap-2.5 items-end">
                            <label className="block">
                              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Name</span>
                              <input
                                value={custom.name}
                                onChange={(e) => setCustom((c) => ({ ...c, name: e.target.value }))}
                                placeholder="e.g. Aquarium Pump"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-300"
                              />
                            </label>
                            <NumInput label="Watts" value={custom.watts} onChange={(v) => setCustom((c) => ({ ...c, watts: v }))} suffix="W" />
                            <NumInput label="Hrs / Day" value={custom.hours} onChange={(v) => setCustom((c) => ({ ...c, hours: v }))} min={0} max={24} step={0.5} suffix="h" />
                            <button onClick={addCustom} className="btn-primary px-4 py-2.5 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer">
                              <Plus className="w-4 h-4" /> Add
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= Right: settings + live summary ================= */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  <StatChip icon={<Zap className="w-4 h-4 text-orange-500" />} label="Energy Usage" value={`${fmt(summary.dailyKwh, 1)} kWh / day`} />
                  <StatChip icon={<Gauge className="w-4 h-4 text-blue-500" />} label="Monthly Units (kWh)" value={fmt(summary.unitsPerMonth)} />
                  <StatChip icon={<SunMedium className="w-4 h-4 text-amber-500" />} label="Peak Load (85% diversity)" value={`${fmt(summary.peakKw, 1)} kW`} />
                </div>

                <div className="glass rounded-2xl p-5 border border-white/10 space-y-5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-orange-500" /> System Preferences
                  </h3>

                  {/* sun hours */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Peak Sun Hours / Day</span>
                      <span className="text-xs font-black text-orange-500">{fmt(clamp(num(sunHours) || 5.5, 3, 8), 1)}</span>
                    </div>
                    <input
                      type="range" min="3" max="8" step="0.5"
                      value={clamp(num(sunHours) || 5.5, 3, 8)}
                      onChange={(e) => setSunHours(e.target.value)}
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {[
                        { c: 'Lahore / Karachi', v: 5.7 },
                        { c: 'Punjab avg', v: 5.5 },
                        { c: 'Northern / Hilly', v: 4.8 },
                      ].map((p) => (
                        <button key={p.c} onClick={() => setSunHours(String(p.v))} className="px-2.5 py-1 rounded-md glass border border-slate-200 text-[10px] font-semibold text-slate-600 hover:text-amber-600 hover:border-amber-300/40 transition-all cursor-pointer">
                          {p.c} ({p.v})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* backup hours */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Night Backup Needed</span>
                      <span className="text-xs font-black text-orange-500">{num(backupHours)} hrs</span>
                    </div>
                    <input
                      type="range" min="0" max="12" step="0.5"
                      value={num(backupHours)}
                      onChange={(e) => setBackupHours(e.target.value)}
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">
                      {num(backupHours) === 0 ? 'On-grid only — no batteries included' : `Battery runs the average load for ${num(backupHours)} hrs after sunset`}
                    </div>
                  </div>

                  {/* tariff + panel watt / battery type */}
                  <div className="grid grid-cols-2 gap-3">
                    <NumInput label="Tariff" value={tariff} onChange={setTariff} suffix="Rs/u" />
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Panel Wattage</span>
                      <select
                        value={panelWatt}
                        onChange={(e) => setPanelWatt(parseInt(e.target.value))}
                        className="w-full glass border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-300 cursor-pointer"
                      >
                        {PANEL_WATTS.map((w) => (
                          <option key={w} value={w}>{w}W</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Battery Type</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'lithium', label: 'Lithium (LiFePO₄)', note: '90% usable · long life' },
                        { id: 'tubular', label: 'Tubular (Lead-Acid)', note: '50% usable · cheaper' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBatteryType(b.id)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                            batteryType === b.id ? 'btn-primary text-white shadow-sm' : 'glass border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300/40'
                          }`}
                        >
                          <span className="block">{b.label}</span>
                          <span className="block text-[9px] opacity-70 font-medium">{b.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowResult(true)}
                className="btn-primary px-10 py-4 rounded-2xl text-white font-bold text-base flex items-center gap-2.5 shadow-lg cursor-pointer"
              >
                <Calculator className="w-5 h-5" /> Calculate My Solar System
              </motion.button>
              <button onClick={reset} className="text-xs text-slate-500 hover:text-orange-500 flex items-center gap-1.5 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Results ---------- */}
      {showResult && res && (
        <section className="pb-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-8 h-0.5 bg-orange-500" />
                  <span className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-widest">Your Estimate</span>
                  <div className="w-8 h-0.5 bg-orange-500" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  Recommended <span className="gradient-text">System</span>
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-2">
                  Sized on{' '}
                  <strong className="text-slate-700">
                    {tab === 'bills' && res.billAvg > 0 ? `${fmt(res.billAvg)} bill units/month` : `${fmt(res.dailyKwhDesign, 1)} kWh/day (${fmt(summary.unitsPerMonth)} units/month)`}
                  </strong>{' '}
                  · {fmt(res.sun, 1)} sun hrs · tariff {fmt(res.T)} Rs/unit
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Array */}
                <ResultCard
                  icon={<Sun className="w-5 h-5 text-orange-500" />}
                  title="Solar Panel Array"
                  headline={`~${fmt(res.arrayKw, 1)} kW`}
                  sub={`Generation rating of the panel array`}
                >
                  <div className="flex justify-between"><span>Panels</span><strong className="text-slate-800">{res.panelCount} × {panelWatt}W</strong></div>
                  <div className="flex justify-between"><span>Roof space needed</span><strong className="text-slate-800">≈ {fmt(res.roofSqft)} sq ft</strong></div>
                  <div className="flex justify-between"><span>Covers</span><strong className="text-slate-800">{fmt(res.designUnits)} units/month</strong></div>
                </ResultCard>

                {/* Inverter */}
                <ResultCard
                  icon={<Zap className="w-5 h-5 text-blue-500" />}
                  accent="bg-blue-500/10"
                  accentText="text-blue-500"
                  title="Inverter (Hybrid)"
                  headline={`~${fmt(res.inverterKw, 1)} kW`}
                  sub="Continuous rating, 25% surge headroom"
                >
                  <div className="flex justify-between"><span>Your peak demand</span><strong className="text-slate-800">{fmt(summary.peakKw, 1)} kW</strong></div>
                  <div className="flex justify-between"><span>Battery bank voltage</span><strong className="text-slate-800">{res.battery && res.battery.voltage ? `${res.battery.voltage}V` : '48V'}</strong></div>
                  <div className="flex justify-between"><span>Type</span><strong className="text-slate-800">Hybrid / Grid-interactive</strong></div>
                </ResultCard>

                {/* Battery */}
                <ResultCard
                  icon={<BatteryCharging className="w-5 h-5 text-emerald-500" />}
                  accent="bg-emerald-500/10"
                  accentText="text-emerald-500"
                  title="Battery Bank"
                  headline={res.battery ? `~${fmt(res.battery.nameplateKwh, 1)} kWh` : 'No Battery'}
                  sub={res.battery ? res.battery.label : 'Set backup hours above if you need one'}
                >
                  {res.battery && (
                    <>
                      <div className="flex justify-between"><span>Usable energy</span><strong className="text-slate-800">{fmt(res.battery.nameplateKwh * (batteryType === 'lithium' ? 0.9 : 0.5), 1)} kWh</strong></div>
                      <div className="flex justify-between"><span>Runs average load for</span><strong className="text-slate-800">{res.backup} hrs (night)</strong></div>
                      <div className="flex justify-between"><span>Night share of daily use</span><strong className="text-slate-800">{fmt(res.nightShare * 100)}%</strong></div>
                    </>
                  )}
                </ResultCard>

                {/* Cost */}
                <ResultCard
                  icon={<CircleDollarSign className="w-5 h-5 text-orange-500" />}
                  title="Estimated Investment"
                  headline={rs(res.totalCost)}
                  sub="Turnkey · indicative market rates"
                >
                  <div className="flex justify-between"><span>Panels ({fmt(res.arrayKw, 1)} kW)</span><strong className="text-slate-800">{rs(res.panelsCost)}</strong></div>
                  <div className="flex justify-between"><span>Inverter ({fmt(res.inverterKw, 1)} kW)</span><strong className="text-slate-800">{rs(res.inverterCost)}</strong></div>
                  <div className="flex justify-between"><span>Batteries {res.battery ? `(${batteryType})` : ''}</span><strong className="text-slate-800">{res.battery ? rs(res.batteryCost) : '—'}</strong></div>
                  <div className="flex justify-between"><span>Structure, wiring &amp; install</span><strong className="text-slate-800">{rs(res.bosCost)}</strong></div>
                </ResultCard>

                {/* Savings */}
                <ResultCard
                  icon={<TrendingDown className="w-5 h-5 text-emerald-500" />}
                  accent="bg-emerald-500/10"
                  accentText="text-emerald-500"
                  title="Savings & Payback"
                  headline={`~${fmt(res.payback, 1)} yrs`}
                  sub="Return on your investment"
                >
                  <div className="flex justify-between"><span>Monthly bill savings</span><strong className="text-slate-800">{rs(res.monthlySave)}</strong></div>
                  <div className="flex justify-between"><span>Annual savings</span><strong className="text-slate-800">{rs(res.annualSave)}</strong></div>
                  <div className="flex justify-between"><span>Bill offset</span><strong className="text-slate-800">~90% (net metering)</strong></div>
                  <div className="flex justify-between"><span>CO₂ avoided</span><strong className="text-slate-800">{fmt(res.co2, 1)} tons/yr 🌿</strong></div>
                </ResultCard>

                {/* Cross-check */}
                <ResultCard
                  icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  accent="bg-blue-500/10"
                  accentText="text-blue-500"
                  title="Accuracy Cross-Check"
                  headline={res.hasBills ? `${fmt(Math.abs(summary.unitsPerMonth - res.billAvg))} units` : 'Bill Data'}
                  sub={res.hasBills ? 'Difference between both methods' : 'Add bill units for validation'}
                >
                  <div className="flex justify-between"><span>Appliance method</span><strong className="text-slate-800">{fmt(summary.unitsPerMonth)} units/mo</strong></div>
                  <div className="flex justify-between"><span>Bill average method</span><strong className="text-slate-800">{res.hasBills ? `${fmt(res.billAvg)} units/mo` : 'Not entered'}</strong></div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    {res.hasBills
                      ? summary.unitsPerMonth === 0
                        ? 'Add some appliances to compare both methods.'
                        : Math.abs(summary.unitsPerMonth - res.billAvg) < res.billAvg * 0.1
                        ? 'Great — both methods agree within 10%. Your estimate is reliable.'
                        : summary.unitsPerMonth > res.billAvg
                        ? 'Your appliance list suggests higher usage than your bills — re-check running hours & quantity.'
                        : 'Your bills show higher usage than the listed appliances — check for missing loads (ACs, geyser, pump).'
                      : 'For maximum accuracy, also enter your max & min monthly units from past bills in the Bill / Units Method tab.'}
                  </p>
                </ResultCard>
              </div>

              {/* Night-load tip */}
              {res.battery && res.nightShare > 0.4 && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-800 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>Tip:</strong> Night backup covers ~{fmt(res.nightShare * 100)}% of your total daily usage. Consider a slightly larger array — or reducing backup hours — so the panels can still fully recharge the batteries during the day.
                  </span>
                </div>
              )}

              {/* CTA banner */}
              <div className="mt-8 glass-dark rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    🎯 Recommended package: ~{fmt(res.arrayKw, 1)} kW panels · {fmt(res.inverterKw, 1)} kW inverter
                    {res.battery ? ` · ${fmt(res.battery.nameplateKwh, 1)} kWh battery bank` : ' · on-grid (no battery)'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Indicative estimate only — final sizing and net-metering quota are confirmed after a free site survey.</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://wa.me/923015935773?text=Hi!%20I%20calculated%20my%20load%20on%20your%20Solar%20Calculator%20and%20want%20a%20quote."
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #80C91B, #68A415)' }}
                  >
                    <FaWhatsapp className="w-4 h-4" /> Get Exact Quote on WhatsApp
                  </motion.a>
                  <a href="../#hero" className="glass border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm text-slate-700 flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                  </a>
                </div>
              </div>

              {/* Assumptions */}
              <details className="mt-6 glass rounded-xl border border-white/10">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-orange-500 transition-colors">
                  <Info className="w-4 h-4 text-orange-400" /> Calculation methodology &amp; assumptions
                </summary>
                <div className="px-5 pb-5 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p><strong className="text-slate-800">Energy (kWh &amp; units):</strong> each appliance contributes Watts × Qty × Hours/day. 1 unit of electricity = 1 kWh.</p>
                  <p><strong className="text-slate-800">Solar array:</strong> daily kWh ÷ (peak sun hours × 0.78 performance ratio — covers inverter, wiring, dust &amp; temperature losses).</p>
                  <p><strong className="text-slate-800">Peak load:</strong> sum of all connected watts × 0.85 diversity (not everything runs at full power simultaneously); the inverter is then upsized by 25% for motor surge and safety.</p>
                  <p><strong className="text-slate-800">Battery:</strong> average load × backup hours ÷ 0.9 inverter efficiency, ÷ chemistry depth-of-discharge (Lithium 90%, tubular 50%).</p>
                  <p><strong className="text-slate-800">Bill cross-check:</strong> bill average = (max + min) units ÷ 2. If both methods agree within 10%, the estimate is highly reliable; the difference highlights missing appliances or seasonal loads.</p>
                  <p><strong className="text-slate-800">Cost &amp; savings:</strong> indicative PKR street rates (Rs. {COST.panelW}/W panels, Rs. {fmt(COST.invKw)}/kW hybrid inverter, Rs. {fmt(COST.lithKwh)}/kWh lithium &amp; Rs. {fmt(COST.tubKwh)}/kWh tubular storage, plus 12% structure/wiring/install) — savings assume ~90% offset through net metering at your entered tariff.</p>
                  <p className="text-slate-400">Rates change frequently — request a formal quote for locked-in pricing.</p>
                </div>
              </details>
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------- How it works strip ---------- */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-5">
          {[
            { icon: Calculator, t: '1 · List or Enter', d: 'Add your appliances with hours of use — or simply enter the max & min units from your recent bills.' },
            { icon: Zap, t: '2 · We Calculate', d: 'Daily kWh, monthly units and peak demand are computed with real-world losses and diversity factors.' },
            { icon: SunMedium, t: '3 · Get a Sized System', d: 'Panels, hybrid inverter, battery bank, roof area, cost estimate, payback and CO₂ savings — instantly.' },
          ].map((s) => {
            const SIcon = s.icon;
            return (
              <div key={s.t} className="glass rounded-2xl p-6 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-3">
                  <SIcon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.t}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.d}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
