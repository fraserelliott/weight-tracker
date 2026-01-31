import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";

export function WeightTable() {
  const { applyDateFormat } = useSettings();
  const { weights, loading } = useWeights();

  if (loading) return <p>Loading...</p>;
  if (!weights.length) return <p>No entries yet.</p>;

  // Sort newest first
  const sorted = [...weights].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div>
      <ul>
        {sorted.map((w) => (
          <li key={w.id}>
            {applyDateFormat(w.date)}: {w.weightKg.toFixed(1)}kg
          </li> //TODO: settings and formatting
        ))}
      </ul>
    </div>
  );
}
