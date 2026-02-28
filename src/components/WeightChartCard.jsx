import { useState } from "react";
import { UI, appearance } from "@styles";
import { OptionalPortal, Modal } from "@fraserelliott/fe-components";
import { WeightChart } from "./WeightChart";

export function WeightChartCard() {
  const [extended, setExtended] = useState(false);

  return (
    <div className={UI.Panel("card")} style={{ height: "400px" }}>
      <button
        className="expand-btn"
        onClick={() => setExtended(true)}
        aria-label="Open full view"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>

      <div style={{ paddingRight: "1em" }}>{!extended && <WeightChart />}</div>

      <OptionalPortal portalTarget={document.body}>
        <Modal
          open={extended}
          onOpenChange={setExtended}
          style={appearance}
          heading="Weight History Chart"
        >
          <WeightChart extended />
        </Modal>
      </OptionalPortal>
    </div>
  );
}
