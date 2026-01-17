
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  TrendingUp, 
  UserCheck, 
  Store, 
  PlusCircle, 
  ShieldCheck,
  MapPin,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const MARKET_PRODUCTS = [
  { id: 'm1', name: 'Toyota Hilux 2022', category: 'Veículos', price: 28500000, type: 'oficial', seller: 'AutoAngola', location: 'Talatona', image: 'https://images.unsplash.com/photo-1590362891175-30642436d4f1?auto=format&fit=crop&w=300&q=80', rating: 4.9 },
  { id: 'm2', name: 'iPhone 15 Pro Max', category: 'Electrónica', price: 1250000, type: 'particular', seller: 'Delson M.', location: 'Mutamba', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=300&q=80', rating: 4.2 },
  { id: 'm3', name: 'Suzuki S-Presso', category: 'Veículos', price: 4200000, type: 'particular', seller: 'Mestre P.', location: 'Viana', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80', rating: 4.5 },
  { id: 'm4', name: 'Samsung S24 Ultra', category: 'Electrónica', price: 980000, type: 'oficial', seller: 'Unitel Store', location: 'Kilamba', image: 'https://images.unsplash.com/photo-1707144888094-1188383c260f?auto=format&fit=crop&w=300&q=80', rating: 5.0 },
];

export const ProductSearch: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'tudo' | 'lojas' | 'particulares'>('tudo');
  const [category, setCategory] = useState<string>('Todas');

  const filtered = useMemo(() => {
    return MARKET_PRODUCTS.filter(p => {
      const matchesTab = activeTab === 'tudo' || 
                        (activeTab === 'lojas' && p.type === 'oficial') || 
                        (activeTab === 'particulares' && p.type === 'particular');
      const matchesCat = category === 'Todas' || p.category === category;
      return matchesTab && matchesCat;
    });
  }, [activeTab, category]);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">ANGO<span className="text-red-600">MARKET</span></h2>
          <button 
            onClick={() => setCurrentView('merchant_portal')}
            className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center gap-2 shadow-xl hover:bg-black transition-all"
          >
            <PlusCircle size={20} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Publicar</span>
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="O QUE PROCURA HOJE?" 
            className="w-full bg-white border border-slate-100 py-6 pl-14 pr-5 rounded-[2rem] text-[10px] font-black uppercase shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/5 transition-all"
          />
        </div>
      </header>

      <div className="flex bg-slate-100 p-1.5 rounded-[2rem] gap-1">
        {[
          { id: 'tudo', label: 'Tudo', icon: TrendingUp },
          { id: 'lojas', label: 'Lojas Oficiais', icon: Store },
          { id: 'particulares', label: 'Vendedores Particulares', icon: UserCheck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3.5 rounded-[1.5rem] flex items-center justify-center gap-2 transition-all ${
              activeTab === tab.id ? 'bg-white shadow-sm text-red-600' : 'text-slate-400'
            }`}
          >
            <tab.icon size={16} />
            <span className="text-[9px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="relative aspect-[16/10]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-5 left-5">
                 <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 ${
                   product.type === 'oficial' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                 }`}>
                   {product.type === 'oficial' && <ShieldCheck size={12}/>}
                   {product.type === 'oficial' ? 'Oficial' : 'Particular'}
                 </span>
              </div>
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                 <Star size={12} className="text-yellow-500 fill-yellow-500" />
                 <span className="text-[10px] font-black text-slate-900">{product.rating}</span>
              </div>
            </div>

            <div className="p-8">
               <div className="flex justify-between items-start mb-6">
                 <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{product.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                       <MapPin size={12} />
                       <span className="text-[9px] font-black uppercase tracking-widest">{product.location} • {product.seller}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">PREÇO</p>
                    <p className="text-xl font-black text-red-600">{product.price.toLocaleString()} AOA</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <button className="flex-1 bg-slate-50 text-slate-900 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">
                    Contactar Vendedor
                 </button>
                 <button className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl hover:bg-black transition-all">
                    <ShoppingCart size={22} />
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
