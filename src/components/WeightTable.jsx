import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";

export function WeightTable() {
  const {
    settings,
    applyDateFormat,
    toDisplayWeight,
    loading: settingsLoading,
  } = useSettings();
  const { weights, loading: weightsLoading } = useWeights();

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;
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
            {applyDateFormat(w.date)}: {toDisplayWeight(w.weightKg)}
            {settings.weightFormat}
          </li>
        ))}
      </ul>
    </div>
  );
}
