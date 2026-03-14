import { useForm } from "react-hook-form";
import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";
import { nowISODate } from "@util/dateUtil";
import { UI } from "@styles";
import { useToast } from "@fraserelliott/fe-components";

export function WeightEntryForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      date: nowISODate(),
    },
  });
  const { addWeight, findDuplicate, loading: weightsLoading } = useWeights();
  const {
    settings,
    fromDisplayWeight,
    loading: settingsLoading,
  } = useSettings();
  const { addToastMessage } = useToast();

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;

  const submitForm = (data) => {
    if (data.date > nowISODate()) {
      addToastMessage("The date selected is in the future", "error");
      return;
    }
    const duplicate = findDuplicate(data);
    if (duplicate) {
      addToastMessage("An entry already exists for this date", "error");
      return;
    }
    addWeight(data.date, fromDisplayWeight(data.weight));
    addToastMessage("Saved weight", "success");
    reset();
  };

  return (
    <div className={UI.Panel("fe-")}>
      <form onSubmit={handleSubmit(submitForm)} className={UI.Form()}>
        <input
          type="date"
          {...register("date", { required: true })}
          className={UI.InputPrimary()}
        />
        <input
          type="number"
          step="0.1"
          min="0"
          inputmode="decimal"
          {...register("weight", { required: true })}
          className={UI.InputPrimary()}
          style={{ width: "4em" }}
        />
        {settings.weightUnit}
        <input type="submit" value="Add" className={UI.BtnPrimary()} />
      </form>
    </div>
  );
}
