
import React, { useState } from 'react';
import { QrCode, Camera, X, CheckCircle2, RefreshCw, Fingerprint, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ScanScreen: React.FC = () => {
  const { addTransaction, isLoading, setCurrentView } = useApp();
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'scan' | 'amount' | 'biometric' | 'confirm'>('scan');

  const handleSimulateScan = () => {
    setStep('amount');
  };

  const handleStartBiometric = () => {
    setStep('biometric');
    // Simulate biometric scan
    setTimeout(() => {
       handlePay();
    }, 2000);
  };

  const handlePay = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      addTransaction({
        type: 'send',
        amount: val,
        currency: 'AOA',
        description: 'Pagamento via QR Code',
        recipient: 'Entidade Comercial'
      });
      setStep('confirm');
    }
  };

  if (step === 'biometric') {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 animate-pulse">
        <div className="w-24 h-24 text-red-600">
           <Fingerprint size={96} strokeWidth={1} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black uppercase tracking-tight">A Validar Biometria</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Posicione o dedo no leitor</p>
        </div>
        <div className="flex gap-2">
           <ShieldCheck className="text-emerald-500" size={20} />
           <span className="text-[10px] font-black uppercase text-slate-400">Ligação Encriptada de Alta Segurança</span>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Operação Concluída!</h2>
        <p className="text-slate-500 max-w-[220px] font-medium">O montante foi creditado na conta do destinatário com sucesso.</p>
        <button 
          onClick={() => setCurrentView('home')}
          className="bg-black text-white px-10 py-4 rounded-3xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all text-xs"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col items-center justify-center pb-20 animate-in fade-in slide-in-from-bottom-4">
      {step === 'scan' ? (
        <>
          <div className="relative w-72 h-72 bg-slate-900 rounded-[3rem] flex items-center justify-center overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <QrCode className="text-white w-40 h-40 opacity-10" />
            <div className="absolute top-0 w-full h-1 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)] animate-[scan_2.5s_ease-in-out_infinite]"></div>
            <button 
              onClick={handleSimulateScan}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-6"
            >
              <div className="bg-red-600/20 p-5 rounded-full mb-4">
                 <Camera size={44} className="text-yellow-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Toque para Digitalizar</span>
            </button>
          </div>
          <style>{`
            @keyframes scan {
              0% { top: 10%; }
              50% { top: 90%; }
              100% { top: 10%; }
            }
          `}</style>
          <div className="text-center space-y-2">
            <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Leitor de QR Code AngoExpress</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aproxime do código do comerciante</p>
          </div>
          
          <div className="w-full max-w-[280px] pt-8">
             <button className="w-full py-4 rounded-2xl bg-white border border-slate-100 text-slate-600 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 transition-all">
               <X size={16} className="text-red-600" /> Carregar da Galeria
             </button>
          </div>
        </>
      ) : (
        <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 space-y-6">
          <div className="text-center space-y-1">
             <h3 className="text-xl font-black text-slate-900 uppercase">Montante do Pagamento</h3>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Beneficiário: Entidade Comercial</p>
          </div>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-red-600 text-2xl">Kz</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-7 pl-16 pr-6 text-3xl font-black focus:border-red-600 focus:outline-none transition-all text-center"
            />
          </div>
          <button 
            disabled={isLoading || !amount}
            onClick={handleStartBiometric}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-red-100 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? <RefreshCw className="animate-spin" /> : <>Validar Pagamento</>}
          </button>
          <button onClick={() => setStep('scan')} className="w-full text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
            Cancelar Operação
          </button>
        </div>
      )}
    </div>
  );
};
