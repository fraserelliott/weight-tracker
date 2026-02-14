import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDataStore } from "./DataContext";
import { v4 as uuidv4 } from "uuid";

const WeightsContext = createContext(undefined);

export const WeightsProvider = ({ children }) => {
  const store = useDataStore();
  const saveQueue = useRef(Promise.resolve());
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState([]);

  // Hydrate once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const all = await store.getWeights();
        if (!cancelled) {
          setWeights(Array.isArray(all) ? all : []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load weights:", err);
          setWeights([]);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [store]);

  // Persist snapshots, serialized, but only after hydration
  useEffect(() => {
    if (loading) return;

    saveQueue.current = saveQueue.current
      .then(() => store.saveWeights(weights))
      .catch((err) => {
        // keep the chain alive
        console.error("Failed to save weights:", err);
      });
  }, [store, weights, loading]);

  // Mutators: sync, stable, based on prev state
  const addWeight = useCallback((date, weightKg) => {
    const created = { id: uuidv4(), date, weightKg };
    setWeights((prev) => [...prev, created]);
  }, []);

  const updateWeight = useCallback((id, updates) => {
    setWeights((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  }, []);

  const deleteWeight = useCallback((id) => {
    setWeights((prev) => prev.filter((w) => w.id !== id));
  }, []);

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
