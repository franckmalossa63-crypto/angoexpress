
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { HomeScreen } from './components/Home';
import { HistoryScreen } from './components/History';
import { ScanScreen } from './components/Scan';
import { BusinessScreen } from './components/Business';
import { StockMarket } from './components/StockMarket';
import { IBANConsult, CardsView } from './components/WalletDetails';
import { DepositMethods, WithdrawMethods, VisaDeposit, EuroDeposit } from './components/FinanceFlow';
import { ChatAssistant } from './components/ChatAssistant';
import { Share2, ChevronRight, Shield, Smartphone, Landmark, Globe } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeScreen />;
      case 'history': return <HistoryScreen />;
      case 'scan': return <ScanScreen />;
      case 'business': return <BusinessScreen />;
      case 'stock_market': return <StockMarket />;
      case 'deposit_methods': return <DepositMethods />;
      case 'withdraw_methods': return <WithdrawMethods />;
      case 'visa_deposit': return <VisaDeposit />;
      case 'euro_deposit': return <EuroDeposit />;
      case 'iban_consult': return <IBANConsult />;
      case 'cards_view': return <CardsView />;
      case 'chat': return <ChatAssistant />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return <Layout>{renderView()}</Layout>;
};

const ProfileScreen = () => {
  const { user } = useApp();
  const { t, language, setLanguage } = useLanguage();
  
  const langs = [
    { id: 'pt', label: 'Português', flag: '🇦🇴' },
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'AngoExpress',
      text: 'Utilize a AngoExpress para uma gestão financeira moderna e segura em Angola. 🇦🇴🚀',
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Ligação copiada para a área de transferência!');
      }
    } catch (err) {
      console.error('Erro ao partilhar:', err);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-[2.5rem] p-8 text-center border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-600 to-black opacity-10"></div>
        <div className="w-28 h-28 bg-gradient-to-tr from-red-600 to-black rounded-full mx-auto p-1 mb-6 shadow-xl relative z-10">
           <img src={user.avatar} alt="User" className="w-full h-full object-cover rounded-full border-4 border-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{user.name}</h2>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mt-1">{user.phone}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-black text-slate-400 uppercase text-[9px] tracking-widest px-4">{t('language')}</h3>
        <div className="grid grid-cols-2 gap-3">
          {langs.map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id as any)}
              className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${
                language === l.id ? 'border-red-600 bg-red-50 text-red-600' : 'border-slate-100 bg-white text-slate-400'
              }`}
            >
              <span className="text-xl">{l.flag}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-black text-slate-400 uppercase text-[9px] tracking-widest px-4">Comunidade</h3>
        <button onClick={handleShare} className="w-full bg-slate-900 text-white p-6 rounded-[2rem] flex items-center justify-between group active:scale-95 transition-all shadow-xl">
           <div className="flex items-center gap-4 text-left">
             <div className="bg-red-600 p-3 rounded-2xl">
                <Share2 size={24} className="text-white" />
             </div>
             <div>
                <p className="text-[11px] font-black uppercase tracking-widest mb-1">{t('share_app')}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{t('share_desc')}</p>
             </div>
           </div>
           <ChevronRight size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-2 border-b border-slate-50 pb-2">{t('security')}</h3>
        <div className="space-y-3">
          {[
            { icon: Shield, label: 'Biometria Facial', status: 'Activo', color: 'text-emerald-500' },
            { icon: Smartphone, label: 'Modo Offline', status: 'ON', color: 'text-blue-500' },
            { icon: Landmark, label: 'Conformidade BNA', status: 'OK', color: 'text-amber-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.color} />
                <span className="text-[10px] font-black text-slate-700 uppercase">{item.label}</span>
              </div>
              <span className={`text-[8px] font-black px-2.5 py-1 rounded-md ${item.color} bg-white border border-current`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full text-red-600 font-black uppercase text-[10px] tracking-[0.4em] py-5 bg-white rounded-2xl border border-red-100 active:bg-red-50 transition-all">
        {t('exit')}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
};

export default App;
