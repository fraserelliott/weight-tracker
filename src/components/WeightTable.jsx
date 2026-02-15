import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";
import { useState } from "react";
import { UI } from "@styles/components";

export function WeightTable() {
  const {
    settings,
    applyDateFormat,
    toDisplayWeight,
    loading: settingsLoading,
  } = useSettings();
  const { weights, loading: weightsLoading } = useWeights();
  const [extended, setExtended] = useState(false);

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;
  if (!weights.length) return <p>No entries yet.</p>;

  // TODO: consider moving sorting into context
  // Sort newest first
  const sorted = [...weights].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div
      style={extended ? extendedStyle : collapsedStyle}
      onClick={() => setExtended((prev) => !prev)}
      className={UI.Panel()}
    >
      <ul style={{ listStyle: "none" }}>
        {sorted.map((w) => (
          <li
            key={w.id}
            className="fe-d-flex fe-justify-between fe-items-center fe-p-em-1"
          >
            <div></div>
            <span>
              {applyDateFormat(w.date)}: {toDisplayWeight(w.weightKg)}
              {settings.weightFormat}
            </span>
            <button className={UI.BtnPrimary()}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const defaultStyle = {
  overflow: "auto",
  transition: "max-height 250ms ease-in-out",
  width: "300px",
};

const collapsedStyle = {
  ...defaultStyle,
  maxHeight: "200px",
};

const extendedStyle = {
  ...defaultStyle,
  maxHeight: "75vh",
};
