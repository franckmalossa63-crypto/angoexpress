
import React, { useState } from 'react';
import { 
  Copy, 
  Landmark, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  CreditCard,
  Zap,
  Lock,
  RefreshCw,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IBANConsult: React.FC = () => {
  const { user, setCurrentView } = useApp();

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    // Em um app real usaríamos um toast, aqui simulamos visualmente
    alert(`IBAN ${text.substring(0, 4)}... Copiado!`);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-slate-900" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase italic leading-none">Meus <span className="text-red-600">IBANs</span></h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Dados para Recebimento</p>
          </div>
        </div>
        <div className="bg-red-50 p-2 rounded-xl text-red-600">
          <Landmark size={20} />
        </div>
      </header>

      <div className="space-y-4">
        {user.balances.map((wallet) => (
          <div key={wallet.code} className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm space-y-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] -translate-y-4 translate-x-4 rotate-12 transition-transform group-hover:rotate-0 duration-700">
              <Landmark size={120} />
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="bg-slate-950 text-yellow-400 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-black/10">
                  {wallet.code}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {wallet.code === 'AOA' ? 'Kwanza Angolano' : wallet.code === 'USD' ? 'Dólar Americano' : wallet.code === 'EUR' ? 'Euro' : 'Real Brasileiro'}
                  </h3>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> Recebimento Imediato
                  </p>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl flex items-center justify-between border border-slate-100 group-hover:border-red-200 transition-all relative z-10 group/iban">
              <div className="overflow-hidden pr-4">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Número IBAN Oficial</p>
                <p className="text-[13px] font-mono font-bold text-slate-800 tracking-tight break-all">
                  {wallet.iban || 'PENDENTE DE ATIVAÇÃO'}
                </p>
              </div>
              <button 
                onClick={() => handleCopy(wallet.iban || '')}
                className="shrink-0 p-3.5 bg-white text-red-600 rounded-2xl shadow-sm border border-slate-100 active:scale-90 active:bg-red-600 active:text-white transition-all group-hover/iban:shadow-md"
              >
                <Copy size={18} />
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="text-red-600" size={14} />
                Custódia BNA Segura
              </div>
              <button className="flex items-center gap-1.5 text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline">
                Partilhar <ExternalLink size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-7 rounded-[2.5rem] space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-4 opacity-10">
           <Zap size={60} />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400">Guia de Depósito</h4>
        <p className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed tracking-tight">
          Para garantir que o teu dinheiro caia na hora, usa sempre o IBAN que corresponde à moeda que estás a enviar. Evita taxas extras de conversão bancária externa.
        </p>
      </div>
    </div>
  );
};

export const CardsView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [showSensitive, setShowSensitive] = useState(false);

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <header className="flex items-center gap-4">
        <button onClick={() => setCurrentView('home')} className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm active:scale-90 transition-all">
          <ArrowLeft size={20} className="text-slate-900" />
        </button>
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase italic leading-none">Gestão de <span className="text-red-600">Cartões</span></h2>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Visa & Multicaixa</p>
        </div>
      </header>

      {/* Cartão Virtual VISA (USD) */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-900 to-black aspect-[1.58/1] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
          <ShieldCheck size={140} />
        </div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="text-3xl font-black italic tracking-tighter drop-shadow-lg">VISA</div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
            AngoExpress Virtual
          </div>
        </div>

        <div className="space-y-7 relative z-10">
          <div className="text-[22px] font-mono tracking-[0.3em] drop-shadow-md">
            {showSensitive ? "4532 8890 1234 5678" : "**** **** **** 5678"}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1.5 tracking-widest">Titular do Cartão</p>
              <p className="text-sm font-black uppercase tracking-widest">ANTÓNIO MANUEL</p>
            </div>
            <div className="text-right mr-6">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1.5 tracking-widest">Expira</p>
              <p className="text-sm font-black">{showSensitive ? "12/28" : "**/**"}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1.5 tracking-widest">CVV</p>
              <p className="text-sm font-black">{showSensitive ? "425" : "***"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartão Multicaixa (AOA) */}
      <div className="bg-gradient-to-br from-red-600 to-red-900 aspect-[1.58/1] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border-b-[10px] border-red-950">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Landmark size={140} />
        </div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="text-2xl font-black italic tracking-tighter uppercase drop-shadow-md">Multicaixa</div>
          <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5">
            Cartão de Débito
          </div>
        </div>

        <div className="space-y-7 relative z-10">
          <div className="text-[22px] font-mono tracking-[0.3em] drop-shadow-md">
            {showSensitive ? "0006 0001 5678 9012" : "**** **** **** 9012"}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1.5 tracking-widest">Proprietário</p>
              <p className="text-sm font-black uppercase tracking-widest">ANTÓNIO MANUEL</p>
            </div>
            <div className="text-right">
               <p className="text-[8px] font-black uppercase opacity-60 mb-1.5 tracking-widest">Rede</p>
               <p className="text-sm font-black italic tracking-widest">EMIS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <button 
          onClick={() => setShowSensitive(!showSensitive)}
          className="w-full bg-slate-950 text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-b-4 border-slate-800"
        >
          {showSensitive ? <EyeOff size={18} /> : <Eye size={18} />}
          {showSensitive ? "Ocultar Dados" : "Ver Dados dos Cartões"}
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 active:scale-95 transition-all group">
             <div className="bg-red-50 p-3 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Lock size={22}/>
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800">Congelar</span>
          </button>
          <button className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 active:scale-95 transition-all group">
             <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <RefreshCw size={22}/>
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800">Renovar</span>
          </button>
        </div>
        
        <button className="w-full py-5 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 hover:border-red-600 hover:text-red-600 transition-all">
          <CreditCard size={18} /> Solicitar Novo Cartão
        </button>
      </div>
    </div>
  );
};
