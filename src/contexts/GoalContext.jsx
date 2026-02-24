import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useDataStore } from "./DataContext";

const GoalContext = createContext(null);

export const GoalProvider = ({ children }) => {
  const store = useDataStore();
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState(null);

  // Hydrate once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const all = await store.getGoal();
        if (!cancelled) {
          setGoal(typeof all === "object" ? all : null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load goal:", err);
          setGoal(null);
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

    (async () => {
      try {
        await store.saveGoal(goal);
      } catch (err) {
        console.error("Failed to save goal:", err);
      }
    })();
  }, [store, goal, loading]);

  const updateGoal = useCallback((goal) => {
    setGoal(goal);
  }, []);

  const deleteGoal = useCallback(() => {
    setGoal(null);
  }, []);

  const value = useMemo(
    () => ({ goal, loading, updateGoal, deleteGoal }),
    [goal, loading, updateGoal, deleteGoal],
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useGoal() {
  const ctx = useContext(GoalContext);
  if (!ctx) {
    throw new Error("useGoal must be used within a GoalProvider");
  }
  return ctx;
}
