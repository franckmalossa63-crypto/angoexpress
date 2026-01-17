
import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, ArrowBigDownDash } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<'android' | 'ios' | 'other'>('other');

  useEffect(() => {
    // Check if already in standalone mode
    if ((window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
      setPlatform('ios');
      const hasShown = localStorage.getItem('pwa_ios_prompt_shown');
      if (!hasShown) setIsVisible(true);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setPrompt(e);
      setPlatform('android');
      setIsVisible(true);
    });
  }, []);

  const handleInstall = async () => {
    if (platform === 'ios') {
      alert("Para instalar a AngoExpress no teu iPhone:\n1. Clica no ícone de 'Partilhar' (em baixo no Safari)\n2. Seleciona 'Adicionar ao Ecrã Principal'");
      setIsVisible(false);
      localStorage.setItem('pwa_ios_prompt_shown', 'true');
      return;
    }

    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
        setPrompt(null);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-[100] animate-in slide-in-from-top-10 duration-500">
      <div className="bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl border-2 border-red-600 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2.5 rounded-2xl shadow-lg animate-bounce">
            <Download size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest italic">Instalar AngoExpress</h4>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Acede ao teu kumbu mais rápido</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstall}
            className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors"
          >
            Instalar
          </button>
          <button onClick={() => setIsVisible(false)} className="p-2 text-slate-500 hover:text-white">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
