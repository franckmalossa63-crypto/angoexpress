
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Building2, 
  UserCircle2, 
  Hash, 
  Smartphone, 
  ChevronRight,
  Globe,
  Zap,
  DollarSign,
  Euro,
  Lock,
  RefreshCw,
  CheckCircle2,
  Wallet,
  ArrowRightLeft,
  QrCode,
  Copy,
  Info,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PalancaLogo } from './PalancaLogo';

interface MethodItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  colorClass: string;
}

const MethodItem: React.FC<MethodItemProps> = ({ icon, title, subtitle, onClick, colorClass }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-95 transition-all hover:shadow-md"
  >
    <div className={`p-3 rounded-2xl ${colorClass}`}>
      {icon}
    </div>
    <div className="flex-1 text-left">
      <h4 className="font-black text-slate-800 uppercase text-xs tracking-wide">{title}</h4>
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{subtitle}</p>
    </div>
    <ChevronRight size={18} className="text-slate-300" />
  </button>
);

export const DepositMethods: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-6 pb-10">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Carregar Conta</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o método de depósito preferencial</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Institucional (Angola)</h3>
        <MethodItem 
          icon={<Hash size={24} />}
          title="Referência Multicaixa"
          subtitle="Gere uma referência para liquidação em ATM"
          colorClass="bg-red-50 text-red-600"
          onClick={() => {}} 
        />
        <MethodItem 
          icon={<Building2 size={24} />}
          title="Transferência IBAN (Kz)"
          subtitle="Depósito via sistema bancário nacional"
          colorClass="bg-black text-yellow-400"
          onClick={() => {}} 
        />
        
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mt-6">Fluxos Internacionais</h3>
        <MethodItem 
          icon={<CreditCard size={24} />}
          title="Cartão Visa / Mastercard"
          subtitle="Processamento imediato em USD"
          colorClass="bg-blue-50 text-blue-600"
          onClick={() => setCurrentView('visa_deposit')} 
        />
        <MethodItem 
          icon={<Euro size={24} />}
          title="Rede SEPA / Euro"
          subtitle="Processamento imediato em EUR"
          colorClass="bg-indigo-50 text-indigo-700"
          onClick={() => setCurrentView('euro_deposit')} 
        />
        <MethodItem 
          icon={<Zap size={24} />}
          title="PIX (Brasil)"
          subtitle="Depósito imediato via Real (BRL)"
          colorClass="bg-teal-50 text-teal-600"
          onClick={() => {}} 
        />
      </div>

      <button 
        onClick={() => setCurrentView('home')}
        className="w-full text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] py-4"
      >
        Cancelar Operação
      </button>
    </div>
  );
};

