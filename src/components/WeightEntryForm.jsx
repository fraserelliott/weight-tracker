import { useForm } from "react-hook-form";
import { useWeights } from "@contexts/WeightsContext";
import { useSettings } from "@contexts/SettingsContext";
import { nowISODate } from "@util/dateUtil";
import { UI } from "@styles/components";

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

  if (weightsLoading || settingsLoading) return <p>Loading...</p>;

  const submitForm = (data) => {
    const duplicate = findDuplicate(data);
    if (duplicate) {
      // TODO: confirm box to ask if the user wants to update
      console.warn(`Duplicate date detected for ${data.date}`);
      return;
    }
    addWeight(data.date, fromDisplayWeight(data.weight));
    reset();
  };

  return (
    <div style={{ width: "300px" }} className={UI.Panel()}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="fe-d-flex fe-justify-between fe-items-center"
      >
        <input
          type="date"
          {...register("date", { required: true })}
          className={UI.InputPrimary()}
        />
        <input
          type="number"
          {...register("weight", { required: true })}
          className={UI.InputPrimary()}
          style={{ width: "4em" }}
        />
        <label>{settings.weightFormat}</label>
        <input type="submit" value="Add" className={UI.BtnPrimary()} />
      </form>
    </div>
  );
}
