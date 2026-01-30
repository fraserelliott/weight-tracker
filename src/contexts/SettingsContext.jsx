import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDataStore } from "./DataContext";

const SettingsContext = useContext(undefined);

export const SettingsProvider = ({ children }) => {
  const store = useDataStore();

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
