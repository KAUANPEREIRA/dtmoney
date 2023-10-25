import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface TransactionType {
  id: number;
  description: string;
  type: string;
  createdAt: string;
  price: number;
  category: string;
}

interface TransactionContextType {
  transactions: TransactionType[];
  FetchTransactions: (query?: string) => Promise<void>;
  CreateTransaction: (data: CreateModal) => Promise<void>;
}

interface CreateModal {
  description: string;
  type: string;
  price: number;
  category: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const CreateTransaction = useCallback(async (data: CreateModal) => {
    const { description, category, price, type } = data;
    const response = await api.post("transactions", {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }, []);
  async function FetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
  }

  useEffect(() => {
    FetchTransactions();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ transactions, FetchTransactions, CreateTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
