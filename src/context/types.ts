import { Person } from "../api/types";

export type SearchContextType = {
  history: Record<string, Person>
  setSearchHistory: (key: string, value: any) => void,
  contains: (key:string) => boolean,
  removeItem: (key:string) => void;
}