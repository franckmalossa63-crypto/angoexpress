
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  QrCode,
  Plus,
  ShieldAlert,
  ChevronRight,
  Wallet,
  Briefcase
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { PalancaLogo } from './PalancaLogo';

export const BusinessScreen: React.FC = () => {
  const data = [
    { name: 'Faturação', value: 450000 },
    { name: 'Impostos', value: 120000 },
    { name: 'Custos Fixos', value: 80000 },
  ];
  const COLORS = ['#D51021', '#000000', '#FFD700'];

  return (
    <div className="space-y-6">
      <div className="bg-black rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border-b-8 border-red-600 group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <Briefcase size={16} className="text-red-500" />
             <h2 className="text-2xl font-black uppercase tracking-tighter">AngoExpress <span className="text-red-600">Corporativo</span></h2>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Gestão Profissional de Ativos</p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Faturado (Mês)</p>
              <h3 className="text-2xl font-black text-white italic">1.250.400 Kz</h3>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">IVA Liquidado</p>
              <h3 className="text-2xl font-black text-yellow-400 italic">85.320 Kz</h3>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-6 text-white opacity-10 group-hover:scale-110 transition-transform duration-700">
          <PalancaLogo className="w-24 h-24" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 active:scale-95 transition-transform hover:border-red-200">
          <div className="bg-red-50 p-4 rounded-2xl text-red-600 shadow-sm">
            <QrCode size={32} />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase text-slate-800 tracking-tight block">Cobrança Direta</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Link de Pagamento</span>
          </div>
        </button>
        <button className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 active:scale-95 transition-transform hover:border-slate-300">
          <div className="bg-slate-50 p-4 rounded-2xl text-black shadow-sm">
            <Users size={32} />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase text-slate-800 tracking-tight block">Pagamento Salários</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Processamento Lote</span>
          </div>
        </button>
      </div>

      <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.2em] italic">Resumo Operacional</h3>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Ciclo de 30 dias</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl">
             <TrendingUp size={18} className="text-emerald-500" />
          </div>
        </div>
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balanço</span>
             <span className="text-lg font-black text-slate-900 tracking-tighter">650K Kz</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-50">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-2.5 h-2.5 rounded-full mb-2" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.name}</span>
              <span className="text-[11px] font-black text-slate-900 tracking-tight">{item.value.toLocaleString()} Kz</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-yellow-50 rounded-[2rem] p-6 border border-yellow-100 flex items-center gap-5 group cursor-pointer active:scale-95 transition-all">
         <div className="bg-white p-3.5 rounded-2xl shadow-sm text-yellow-600">
            <ShieldAlert size={24} />
         </div>
         <div className="flex-1">
            <h4 className="text-[11px] font-black text-yellow-900 uppercase tracking-tight">Conformidade Fiscal</h4>
            <p className="text-[9px] font-bold text-yellow-700 uppercase leading-none mt-1">Declaração com vencimento em 5 dias</p>
         </div>
         <ChevronRight size={18} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
      </div>

      <button className="w-full bg-slate-50 hover:bg-white hover:border-red-600 hover:text-red-600 border-2 border-dashed border-slate-200 py-8 rounded-[2.5rem] flex items-center justify-center gap-4 text-slate-400 transition-all active:scale-95 group">
        <div className="bg-white p-2 rounded-xl group-hover:bg-red-50 shadow-sm border border-slate-100 transition-colors">
          <Plus size={24} />
        </div>
        <div className="text-left">
           <span className="font-black uppercase text-[11px] tracking-[0.2em] block">Criar Subconta</span>
           <span className="text-[8px] font-bold uppercase tracking-widest">Reserva ou Investimento</span>
        </div>
      </button>
    </div>
  );
};
