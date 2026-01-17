
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Landmark, ArrowRight, BarChart3, ShieldCheck, Zap, Bell } from 'lucide-react';

const STOCKS = [
  { symbol: 'BAI', name: 'Banco Angolano de Invest.', price: 42500, change: +2.4, volume: '1.2M' },
  { symbol: 'BCI', name: 'Banco de Comércio e Ind.', price: 18200, change: -0.8, volume: '450K' },
  { symbol: 'BCGA', name: 'Banco Caixa Geral Angola', price: 31000, change: +1.2, volume: '800K' },
  { symbol: 'UNITEL', name: 'Unitel Money (Proxy)', price: 5400, change: +5.7, volume: '3.1M' },
];

export const StockMarket: React.FC = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">BODIVA <span className="text-red-600">LIVE</span></h2>
          <div className="flex items-center gap-1.5">
             <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${pulse ? 'animate-ping' : ''}`}></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mercado de Valores • Luanda</p>
          </div>
        </div>
        <button className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-400">
           <Bell size={18} />
        </button>
      </header>

      {/* Marquee Ticker */}
      <div className="bg-slate-900 overflow-hidden py-2 -mx-5">
        <div className="animate-marquee inline-flex gap-8 items-center text-white font-black text-[9px] uppercase tracking-widest">
          {STOCKS.map((s, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-yellow-400">{s.symbol}</span>
              <span>{s.price.toLocaleString()} Kz</span>
              <span className={s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {s.change >= 0 ? '+' : ''}{s.change}%
              </span>
            </span>
          ))}
          {/* Duplicate for seamless marquee */}
          {STOCKS.map((s, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-2">
              <span className="text-yellow-400">{s.symbol}</span>
              <span>{s.price.toLocaleString()} Kz</span>
              <span className={s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {s.change >= 0 ? '+' : ''}{s.change}%
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-black to-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700">
          <BarChart3 size={140} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
             <Zap size={14} className="text-yellow-400 fill-yellow-400" />
             <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Índice Ibx (Angola)</p>
          </div>
          <h3 className="text-5xl font-black tracking-tighter mb-4 italic">14.250,40</h3>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2 border border-emerald-500/20">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-emerald-400 font-black text-xs uppercase tracking-tight">+3.15% Hoje</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Volume: 24.5M Kz</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activos em Destaque</h4>
           <button className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline flex items-center gap-1">Ver Todos <ArrowRight size={10}/></button>
        </div>
        {STOCKS.map((stock) => (
          <div key={stock.symbol} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center justify-between group active:scale-95 transition-all hover:border-red-100">
            <div className="flex items-center gap-5">
              <div className="bg-slate-950 text-yellow-400 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">
                {stock.symbol}
              </div>
              <div>
                <h5 className="text-[11px] font-black text-slate-900 uppercase truncate max-w-[140px] tracking-tight">{stock.name}</h5>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Vol Diário: {stock.volume}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 italic">{stock.price.toLocaleString()} Kz</p>
              <div className={`flex items-center justify-end gap-1 text-[10px] font-black mt-1 ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                <span>{Math.abs(stock.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-[2.5rem] p-8 border border-indigo-100 space-y-5 relative overflow-hidden group">
        <div className="absolute -bottom-6 -right-6 text-indigo-100 group-hover:scale-110 transition-transform duration-700">
           <Landmark size={120} />
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white p-2.5 rounded-xl shadow-sm">
            <ShieldCheck className="text-indigo-600" size={20} />
          </div>
          <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest italic">Pequeno Investidor</h4>
        </div>
        <p className="text-[10px] font-bold text-indigo-700 leading-relaxed uppercase tracking-tight relative z-10">
          Todas as operações na BODIVA via AngoExpress são liquidadas pelo BNA. O teu futuro financeiro começa com apenas 1.000 Kz.
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-95 relative z-10">
          Abrir Conta de Custódia
        </button>
      </div>
    </div>
  );
};
