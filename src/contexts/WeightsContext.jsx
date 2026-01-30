import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useDataStore } from "./DataContext";

const WeightsContext = createContext(undefined);

export const WeightsProvider = ({ children }) => {
  const store = useDataStore();
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const all = await store.getWeights();
      if (!cancelled) {
        setWeights(all);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [store]);

  const addWeight = useCallback(
    async (entry) => {
      const created = await store.addWeight(entry);
      setWeights((prev) => [...prev, created]);
    },
    [store],
  );

  const updateWeight = useCallback(
    async (id, updates) => {
      const updated = await store.updateWeight(id, updates);
      if (!updated) return;
      setWeights((prev) => prev.map((w) => (w.id === id ? updated : w)));
    },
    [store],
  );

  const deleteWeight = useCallback(
    async (id) => {
      await store.deleteWeight(id);
      setWeights((prev) => prev.filter((w) => w.id !== id));
    },
    [store],
  );

  const value = useMemo(
    () => ({
      weights,
      loading,
      addWeight,
      updateWeight,
      deleteWeight,
    }),
    [weights, loading, addWeight, updateWeight, deleteWeight],
  );

  return (
    <WeightsContext.Provider value={value}>{children}</WeightsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useWeights() {
  const ctx = useContext(WeightsContext);
  if (ctx === undefined) {
    throw new Error("useWeights must be used within a WeightsProvider");
  }
  return ctx;
}
