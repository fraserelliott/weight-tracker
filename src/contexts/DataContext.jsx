import { createContext, useContext, useMemo } from "react";
import { dataStore } from "@store";

/** @type {React.Context<import("../data/dataStore").WeightDataStore | undefined>} */
const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const store = useMemo(() => dataStore, []);

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useDataStore() {
  const ctx = useContext(DataContext);
  if (ctx === undefined) {
    throw new Error("useDataStore must be used within a DataProvider");
  }
  return ctx;
}
