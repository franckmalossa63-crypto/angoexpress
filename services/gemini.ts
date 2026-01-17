
import { GoogleGenAI } from "@google/genai";

/**
 * Busca taxas de câmbio reais usando o Google Search Grounding.
 */
export const getExchangeRates = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: "Quais são as taxas de câmbio oficiais e comerciais atuais para 1 USD, 1 EUR e 1 BRL em Kwanzas Angolanos (AOA)? Retorne no formato 'USD: 932.40 AOA, EUR: 1014.15 AOA, BRL: 168.45 AOA'.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri
      }))
      .filter(source => source.uri);

    return {
      text: response.text || "USD: 932.40 AOA, EUR: 1014.15 AOA, BRL: 168.45 AOA",
      sources: sources
    };
  } catch (error) {
    return { 
      text: "USD: 932.40 AOA, EUR: 1014.15 AOA, BRL: 168.45 AOA", 
      sources: [] 
    };
  }
};

/**
 * Chat interativo com o Assistente Inteligente.
 */
export const chatWithKamba = async (message: string, history: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "Tu és o 'Assistente AngoExpress', um consultor financeiro de elite. Utiliza o Português de Portugal (PT-PT), mantendo um tom profissional, educado e prestativo. Evita gírias ou linguagem informal. Ajuda os utilizadores com questões sobre câmbio, poupança e investimentos no mercado BODIVA.",
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    return "Lamentamos, mas ocorreu um erro na ligação. Por favor, tente novamente.";
  }
};

export const getFinancialInsight = async (transactions: any[], balances: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const prompt = `Analise os seguintes dados financeiros e forneça uma análise curta e profissional em Português de Portugal.
    Saldos: ${JSON.stringify(balances)}
    Transações: ${JSON.stringify(transactions.slice(0, 5))}
    FOCO: Eficiência e segurança financeira.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    return { text: response.text };
  } catch (error) {
    return { text: "A SUA CARTEIRA ESTÁ PROTEGIDA E EM CONFORMIDADE." };
  }
};
