
import React, { useState } from 'react';
import { Camera, Package, DollarSign, ArrowLeft, CheckCircle2, MapPin, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MerchantPortal: React.FC = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6 pb-10 animate-in slide-in-from-bottom-8 duration-500">
      <header className="flex items-center gap-4">
        <button onClick={() => setCurrentView('marketplace')} className="p-2 bg-white rounded-xl border border-slate-100"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black text-slate-900 uppercase italic">Painel do <span className="text-red-600">Vendedor</span></h2>
      </header>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 group hover:border-red-600 transition-colors cursor-pointer">
             <div className="bg-slate-50 p-6 rounded-full group-hover:bg-red-50 transition-colors">
                <Camera size={48} className="text-slate-300 group-hover:text-red-600" />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-red-600">Fotografias do Produto</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Denominação do Produto / Ativo</label>
              <input type="text" placeholder="EX: TOYOTA HILUX 2024" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-black uppercase focus:ring-2 focus:ring-red-600 transition-all" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Preço de Venda (Kz)</label>
                <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-black focus:ring-2 focus:ring-red-600 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Categoria</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-black uppercase focus:ring-2 focus:ring-red-600 transition-all">
                  <option>Veículos</option>
                  <option>Tecnologia</option>
                  <option>Diversos</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Localização (Província / Zona)</label>
              <div className="relative">
                <input type="text" placeholder="EX: LUANDA, TALATONA" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-5 text-xs font-black uppercase focus:ring-2 focus:ring-red-600 transition-all" />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex items-start gap-3">
             <DollarSign size={20} className="text-yellow-600 shrink-0" />
             <p className="text-[9px] font-bold text-yellow-800 uppercase leading-relaxed">
               Taxa de intermediação: 2% do valor transacionado. Cobrança efetuada apenas após a conclusão da venda.
             </p>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-red-200 active:scale-95 transition-all"
          >
            Publicar no Marketplace
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase">Anúncio Publicado!</h3>
           <p className="text-slate-500 max-w-[250px] font-medium text-sm">O seu ativo já está disponível para visualização no AngoMarket. Boas vendas!</p>
           <button 
            onClick={() => setCurrentView('marketplace')}
            className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
           >
             Ir para o Mercado
           </button>
        </div>
      )}
    </div>
  );
};
