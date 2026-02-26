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
import { useGoal } from "@contexts/GoalContext";

const WeightsContext = createContext(undefined);

export const WeightsProvider = ({ children }) => {
  const store = useDataStore();
  const saveQueue = useRef(Promise.resolve());
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState([]);
  const { goal } = useGoal();

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

  const weightsWithStats = useMemo(() => {
    const enriched = addRollingAverage(weights);
    return addGoalWeight(enriched, goal);
  }, [weights, goal]);

  // Mutators: sync, stable, based on prev state
  const addWeight = useCallback((date, weightKg) => {
    setWeights((prev) => {
      const newDay = daysSinceEpoch(date);
      const created = { id: uuidv4(), date, weightKg };

      // Find insertion point
      let i = 0;
      for (; i < prev.length; i++) {
        const day = daysSinceEpoch(prev[i].date);
        if (day < newDay) break; // found where it belongs
      }

      // Insert at correct index
      return [...prev.slice(0, i), created, ...prev.slice(i)];
    });
  }, []);

  const sortWeights = useCallback(() => {
    setWeights((prev) =>
      [...prev].sort((a, b) => new Date(b.date) - new Date(a.date)),
    );
  }, []);

  const updateWeight = useCallback((id, updates) => {
    setWeights((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  }, []);

  const deleteWeight = useCallback((id) => {
    setWeights((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const findDuplicate = useCallback(
    (entry) => {
      return weights.find((e) => e.date === entry.date);
    },
    [weights],
  );

  const value = useMemo(
    () => ({
      weights,
      weightsWithStats,
      loading,
      addWeight,
      updateWeight,
      deleteWeight,
      findDuplicate,
      sortWeights,
    }),
    [
      weights,
      weightsWithStats,
      loading,
      addWeight,
      updateWeight,
      deleteWeight,
      findDuplicate,
      sortWeights,
    ],
  );

  return (
    <WeightsContext.Provider value={value}>{children}</WeightsContext.Provider>
  );
};

// expects weightEntries sorted newest to oldest
function addRollingAverage(weightEntries) {
  return weightEntries.map((entry, index) => {
    return {
      ...entry,
      rollingAverageKg: rollingAverageDay(weightEntries, index),
    };
  });
}

function rollingAverageDay(weightEntries, index) {
  const indexDate = daysSinceEpoch(weightEntries[index].date);
  let sum = 0;
  let count = 0;
  for (let i = index; i < weightEntries.length; i++) {
    const entryDate = daysSinceEpoch(weightEntries[i].date);
    const difference = indexDate - entryDate;
    if (difference < 7) {
      sum += weightEntries[i].weightKg;
      count++;
    }
    if (difference >= 7) break;
  }
  return { count, avg: count ? sum / count : null };
}

// requires rolling averages in weightEntries
function addGoalWeight(weightEntries, goal) {
  if (!goal) return weightEntries;
  return weightEntries.map((entry, index) => {
    return {
      ...entry,
      goalWeightKg: goalWeightDay(weightEntries, goal, index),
    };
  });
}

function goalWeightDay(weightEntries, goal, index) {
  if (index === weightEntries.length - 1) return null;
  const entry = weightEntries[index];
  const previousEntry = weightEntries[index + 1];
  // previousEntry should be on/after goal start for a baseline
  if (previousEntry.date < goal.start) return null;
  return calculateGoalWeight(entry, previousEntry, goal);
}

function calculateGoalWeight(entry, previousEntry, goal) {
  const entryDay = daysSinceEpoch(entry.date);
  const prevDay = daysSinceEpoch(previousEntry.date);

  const intervalDays = entryDay - prevDay;
  if (intervalDays < 0) {
    throw new Error(
      "calculateGoalWeight: entry.date must be on/after previousEntry.date",
    );
  }

  const weeklyMultiplier =
    goal.type === "lose" ? 1 - goal.weeklyRate : 1 + goal.weeklyRate;

  const baseline =
    previousEntry.rollingAverageKg?.avg ?? previousEntry.weightKg;
  const weight = baseline * Math.pow(weeklyMultiplier, intervalDays / 7);
  return { intervalDays, weight };
}

const daysSinceEpoch = (dateStr) =>
  Math.floor(new Date(dateStr + "T00:00:00Z").getTime() / 86400000);

// eslint-disable-next-line react-refresh/only-export-components
export function useWeights() {
  const ctx = useContext(WeightsContext);
  if (ctx === undefined) {
    throw new Error("useWeights must be used within a WeightsProvider");
  }
  return ctx;
}
