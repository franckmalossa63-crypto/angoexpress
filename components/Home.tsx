
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Zap, 
  Globe,
  RefreshCw,
  TrendingUp,
  Loader2,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { PalancaLogo } from './PalancaLogo';
import { getExchangeRates } from '../services/gemini';

export const HomeScreen: React.FC = () => {
  const { user, setCurrentView, isOnline } = useApp();
  const { t } = useLanguage();
  const [showBalance, setShowBalance] = useState(true);
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);
  
  const [rates, setRates] = useState<string>("A carregar taxas...");
  const [loadingRates, setLoadingRates] = useState(true);

  const currentWallet = user.balances[activeCurrencyIdx];

  const nextCurrency = () => {
    setActiveCurrencyIdx((prev) => (prev + 1) % user.balances.length);
  };

  const fetchRates = async () => {
    if (!isOnline) {
      setRates("USD: 932.40 | EUR: 1014.15 (Cache)");
      setLoadingRates(false);
      return;
    }
    setLoadingRates(true);
    const result = await getExchangeRates();
    setRates(result.text);
    setLoadingRates(false);
  };

  useEffect(() => {
    fetchRates();
  }, [isOnline]);

  return (
    <div className="space-y-6 pb-4 animate-in fade-in duration-700">
      {/* Premium Wallet Card */}
      <div className="bg-slate-950 rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden group border border-white/5">
        <div className="absolute -top-10 -right-10 w-40 h-40 text-red-600 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
          <PalancaLogo className="w-full h-full" />
        </div>
        
        <div className="flex justify-between items-start mb-10 relative z-10">
          <button onClick={nextCurrency} className="flex flex-col items-start active:opacity-70">
            <div className="flex items-center gap-2 mb-2">
               <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`}></div>
               <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">AngoExpress Wallet • {currentWallet.code}</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black tracking-tighter italic">
                {showBalance ? currentWallet.amount.toLocaleString('pt-AO', { minimumFractionDigits: 2 }) : '••••••'}
                <span className="text-red-600 ml-2 text-2xl not-italic">{currentWallet.symbol}</span>
              </h2>
              <button onClick={(e) => { e.stopPropagation(); setShowBalance(!showBalance); }} className="text-white/20 hover:text-white transition-colors">
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <button 
            onClick={() => setCurrentView('withdraw_methods')}
            className="bg-white/5 border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowUpRight size={16} className="text-red-500" />
            {t('send')}
          </button>
          <button 
            onClick={() => setCurrentView('deposit_methods')}
            className="bg-red-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-900/20 hover:bg-red-700 active:scale-95 transition-all"
          >
            <Plus size={16} />
            {t('load')}
          </button>
        </div>
      </div>

      <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 p-3 rounded-2xl text-red-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Câmbio Oficial</p>
            {loadingRates ? (
              <div className="flex items-center gap-2">
                <Loader2 size={12} className="animate-spin text-red-600" />
                <span className="text-[10px] font-bold text-slate-400">A ATUALIZAR...</span>
              </div>
            ) : (
              <p className="text-[11px] font-black text-slate-800 tracking-tight">{rates}</p>
            )}
          </div>
        </div>
        {!isOnline && <ShieldCheck size={18} className="text-blue-500" title="Dados em Cache" />}
      </section>

      <div className="grid grid-cols-4 gap-4 px-2">
          {[
            { icon: Zap, label: 'Pix', color: 'text-teal-600', bg: 'bg-teal-50' },
            { icon: Globe, label: 'Swift', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Smartphone, label: 'Unitel', color: 'text-orange-600', bg: 'bg-orange-50' },
            { icon: RefreshCw, label: 'Trocar', color: 'text-red-600', bg: 'bg-red-50' },
          ].map((item, i) => (
            <button key={i} onClick={() => setCurrentView('chat')} className="flex flex-col items-center gap-2 group">
              <div className={`${item.bg} ${item.color} p-5 rounded-[1.8rem] group-active:scale-90 transition-all border border-transparent hover:border-current/10 shadow-sm`}>
                <item.icon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
      </div>

      <button 
        onClick={() => setCurrentView('scan')}
        className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] flex items-center justify-between px-8 shadow-2xl active:scale-[0.98] transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-900/40">
            <QrCode size={28} />
          </div>
          <div className="text-left">
            <p className="text-sm font-black uppercase tracking-[0.2em] italic">PAGAR COM QR</p>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Liquidado em 0.5s</p>
          </div>
        </div>
        <Plus size={20} className="text-red-600" />
      </button>
    </div>
  );
};
