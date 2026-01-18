
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  History, 
  QrCode, 
  ChevronLeft,
  LayoutDashboard,
  MessageCircle,
  Wifi,
  WifiOff,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { PalancaLogo } from './PalancaLogo';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentView, setCurrentView, isOnline } = useApp();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (splash) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="w-24 h-24 mb-6 relative">
          <PalancaLogo className="w-full h-full text-red-600 animate-pulse" />
          <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full animate-ping"></div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter italic">ANGO<span className="text-red-600">EXPRESS</span></h1>
        <div className="mt-12 flex flex-col items-center gap-2">
           <div className="h-1 w-32 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
           </div>
           <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">A carregar ecossistema...</p>
        </div>
        <style>{` @keyframes loading { 0% { width: 0%; } 50% { width: 100%; } 100% { width: 0%; } } `}</style>
      </div>
    );
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'stock_market', icon: TrendingUp, label: 'BODIVA' },
    { id: 'scan', icon: QrCode, label: 'Pagar', center: true },
    { id: 'marketplace', icon: ShoppingBag, label: 'Mercado' },
    { id: 'history', icon: History, label: 'Extrato' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA] relative overflow-hidden animate-app-entry">
      <header className="bg-white/80 backdrop-blur-2xl px-6 py-5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-100 safe-area-top">
        <div className="flex items-center gap-3">
          {currentView !== 'home' ? (
            <button onClick={() => setCurrentView('home')} className="p-2 bg-slate-50 rounded-2xl transition-all">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
          ) : (
            <div className="p-1.5 bg-red-600 text-white rounded-xl shadow-lg">
              <PalancaLogo className="w-6 h-6" />
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-slate-900 italic leading-none">
              ANGO<span className="text-red-600">EXPRESS</span>
            </h1>
            <div className="flex items-center gap-1 mt-1">
              {isOnline ? (
                <span className="flex items-center gap-1 text-[7px] font-black text-emerald-500 uppercase tracking-widest">
                  <Wifi size={8} /> Online
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[7px] font-black text-red-500 uppercase tracking-widest">
                  <WifiOff size={8} /> Modo Offline
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('chat')} className={`p-2.5 rounded-2xl transition-all ${currentView === 'chat' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 bg-slate-50'}`}>
             <MessageCircle size={22} />
          </button>
          <button onClick={() => setCurrentView('profile')} className="w-10 h-10 rounded-full border-2 border-red-100 p-0.5 overflow-hidden active:scale-90 transition-all">
            <img src="https://picsum.photos/seed/ango/200" alt="Avatar" className="w-full h-full object-cover rounded-full" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 px-6 pt-5">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center h-24 px-4 sm:max-w-[430px] sm:mx-auto z-50 safe-area-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as AppView)}
            className={`flex flex-col items-center justify-center transition-all ${
              item.center 
                ? 'bg-red-600 text-white w-16 h-16 rounded-[1.8rem] -translate-y-10 shadow-2xl shadow-red-900/30 border-4 border-white active:scale-90' 
                : currentView === item.id ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon className={item.center ? 'w-8 h-8' : 'w-6 h-6'} strokeWidth={3} />
            {!item.center && <span className="text-[8px] mt-2 font-black uppercase tracking-[0.15em]">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};
