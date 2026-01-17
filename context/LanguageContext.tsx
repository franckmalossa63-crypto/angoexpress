
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pt: {
    welcome: "BEM-VINDO",
    balance: "SALDO DISPONÍVEL",
    send: "ENVIAR",
    receive: "RECEBER",
    load: "CARREGAR",
    history: "MOVIMENTOS",
    business: "GESTÃO",
    settings: "DEFINIÇÕES",
    language: "IDIOMA",
    share_app: "PARTILHAR APLICAÇÃO",
    pwa_desc: "Aceda às suas finanças com rapidez",
    share_desc: "Convide os seus contactos para a rede",
    security: "SEGURANÇA",
    exit: "ENCERRAR SESSÃO"
  },
  en: {
    welcome: "WELCOME",
    balance: "AVAILABLE BALANCE",
    send: "SEND",
    receive: "RECEIVE",
    load: "TOP UP",
    history: "TRANSACTIONS",
    business: "BUSINESS",
    settings: "SETTINGS",
    language: "LANGUAGE",
    share_app: "SHARE APP",
    pwa_desc: "Access your money faster",
    share_desc: "Share the vision with friends",
    security: "SECURITY",
    exit: "LOGOUT SECURELY"
  },
  es: {
    welcome: "BIENVENIDO",
    balance: "SALDO DISPONIBLE",
    send: "ENVIAR",
    receive: "RECIBIR",
    load: "CARGAR",
    history: "HISTORIAL",
    business: "NEGOCIOS",
    settings: "AJUSTES",
    language: "IDIOMA",
    share_app: "COMPARTIR APP",
    pwa_desc: "Accede a tu dinero más rápido",
    share_desc: "Comparte la visión con amigos",
    security: "SEGURIDAD",
    exit: "CERRAR SESIÓN"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language]?.[key] || translations['pt'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
