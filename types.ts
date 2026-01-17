
export type TransactionType = 'send' | 'receive' | 'payment' | 'deposit' | 'withdraw' | 'exchange' | 'sale_commission';

export interface CurrencyBalance {
  code: 'AOA' | 'USD' | 'BRL' | 'EUR';
  symbol: string;
  amount: number;
  iban?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: 'AOA' | 'USD' | 'BRL' | 'EUR';
  description: string;
  date: string;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  exchangeRate?: number;
}

export interface User {
  name: string;
  phone: string;
  balances: CurrencyBalance[];
  avatar: string;
}

export type AppView = 
  | 'home' 
  | 'history' 
  | 'scan' 
  | 'business' 
  | 'profile' 
  | 'deposit_methods' 
  | 'withdraw_methods' 
  | 'visa_deposit' 
  | 'euro_deposit' 
  | 'stock_market' 
  | 'iban_consult'
  | 'cards_view'
  | 'chat';
