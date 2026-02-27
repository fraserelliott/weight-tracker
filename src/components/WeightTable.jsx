import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";
import { useState } from "react";
import { UI, appearance } from "@styles";
import {
  OptionalPortal,
  ConfirmDialog,
  useToast,
} from "@fraserelliott/fe-components";

export function WeightTable() {
  const {
    settings,
    applyDateFormat,
    toDisplayWeight,
    loading: settingsLoading,
  } = useSettings();
  const {
    weightsWithStats,
    deleteWeight,
    loading: weightsLoading,
  } = useWeights();
  const { addToastMessage } = useToast();
  const [extended, setExtended] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingId, setPendingId] = useState(null);

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;
  if (!weightsWithStats.length) return <p>No entries yet.</p>;

  const openConfirm = (id) => {
    setPendingId(id);
    setShowDialog(true);
  };

  const onCancel = () => {
    setPendingId(null);
  };

  const onConfirm = async () => {
    await deleteWeight(pendingId);
    addToastMessage("Deleted weight", "success");
    setPendingId(null);
  };

  return (
    <div onClick={() => setExtended((prev) => !prev)} className={UI.Panel()}>
      <div style={extended ? extendedStyle : collapsedStyle}>
        <table className={UI.Table("weight-table")}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              <th>7 Day Average</th>
              <th>Target Weight</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {weightsWithStats.map((w) => (
              <tr key={w.id} className="fe-p-em-1">
                <td>{applyDateFormat(w.date)}</td>
                <td>
                  {toDisplayWeight(w.weightKg)} {settings.weightUnit}
                </td>
                <td>
                  {toDisplayWeight(w.rollingAverageKg.avg)}{" "}
                  {settings.weightUnit}
                </td>
                <td>
                  {w.goalWeightKg &&
                    `${toDisplayWeight(w.goalWeightKg.weight)} ${settings.weightUnit}`}
                </td>
                <td>
                  <button
                    className={UI.BtnPrimary()}
                    onClick={() => openConfirm(w.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <OptionalPortal portalTarget={document.body}>
          <ConfirmDialog
            open={showDialog}
            text="Are you sure you want to delete this entry?"
            onCancel={onCancel}
            onConfirm={onConfirm}
            onOpenChange={setShowDialog}
            style={appearance}
          />
        </OptionalPortal>
      </div>
    </div>
  );
}

const defaultStyle = {
  overflow: "auto",
  transition: "max-height 250ms ease-in-out",
  width: "100%",
};

const collapsedStyle = {
  ...defaultStyle,
  maxHeight: "200px",
};

const extendedStyle = {
  ...defaultStyle,
  maxHeight: "75vh",
};
