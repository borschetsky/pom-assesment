import React, { createContext, useEffect, useState } from 'react';
import { Person } from '../api/types';
import { SearchContextType } from './types';

const HISTORY = 'history'

export const HistoryContext = createContext<SearchContextType | undefined>(undefined);

const HistorySearchContext = ({ children }: {
   children: React.ReactNode
}) => {
  const [history, setHistory ] = useState<Record<string, Person>>({})

  useEffect(() => {
    const backup = localStorage.getItem(HISTORY);
    if (backup) {
      setHistory(JSON.parse(backup))
    }
  }, []);

  useEffect(() => {
     if (Object.keys(history).length === 0) {
      return;
     }
    localStorage.setItem(HISTORY, JSON.stringify(history));
  }, [history]);
  
  const setSearchHistory = (key: string, value: any) => {
    setHistory((prev) => {
      return {
        ...prev,
        [key]: value
      }
    })
    localStorage.setItem(HISTORY, JSON.stringify(history));
  };

  const contains = (key:string) => {
    return Object(history).hasOwnProperty(key)
  };

  const removeItem = (key:string) => {
    setHistory((prev) => {
      const copy = { ...prev };
      Reflect.deleteProperty(copy, key);
      return copy;
    });
  };

  return (
    <HistoryContext.Provider value={{
      history,
      setSearchHistory,
      contains,
      removeItem
    }}>
      { children }
    </HistoryContext.Provider>
  );
};

export default HistorySearchContext;
