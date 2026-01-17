
import React, { useState, useEffect } from 'react';
import { Bot, RefreshCw, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getFinancialInsight } from '../services/gemini';
import { PalancaLogo } from './PalancaLogo';

export const AssistantScreen: React.FC = () => {
  const { transactions, user } = useApp();
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const result = await getFinancialInsight(transactions, user.balances);
    setInsight(result.text || "Não foi possível obter uma análise de momento.");
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-slate-900 p-2.5 rounded-xl text-white">
          <Bot size={20} />
        </div>
        <h2 className="font-black text-slate-900 uppercase tracking-tight">Análise Financeira IA</h2>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-red-600">
          <PalancaLogo className="w-32 h-32" />
        </div>
        
        <h3 className="text-sm font-black text-red-600 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
          PERSPECTIVA DE MERCADO
          {loading && <RefreshCw className="animate-spin w-4 h-4" />}
        </h3>

        {loading ? (
          <div className="space-y-4">
            <div className="h-3 bg-slate-50 rounded-full w-full animate-pulse"></div>
            <div className="h-3 bg-slate-50 rounded-full w-5/6 animate-pulse"></div>
            <div className="h-3 bg-slate-50 rounded-full w-4/6 animate-pulse"></div>
          </div>
        ) : (
          <div className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-wrap font-black uppercase tracking-tight">
            {insight}
          </div>
        )}
        
        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          RECALCULAR ANÁLISE
        </button>
      </div>

      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-slate-400">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={14} className="text-red-600" />
          <p className="text-[9px] font-black uppercase tracking-widest">Algoritmo de Conformidade</p>
        </div>
        <p className="text-[9px] font-bold uppercase leading-relaxed tracking-tight">
          As nossas análises são baseadas em dados em tempo real do mercado angolano e internacional.
        </p>
      </div>
    </div>
  );
};
