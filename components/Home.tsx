
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
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { PalancaLogo } from './PalancaLogo';
import { getExchangeRates } from '../services/gemini';

export const HomeScreen: React.FC = () => {
  const { user, setCurrentView } = useApp();
  const { t } = useLanguage();
  const [showBalance, setShowBalance] = useState(true);
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);
  
  const [rates, setRates] = useState<string>("");
  const [sources, setSources] = useState<any[]>([]);
  const [loadingRates, setLoadingRates] = useState(true);

  const currentWallet = user.balances[activeCurrencyIdx];

  const formatVal = (val: number, code: string) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: code === 'AOA' ? 'AOA' : code,
      minimumFractionDigits: 2
    }).format(val);
  };

  const nextCurrency = () => {
    setActiveCurrencyIdx((prev) => (prev + 1) % user.balances.length);
  };

  const fetchRates = async () => {
    setLoadingRates(true);
    const result = await getExchangeRates();
    setRates(result.text || "USD: 932.40 AOA, EUR: 1014.15 AOA, BRL: 168.45 AOA");
    setSources(result.sources || []);
    setLoadingRates(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="space-y-6 pb-4 animate-in fade-in duration-700">
      {/* Premium Wallet Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden group border border-slate-700">
        <div className="absolute top-0 right-0 w-48 h-48 text-red-600 opacity-5 -translate-y-8 translate-x-12 group-hover:rotate-12 transition-transform duration-700">
          <PalancaLogo className="w-full h-full" />
        </div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <button onClick={nextCurrency} className="flex flex-col items-start active:opacity-70 transition-opacity">
            <div className="flex items-center gap-2 mb-1.5">
               <div className="bg-red-600 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
               <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">{t('balance')} {currentWallet.code}</p>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black tracking-tighter">
                {showBalance ? formatVal(currentWallet.amount, currentWallet.code) : '••••••'}
              </h2>
              <button onClick={(e) => { e.stopPropagation(); setShowBalance(!showBalance); }} className="opacity-40 hover:opacity-100 transition-opacity">
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </button>
          <div className="bg-red-600 p-3 rounded-2xl text-white shadow-xl shadow-red-900/20">
            <Globe className="w-6 h-6" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <button 
            onClick={() => setCurrentView('withdraw_methods')}
            className="bg-white/5 border border-white/10 py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-colors"
          >
            <ArrowUpRight size={16} className="text-red-500" />
            {t('send')}
          </button>
          <button 
            onClick={() => setCurrentView('deposit_methods')}
            className="bg-white text-black py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-slate-100 transition-colors"
          >
            <Plus size={16} />
            {t('load')}
          </button>
        </div>
      </div>

      <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl text-slate-900">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Câmbio Oficial AngoExpress</p>
              {loadingRates ? (
                <div className="flex items-center gap-2 py-1">
                  <Loader2 size={12} className="animate-spin text-red-600" />
                  <span className="text-[11px] font-bold text-slate-400 animate-pulse uppercase">A consultar...</span>
                </div>
              ) : (
                <p className="text-[11px] font-black text-slate-800 tracking-tight py-1">{rates}</p>
              )}
            </div>
          </div>
          <button onClick={fetchRates} className="p-2 text-slate-300 hover:text-red-600 transition-all">
            <RefreshCw size={18} className={loadingRates ? 'animate-spin' : ''} />
          </button>
        </div>

        {!loadingRates && sources.length > 0 && (
          <div className="pt-2 border-t border-slate-50 flex flex-wrap gap-2">
            <span className="text-[8px] font-black text-slate-300 uppercase">Fontes de Dados:</span>
            {sources.slice(0, 2).map((s, i) => (
              <a 
                key={i} 
                href={s.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[8px] font-black text-slate-400 flex items-center gap-1 hover:text-red-600 truncate max-w-[120px] transition-colors"
              >
                {s.title} <ExternalLink size={8} />
              </a>
            ))}
          </div>
        )}
      </section>

      <button 
        onClick={() => setCurrentView('scan')}
        className="w-full bg-red-600 text-white py-7 rounded-[2.5rem] flex items-center justify-center gap-5 shadow-2xl hover:bg-red-700 active:scale-95 transition-all group"
      >
        <div className="bg-white/10 p-3.5 rounded-2xl">
          <QrCode size={32} />
        </div>
        <div className="text-left">
          <p className="text-[16px] font-black uppercase tracking-[0.25em]">PAGAMENTO QR</p>
          <p className="text-[10px] font-bold text-red-100 uppercase opacity-70 tracking-widest leading-none">Liquidação Instantânea</p>
        </div>
      </button>

      <section className="pb-4">
        <h3 className="font-black text-slate-900 uppercase text-[11px] tracking-[0.25em] mb-5 px-3">Serviços Financeiros</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'Pix Brasil', color: 'bg-teal-50 text-teal-600' },
            { icon: Globe, label: 'Swift', color: 'bg-indigo-50 text-indigo-600' },
            { icon: Smartphone, label: 'Recargas', color: 'bg-orange-50 text-orange-600' },
            { icon: Plus, label: 'Outros', color: 'bg-slate-50 text-slate-400' },
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setCurrentView('chat')}>
              <div className={`${action.color} p-5 rounded-[1.8rem] shadow-sm group-hover:-translate-y-1 transition-all border border-transparent hover:border-current/10`}>
                <action.icon size={26} />
              </div>
              <span className="text-[9px] font-black text-slate-600 text-center uppercase tracking-widest">
                {action.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