export const VisaDeposit: React.FC = () => {
  const { user, addTransaction, setCurrentView, isLoading } = useApp();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'balance'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const usdRate = 932.40;
  const sourceWallet = useMemo(() => {
    return user.balances.find(b => b.code === 'AOA') || user.balances[0];
  }, [user.balances]);

  const requiredSourceAmount = parseFloat(amount) * usdRate;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardExpiry(value.substring(0, 5));
  };

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      if (paymentMethod === 'card') {
        addTransaction({
          type: 'deposit',
          amount: val,
          currency: 'USD',
          description: 'Depósito via Cartão Visa',
        });
      } else {
        addTransaction({
          type: 'exchange',
          amount: val,
          currency: 'USD',
          sourceCurrency: sourceWallet.code,
          sourceAmount: requiredSourceAmount,
          description: `Conversão de ${sourceWallet.code} para USD`,
          exchangeRate: usdRate
        });
      }
      setIsSuccess(true);
      setTimeout(() => setCurrentView('history'), 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase">Processado!</h2>
        <p className="text-slate-500 max-w-[220px]">O seu saldo USD foi atualizado com sucesso.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-1 mb-6">
        <h2 className="text-2xl font-black text-slate-900 uppercase">Adquirir USD ($)</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Segurança Bancária Certificada</p>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button 
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
        >
          <CreditCard size={14} className="inline mr-2" /> Cartão Visa
        </button>
        <button 
          onClick={() => setPaymentMethod('balance')}
          className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${paymentMethod === 'balance' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
        >
          <Wallet size={14} className="inline mr-2" /> Pagar c/ Saldo
        </button>
      </div>

      {paymentMethod === 'card' ? (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 aspect-[1.58/1] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Globe size={80} /></div>
          <div className="flex justify-between items-start mb-6"><div className="italic font-black text-2xl">VISA</div></div>
          <div className="space-y-4">
            <div className="text-xl font-mono tracking-[0.2em] truncate">
              {cardNumber ? cardNumber.replace(/\d{4}(?=.)/g, '$& ') : '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between items-end">
              <div className="flex-1 mr-4">
                <p className="text-[8px] uppercase font-black opacity-60 mb-1">Titular</p>
                <p className="text-sm font-black uppercase truncate">{cardName || 'NOME NO CARTÃO'}</p>
              </div>
              <div className="mr-4 text-center">
                <p className="text-[8px] uppercase font-black opacity-60 mb-1">Expira</p>
                <p className="text-sm font-black">{cardExpiry || 'MM/AA'}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase font-black opacity-60 mb-1">CVV</p>
                <p className="text-sm font-black">{cardCVV ? '***' : '---'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-emerald-700 uppercase">Origem do Saldo</p>
            <span className="text-[10px] font-black text-emerald-600">Disponível: {sourceWallet.amount.toLocaleString()} {sourceWallet.code}</span>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Wallet size={20} /></div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase">Carteira Principal</p>
               <p className="font-black text-slate-800">{sourceWallet.code}</p>
             </div>
             <ArrowRightLeft className="ml-auto text-emerald-400" size={16} />
          </div>
          {amount && (
            <div className="bg-white/50 p-3 rounded-xl border border-dashed border-emerald-200 text-center">
               <p className="text-[9px] font-black text-emerald-700 uppercase">Taxa: 1 USD = {usdRate.toFixed(2)} Kz</p>
               <p className="text-[11px] font-black text-slate-900 uppercase mt-1">Total a debitar: {requiredSourceAmount.toLocaleString()} {sourceWallet.code}</p>
            </div>
          )}
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Número do Cartão</label>
            <div className="relative">
               <input 
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber.replace(/\d{4}(?=.)/g, '$& ')}
                onChange={handleCardNumberChange}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-mono focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all"
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome do Titular</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="NOME COMPLETO DO TITULAR"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black uppercase focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Validade</label>
              <input 
                type="text"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={handleExpiryChange}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-center"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">CVV</label>
              <input 
                type="password"
                placeholder="***"
                maxLength={3}
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-center"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1 pt-2 border-t border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 text-center block tracking-widest">Valor em Dólares (USD)</label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-blue-600 text-xl">$</span>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-900 text-white rounded-3xl py-6 pl-14 pr-6 text-3xl font-black focus:ring-8 focus:ring-blue-500/10 focus:outline-none transition-all text-center"
          />
        </div>
      </div>

      <button 
        disabled={isLoading || !amount || (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCVV)) || (paymentMethod === 'balance' && requiredSourceAmount > sourceWallet.amount)}
        onClick={handleDeposit}
        className={`w-full text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${paymentMethod === 'card' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
      >
        {isLoading ? <RefreshCw className="animate-spin" /> : <><Lock size={18} /> {paymentMethod === 'card' ? 'Autorizar Pagamento Visa' : 'Confirmar Operação'}</>}
      </button>
    </div>
  );
};

export const EuroDeposit: React.FC = () => {
  const { user, addTransaction, setCurrentView, isLoading } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'balance' | 'receive'>('card');
  const [amount, setAmount] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const eurRate = 1014.15;
  const sourceWallet = useMemo(() => {
    return user.balances.find(b => b.code === 'AOA') || user.balances[0];
  }, [user.balances]);

  const requiredSourceAmount = parseFloat(amount) * eurRate;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardExpiry(value.substring(0, 5));
  };

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      if (paymentMethod === 'card') {
        addTransaction({
          type: 'deposit',
          amount: val,
          currency: 'EUR',
          description: 'Depósito via Cartão Europeu',
        });
      } else {
        addTransaction({
          type: 'exchange',
          amount: val,
          currency: 'EUR',
          sourceCurrency: sourceWallet.code,
          sourceAmount: requiredSourceAmount,
          description: `Conversão de ${sourceWallet.code} para EUR`,
          exchangeRate: eurRate
        });
      }
      setIsSuccess(true);
      setTimeout(() => setCurrentView('history'), 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Câmbio Efetuado!</h2>
        <p className="text-slate-500 max-w-[220px]">Euros depositados com sucesso via processamento interno.</p>
      </div>
    );
  }

  if (paymentMethod === 'receive') {
    return (
      <div className="space-y-6 pb-10 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Receber EUR</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">O seu IBAN Europeu AngoExpress</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-indigo-600 flex flex-col items-center space-y-6">
           <div className="relative p-6 bg-slate-50 rounded-[2rem] border-4 border-white shadow-inner">
             <QrCode size={180} className="text-indigo-950" strokeWidth={1.5} />
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <PalancaLogo className="w-20 h-20" />
             </div>
           </div>

           <div className="w-full space-y-4">
             <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between group">
               <div className="overflow-hidden">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">IBAN SEPA (EUROPA)</p>
                 <p className="text-sm font-mono font-bold text-slate-800 truncate">BE68 0012 3456 7890 1234</p>
               </div>
               <button className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm active:scale-90 transition-all">
                  <Copy size={18} />
               </button>
             </div>

             <div className="flex items-start gap-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                <Info size={16} className="text-indigo-600 shrink-0 mt-1" />
                <p className="text-[9px] font-bold text-indigo-800 leading-relaxed uppercase">
                  Utilize este IBAN para rececionar transferências de qualquer instituição bancária europeia. O capital será creditado na sua conta em minutos.
                </p>
             </div>
           </div>
        </div>

        <button 
          onClick={() => setPaymentMethod('card')}
          className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          Voltar para Opções
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-1 mb-6">
        <h2 className="text-2xl font-black text-slate-900 uppercase">Adquirir EUR (€)</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo Mastercard Europe</p>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
        <button 
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
        >
          <CreditCard size={14} className="inline mr-2" /> Cartão
        </button>
        <button 
          onClick={() => setPaymentMethod('balance')}
          className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${paymentMethod === 'balance' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
        >
          <Wallet size={14} className="inline mr-2" /> Saldo
        </button>
        <button 
          onClick={() => setPaymentMethod('receive')}
          className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all ${(paymentMethod as string) === 'receive' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
        >
          <QrCode size={14} className="inline mr-2" /> Receber
        </button>
      </div>

      {paymentMethod === 'card' ? (
        <div className="bg-gradient-to-br from-indigo-700 to-blue-900 aspect-[1.58/1] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Euro size={120} /></div>
          <div className="italic font-black text-xl mb-6">Mastercard</div>
          <div className="space-y-4">
            <div className="text-xl font-mono tracking-[0.2em] truncate">
              {cardNumber ? cardNumber.replace(/\d{4}(?=.)/g, '$& ') : '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between items-end">
              <div className="flex-1 mr-4">
                <p className="text-[8px] uppercase font-black opacity-60 mb-1">Titular</p>
                <p className="text-sm font-black uppercase truncate">{cardName || 'NOME DO TITULAR'}</p>
              </div>
              <div className="mr-4">
                <p className="text-[8px] uppercase font-black opacity-60 mb-1">Expira</p>
                <p className="text-sm font-black">{cardExpiry || 'MM/AA'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-emerald-700 uppercase">Converter de:</p>
            <span className="text-[10px] font-black text-emerald-600">Disponível: {sourceWallet.amount.toLocaleString()} {sourceWallet.code}</span>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Wallet size={20} /></div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase">Saldo {sourceWallet.code}</p>
               <p className="font-black text-slate-800 tracking-tighter">Liquidação Imediata</p>
             </div>
             <ArrowRightLeft className="ml-auto text-emerald-400" size={16} />
          </div>
          {amount && (
            <div className="bg-white/50 p-3 rounded-xl border border-dashed border-emerald-200 text-center">
               <p className="text-[9px] font-black text-emerald-700 uppercase tracking-tighter">Taxa AngoExpress: 1 EUR = {eurRate.toFixed(2)} Kz</p>
               <p className="text-[11px] font-black text-slate-900 uppercase mt-1">Total a debitar: {requiredSourceAmount.toLocaleString()} {sourceWallet.code}</p>
            </div>
          )}
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Número do Cartão</label>
            <input 
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber.replace(/\d{4}(?=.)/g, '$& ')}
              onChange={handleCardNumberChange}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-mono focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome do Titular</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="EX: ANTONIO MANUEL"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black uppercase focus:border-indigo-500 focus:outline-none transition-all"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Validade</label>
              <input 
                type="text"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={handleExpiryChange}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black focus:border-indigo-500 focus:outline-none transition-all text-center"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">CVV</label>
              <input 
                type="password"
                placeholder="***"
                maxLength={3}
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black focus:border-indigo-500 focus:outline-none transition-all text-center"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1 pt-2 border-t border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 text-center block tracking-widest">Valor em Euros (EUR)</label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-indigo-600 text-xl">€</span>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-indigo-950 text-white rounded-3xl py-6 pl-14 pr-6 text-3xl font-black focus:ring-8 focus:ring-indigo-500/10 focus:outline-none transition-all text-center"
          />
        </div>
      </div>

      <button 
        disabled={isLoading || !amount || (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCVV)) || (paymentMethod === 'balance' && requiredSourceAmount > sourceWallet.amount)}
        onClick={handleDeposit}
        className={`w-full text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${paymentMethod === 'card' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
      >
        {isLoading ? <RefreshCw className="animate-spin" /> : <><Lock size={18} /> {paymentMethod === 'card' ? 'Pagar com Cartão' : 'Confirmar Conversão'}</>}
      </button>

      <button 
        onClick={() => setPaymentMethod('receive')}
        className="w-full bg-white border-2 border-indigo-100 text-indigo-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-3"
      >
        <QrCode size={18} /> Receber Transferência
      </button>

      {paymentMethod === 'balance' && requiredSourceAmount > sourceWallet.amount && (
        <p className="text-[9px] text-red-500 text-center font-bold uppercase animate-pulse">Saldo insuficiente para esta operação em {sourceWallet.code}.</p>
      )}
    </div>
  );
};

export const WithdrawMethods: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-6 pb-10">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Levantar Dinheiro</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Especifique o destino do capital</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Institucional</h3>
        <MethodItem 
          icon={<Building2 size={24} />}
          title="Conta Bancária (Kz)"
          subtitle="Envio para qualquer IBAN nacional"
          colorClass="bg-red-50 text-red-600"
          onClick={() => {}} 
        />
        <MethodItem 
          icon={<CreditCard size={24} />}
          title="Levantamento Sem Cartão"
          subtitle="Levante no ATM via código gerado"
          colorClass="bg-black text-yellow-400"
          onClick={() => {}} 
        />

        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mt-6">Internacional</h3>
        <MethodItem 
          icon={<Zap size={24} />}
          title="PIX (Brasil)"
          subtitle="Envio imediato para conta brasileira"
          colorClass="bg-teal-50 text-teal-600"
          onClick={() => {}} 
        />
        <MethodItem 
          icon={<CreditCard size={24} />}
          title="Resgate Cartão Visa"
          subtitle="Transferir para saldo de cartão externo"
          colorClass="bg-blue-50 text-blue-600"
          onClick={() => {}} 
        />
        <div className="grid grid-cols-2 gap-2">
           <MethodItem 
            icon={<DollarSign size={20} />}
            title="Dólares"
            subtitle="USD"
            colorClass="bg-emerald-50 text-emerald-600"
            onClick={() => {}} 
          />
          <MethodItem 
            icon={<Euro size={20} />}
            title="Euros"
            subtitle="EUR"
            colorClass="bg-blue-50 text-blue-700"
            onClick={() => {}} 
          />
        </div>

        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mt-6">Levantamento Físico</h3>
        <MethodItem 
          icon={<UserCircle2 size={24} />}
          title="Agente Autorizado"
          subtitle="Levantamento de numerário em ponto físico"
          colorClass="bg-yellow-50 text-yellow-600"
          onClick={() => {}} 
        />
      </div>

      <button 
        onClick={() => setCurrentView('home')}
        className="w-full text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] py-4"
      >
        Cancelar Operação
      </button>
    </div>
  );
};
