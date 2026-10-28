import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Sun, Zap, BatteryCharging, Calculator, FileSpreadsheet, Plus, Trash2,
  Lightbulb, Fan, Refrigerator, Snowflake, Tv, Wifi, Monitor, Microwave,
  WashingMachine, Gamepad2, Waves, ShowerHead, AirVent, Thermometer,
  Speaker, Cctv, CookingPot, Plug, PlugZap, Sparkles, TrendingDown,
  CircleDollarSign, ArrowRight, ArrowLeft, Info, RotateCcw, CheckCircle2,
  CalendarRange, Gauge, Moon, Search, ChevronDown, ShieldCheck, Battery,
  ClipboardList, Home,
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
  { uid: 1, key: 'led-bulb', name: 'LED Bulb', group: 'Lighting', watts: 12, qty: 8, hours: 5, icon: Lightbulb },
  { uid: 2, key: 'ceiling-fan', name: 'Ceiling Fan', group: 'Cooling', watts: 80, qty: 3, hours: 10, icon: Fan },
  { uid: 3, key: 'fridge', name: 'Refrigerator (Inverter)', group: 'Kitchen', watts: 150, qty: 1, hours: 24, icon: Refrigerator },
  { uid: 4, key: 'tv', name: 'LED TV (55")', group: 'Electronics', watts: 100, qty: 1, hours: 5, icon: Tv },
  { uid: 5, key: 'router', name: 'Wi-Fi Router', group: 'Electronics', watts: 12, qty: 1, hours: 24, icon: Wifi },
];

