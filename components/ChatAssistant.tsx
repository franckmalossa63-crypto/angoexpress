
import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, MessageSquare, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { chatWithKamba } from '../services/gemini';
import { PalancaLogo } from './PalancaLogo';

export const ChatAssistant: React.FC = () => {
  const { setCurrentView } = useApp();
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "BEM-VINDO AO SUPORTE INTELIGENTE ANGOEXPRESS. COMO POSSO AJUDAR NAS SUAS OPERAÇÕES HOJE?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg.toUpperCase() }]);
    setLoading(true);

    const response = await chatWithKamba(userMsg, messages);
    setMessages(prev => [...prev, { role: 'bot', text: response.toUpperCase() }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-xl text-white">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">ASSISTENTE IA</h2>
            <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">DISPONÍVEL AGORA</p>
          </div>
        </div>
        <button onClick={() => setMessages([{ role: 'bot', text: "EM QUE POSSO SER ÚTIL AGORA?" }])} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 px-2 pb-4 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-[10px] font-black tracking-tight leading-relaxed shadow-sm border ${
              m.role === 'user' 
                ? 'bg-red-600 text-white border-red-700 rounded-br-none' 
                : 'bg-white text-slate-800 border-slate-100 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-5 rounded-[2rem] rounded-bl-none flex gap-1.5 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 relative">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="COMO POSSO AJUDAR?"
          className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 pl-7 pr-16 text-[10px] font-black uppercase focus:border-red-600 focus:outline-none shadow-xl transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 text-white p-3.5 rounded-2xl shadow-lg active:scale-90 disabled:opacity-50 transition-all hover:bg-red-700"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
