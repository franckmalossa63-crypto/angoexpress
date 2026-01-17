
import React from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar, Clock, Loader2, CheckCircle2, AlertCircle, Globe, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryScreen: React.FC = () => {
  const { transactions } = useApp();

  const getStatusConfig = (status: string, isIntl: boolean) => {
    switch (status) {
      case 'pending':
        return {
          label: isIntl ? 'A Validar Processamento SWIFT' : 'Em Processamento de Capital',
          color: 'text-amber-600',
          barColor: 'bg-amber-400',
          bgColor: 'bg-amber-50',
          icon: <Loader2 size={12} className="animate-spin" />,
          width: 'w-2/3',
          animate: 'animate-pulse'
        };
      case 'failed':
        return {
          label: 'Falha na Operação (Estornado)',
          color: 'text-red-600',
          barColor: 'bg-red-500',
          bgColor: 'bg-red-50',
          icon: <AlertCircle size={12} />,
          width: 'w-full',
          animate: ''
        };
      default:
        return {
          label: 'Operação Liquidada',
          color: 'text-emerald-600',
          barColor: 'bg-emerald-500',
          bgColor: 'bg-emerald-50',
          icon: <CheckCircle2 size={12} />,
          width: 'w-full',
          animate: ''
        };
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Atividade</h2>
        <div className="flex gap-2">
            <button className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-transform"><Filter size={18} /></button>
        </div>
      </header>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar histórico..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase focus:outline-none focus:border-red-300 shadow-sm transition-all"
        />
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => {
          const isIntl = tx.currency !== 'AOA';
          const statusCfg = getStatusConfig(tx.status, isIntl);
          
          return (
            <div key={tx.id} className="bg-white p-5 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              {isIntl && (
                <div className="absolute top-0 right-0 p-3">
                   <Globe size={14} className="text-slate-200 group-hover:text-red-200 transition-colors" />
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-3xl shrink-0 ${
                  tx.type === 'receive' || tx.type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {tx.type === 'receive' || tx.type === 'deposit' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight mb-1 truncate">{tx.description}</h4>
                      
                      {isIntl && tx.exchangeRate && (
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-black text-red-600 uppercase tracking-tighter">
                          <RefreshCw size={10} className={tx.status === 'pending' ? 'animate-spin' : ''} />
                          <span>Taxa: 1 {tx.currency} = {tx.exchangeRate.toFixed(2)} Kz</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(tx.date).toLocaleDateString('pt-AO')}</span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase">•</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(tx.date).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className={`text-sm font-black whitespace-nowrap ${
                        tx.type === 'receive' || tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'
                      }`}>
                        {tx.type === 'receive' || tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()} {tx.currency}
                      </div>
                      <div className={`text-[9px] font-black uppercase ${statusCfg.color} flex items-center justify-end gap-1 mt-0.5`}>
                        {statusCfg.icon} <span>{statusCfg.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-3 w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={`h-full transition-all duration-1000 ease-in-out ${statusCfg.barColor} ${statusCfg.width} ${statusCfg.animate} relative`}
                    >
                      {tx.status === 'pending' && (
                        <div className="absolute inset-0 bg-white/30 animate-[shimmer_1.5s_infinite]"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
          <div className="bg-slate-100 p-8 rounded-full mb-4">
            <Search size={48} />
          </div>
          <p className="font-black uppercase text-xs tracking-widest">Sem movimentos registados</p>
        </div>
      )}
    </div>
  );
};
