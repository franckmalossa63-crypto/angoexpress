
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  History, 
  QrCode, 
  ChevronLeft,
  Bell,
  TrendingUp,
  LayoutDashboard,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { PalancaLogo } from './PalancaLogo';
import { PWAInstallBanner } from './PWAInstallBanner';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentView, setCurrentView } = useApp();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'stock_market', icon: TrendingUp, label: 'Mercado' },
    { id: 'scan', icon: QrCode, label: 'Pagar', center: true },
    { id: 'history', icon: History, label: 'Movimentos' },
    { id: 'business', icon: LayoutDashboard, label: 'Gestão' },
  ];

  if (isAppLoading) {
    return (
      <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 mb-8">
          <PalancaLogo className="w-full h-full text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-2 italic">ANGO<span className="text-red-600">EXPRESS</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[8px]">SISTEMA FINANCEIRO DIGITAL</p>
        <div className="mt-12 w-32 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD] relative overflow-hidden animate-app-entry">
      <PWAInstallBanner />
      
      <header className="bg-white/90 backdrop-blur-xl px-6 py-6 flex items-center justify-between sticky top-0 z-40 border-b border-slate-100 safe-area-top">
        <div className="flex items-center gap-3">
          {currentView !== 'home' ? (
            <button onClick={() => setCurrentView('home')} className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
          ) : (
            <div className="p-1.5 bg-red-600 text-white rounded-xl shadow-lg shadow-red-900/10">
              <PalancaLogo className="w-6 h-6" />
            </div>
          )}
          <h1 className="text-xl font-black tracking-tight text-slate-900 italic">
            ANGO<span className="text-red-600">EXPRESS</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('chat')} className={`p-2.5 rounded-2xl transition-all ${currentView === 'chat' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}>
             <MessageCircle size={22} />
          </button>
          <button onClick={() => setCurrentView('profile')} className="p-0.5 bg-slate-100 rounded-full border border-slate-200">
            <div className="w-9 h-9 bg-white rounded-full overflow-hidden">
              <img src="https://picsum.photos/seed/ango/200" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-28 px-6 pt-5">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center h-22 px-4 sm:max-w-[430px] sm:mx-auto z-50 safe-area-bottom shadow-[0_-15px_40px_rgba(0,0,0,0.04)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as AppView)}
            className={`flex flex-col items-center justify-center transition-all ${
              item.center 
                ? 'bg-red-600 text-white w-16 h-16 rounded-[2rem] -translate-y-8 shadow-2xl shadow-red-900/20 border-4 border-white active:scale-90' 
                : currentView === item.id ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon className={item.center ? 'w-8 h-8' : 'w-6 h-6'} strokeWidth={item.center ? 2.5 : 2} />
            {!item.center && <span className="text-[9px] mt-2 font-black uppercase tracking-widest">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};
