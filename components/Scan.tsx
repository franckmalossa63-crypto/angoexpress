
import React, { useState } from 'react';
import { 
  QrCode, 
  Camera, 
  CheckCircle2, 
  RefreshCw, 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  Scan as ScanIcon,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

type ScanStep = 'scan' | 'amount' | 'auth_choice' | 'biometric' | 'confirm';

export const ScanScreen: React.FC = () => {
  const { addTransaction, isLoading, setCurrentView } = useApp();
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<ScanStep>('scan');

  const handleSimulateScan = () => setStep('amount');

  const handleProceedToAuth = () => {
    if (parseFloat(amount) > 0) setStep('auth_choice');
  };

  const handleStartBiometric = () => {
    setStep('biometric');
    // Simulação premium de validação via AngoExpress Cloud
    setTimeout(() => {
       const val = parseFloat(amount);
       addTransaction({
         id: 'SCAN-' + Math.random().toString(36).substring(7).toUpperCase(),
         type: 'payment',
         amount: val,
         currency: 'AOA',
         description: 'Pagamento Comercial QR',
         recipient: 'ANGO-MERCHANT-882'
       });
       setStep('confirm');
    }, 2800);
  };

  if (step === 'auth_choice') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-t-[10px] border-red-600 text-center">
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 shadow-inner">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Autorização Biométrica</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
            PAGAR AGORA: <span className="text-red-600">{parseFloat(amount).toLocaleString()} AOA</span>
          </p>
          
          <div className="mt-10 space-y-4">
            <button 
              onClick={handleStartBiometric}
              className="w-full bg-slate-950 text-white p-6 rounded-3xl flex items-center justify-between group active:scale-95 transition-all shadow-2xl border-b-4 border-slate-800"
            >
              <div className="flex items-center gap-5">
                <div className="bg-red-600 p-3 rounded-2xl shadow-lg">
                  <Fingerprint size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-black uppercase tracking-widest leading-none mb-1">Confirmar Biometria</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Touch ID / Face ID</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-600" />
            </button>

            <button 
              onClick={() => alert("Introduza o seu código secreto AngoExpress")}
              className="w-full bg-white border-2 border-slate-100 p-6 rounded-3xl flex items-center justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="bg-slate-100 p-3 rounded-2xl text-slate-400">
                  <Lock size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-black uppercase tracking-widest text-slate-900 mb-1">Usar PIN Seguro</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Validação Manual</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
          </div>
        </div>
        <button onClick={() => setStep('amount')} className="w-full text-slate-400 font-black uppercase text-[10px] tracking-[0.4em] text-center hover:text-red-600 transition-colors">
          « Voltar e Editar
        </button>
      </div>
    );
  }

  if (step === 'biometric') {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-12 animate-in fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/30 blur-[100px] rounded-full animate-pulse"></div>
          <div className="w-56 h-56 bg-white border-8 border-white rounded-full flex items-center justify-center relative shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
            <div className="absolute inset-4 border-4 border-red-600 border-dashed rounded-full animate-[spin_12s_linear_infinite] opacity-30"></div>
            <Fingerprint size={100} strokeWidth={1} className="text-red-600 animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 shadow-[0_0_30px_#d60000] animate-[biometric_2.5s_ease-in-out_infinite] rounded-full"></div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Validar <span className="text-red-600">Identidade</span></h2>
          <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.5em] animate-pulse">Processamento seguro encriptado...</p>
        </div>

        <div className="bg-slate-950 px-8 py-5 rounded-[2.5rem] flex items-center gap-4 border border-white/10 shadow-2xl">
           <ShieldCheck size={22} className="text-red-600" />
           <span className="text-[11px] font-black uppercase text-white tracking-[0.2em]">Criptografia Militar v3.1</span>
        </div>

        <style>{`
          @keyframes biometric {
            0% { top: 20%; opacity: 0; }
            50% { top: 80%; opacity: 1; }
            100% { top: 20%; opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-10 animate-in zoom-in-95 duration-700">
        <div className="w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(16,185,129,0.3)] animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">PAGO!</h2>
          <p className="text-slate-500 max-w-[280px] font-medium text-base leading-relaxed">
            O pagamento de <span className="font-black text-slate-900">{parseFloat(amount).toLocaleString()} AOA</span> foi liquidado instantaneamente.
          </p>
        </div>
        <button 
          onClick={() => setCurrentView('home')}
          className="bg-slate-950 text-white px-16 py-7 rounded-[3rem] font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all text-sm italic border-b-8 border-slate-800"
        >
          Finalizar Sessão
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col items-center justify-center pb-20 animate-in fade-in">
      {step === 'scan' ? (
        <>
          <div className="relative w-80 h-80 bg-slate-950 rounded-[5rem] flex items-center justify-center overflow-hidden border-[16px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <ScanIcon className="text-white w-48 h-48 opacity-5" />
            <div className="absolute top-0 w-full h-2 bg-red-600 shadow-[0_0_40px_#d60000] animate-[vscan_3s_ease-in-out_infinite] rounded-full"></div>
            <button 
              onClick={handleSimulateScan}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-8 group"
            >
              <div className="bg-red-600 p-8 rounded-[3rem] mb-8 shadow-2xl shadow-red-900/40 group-active:scale-90 transition-transform">
                 <Camera size={48} className="text-white" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.6em] italic opacity-80 group-hover:opacity-100 transition-opacity">Capturar Código</span>
            </button>
          </div>
          <style>{` @keyframes vscan { 0% { top: 15%; } 50% { top: 85%; } 100% { top: 15%; } } `}</style>
          
          <div className="text-center space-y-3 mt-12">
            <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">ANGO<span className="text-red-600">EXPRESS</span> SCAN V4</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Compatível BNA • EMIS • Multicaixa Express</p>
          </div>
        </>
      ) : (
        <div className="w-full bg-white rounded-[4rem] p-12 shadow-2xl border-b-[16px] border-red-600 space-y-12 animate-in slide-in-from-bottom-10">
          <div className="text-center space-y-3">
             <div className="bg-red-50 text-red-600 w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
               <QrCode size={32} />
             </div>
             <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Valor do Pagamento</h3>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">TRANSAÇÃO EM TEMPO REAL 24/7</p>
          </div>
          
          <div className="relative">
            <span className="absolute left-10 top-1/2 -translate-y-1/2 font-black text-red-600 text-4xl italic">Kz</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 border-4 border-slate-100 rounded-[3rem] py-12 pl-24 pr-10 text-6xl font-black focus:border-red-600 focus:outline-none transition-all text-center tracking-tighter shadow-inner"
            />
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] flex items-center gap-6 border border-slate-100 shadow-sm">
             <ShieldAlert size={28} className="text-amber-500" />
             <p className="text-[10px] font-black text-slate-500 uppercase leading-relaxed tracking-tight">
               Ao confirmar, o capital será transferido instantaneamente sob custódia do sistema AngoExpress.
             </p>
          </div>

          <button 
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            onClick={handleProceedToAuth}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] shadow-[0_25px_50px_rgba(214,0,0,0.25)] active:scale-95 transition-all flex items-center justify-center gap-6 italic text-base border-b-8 border-red-800"
          >
            {isLoading ? <RefreshCw className="animate-spin" /> : <>Validar Operação</>}
          </button>
          
          <button onClick={() => setStep('scan')} className="w-full text-slate-400 font-black uppercase text-[11px] tracking-[0.5em] hover:text-red-600 transition-colors">
            Cancelar e Sair
          </button>
        </div>
      )}
    </div>
  );
};
