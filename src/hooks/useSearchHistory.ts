import { useEffect, useState } from "react";
import { Person } from "../api/types";
const HISTORY = 'history'
export const useSearchHistory = () => {
  const [history, setHistory ] = useState<Record<string, Person>>({})
  
  useEffect(() => {
    const backup = localStorage.getItem(HISTORY);
    if (backup) {
      setHistory(JSON.parse(backup))
    }
  }, [])

  useEffect(() => {
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
  }

  const contains = (key:string) => {
    return Object(history).hasOwnProperty(key)
  };

  const removeItem = (key:string) => {
    setHistory((prev) => {
      const copy = { ...prev };
      Reflect.deleteProperty(copy, key);
      return copy;
    });

  }
  return {
    history,
    setSearchHistory,
    contains,
    removeItem
  }
}