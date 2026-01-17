
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Transaction, AppView, CurrencyBalance } from '../types';

interface AppContextType {
  user: User;
  transactions: Transaction[];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date' | 'status'> & { sourceCurrency?: string; sourceAmount?: number }) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isLoading, setIsLoading] = useState(false);
  
  const [user, setUser] = useState<User>({
    name: "António Manuel",
    phone: "+244 923 000 000",
    balances: [
      { code: 'AOA', symbol: 'Kz', amount: 125400.50, iban: "AO06 0001 0000 1234 5678 9012 3" },
      { code: 'USD', symbol: '$', amount: 450.00, iban: "US99 ANGO 1234 5678 9012 3456" },
      { code: 'BRL', symbol: 'R$', amount: 1200.00, iban: "BR12 0001 1234 5678 9012 3456" },
      { code: 'EUR', symbol: '€', amount: 85.00, iban: "BE68 0012 3456 7890 1234" }
    ],
    avatar: "https://picsum.photos/seed/ango/200"
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-pix-1',
      type: 'send',
      amount: 500,
      currency: 'BRL',
      description: 'Envio Internacional PIX (Brasil)',
      date: new Date().toISOString(),
      recipient: 'Carlos Silva (Brasil)',
      status: 'completed',
      exchangeRate: 168.45
    },
    {
      id: 'tx-visa-1',
      type: 'receive',
      amount: 100,
      currency: 'USD',
      description: 'Recebimento Cartão Visa',
      date: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed',
      exchangeRate: 932.40
    }
  ]);

  const addTransaction = (tx: any) => {
    const tempId = Math.random().toString(36).substr(2, 9);
    
    const newTx: Transaction = {
      ...tx,
      id: tempId,
      date: new Date().toISOString(),
      status: 'pending',
      ...(tx.currency !== 'AOA' && !tx.exchangeRate ? { exchangeRate: tx.currency === 'USD' ? 932.40 : 168.45 } : {})
    };
    
    setTransactions(prev => [newTx, ...prev]);
    setIsLoading(true);

    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => t.id === tempId ? { ...t, status: 'completed' } : t)
      );
      
      setUser(prev => {
        let newBalances = [...prev.balances];

        if (tx.sourceCurrency && tx.sourceAmount) {
          newBalances = newBalances.map(b => 
            b.code === tx.sourceCurrency ? { ...b, amount: b.amount - tx.sourceAmount } : b
          );
        }

        newBalances = newBalances.map(b => {
          if (b.code === tx.currency) {
            const isDeduction = tx.type === 'send' || tx.type === 'payment' || tx.type === 'withdraw';
            return {
              ...b,
              amount: isDeduction ? b.amount - tx.amount : b.amount + tx.amount
            };
          }
          return b;
        });

        return { ...prev, balances: newBalances };
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ user, transactions, currentView, setCurrentView, addTransaction, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
