
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Transaction, AppView } from '../types';

interface AppContextType {
  user: User;
  transactions: Transaction[];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  addTransaction: (tx: any) => void;
  isLoading: boolean;
  isOnline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [user, setUser] = useState<User>({
    name: "António Manuel",
    phone: "+244 923 000 000",
    balances: [
      { code: 'AOA', symbol: 'Kz', amount: 125400.50, iban: "AO06 0001 0000 1234 5678 9012 3" },
      { code: 'USD', symbol: '$', amount: 450.00, iban: "US99 ANGO 1234 5678 9012 3456" },
      { code: 'EUR', symbol: '€', amount: 85.00, iban: "BE68 0012 3456 7890 1234" },
      { code: 'BRL', symbol: 'R$', amount: 1200.00, iban: "BR12 0001 1234 5678 9012 3456" }
    ],
    avatar: "https://picsum.photos/seed/ango/200"
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      type: 'receive',
      amount: 15000,
      currency: 'AOA',
      description: 'Transferência Multicaixa Express',
      date: new Date().toISOString(),
      status: 'completed'
    }
  ]);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const addTransaction = (tx: any) => {
    setIsLoading(true);
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setTransactions(prev => [newTx, ...prev]);
    
    // Simulação de Sincronização
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => t.id === newTx.id ? { ...t, status: 'completed' } : t)
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AppContext.Provider value={{ user, transactions, currentView, setCurrentView, addTransaction, isLoading, isOnline }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