const GROUP_ICONS = {
  Lighting: Lightbulb,
  Cooling: Fan,
  Kitchen: Refrigerator,
  Laundry: WashingMachine,
  Electronics: Tv,
  'Water & Utility': Waves,
};

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
          className={`w-full bg-white border border-slate-200 rounded-lg py-2.5 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all ${suffix ? 'pr-10 pl-3' : 'px-3'}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">{suffix}</span>}
      </div>
    </label>
  );
}

/* Compact inline number cell used in the appliance table rows */
function CellInput({ value, onChange, min = 0, max = 1000000, step = 1 }) {
  return (
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
      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-900 text-center focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
    />
  );
}

function StatBox({ icon: Icon, iconBg, label, value, unit }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 min-w-0">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-slate-500 text-[11px] font-semibold">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-black text-slate-900">{value}</span>
        {unit && <span className="text-[10px] font-semibold text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, iconWrap, accentText, tint = 'bg-white border-slate-200', title, headline, sub, children }) {
  return (
    <div className={`${tint} rounded-2xl p-5 border shadow-sm`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconWrap}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <ArrowRight className="w-4 h-4 text-slate-300 ml-auto rotate-[-45deg]" />
      </div>
      <div className={`text-2xl sm:text-3xl font-black ${accentText} mb-1`}>{headline}</div>
      {sub && <div className="text-xs text-slate-500 font-medium mb-1">{sub}</div>}
      {children && <div className="mt-3 border-t border-slate-200/70 pt-3 space-y-1.5 text-xs text-slate-600">{children}</div>}
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div className="flex justify-between gap-2">
      <span>{label}</span>
      <strong className="text-slate-800 text-right">{value}</strong>
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

  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategory, setPickerCategory] = useState('All');
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({ name: '', watts: '', hours: '' });
  const [showResult, setShowResult] = useState(false);
  const [libOpen, setLibOpen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  const resultsRef = useRef(null);

  /* ---------------- appliance editors ---------------- */
  const updateItem = (uid, field, value) =>
    setItems((prev) => prev.map((i) => (i.uid === uid ? { ...i, [field]: value } : i)));

  const removeItem = (uid) => setItems((prev) => prev.filter((i) => i.uid !== uid));

  const addFromCatalog = (c) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.key === c.key);
      if (existing) return prev.map((i) => (i.key === c.key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { uid: Date.now() + Math.random(), key: c.key, name: c.name, group: c.group, watts: c.watts, qty: 1, hours: c.hours, icon: c.icon }];
    });
  };

  const addCustom = () => {
    const watts = num(custom.watts);
    const hours = clamp(num(custom.hours) || 1, 0.1, 24);
    if (!custom.name.trim() || watts <= 0) return;
    setItems((prev) => [
      ...prev,
      { uid: Date.now() + Math.random(), key: `custom-${Date.now()}`, name: custom.name.trim(), group: 'Custom', watts, qty: 1, hours, icon: Plug },
    ]);
    setCustom({ name: '', watts: '', hours: '' });
    setCustomOpen(false);
    closeLibOnMobile();
  };

  /* Library open/close helpers: on mobile the picker lives in a bottom
     sheet, so we close it after an action to reveal the updated list. */
  const closeLibOnMobile = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 1024px)').matches) setLibOpen(false);
  };

  const pickFromCatalog = (c) => {
    addFromCatalog(c);
    closeLibOnMobile();
  };

  const handleCalculate = () => {
    if (!res) return;
    setShowResult(true);
    // let the section render & animate in before scrolling to it
    requestAnimationFrame(() => setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120));
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
    const invIdx = INVERTER_SIZES.indexOf(inverterKw);
    const inverterRange = invIdx >= 0 && invIdx < INVERTER_SIZES.length - 1
      ? `${INVERTER_SIZES[invIdx]}–${INVERTER_SIZES[invIdx + 1]} kW`
      : `≥ ${inverterKw} kW`;

    // Battery bank: average load × backup hours, corrected for efficiency & depth-of-discharge
    const backup = clamp(num(backupHours), 0, 24);
    let battery = null;
    if (backup > 0) {
      const storeWh = (avgLoadW * backup) / 0.9; // energy through inverter (~90% eff.)
      if (batteryType === 'lithium') {
        const nameplateKwh = storeWh / 0.9 / 1000;          // LiFePO4 DoD 90%
        const modules = Math.max(1, Math.ceil(nameplateKwh / LITHIUM_MODULE_KWH));
        battery = {
          nameplateKwh,
          modules,
          label: `${modules} × ${LITHIUM_MODULE_KWH} kWh (Lithium)`,
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
          label: `${strings * perString} × 12V/185Ah tubular (Lead-Acid)`,
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

    // Cross-check difference %
    const diffPct = hasBills && billAvg > 0 && summary.unitsPerMonth > 0
      ? (Math.abs(summary.unitsPerMonth - billAvg) / Math.max(billAvg, summary.unitsPerMonth)) * 100
      : null;

    return { hasBills, billAvg, designUnits, dailyKwhDesign, sun, pvKw, panelCount, arrayKw, inverterKw, inverterRange, battery, avgLoadW, backup, nightShare, panelsCost, inverterCost, batteryCost, bosCost, totalCost, T, monthlySave, annualSave, payback, co2, roofSqft, diffPct };
  }, [tab, items, unitsMin, unitsMax, tariff, sunHours, backupHours, panelWatt, batteryType, summary]);

  const ALL_GROUPS = [...new Set(CATALOG.map((c) => c.group))];
  const visibleGroups = pickerCategory === 'All' ? ALL_GROUPS : [pickerCategory];
  const filterAppliances = (g) => {
    const q = pickerSearch.toLowerCase();
    return CATALOG.filter(
      (c) => c.group === g && (c.name.toLowerCase().includes(q) || g.toLowerCase().includes(q))
    );
  };
  const groupCount = (g) => CATALOG.filter((c) => c.group === g).length;

  /* Shared appliance-picker content (used by the desktop inline panel and
     the mobile bottom sheet). */
  const Picker = (
    <>
                  {/* category chips */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['All', ...ALL_GROUPS].map((g) => (
                      <button
                        key={g}
                        onClick={() => setPickerCategory(g)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${pickerCategory === g ? 'bg-green-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-green-700 hover:bg-green-50'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  {customOpen && (
                    <div className="mb-4 p-4 bg-green-50/60 border border-green-100 rounded-xl">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Custom Appliance</div>
                      <div className="grid grid-cols-1 sm:grid-cols-[1.4fr,6rem,6rem,auto] gap-2.5 items-end">
                        <label className="block">
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Name</span>
                          <input
                            value={custom.name}
                            onChange={(e) => setCustom((c) => ({ ...c, name: e.target.value }))}
                            placeholder="e.g. Aquarium Pump"
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                          />
                        </label>
                        <NumInput label="Watts" value={custom.watts} onChange={(v) => setCustom((c) => ({ ...c, watts: v }))} suffix="W" />
                        <NumInput label="Hrs / Day" value={custom.hours} onChange={(v) => setCustom((c) => ({ ...c, hours: v }))} min={0} max={24} step={0.5} suffix="h" />
                        <button onClick={addCustom} className="bg-green-700 hover:bg-green-800 px-4 py-2.5 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* search */}
                  <div className="relative mb-4">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={pickerSearch}
                      onChange={(e) => setPickerSearch(e.target.value)}
                      placeholder="Search appliances…"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    />
                  </div>

                  {/* appliance buttons grouped */}
                  <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                    {visibleGroups.map((g) => {
                      const GIcon = GROUP_ICONS[g] || Plug;
                      const list = filterAppliances(g);
                      if (list.length === 0) return null;
                      return (
                        <div key={g}>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            <GIcon className="w-3.5 h-3.5" /> {g} <span className="text-slate-300">· {list.length} items</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {list.map((c) => (
                              <button key={c.key} onClick={() => pickFromCatalog(c)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer">
                                <c.icon className="w-3.5 h-3.5 text-green-600" />
                                {c.name} <span className="text-slate-400 font-medium">{c.watts}W</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {visibleGroups.every((g) => filterAppliances(g).length === 0) && (
                      <div className="text-xs text-slate-400 py-2">No matches — add it as a custom appliance instead.</div>
                    )}
                  </div>
    </>
  );

  /* ================================================================ */
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ---------- Page header (green banner) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-100 via-emerald-50 to-green-50 border-b border-green-100">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-green-300/20 blur-3xl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md shrink-0">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Solar Load Calculator</h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                Calculate your home's energy needs and get a complete solar system recommendation with costs, savings and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className="pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-1">How It Works</h3>
            {/* <p className="text-xs text-slate-500 mb-6">Get your solar system in just three simple steps.</p> */}
            <div className="grid sm:grid-cols-3 gap-4 sm:items-center relative">
              {[
                { n: 1, icon: ClipboardList, t: 'List or Enter Your Load', d: 'Add appliances from our library or enter your monthly units (bill method).' },
                { n: 2, icon: Calculator, t: 'We Calculate', d: 'Our smart engine sizes the right system for your home and budget.' },
                { n: 3, icon: Home, t: 'Get a Sized System', d: 'View your solar setup, cost, savings, payback and more — then get a quote!' },
              ].map((s, idx) => {
                const SIcon = s.icon;
                return (
                  <div key={s.n} className="relative">
                    <div className="bg-emerald-50/70 border border-green-100 rounded-2xl p-5 flex gap-4 h-full">
                      <div className="w-9 h-9 rounded-full bg-green-700 text-white font-black text-sm flex items-center justify-center shrink-0">{s.n}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <SIcon className="w-4 h-4 text-green-600" />
                          <h4 className="text-sm font-bold text-slate-900">{s.t}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                    {idx < 2 && (
                      <ArrowRight className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-3.5 w-5 h-5 text-green-400 z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Dashboard: two columns ---------- */}
      <section className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6">

            {/* ================= LEFT: appliances ================= */}
            <div className="lg:col-span-7 space-y-6">

              {/* Method tabs */}
              <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
                {[
                  { id: 'appliances', label: 'Appliance Method', icon: Calculator },
                  { id: 'bills', label: 'Bill / Units Method', icon: FileSpreadsheet },
                ].map((t) => {
                  const TIcon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${tab === t.id ? 'bg-green-700 text-white shadow-md' : 'text-slate-600 hover:text-green-700'
                        }`}
                    >
                      <TIcon className="w-4 h-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {tab === 'bills' && (
                <p className="text-xs text-slate-500 -mt-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 text-green-500" />
                  Enter your highest (summer) and lowest (winter) monthly units — covers seasonal variation automatically.
                </p>
              )}

              {/* Bill inputs (bill method only) */}
              {tab === 'bills' && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" /> Monthly Units from Bills
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">Check your past bills — enter the highest &amp; lowest months. 1 unit = 1 kWh.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <NumInput label="Max Units / Month (Summer)" value={unitsMax} onChange={setUnitsMax} suffix="units" />
                    <NumInput label="Min Units / Month (Winter)" value={unitsMin} onChange={setUnitsMin} suffix="units" />
                  </div>
                  {num(unitsMax) > 0 && num(unitsMin) > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 font-semibold flex items-center gap-2">
                      <CalendarRange className="w-4 h-4 shrink-0" />
                      Bill average: <strong>{fmt((num(unitsMax) + num(unitsMin)) / 2)} units/month</strong> (range {fmt(num(unitsMin))} – {fmt(num(unitsMax))})
                    </div>
                  )}
                </div>
              )}

              {/* Your Appliances (table) */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-lg font-black text-slate-900">Your Appliances</h3>
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    {summary.count} items · {fmt(summary.dailyKwh, 1)} kWh/day
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Add your household devices with their power, quantity and daily usage.</p>

                {/* column headers (desktop) */}
                <div className="hidden md:grid grid-cols-[minmax(0,1fr)_4.5rem_3.5rem_4.5rem_5.5rem_2rem] gap-2 px-2 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <span>Appliance</span><span>Watts</span><span>Qty</span><span>Hrs/Day</span><span>Daily kWh</span><span />
                </div>

                {/* rows */}
                <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
                  {items.map((i) => {
                    const Icon = i.icon || Plug;
                    const wh = (i.watts * i.qty * clamp(num(i.hours), 0, 24)) / 1000;
                    return (
                      <div key={i.uid} className="py-3 px-1 md:px-2 grid md:grid-cols-[minmax(0,1fr)_4.5rem_3.5rem_4.5rem_5.5rem_2rem] gap-2 items-center">
                        <div className="flex items-center gap-3 min-w-0 mb-2 md:mb-0">
                          <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-800 truncate">{i.name}</div>
                            <span className="inline-block mt-0.5 text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{i.group || 'Custom'}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:contents">
                          <CellInput value={i.watts} onChange={(v) => updateItem(i.uid, 'watts', v)} step={1} />
                          <CellInput value={i.qty} onChange={(v) => updateItem(i.uid, 'qty', v)} min={0} max={99} />
                          <CellInput value={i.hours} onChange={(v) => updateItem(i.uid, 'hours', v)} min={0} max={24} step={0.5} />
                        </div>
                        <span className="text-sm font-black text-slate-700 md:text-right">{fmt(wh, 2)}</span>
                        <button onClick={() => removeItem(i.uid)} className="w-8 h-8 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer justify-self-end" aria-label={`Remove ${i.name}`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                  {items.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">No appliances added yet — add some from the library below.</div>
                  )}
                </div>

                {/* ---- Add Appliance (desktop: collapsible panel with + / ✕ toggle) ---- */}
                <div className="mt-5 pt-5 border-t border-slate-100 hidden lg:block">
                  <button
                    onClick={() => setLibOpen((o) => !o)}
                    aria-expanded={libOpen}
                    className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 group-hover:text-green-700 transition-colors">
                        <ClipboardList className="w-4 h-4 text-green-600" /> Add Appliance from Library
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {libOpen ? 'Choose from 42+ pre-defined appliances or add a custom one.' : 'Click to browse 42+ pre-defined appliances or add a custom one.'}
                      </p>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${libOpen ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600' : 'bg-green-700 text-white shadow-sm group-hover:bg-green-800'}`}
                    >
                      <Plus className={`w-4.5 h-4.5 transition-transform duration-300 ${libOpen ? 'rotate-45' : ''}`} />
                    </span>
                  </button>

                  {libOpen && <div className="pt-4">{Picker}</div>}
                </div>
              </div>
            </div>

            {/* ================= RIGHT: summary + preferences ================= */}
            <div className="lg:col-span-5 space-y-6">

              {/* Live Load Summary */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center"><Zap className="w-5 h-5 text-green-600" /></span>
                    Live Load Summary
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">{summary.count} items</span>
                </div>
                <p className="text-xs text-slate-500 mb-4 ml-[3rem]">Updates in real time as you edit your appliances.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <StatBox icon={Battery} iconBg="bg-green-100" label="Energy Usage" value={fmt(summary.dailyKwh, 1)} unit="kWh/day" />
                  <StatBox icon={Gauge} iconBg="bg-blue-100" label="Monthly Units" value={fmt(summary.unitsPerMonth)} unit="kWh (units)" />
                  <StatBox icon={Zap} iconBg="bg-amber-100" label="Peak Load" value={fmt(summary.peakKw, 1)} unit="kW (85% diversity)" />
                </div>
              </div>

              {/* System Preferences */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <span className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center"><Info className="w-5 h-5 text-green-600" /></span>
                  System Preferences
                </h3>
                <p className="text-xs text-slate-500 mb-5 ml-[3rem]">Adjust your location and system settings for accurate results.</p>

                {/* sun hours */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Sun className="w-4 h-4 text-amber-500" /> Peak Sun Hours <span className="text-slate-400 font-medium text-xs">(per day)</span>
                    </span>
                    <span className="text-sm font-black text-green-700">{fmt(clamp(num(sunHours) || 5.5, 3, 8), 1)}</span>
                  </div>
                  <input
                    type="range" min="3" max="8" step="0.5"
                    value={clamp(num(sunHours) || 5.5, 3, 8)}
                    onChange={(e) => setSunHours(e.target.value)}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>3</span><span>8</span></div>
                </div>

                {/* backup hours */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Moon className="w-4 h-4 text-indigo-500" /> Night Backup Hours
                    </span>
                    <span className="text-sm font-black text-green-700">{num(backupHours)}</span>
                  </div>
                  <input
                    type="range" min="0" max="12" step="0.5"
                    value={num(backupHours)}
                    onChange={(e) => setBackupHours(e.target.value)}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>0</span><span>12</span></div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {num(backupHours) === 0 ? 'On-grid only — no batteries included' : `Battery runs the average load for ${num(backupHours)} hrs after sunset`}
                  </div>
                </div>

                {/* tariff + panel watt */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <NumInput label="Tariff (Rs/unit)" value={tariff} onChange={setTariff} suffix="Rs/u" />
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Panel Wattage</span>
                    <select
                      value={panelWatt}
                      onChange={(e) => setPanelWatt(parseInt(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                    >
                      {PANEL_WATTS.map((w) => (
                        <option key={w} value={w}>{w}W</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* battery type */}
                <div className="mb-6">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Battery Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'lithium', label: 'Lithium (LiFePO₄)', note: '90% usable · long life' },
                      { id: 'tubular', label: 'Tubular (Lead-Acid)', note: '50% usable · cheaper' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBatteryType(b.id)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-center ${batteryType === b.id ? 'bg-green-700 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:text-green-700 hover:bg-green-50'
                          }`}
                      >
                        <span className="block">{b.label}</span>
                        <span className="block text-[9px] opacity-70 font-medium">{b.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* actions */}
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCalculate}
                    className="bg-green-700 hover:bg-green-800 px-6 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Calculator className="w-5 h-5" /> Calculate My Solar System <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <button onClick={reset} className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:text-green-700 hover:border-green-300 transition-colors cursor-pointer">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mobile: floating Add button + bottom-sheet library ---------- */}
      <button
        onClick={() => setLibOpen((o) => !o)}
        aria-label={libOpen ? 'Close appliance library' : 'Add appliances'}
        className="lg:hidden fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer"
      >
        <Plus className={`w-6 h-6 transition-transform duration-300 ${libOpen ? 'rotate-45' : ''}`} />
      </button>

      {libOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            onClick={() => setLibOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[82vh] flex flex-col"
          >
            <div className="sticky top-0 bg-white rounded-t-3xl px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-green-600" /> Add Appliance from Library
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Choose from 42+ appliances or add a custom one.</p>
              </div>
              <button
                onClick={() => setLibOpen(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5 rotate-45" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 overscroll-contain">{Picker}</div>
          </motion.div>
        </div>
      )}

      {/* ---------- Results ---------- */}
      {showResult && res && (
        <section ref={resultsRef} className="pb-16 relative scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>

              {/* recommendation header */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center"><BatteryCharging className="w-5 h-5 text-green-600" /></span>
                    Your Solar System Recommendation
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 ml-[3rem]">Based on your load, settings and location.</p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[11px] font-bold text-green-700 whitespace-nowrap">
                  Estimated for {fmt(res.sun, 1)} sun hours · Rs {fmt(res.T)}/unit
                </span>
              </div>

              {/* result cards 2×3 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Array */}
                <ResultCard
                  icon={Sun} iconWrap="bg-green-100" accentText="text-green-700"
                  title="Solar Panel Array" tint="bg-white border-slate-200"
                  headline={`~${fmt(res.arrayKw, 1)} kW`}
                >
                  <Line label="Panels" value={`${res.panelCount} × ${panelWatt}W each`} />
                  <Line label="Required roof area" value={`≈ ${fmt(res.roofSqft)} sq ft`} />
                  <Line label="Covers" value={`${fmt(res.designUnits)} units/month`} />
                </ResultCard>

                {/* Inverter */}
                <ResultCard
                  icon={Zap} iconWrap="bg-green-100" accentText="text-green-700"
                  title="Inverter (Hybrid)" tint="bg-green-50/60 border-green-100"
                  headline={`~${fmt(res.inverterKw, 1)} kW`}
                  sub="25% surge headroom"
                >
                  <Line label="Recommended range" value={res.inverterRange} />
                  <Line label="Your peak demand" value={`${fmt(summary.peakKw, 1)} kW`} />
                  <Line label="Type" value="Hybrid / Grid-interactive" />
                </ResultCard>

                {/* Battery */}
                <ResultCard
                  icon={BatteryCharging} iconWrap="bg-purple-100" accentText="text-purple-600"
                  title="Battery Bank" tint="bg-purple-50/50 border-purple-100"
                  headline={res.battery ? `${fmt(res.battery.nameplateKwh * (batteryType === 'lithium' ? 0.9 : 0.5), 1)} kWh usable` : 'No Battery'}
                >
                  {res.battery ? (
                    <>
                      <Line label="Configuration" value={res.battery.label} />
                      <Line label="Backup time" value={`≈ ${res.backup} hours`} />
                      <Line label="Night share of daily use" value={`${fmt(res.nightShare * 100)}%`} />
                    </>
                  ) : (
                    <p className="text-xs text-slate-500">Set backup hours above if you need one.</p>
                  )}
                </ResultCard>

                {/* Cost */}
                <ResultCard
                  icon={CircleDollarSign} iconWrap="bg-amber-100" accentText="text-amber-500"
                  title="Estimated Investment" tint="bg-amber-50/60 border-amber-100"
                  headline={`${rs(res.totalCost).replace('Rs. ', 'Rs ')}`}
                >
                  <Line label={`Panels (${fmt(res.arrayKw, 1)} kW)`} value={rs(res.panelsCost)} />
                  <Line label={`Inverter (${fmt(res.inverterKw, 1)} kW)`} value={rs(res.inverterCost)} />
                  <Line label={`Batteries${res.battery ? ` (${batteryType})` : ''}`} value={res.battery ? rs(res.batteryCost) : '—'} />
                  <Line label="Structure + Wiring + Install (12%)" value={rs(res.bosCost)} />
                </ResultCard>

                {/* Savings */}
                <ResultCard
                  icon={TrendingDown} iconWrap="bg-green-100" accentText="text-green-700"
                  title="Savings & Payback" tint="bg-green-50/60 border-green-100"
                  headline={`~${fmt(res.payback, 1)} yrs`}
                >
                  <Line label="Monthly Savings" value={rs(res.monthlySave)} />
                  <Line label="Annual Savings" value={rs(res.annualSave)} />
                  <Line label="Payback Period" value={`${fmt(res.payback, 1)} years`} />
                  <Line label="Bill Offset (via net metering)" value="~90%" />
                </ResultCard>

                {/* Cross-check */}
                <ResultCard
                  icon={ShieldCheck} iconWrap="bg-blue-100" accentText="text-blue-600"
                  title="Accuracy Cross-Check" tint="bg-blue-50/50 border-blue-100"
                  headline={res.hasBills ? `${fmt(res.diffPct ?? Math.abs(summary.unitsPerMonth - res.billAvg))} ${summary.unitsPerMonth > 0 ? '% difference' : 'units'}` : 'Bill Data'}
                  sub="Appliance vs Bill Method"
                >
                  <div className="flex items-center gap-2">
                    {res.hasBills ? (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${res.diffPct !== null && res.diffPct < 10 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {res.diffPct !== null ? (res.diffPct < 10 ? `Reliable (within ${fmt(res.diffPct, 1)}%)` : 'Review recommended (above 10%)') : 'Enter appliances to compare'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">Not verified — add bill units</span>
                    )}
                  </div>
                  <Line label="Appliance method" value={`${fmt(summary.unitsPerMonth)} units/mo`} />
                  <Line label="Bill average method" value={res.hasBills ? `${fmt(res.billAvg)} units/mo` : 'Not entered'} />
                </ResultCard>
              </div>

              {/* Night Load Tip */}
              {res.battery && res.nightShare > 0.4 && (
                <div className="mt-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-sm text-indigo-900 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0"><Moon className="w-4 h-4 text-indigo-500" /></span>
                  <div>
                    <div className="font-bold mb-0.5">Night Load Tip</div>
                    <span className="text-xs sm:text-sm text-indigo-700">
                      Night backup covers ~{fmt(res.nightShare * 100)}% of your total daily usage. Consider a slightly larger array — or reducing backup hours — so the panels can still fully recharge the batteries during the day.
                    </span>
                  </div>
                </div>
              )}

              {/* Quote CTA banner */}
              <div className="mt-6 bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <span className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 items-center justify-center shrink-0">
                    <Home className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <p className="text-base font-black text-white">Ready for an Exact Quote?</p>
                    <p className="text-xs text-green-100 mt-0.5">Recommended: ~{fmt(res.arrayKw, 1)} kW panels · {fmt(res.inverterKw, 1)} kW inverter{res.battery ? ` · ${fmt(res.battery.nameplateKwh, 1)} kWh battery bank` : ' · on-grid (no battery)'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://wa.me/923015935773?text=Hi!%20I%20calculated%20my%20load%20on%20your%20Solar%20Calculator%20and%20want%20a%20quote."
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-white text-green-700 font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <FaWhatsapp className="w-4 h-4" /> Get Exact Quote on WhatsApp <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <a href="../#hero" className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                  </a>
                </div>
              </div>

              {/* Assumptions */}
              <details className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm group">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-green-700 transition-colors">
                  <Info className="w-5 h-5 text-green-600" />
                  <span>Methodology &amp; Assumptions
                    <span className="block text-[11px] font-medium text-slate-500">View the calculation method, assumptions and important notes.</span>
                  </span>
                  <ChevronDown className="w-4 h-4 ml-auto text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-xs text-slate-600 space-y-2 leading-relaxed border-t border-slate-100 pt-4">
                  <p><strong className="text-slate-800">Energy (kWh &amp; units):</strong> each appliance contributes Watts × Qty × Hours/day. 1 unit of electricity = 1 kWh.</p>
                  <p><strong className="text-slate-800">Solar array:</strong> daily kWh ÷ (peak sun hours × 0.78 performance ratio — covers inverter, wiring, dust &amp; temperature losses).</p>
                  <p><strong className="text-slate-800">Peak load:</strong> sum of all connected watts × 0.85 diversity (not everything runs at full power simultaneously); the inverter is then upsized by 25% for motor surge and safety.</p>
                  <p><strong className="text-slate-800">Battery:</strong> average load × backup hours ÷ 0.9 inverter efficiency, ÷ chemistry depth-of-discharge (Lithium 90%, tubular 50%).</p>
                  <p><strong className="text-slate-800">Bill cross-check:</strong> bill average = (max + min) units ÷ 2. If both methods agree within 10%, the estimate is highly reliable.</p>
                  <p><strong className="text-slate-800">Cost &amp; savings:</strong> indicative PKR street rates (Rs. {COST.panelW}/W panels, Rs. {fmt(COST.invKw)}/kW hybrid inverter, Rs. {fmt(COST.lithKwh)}/kWh lithium &amp; Rs. {fmt(COST.tubKwh)}/kWh tubular storage, plus 12% structure/wiring/install) — savings assume ~90% offset through net metering at your entered tariff.</p>
                  <p className="text-slate-400">Rates change frequently — request a formal quote for locked-in pricing.</p>
                </div>
              </details>
            </motion.div>
          </div>
        </section>
      )}


    </div>
  );
}
